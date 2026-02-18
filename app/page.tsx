import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  Waves,
} from "lucide-react";

const trainingDays = [
  "Day 1: Introduction to Reiki energy and spiritual grounding",
  "Day 2: Breathwork, intention setting, and energetic awareness",
  "Day 3: Self-healing practice for emotional and physical balance",
  "Day 4: Chakra basics and energy flow alignment",
  "Day 5: Compassionate living and mindful daily rituals",
  "Day 6: Guided reflection and integrating Reiki into life",
  "Day 7: Next steps, mentorship options, and community pathways",
];

const services = [
  {
    title: "1-on-1 Reiki Sessions with Baba Virtuehearts",
    description:
      "Personalized healing sessions focused on clarity, release, and energetic renewal.",
  },
  {
    title: "Oil Massage Therapy",
    description:
      "Relaxing bodywork sessions designed to support deep rest and emotional balance.",
  },
  {
    title: "Online Sessions via WhatsApp",
    description:
      "Receive guidance and healing remotely when in-person sessions are not possible.",
  },
  {
    title: "In-Person & Outcall in GTA",
    description:
      "Based in Scarborough, Ontario with outcall service across the GTA (extra fees apply).",
  },
];

const membershipPerks = [
  "Access to Mya spiritual AI chat guidance",
  "Member WhatsApp and Facebook groups for supporters",
  "Direct access to message Baba Virtuehearts",
  "Ongoing guidance after your 7-day foundation program",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0720] text-white">
      <header className="sticky top-0 z-50 border-b border-violet-500/20 bg-[#0d0720]/90 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-500">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-lg">Virtueism.org</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm text-violet-100 md:flex">
            <a href="#training" className="hover:text-violet-300">Training</a>
            <a href="#services" className="hover:text-violet-300">Services</a>
            <a href="#membership" className="hover:text-violet-300">Membership</a>
            <a href="#contact" className="hover:text-violet-300">Contact</a>
          </div>

          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Start Training
          </Link>
        </nav>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-200">
              <HeartHandshake className="h-4 w-4" />
              Healing, Reiki Training, and Spiritual Community
            </span>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
              Virtueism Website + Reiki Training in One App
            </h1>
            <p className="mb-8 max-w-xl text-lg text-violet-100/80">
              Welcome to the new Virtueism.org experience. Explore services and begin your
              free 7-day Reiki path, then continue through teachings, mentorship, and Mya AI guidance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3 font-medium"
              >
                <CalendarCheck className="h-5 w-5" />
                Join Free 7-Day Training
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-violet-400/40 px-6 py-3 text-violet-100 hover:bg-violet-500/10"
              >
                Returning Student
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-violet-950/30 p-6">
            <h2 className="mb-5 text-2xl font-semibold">Why People Join Virtueism</h2>
            <ul className="space-y-3 text-violet-100/80">
              {[
                "Authentic Reiki training guided by Baba Virtuehearts",
                "Beginner-friendly steps with practical daily rituals",
                "One place for the public website and the full training platform",
                "Community support plus future AI and WhatsApp growth",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="training" className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Free 7-Day Reiki Training</h2>
          <p className="mb-8 max-w-3xl text-violet-100/80">
            Build a strong spiritual foundation through seven guided days. After signup,
            students can continue through daily lessons, quiz checkpoints, and personal progress tracking.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {trainingDays.map((day) => (
              <div key={day} className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-4 text-violet-100/90">
                {day}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Healing Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-xl border border-violet-500/20 bg-violet-950/20 p-6">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-violet-100/80">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="membership" className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Membership & Community</h2>
          <div className="rounded-2xl border border-violet-500/25 bg-violet-950/30 p-8">
            <ul className="grid gap-4 md:grid-cols-2">
              {membershipPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-violet-100/90">
                  <Waves className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/mya-chat" className="rounded-full border border-violet-400/40 px-5 py-2 hover:bg-violet-500/10">
                Open Mya Chat
              </Link>
              <Link href="/teachings" className="rounded-full border border-violet-400/40 px-5 py-2 hover:bg-violet-500/10">
                View Teachings
              </Link>
              <Link href="/dashboard" className="rounded-full border border-violet-400/40 px-5 py-2 hover:bg-violet-500/10">
                Student Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="mx-auto w-full max-w-6xl border-t border-violet-500/20 px-4 py-10 text-sm text-violet-100/70">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-medium text-violet-100">Virtueism.org + ReikiTraining</p>
            <p>Contact: 647-781-8371</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="flex items-center justify-end gap-2">
              <MapPin className="h-4 w-4" /> Scarborough, Ontario (GTA Outcall Available)
            </p>
            <p className="flex items-center justify-end gap-2">
              <MessageCircle className="h-4 w-4" /> WhatsApp support available
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
