"use client";

import { useState, useEffect } from "react";
import { dailyContent } from "@/lib/content";
import RitualViewer from "./RitualViewer";
import QuizComponent from "./QuizComponent";
import { CheckCircle, ChevronRight, BookOpen, Wind, Star, X } from "lucide-react";

interface DailyCardProps {
  day: number;
  isCompleted: boolean;
  onComplete: (completedAt: string) => void;
}

interface GeneratedQuizItem {
  question: string;
  options: string[];
  correct: number;
}

export default function DailyCard({ day, isCompleted, onComplete }: DailyCardProps) {
  const content = dailyContent[day];
  const [step, setStep] = useState(1);
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);
  const [completionError, setCompletionError] = useState("");
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizSessionId, setQuizSessionId] = useState<string | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuizItem[]>([]);
  const [preLessonText, setPreLessonText] = useState("");
  const [showPreLessonWindow, setShowPreLessonWindow] = useState(false);
  const [preLessonClosed, setPreLessonClosed] = useState(false);
  const [loadingGeneratedLesson, setLoadingGeneratedLesson] = useState(false);

  useEffect(() => {
    setStep(1);
    setCompletionError("");
    setQuizPassed(false);
    setQuizSessionId(null);
    setGeneratedQuiz([]);
    setPreLessonText("");
    setShowPreLessonWindow(false);
    setPreLessonClosed(false);
  }, [day, content]);

  const generateLessonSession = async () => {
    setLoadingGeneratedLesson(true);
    setCompletionError("");

    try {
      const res = await fetch("/api/lesson-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate",
          day,
          virtue: content.virtue,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setCompletionError(payload?.error || "Unable to generate lesson material right now.");
        return;
      }

      const payload = await res.json();
      setQuizSessionId(payload.sessionId);
      setPreLessonText(payload.preLessonText || "");
      setGeneratedQuiz(Array.isArray(payload.quiz) ? payload.quiz : []);
      setShowPreLessonWindow(true);
      setPreLessonClosed(false);
      setQuizPassed(false);
    } catch {
      setCompletionError("Connection issue while generating lesson material.");
    } finally {
      setLoadingGeneratedLesson(false);
    }
  };

  const handleQuizCompleted = async ({ answers }: { score: number; totalQuestions: number; answers: number[] }) => {
    if (!quizSessionId) return;

    try {
      const res = await fetch("/api/lesson-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          sessionId: quizSessionId,
          answers,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setCompletionError(payload?.error || "Could not save quiz answers.");
        return;
      }

      setQuizPassed(true);
    } catch {
      setCompletionError("Connection issue while submitting quiz answers.");
    }
  };

  const handleFinish = async () => {
    if (!quizPassed) {
      setCompletionError("Please complete the 7-question wisdom quiz before finishing this day.");
      return;
    }

    setSaving(true);
    setCompletionError("");
    try {
      const res = await fetch("/api/user/complete-day", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          reflection,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setCompletionError(payload?.error || "Unable to complete this lesson right now.");
        return;
      }

      onComplete(new Date().toISOString());
      setStep(1);
    } catch {
      setCompletionError("Connection issue while completing this lesson. Please try again.");
      console.error("Failed to complete day");
    } finally {
      setSaving(false);
    }
  };

  if (!content) return null;

  if (isCompleted) {
    return (
      <div className="bg-background-alt rounded-3xl border border-primary/20 shadow-2xl overflow-hidden max-w-4xl mx-auto w-full p-10 text-center">
        <p className="text-accent uppercase tracking-[0.3em] font-bold text-xs mb-3">Sacred Training</p>
        <h3 className="text-3xl font-serif text-foreground mb-3">Day {day} Complete</h3>
        <p className="text-foreground-muted">
          You have already completed this lesson and quiz. Return after midnight local time to unlock your next teaching.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-background-alt rounded-3xl border border-primary/20 shadow-2xl overflow-hidden max-w-4xl mx-auto w-full">
      {showPreLessonWindow && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto bg-background-alt border border-primary/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent font-bold">Pre-lesson transmission</p>
                <h4 className="text-2xl font-serif text-foreground">Day {day}: {content.virtue}</h4>
              </div>
              <button
                onClick={() => {
                  setShowPreLessonWindow(false);
                  setPreLessonClosed(true);
                }}
                className="rounded-full border border-primary/30 p-2 text-foreground-muted hover:text-accent"
                aria-label="Close lesson pre-text"
              >
                <X size={18} />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-foreground-muted bg-background rounded-xl border border-primary/10 p-5">
              {preLessonText}
            </div>
            <p className="text-xs text-foreground-muted mt-4">
              Once this window is closed, the pre-lesson text is sealed and cannot be reopened for this day.
            </p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-primary/40 to-primary-light/40 p-8 border-b border-primary/10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-accent uppercase tracking-[0.3em] font-bold text-xs mb-2">Sacred Training</p>
            <h3 className="text-4xl font-serif text-foreground">Day {day}: {content.virtue}</h3>
          </div>
          <div className="h-16 w-16 rounded-full border-2 border-accent/30 flex items-center justify-center text-accent font-serif text-2xl">
            {day}
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-accent">
              <BookOpen size={24} />
              <h4 className="text-xl font-serif uppercase tracking-wider">The Lesson</h4>
            </div>
            <p className="text-lg leading-relaxed text-foreground-muted first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:text-accent">
              {content.lesson}
            </p>
            <button
              onClick={() => setStep(2)}
              className="mt-8 flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-accent px-6 py-3 rounded-full transition-all group"
            >
              Move to Exercise <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-accent">
              <Wind size={24} />
              <h4 className="text-xl font-serif uppercase tracking-wider">Practical Exercise</h4>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-primary/10 italic text-lg text-foreground-muted">
              {content.exercise}
            </div>
            <button
              onClick={() => setStep(3)}
              className="mt-8 flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-accent px-6 py-3 rounded-full transition-all group"
            >
              Begin Ritual <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-accent">
              <Star size={24} />
              <h4 className="text-xl font-serif uppercase tracking-wider">The Ritual</h4>
            </div>
            <RitualViewer ritual={content.ritual} />
            <button
              onClick={() => setStep(4)}
              className="mt-8 flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-accent px-6 py-3 rounded-full transition-all group"
            >
              Seal the Energy <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 text-accent">
              <CheckCircle size={24} />
              <h4 className="text-xl font-serif uppercase tracking-wider">Reflection & Integration</h4>
            </div>

            {!generatedQuiz.length && !preLessonClosed && (
              <button
                onClick={generateLessonSession}
                disabled={loadingGeneratedLesson}
                className="w-full rounded-xl border border-primary/20 bg-primary/10 hover:bg-primary/20 px-5 py-4 text-left"
              >
                <p className="text-accent font-semibold">{loadingGeneratedLesson ? "Generating sacred study..." : "Generate today’s lesson pre-text + 7 wisdom questions"}</p>
                <p className="text-xs text-foreground-muted mt-1">This runs 4 deep lesson generations and 1 quiz generation to build your full context.</p>
              </button>
            )}

            {generatedQuiz.length > 0 && preLessonClosed && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-wider text-foreground-muted">Quiz unlocked</p>
                <QuizComponent quiz={generatedQuiz} onComplete={handleQuizCompleted} />
              </div>
            )}

            {generatedQuiz.length > 0 && !preLessonClosed && (
              <p className="text-sm text-foreground-muted">Close the pre-lesson window to begin the quiz.</p>
            )}

            {quizPassed && (
              <p className="text-sm text-green-400">Quiz saved. Your answers and score are now available to admin review.</p>
            )}

            <div className="pt-8">
              <label className="block text-sm text-foreground-muted mb-3 italic">What insights did you gain today?</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="w-full bg-background border border-primary/20 rounded-xl p-6 text-foreground focus:outline-none focus:border-accent transition-colors h-40"
                placeholder="Share your sacred thoughts..."
              />
            </div>

            <button
              onClick={handleFinish}
              disabled={saving}
              className="w-full bg-accent hover:bg-accent-light text-background font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {saving ? "Integrating..." : "Complete Day " + day}
            </button>
            {completionError && <p className="text-sm text-red-300 text-center">{completionError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
