import Link from "next/link";
import {
  CalendarCheck,
  CheckCircle2,
  Flower2,
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
    title: "Reiki Sessions",
    description:
      "Personalized healing sessions focused on clarity, release, and energetic renewal.",
    href: "/wellness/reiki-sessions",
  },
  {
    title: "Reiki Classes",
    description:
      "Train with Baba Virtuehearts through guided online Reiki class pathways.",
    href: "/wellness/reiki-classes",
  },
  {
    title: "Massage Therapy",
    description:
      "Relaxing bodywork sessions designed to support deep rest and emotional balance.",
    href: "/wellness/massage",
  },
  {
    title: "Explore All Wellness",
    description:
      "See all wellness services, class options, and booking details in one place.",
    href: "/wellness",
  },
];

const membershipPerks = [
  "Access to Mya spiritual AI chat guidance",
  "Member WhatsApp and Facebook groups for supporters",
  "Direct access to message Baba Virtuehearts",
  "Ongoing guidance after your 7-day foundation program",
];

const slideshowFrames = [
  {
    src: "/slideshow/01.jpg",
    alt: "Meditation circle during a guided session",
  },
  {
    src: "/slideshow/02.jpg",
    alt: "Reiki practitioner offering a calming session",
  },
  {
    src: "/slideshow/03.jpg",
    alt: "Peaceful wellness room prepared for healing",
  },
  {
    src: "/slideshow/04.jpg",
    alt: "Students participating in mindful breathwork",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0d0720] text-white">
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-orb hero-orb-three" />
      </div>

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
            <a href="#gallery" className="hover:text-violet-300">Gallery</a>
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

      <main className="relative z-10">
        <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-200">
              <HeartHandshake className="h-4 w-4" />
              Healing, Reiki Training, and Spiritual Community
            </span>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-6xl">
              A Modern Home for Reiki Healing, Meditation, and Spiritual Growth
            </h1>
            <p className="mb-8 max-w-xl text-lg text-violet-100/80">
              Discover an immersive, peaceful space for healing sessions, guided training,
              and conscious community. Begin your free 7-day Reiki path and continue with
              mentorship, teachings, and Mya AI guidance.
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

          <div className="glass-panel rounded-2xl border border-violet-500/30 p-6">
            <h2 className="mb-5 text-2xl font-semibold">Why People Join Virtueism</h2>
            <ul className="space-y-3 text-violet-100/80">
              {[
                "Authentic Reiki training guided by Baba Virtuehearts",
                "Beginner-friendly steps with practical daily rituals",
                "Guided Reiki Training",
                "Advanced Training available",
                "Facebook Community & WhatsApp Group",
                "Meet others in Virtueism Reiki",
                "AI assistance & Baba Virtuehearts.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="gallery" className="mx-auto w-full max-w-6xl px-4 py-6 lg:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-200">
                <Flower2 className="h-4 w-4" />
                Healing Gallery Slideshow
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">A Captivating Look Into Sessions</h2>
              <p className="max-w-xl text-violet-100/80">
                This slideshow uses placeholders in a 720 × 400 format. Add your real photos to
                <span className="mx-1 rounded bg-violet-500/20 px-1 py-0.5 text-violet-100">/public/slideshow</span>
                as 01.jpg, 02.jpg, 03.jpg and so on to instantly update this section.
              </p>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-2xl border border-violet-400/30 p-3">
              <div className="slideshow-frame aspect-[9/5] w-full overflow-hidden rounded-xl border border-violet-300/20 bg-gradient-to-br from-violet-950/70 via-indigo-950/60 to-[#0a0818]">
                {slideshowFrames.map((slide, index) => (
                  <div
                    key={slide.src}
                    className="slideshow-slide"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(13,7,32,0.15), rgba(13,7,32,0.7)), url('${slide.src}')`,
                      animationDelay: `${index * 5}s`,
                    }}
                    aria-label={slide.alt}
                    role="img"
                  />
                ))}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#0d0720] to-transparent p-5">
                  <p className="text-sm text-violet-100/80">Suggested imagery: meditation circles, Reiki sessions, mindful healing spaces.</p>
                </div>
              </div>
            </div>
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
              <div key={day} className="glass-panel rounded-xl border border-violet-500/20 p-4 text-violet-100/90">
                {day}
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Wellness Services</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="glass-panel rounded-xl border border-violet-500/20 p-6">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="text-violet-100/80">{service.description}</p>
                <Link href={service.href} className="mt-4 inline-block text-sm text-violet-200 underline underline-offset-4 hover:text-violet-100">
                  More info
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="membership" className="mx-auto w-full max-w-6xl px-4 py-14">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Membership & Community</h2>
          <div className="glass-panel rounded-2xl border border-violet-500/25 p-8">
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
