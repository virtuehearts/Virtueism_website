import { db } from "@/lib/db";
import { aiSettings, users } from "@/lib/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { eq } from "drizzle-orm";
import { OPENROUTER_MODEL } from "@/lib/ai-model";




async function getApiKey() {
  const setting = await db.query.aiSettings.findFirst({ where: eq(aiSettings.id, "default") });
  return setting?.openrouterApiKey || process.env.OPENROUTER_API_KEY;
}

function fallbackQuiz(virtue: string) {
  return [
    { question: `What does ${virtue} support in Reiki practice?`, options: ["Healing alignment", "Confusion", "Disconnection", "Avoidance"], correct: 0 },
    { question: `How is ${virtue} strengthened?`, options: ["By rushing", "By consistent practice", "By comparison", "By avoidance"], correct: 1 },
    { question: `Which habit reflects ${virtue}?`, options: ["Mindful reflection", "Judgment", "Suppression", "Withdrawal"], correct: 0 },
    { question: `Why does ${virtue} matter?`, options: ["It weakens focus", "It supports growth", "It removes effort", "It blocks learning"], correct: 1 },
    { question: `What is the best energy posture for ${virtue}?`, options: ["Presence", "Tension", "Control", "Resistance"], correct: 0 },
    { question: `How should this virtue be applied?`, options: ["Only occasionally", "Only when easy", "Daily in action", "Never"], correct: 2 },
    { question: `A practical way to deepen ${virtue} is:`, options: ["Gentle breathwork", "Self-criticism", "Isolation", "Overthinking"], correct: 0 },
  ];
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { virtue, day } = await req.json();

    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
      with: { intake: true },
    });

    const prompt = `Generate exactly 7 multiple choice questions on the virtue of [${virtue}] in the context of Reiki.
    Personalize for the user's goal: [${user?.intake?.goal || 'spiritual growth'}].
    Format as JSON: [{"question": "...", "options": ["...", "...", "...", "..."], "correct": 0}] where correct is the index of the right option.`;

    const apiKey = await getApiKey();
    if (!apiKey) {
      return NextResponse.json(fallbackQuiz(virtue || "this virtue"));
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: OPENROUTER_MODEL,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawContent = response.data?.choices?.[0]?.message?.content;
    if (typeof rawContent !== "string") {
      throw new Error("Invalid AI response payload");
    }

    const sanitizedContent = rawContent
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    const content = JSON.parse(sanitizedContent);

    const quiz = Array.isArray(content)
      ? content
      : Array.isArray(content?.quiz)
      ? content.quiz
      : Array.isArray(content?.questions)
      ? content.questions
      : Array.isArray(content?.items)
      ? content.items
      : [];

    if (quiz.length < 7) {
      throw new Error("AI response did not include quiz questions");
    }

    return NextResponse.json(quiz.slice(0, 7));
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(fallbackQuiz("this virtue"));
  }
}
