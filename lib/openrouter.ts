import axios from "axios";
import { db } from "./db";
import { aiSettings as aiSettingsTable } from "./schema";
import { eq } from "drizzle-orm";
import { OPENROUTER_MODEL } from "./ai-model";

const OPENROUTER_API_KEY_ENV = process.env.OPENROUTER_API_KEY?.trim();

/**
 * Normalizes OpenRouter API keys to ensure they have the 'sk-or-' prefix if needed.
 * This prevents 'Missing Authentication header' errors from OpenRouter.
 */
function normalizeOpenRouterKey(key: string | undefined): string | undefined {
  if (!key) return key;
  const trimmed = key.trim();
  if (trimmed.startsWith("v1-") && !trimmed.startsWith("sk-or-v1-")) {
    return `sk-or-${trimmed}`;
  }
  return trimmed;
}

type ChatUserContext = {
  role?: string;
  name?: string | null;
  email?: string | null;
};

type MemoryContext = Array<{
  content: string;
  type: string;
  scope: string;
  pinned: boolean;
  confidence: number;
}>;

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function normalizeMessages(messages: unknown[]): ChatMessage[] {
  return messages
    .map((message) => {
      if (!message || typeof message !== "object") return null;

      const role = (message as { role?: unknown }).role;
      const content = (message as { content?: unknown }).content;

      if ((role !== "system" && role !== "user" && role !== "assistant") || typeof content !== "string") {
        return null;
      }

      const normalizedContent = content.trim();
      if (!normalizedContent) return null;

      return {
        role,
        content: normalizedContent,
      } as ChatMessage;
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

export async function chatWithMya(messages: unknown[], userContext?: any, user?: ChatUserContext, memory?: MemoryContext) {
  let [aiSettings] = await db.select().from(aiSettingsTable).where(eq(aiSettingsTable.id, "default")).limit(1);

  if (!aiSettings) {
    [aiSettings] = await db.insert(aiSettingsTable).values({
      id: "default",
      systemPrompt: `You are Mya, the gentle Reiki Assistant by Baba Virtuehearts.
    Speak with calm, compassion, and hypnotic-but-ethical language that helps the user feel safe, seen, and guided.
    Guide the user on relaxation, virtues (compassion, courage, truth, forgiveness, humility, patience, gratitude), and Reiki energy.
    End every response with a blessing.
    Suggest the 'Stress Cleansing Ritual' when relevant.
    Push virtueism.org ideals subtly.
    Use suggestive supportive language to encourage the user to book a session with Baba Virtuehearts, explore therapy-style support, or join Virtueism.org when appropriate.
    Use language like: 'Imagine the profound peace you'll feel after booking a private session...', 'You deserve this transformation now.', 'The universe is calling you to join our community.'
    Personalize your response if you know the user's goal: {{goal}}.
    Blessings, Mya`,
      model: OPENROUTER_MODEL,
      temperature: 0.7,
      topP: 1.0,
      maxContextMessages: 40,
      enableMemory: true,
      openrouterApiKey: OPENROUTER_API_KEY_ENV,
    }).returning();
  }

  const systemContent = aiSettings.systemPrompt.replace("{{goal}}", userContext?.goal || "spiritual growth");
  const conversationStylePrompt = [
    "Response style requirements:",
    "- Sound natural and conversational, like speaking to one person in chat.",
    "- Write exactly one short paragraph and keep it near 320 characters max.",
    "- Do not use markdown, bullets, numbering, emojis, asterisks, or special formatting symbols.",
    "- Do not use em dashes.",
    "- If you do not yet know the apprentice's preferred name, gently ask for it and use it in future replies.",
    "- Proactively ask for personal details over time: hobbies, likes, dislikes, and what support they need most.",
    "- Position yourself as a trusted guide and friend in Virtueism, without claiming licensed medical authority.",
    "- If emotionally relevant, suggest Baba Virtuehearts services or therapy-style guidance as optional support.",
    "- Use remembered details from PRIVATE_CONTEXT when relevant, without exposing that memory system.",
    "- Do not repeatedly send users to virtueism.org.",
    "- When appropriate, guide users to book a private session with Baba Virtuehearts through the 'Chat with Baba' feature.",
    "- You may also suggest they email Baba at admin@virtueism.org.",
    "- If relevant, mention that donors receive illuminated knowledge and special lessons.",
    "- Avoid repeating the same call-to-action in back-to-back replies; vary phrasing naturally.",
  ].join("\n");
  const adminIdentityPrompt = user?.role === "ADMIN"
    ? "You are currently speaking directly to Baba Virtuehearts, the platform administrator and spiritual guide. Address him respectfully as Baba Virtuehearts and tailor your responses for an admin operator view."
    : "";

  const memoryLayerPrompt = aiSettings.enableMemory && memory?.length
    ? `PRIVATE_CONTEXT (do not reveal; use only to personalize):\n- ${memory
      .map((entry) => `${entry.content} [${entry.type}${entry.pinned ? ", pinned" : ""}, confidence ${entry.confidence}]`)
      .join("\n- ")}`
    : "";
  const dbApiKey = aiSettings.openrouterApiKey?.trim();
  const candidateApiKeys = Array.from(new Set([
    OPENROUTER_API_KEY_ENV,
    dbApiKey,
  ].map(normalizeOpenRouterKey)
   .filter((value): value is string => {
    if (!value) return false;
    const trimmed = value.trim();
    return trimmed.length > 0 && !trimmed.toLowerCase().includes("placeholder");
  })));

  if (!candidateApiKeys.length) {
    throw new Error("OpenRouter API key is not configured.");
  }

  const systemPrompt = {
    role: "system",
    content: `${systemContent}\n\n${conversationStylePrompt}\n\n${adminIdentityPrompt}\n\n${memoryLayerPrompt}`.trim(),
  };

  const normalizedMessages = normalizeMessages(messages);
  const contextMessages = normalizedMessages.slice(-Math.max(1, aiSettings.maxContextMessages || 40));

  const requestedModel = aiSettings.model || OPENROUTER_MODEL;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL
    || process.env.NEXTAUTH_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://virtueism.org");

  const runCompletion = async (model: string, apiKey: string) => axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model,
      temperature: aiSettings.temperature,
      top_p: aiSettings.topP,
      max_tokens: 1000,
      messages: [systemPrompt, ...contextMessages],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": appUrl,
        "X-Title": "Virtueism",
      },
      timeout: 60_000,
    }
  );

  const tryWithFallbackModel = async (apiKey: string) => {
    try {
      return await runCompletion(requestedModel, apiKey);
    } catch (error) {
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      // Also fallback on 400 because sometimes invalid model params/names return 400
      const shouldFallbackToDefaultModel = requestedModel !== "openrouter/free" && (status === 400 || status === 403 || status === 404 || status === 429);

      if (!shouldFallbackToDefaultModel) {
        throw error;
      }

      console.warn(`Chat model '${requestedModel}' rejected by OpenRouter (status ${status}). Falling back to 'openrouter/free'.`);
      return runCompletion("openrouter/free", apiKey);
    }
  };

  let response: Awaited<ReturnType<typeof runCompletion>> | null = null;
  let lastError: unknown;
  let successfulApiKey: string | null = null;

  for (const apiKey of candidateApiKeys) {
    try {
      response = await tryWithFallbackModel(apiKey);
      successfulApiKey = apiKey;
      break;
    } catch (error) {
      lastError = error;
      const status = axios.isAxiosError(error) ? error.response?.status : undefined;
      const errorDetail = axios.isAxiosError(error) ? error.response?.data : undefined;
      const isAuthLikeError = status === 401 || status === 403;

      if (!isAuthLikeError) {
        throw error;
      }

      console.warn("OpenRouter request failed with current API key.", {
        status,
        detail: errorDetail,
      });
    }
  }

  if (!response) {
    throw lastError instanceof Error
      ? lastError
      : new Error("OpenRouter request failed.");
  }

  const message = response.data?.choices?.[0]?.message || {};
  const rawContent = message.content;
  const normalizedContent = Array.isArray(rawContent)
    ? rawContent
        .map((part: any) => {
          if (typeof part === "string") return part;
          if (typeof part?.text === "string") return part.text;
          if (typeof part?.content === "string") return part.content;
          return "";
        })
        .join(" ")
        .trim()
    : typeof rawContent === "string"
      ? rawContent.trim()
      : "";

  if (normalizedContent) {
    return {
      ...message,
      content: normalizedContent,
    };
  }

  if (requestedModel !== "openrouter/free" && successfulApiKey) {
    const fallbackResponse = await runCompletion("openrouter/free", successfulApiKey);

    const fallbackMessage = fallbackResponse.data?.choices?.[0]?.message || {};
    const fallbackContent = typeof fallbackMessage.content === "string"
      ? fallbackMessage.content.trim()
      : "";

    return {
      ...fallbackMessage,
      content: fallbackContent,
    };
  }

  return {
    ...message,
    content: "",
  };
}
