"use client";

import { useSession } from "next-auth/react";
import { logoutToLogin } from "@/lib/client-auth";
import { useEffect, useState } from "react";
import IntakeForm from "@/components/IntakeForm";
import ProgressIndicator from "@/components/ProgressIndicator";
import DailyCard from "@/components/DailyCard";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Library, Award, Globe, Phone, FileText, Check, Loader2 } from "lucide-react";
import MessageBaba from "@/components/MessageBaba";

type CompletedProgressEntry = {
  day: number;
  completedAt: string | null;
};

function getDateKeyLocal(date: Date) {
  return date.toLocaleDateString("en-CA");
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasIntake, setHasIntake] = useState<boolean | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<number[]>([]); // Days completed
  const [completedProgress, setCompletedProgress] = useState<CompletedProgressEntry[]>([]);
  const [lessonLockMessage, setLessonLockMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isReikiMaster, setIsReikiMaster] = useState(false);
  const [practitionerInfo, setPractitionerInfo] = useState({ website: "", whatsapp: "", bio: "", certificateNumber: "", certificateDate: "" });
  const [savingPractitioner, setSavingPractitioner] = useState(false);

  const handleSignOut = async () => {
    await logoutToLogin();
  };

  const highestCompletedDay = progress.length ? Math.max(...progress) : 0;
  const nextDayCandidate = Math.min(highestCompletedDay + 1, 7);
  const previousDayEntry = completedProgress.find((entry) => entry.day === highestCompletedDay);

  const isNextDayLockedUntilMidnight = Boolean(
    highestCompletedDay > 0 &&
    highestCompletedDay < 7 &&
    previousDayEntry?.completedAt &&
    getDateKeyLocal(new Date(previousDayEntry.completedAt)) === getDateKeyLocal(new Date())
  );

  const maxUnlockedDay = isNextDayLockedUntilMidnight
    ? highestCompletedDay
    : nextDayCandidate;

  const completedAllLessons = [1, 2, 3, 4, 5, 6, 7].every((day) => progress.includes(day));

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.status === "PENDING") {
      router.push("/pending");
    } else if (session?.user) {
      fetchProgress();
    }
  }, [session, status, router]);

  useEffect(() => {
    if (isReikiMaster) {
      fetchPractitionerInfo();
    }
  }, [isReikiMaster]);

  const fetchPractitionerInfo = async () => {
    try {
      const res = await fetch("/api/user/practitioner-info");
      if (res.ok) {
        const data = await res.json();
        setPractitionerInfo(data);
      }
    } catch (err) {
      console.error("Failed to fetch practitioner info");
    }
  };

  const handlePractitionerUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPractitioner(true);
    try {
      const res = await fetch("/api/user/practitioner-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: practitionerInfo.website,
          whatsapp: practitionerInfo.whatsapp,
          bio: practitionerInfo.bio,
        }),
      });
      if (res.ok) {
        alert("Practitioner profile updated successfully!");
      }
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setSavingPractitioner(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await fetch("/api/user/progress");
      if (res.ok) {
        const data = await res.json();
        setHasIntake(data.hasIntake);
        setIsReikiMaster(data.isReikiMaster || false);
        setProgress(data.completedDays || []);
        setCompletedProgress(data.completedProgress || []);
        // Set current day to the first incomplete day
        const completedDays = data.completedDays || [];
        const highestCompleted = completedDays.length ? Math.max(...completedDays) : 0;
        const previousEntry = (data.completedProgress || []).find((entry: CompletedProgressEntry) => entry.day === highestCompleted);
        const lockNextDay = Boolean(
          highestCompleted > 0 &&
          highestCompleted < 7 &&
          previousEntry?.completedAt &&
          getDateKeyLocal(new Date(previousEntry.completedAt)) === getDateKeyLocal(new Date())
        );

        const nextAvailableDay = lockNextDay
          ? highestCompleted
          : ([1,2,3,4,5,6,7].find(d => !completedDays.includes(d)) || 7);

        setCurrentDay(nextAvailableDay);
      }
    } catch (err) {
      console.error("Failed to fetch progress");
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return <div className="min-h-screen bg-background flex items-center justify-center text-accent">Ascending...</div>;
  }

  if (hasIntake === false && session?.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <IntakeForm onComplete={() => setHasIntake(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-primary/10 flex justify-between items-center bg-background-alt/50 backdrop-blur-md sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-serif text-accent">Virtuehearts Reiki</h1>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/teachings" className="flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors">
            <Library size={20} />
            <span>Teachings</span>
          </Link>
          <Link href="/mya-chat" className="flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors">
            <MessageCircle size={20} />
            <span>Chat with Mya</span>
          </Link>
          <MessageBaba />
          <div className="text-right">
            <p className="text-sm font-medium">{session?.user?.name}</p>
            <button
              onClick={handleSignOut}
              className="text-xs text-foreground-muted hover:text-accent"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto w-full p-6 md:p-12 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">{completedAllLessons ? "Reiki Level 1 Is Ready" : "Your 7-Day Transformation"}</h2>
          <p className="text-foreground-muted max-w-2xl mx-auto italic">
            {completedAllLessons
              ? "You are now ready to learn Reiki Level 1 with Baba Virtuehearts."
              : "Each day is a new virtue, a new energy, a new step towards your highest self."}
          </p>
        </div>

        {!completedAllLessons && <ProgressIndicator currentDay={currentDay} completedDays={progress} />}

        <div className="grid grid-cols-1 gap-12 pt-8">
          {isReikiMaster && (
            <div className="mx-auto w-full max-w-4xl rounded-3xl border border-accent/40 bg-accent/5 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/20 p-3 rounded-2xl">
                    <Award className="text-accent" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-foreground">Reiki Master Practitioner</h3>
                    <p className="text-sm text-foreground-muted">Verified by Baba Virtuehearts • Cert: {practitionerInfo.certificateNumber}</p>
                  </div>
                </div>
                <Link
                  href={`/certificates/${practitionerInfo.certificateNumber}`}
                  className="flex items-center gap-2 rounded-full border border-accent/40 px-6 py-2 text-sm font-medium text-accent hover:bg-accent/10 transition-all"
                >
                  <FileText size={18} />
                  <span>View & Print Certificate</span>
                </Link>
              </div>

              <form onSubmit={handlePractitionerUpdate} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                      <Globe size={14} /> Website / Social Media Link
                    </label>
                    <input
                      type="url"
                      value={practitionerInfo.website}
                      onChange={(e) => setPractitionerInfo({ ...practitionerInfo, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-background border border-primary/20 rounded-xl px-4 py-2 text-sm focus:border-accent outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground-muted flex items-center gap-2">
                      <Phone size={14} /> WhatsApp Number
                    </label>
                    <input
                      type="text"
                      value={practitionerInfo.whatsapp}
                      onChange={(e) => setPractitionerInfo({ ...practitionerInfo, whatsapp: e.target.value })}
                      placeholder="+1 123 456 7890"
                      className="w-full bg-background border border-primary/20 rounded-xl px-4 py-2 text-sm focus:border-accent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground-muted">Practitioner Bio / Services</label>
                  <textarea
                    value={practitionerInfo.bio}
                    onChange={(e) => setPractitionerInfo({ ...practitionerInfo, bio: e.target.value })}
                    placeholder="Tell your clients about your practice..."
                    rows={4}
                    className="w-full bg-background border border-primary/20 rounded-xl px-4 py-2 text-sm focus:border-accent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={savingPractitioner}
                  className="w-full bg-accent text-background font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {savingPractitioner ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Check size={20} />
                      Save Practitioner Profile
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
          {completedAllLessons && (
            <div className="mx-auto w-full max-w-4xl rounded-3xl border border-accent/40 bg-primary/10 p-8 text-center space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-accent">New Large Lesson Unlocked</p>
              <h3 className="text-4xl font-serif text-foreground">Learn Reiki Level 1</h3>
              <p className="text-foreground-muted max-w-2xl mx-auto">
                You completed all 7 lessons. Your next path is Reiki Level 1 training with Baba Virtuehearts.
                Continue in Wellness for booking and advanced levels.
              </p>
              <p className="text-sm text-foreground-muted">Pricing: Level 1 $100 · Level 2 $250 · Master Level $250 · All 3 Levels Package $375</p>
              <Link href="/wellness/reiki-classes" className="inline-block rounded-full bg-accent px-6 py-3 font-semibold text-background">
                Continue to Reiki Classes
              </Link>
            </div>
          )}

          {isNextDayLockedUntilMidnight && highestCompletedDay < 7 && (
            <div className="max-w-4xl mx-auto w-full rounded-2xl border border-accent/30 bg-primary/10 p-4 text-sm text-foreground-muted">
              You completed today&apos;s lesson. Please meditate on this wisdom and return after midnight local time to continue to Day {highestCompletedDay + 1}.
            </div>
          )}

          {lessonLockMessage && (
            <div className="max-w-4xl mx-auto w-full rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
              {lessonLockMessage}
            </div>
          )}

           {!completedAllLessons && <DailyCard
             day={currentDay}
             isCompleted={progress.includes(currentDay)}
             onComplete={(completedAt) => {
               setLessonLockMessage("");
               const updatedProgress = progress.includes(currentDay)
                 ? progress
                 : [...progress, currentDay];
               const updatedCompletedProgress = completedProgress.some((entry) => entry.day === currentDay)
                 ? completedProgress.map((entry) => entry.day === currentDay ? { ...entry, completedAt } : entry)
                 : [...completedProgress, { day: currentDay, completedAt }];

               setProgress(updatedProgress);
               setCompletedProgress(updatedCompletedProgress);

               const lockAfterCompletion = Boolean(
                 currentDay < 7 &&
                 completedAt &&
                 getDateKeyLocal(new Date(completedAt)) === getDateKeyLocal(new Date())
               );

               if (currentDay < 7 && !lockAfterCompletion) {
                 setCurrentDay(currentDay + 1);
               }
             }}
           />}
        </div>

        {!completedAllLessons && <div className="grid grid-cols-1 md:grid-cols-7 gap-4 pt-12">
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <button
              key={day}
              onClick={() => {
                if (progress.includes(day)) {
                  setLessonLockMessage(`Day ${day} is already completed and locked. Please continue to the next available day.`);
                  return;
                }

                if (day > maxUnlockedDay) {
                  setLessonLockMessage(
                    `Please meditate on today's teachings. Day ${maxUnlockedDay + 1} unlocks after midnight local time.`
                  );
                  return;
                }

                setLessonLockMessage("");
                setCurrentDay(day);
              }}
              className={`p-4 rounded-xl border transition-all ${
                day === currentDay
                  ? "bg-primary/20 border-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  : progress.includes(day)
                  ? "bg-primary/5 border-primary/20 opacity-100"
                  : day > maxUnlockedDay
                  ? "bg-background-alt border-primary/10 opacity-50 cursor-not-allowed"
                  : "bg-background-alt border-primary/10 opacity-80"
              }`}
            >
              <p className="text-xs uppercase tracking-widest text-accent mb-1 font-bold">Day</p>
              <p className="text-2xl font-serif">{day}</p>
              {progress.includes(day) && <p className="text-[10px] text-secondary mt-1 uppercase">Completed</p>}
            </button>
          ))}
        </div>}
      </main>

      <footer className="p-8 text-center text-foreground-muted/40 text-sm">
        Blessings of peace, Baba Virtuehearts | admin@virtueism.org
      </footer>
    </div>
  );
}
