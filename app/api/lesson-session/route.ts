import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { and, eq } from "drizzle-orm";
import axios from "axios";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { aiSettings, lessonSessions, users } from "@/lib/schema";
import { OPENROUTER_MODEL } from "@/lib/ai-model";
import { dailyContent } from "@/lib/content";

interface QuizItem {
  question: string;
  options: string[];
  correct: number;
}

const MAX_GENERATION_RETRIES = 3;

const parseJsonContent = (raw: unknown) => {
  if (typeof raw !== "string") return null;
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
};

async function getApiKey() {
  const setting = await db.query.aiSettings.findFirst({ where: eq(aiSettings.id, "default") });
  return setting?.openrouterApiKey || process.env.OPENROUTER_API_KEY;
}

async function requestOpenRouter(apiKey: string, prompt: string, maxTokens: number, json = false) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: OPENROUTER_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: maxTokens,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data?.choices?.[0]?.message?.content;
}

async function generatePreLessonText(virtue: string, goal: string) {
  const apiKey = await getApiKey();
  if (!apiKey) throw new Error("OpenRouter API key is not configured.");

  const chunkPrompts = [
    `Write PART 1 of an immersive Reiki lesson about ${virtue}. Keep it practical, warm, and tied to Virtueism. Goal: ${goal}.`,
    `Write PART 2 of the same lesson. Add relatable examples and gentle self-inquiry prompts. Goal: ${goal}.`,
    `Write PART 3 of the same lesson. Add breathwork and visualization instructions learners can perform today. Goal: ${goal}.`,
    `Write PART 4 of the same lesson. Explain how this virtue supports healing, guidance, and growth with Baba Virtuehearts' services and mentorship. Goal: ${goal}.`,
  ];

  const chunks: string[] = [];

  for (const prompt of chunkPrompts) {
    let generatedChunk = "";

    for (let attempt = 1; attempt <= MAX_GENERATION_RETRIES; attempt++) {
      const content = await requestOpenRouter(
        apiKey,
        `${prompt}\nReturn plain text only. Keep this section detailed and complete in 3-5 sentences.`,
        420
      );

      if (typeof content === "string" && content.trim().length > 120) {
        generatedChunk = content.trim();
        break;
      }
    }

    if (!generatedChunk) {
      throw new Error("Could not generate complete pre-lesson material.");
    }

    chunks.push(generatedChunk);
  }

  return chunks.map((part, i) => `Section ${i + 1}\n${part}`).join("\n\n");
}



function buildFallbackQuiz(virtue: string): QuizItem[] {
  const normalizedVirtue = virtue || "this virtue";
  return [
    {
      question: `What is the central Reiki intention behind ${normalizedVirtue}?`,
      options: ["Control", "Healing", "Competition", "Distraction"],
      correct: 1,
    },
    {
      question: `How should ${normalizedVirtue} be practiced daily?`,
      options: ["With pressure", "Only once", "With consistency", "Only in groups"],
      correct: 2,
    },
    {
      question: `Which approach supports ${normalizedVirtue} best?`,
      options: ["Judgment", "Presence", "Avoidance", "Urgency"],
      correct: 1,
    },
    {
      question: `In Reiki study, ${normalizedVirtue} is strongest when paired with:`,
      options: ["Mindful breath", "Rush", "Silence only", "Isolation"],
      correct: 0,
    },
    {
      question: `What blocks progress with ${normalizedVirtue}?`,
      options: ["Daily reflection", "Resistance", "Guided practice", "Compassion"],
      correct: 1,
    },
    {
      question: `A learner can embody ${normalizedVirtue} by:`,
      options: ["Ignoring emotions", "Forcing outcomes", "Gentle repetition", "Comparing with others"],
      correct: 2,
    },
    {
      question: `Why is ${normalizedVirtue} important on the healing path?`,
      options: ["It weakens focus", "It deepens alignment", "It replaces practice", "It removes responsibility"],
      correct: 1,
    },
  ];
}

function buildFallbackPreLesson(day: number, virtue: string, goal: string) {
  const dayContent = dailyContent[day];
  if (dayContent?.lesson) {
    return [
      "Section 1\n" + dayContent.lesson,
      "Section 2\n" + (dayContent.exercise || `Practice ${virtue} with mindful breath and reflection.`),
      "Section 3\n" + (dayContent?.ritual?.steps?.join(" ") || `Visualize ${virtue} as radiant light in your energy field.`),
      `Section 4\nApply ${virtue} in service of your goal: ${goal}. Keep your practice gentle, embodied, and consistent.`,
    ].join("\n\n");
  }

  return [
    `Section 1\n${virtue} is a foundational part of Reiki integration and inner balance.`,
    `Section 2\nReflect on how ${virtue} appears in your words, thoughts, and actions each day.`,
    `Section 3\nUse steady breathing and light visualization to anchor ${virtue} in your body.`,
    `Section 4\nApply this virtue toward your personal goal: ${goal}.`,
  ].join("\n\n");
}

async function generateQuiz(virtue: string, goal: string, preLessonText: string) {
  const apiKey = await getApiKey();
  if (!apiKey) throw new Error("OpenRouter API key is not configured.");

  const prompt = `Using ONLY the lesson material below, generate exactly 7 multiple choice questions for ${virtue} in Reiki and Virtueism context.
Include 4 options per question and a correct index (0-3).
Personalize gently for user goal: ${goal}.
Return strict JSON object: {"quiz":[{"question":"...","options":["...","...","...","..."],"correct":0}]}
Lesson material:\n${preLessonText}`;

  for (let attempt = 1; attempt <= MAX_GENERATION_RETRIES; attempt++) {
    const raw = await requestOpenRouter(apiKey, prompt, 900, true);
    const parsed = parseJsonContent(raw);
    const quizRaw = Array.isArray(parsed?.quiz) ? parsed.quiz : [];

    const quiz = quizRaw
      .map((item: any) => ({
        question: String(item?.question || "").trim(),
        options: Array.isArray(item?.options) ? item.options.map((opt: unknown) => String(opt)) : [],
        correct: Number(item?.correct),
      }))
      .filter((item: QuizItem) => item.question && item.options.length === 4 && Number.isInteger(item.correct) && item.correct >= 0 && item.correct <= 3)
      .slice(0, 7);

    if (quiz.length === 7) {
      return quiz;
    }
  }

  throw new Error("Quiz generation failed to return 7 valid questions after retries.");
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const action = body?.action || "generate";

    if (action === "generate") {
      const day = Number(body?.day);
      const virtue = String(body?.virtue || "").trim();

      if (!Number.isInteger(day) || day < 1 || day > 7 || !virtue) {
        return NextResponse.json({ error: "Invalid day or virtue" }, { status: 400 });
      }

      const user = await db.query.users.findFirst({
        where: eq(users.id, session.user.id),
        with: { intake: true },
      });

      const goal = user?.intake?.goal || "spiritual growth";
      let preLessonText: string;
      let quiz: QuizItem[];

      try {
        preLessonText = await generatePreLessonText(virtue, goal);
        quiz = await generateQuiz(virtue, goal, preLessonText);
      } catch (generationError) {
        console.error("Lesson generation fallback activated:", generationError);
        preLessonText = buildFallbackPreLesson(day, virtue, goal);
        quiz = buildFallbackQuiz(virtue);
      }

      const [saved] = await db
        .insert(lessonSessions)
        .values({
          userId: session.user.id,
          day,
          virtue,
          preLessonText,
          quiz: JSON.stringify(quiz),
          answers: JSON.stringify([]),
          score: 0,
          totalQuestions: quiz.length,
          submittedAt: null,
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [lessonSessions.userId, lessonSessions.day],
          set: {
            virtue,
            preLessonText,
            quiz: JSON.stringify(quiz),
            answers: JSON.stringify([]),
            score: 0,
            totalQuestions: quiz.length,
            submittedAt: null,
            updatedAt: new Date(),
          },
        })
        .returning();

      return NextResponse.json({
        sessionId: saved.id,
        preLessonText,
        quiz,
      });
    }

    if (action === "submit") {
      const sessionId = String(body?.sessionId || "").trim();
      const answers = Array.isArray(body?.answers) ? body.answers.map((value: unknown) => Number(value)) : [];

      if (!sessionId || !answers.length) {
        return NextResponse.json({ error: "Missing quiz session or answers" }, { status: 400 });
      }

      const lessonSession = await db.query.lessonSessions.findFirst({
        where: and(eq(lessonSessions.id, sessionId), eq(lessonSessions.userId, session.user.id)),
      });

      if (!lessonSession) {
        return NextResponse.json({ error: "Lesson session not found" }, { status: 404 });
      }

      const quiz: QuizItem[] = JSON.parse(lessonSession.quiz || "[]");
      const normalizedAnswers = answers.slice(0, quiz.length).map((value: number) => (Number.isInteger(value) ? value : -1));
      const score = quiz.reduce((acc, item, index) => (normalizedAnswers[index] === item.correct ? acc + 1 : acc), 0);

      await db
        .update(lessonSessions)
        .set({
          answers: JSON.stringify(normalizedAnswers),
          score,
          totalQuestions: quiz.length,
          submittedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(lessonSessions.id, lessonSession.id));

      return NextResponse.json({ score, totalQuestions: quiz.length });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    console.error("Lesson session error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
