import axios from "axios";
import { db } from "./db";
import { aiSettings as aiSettingsTable } from "./schema";
import { eq } from "drizzle-orm";
import { OPENROUTER_MODEL } from "./ai-model";

const OPENROUTER_API_KEY_ENV = process.env.OPENROUTER_API_KEY;

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

export async function chatWithMya(messages: any[], userContext?: any, user?: ChatUserContext, memory?: MemoryContext) {
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
  const apiKey = aiSettings.openrouterApiKey || OPENROUTER_API_KEY_ENV;

  if (!apiKey) {
    throw new Error("OpenRouter API key is not configured.");
  }

  const systemPrompt = {
    role: "system",
    content: `${systemContent}\n\n${conversationStylePrompt}\n\n${adminIdentityPrompt}\n\n${memoryLayerPrompt}`.trim(),
  };

  const contextMessages = messages.slice(-Math.max(1, aiSettings.maxContextMessages || 40));

  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: aiSettings.model || OPENROUTER_MODEL,
      temperature: aiSettings.temperature,
      top_p: aiSettings.topP,
      max_tokens: 180,
      messages: [systemPrompt, ...contextMessages],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message;
}
