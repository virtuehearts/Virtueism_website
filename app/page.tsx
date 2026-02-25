import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  CalendarCheck,
  CheckCircle2,
  Flower2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  Waves,
  Award,
} from "lucide-react";
import VideoSlideshow from "@/components/VideoSlideshow";
import CertificateLookup from "@/components/CertificateLookup";

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
    href: "/reiki-sessions",
  },
  {
    title: "Reiki Classes",
    description:
      "Train with Baba Virtuehearts through guided online Reiki class pathways.",
    href: "/reiki-classes",
  },
  {
    title: "Massage Therapy",
    description:
      "Relaxing bodywork sessions designed to support deep rest and emotional balance.",
    href: "/massage",
  },
  {
    title: "Healing Touch",
    description:
      "Healing Touch Services that heal your Aura and Energy flow, perfect for anxiety and stress.",
    href: "/healingtouch",
  },
];

const membershipPerks = [
  "Access to Mya spiritual AI chat guidance",
  "Member WhatsApp and Facebook groups for supporters",
  "Direct access to message Baba Virtuehearts",
  "Ongoing guidance after your 7-day foundation program",
];

export default function HomePage() {
  const clipsDir = path.join(process.cwd(), "public/clips");
  let videoClips: string[] = [];
  try {
    if (fs.existsSync(clipsDir)) {
      videoClips = fs.readdirSync(clipsDir)
        .filter(file => file.endsWith(".mp4"))
        .sort()
        .map(file => `/clips/${file}`);
    }
  } catch (error) {
    console.error("Error reading clips directory:", error);
  }

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
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-sm text-violet-200">
                <Flower2 className="h-4 w-4" />
                Healing Gallery Slideshow
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">A Captivating Look Into Sessions</h2>
              <div className="space-y-4 max-w-xl text-violet-100/80 leading-relaxed">
                <p>
                  This is a preview of the sessions, the healing energy and your aura, and mind, how it will expand and change, with the knowledge of Virtueism Reiki, once you receive your training you will be able to get a certificate and practice these sessions yourself.
                </p>
                <p>
                  Experience the deep tranquility and restorative power of energy work as you watch these highlights from our sanctuary. As you watch these moments of transition and peace, imagine the potential within your own energy field.
                </p>
                <p>
                  Our training provides the tools to not only heal yourself but to become a beacon of light for others. Through dedicated practice and the support of our community, your understanding of the subtle energies will deepen, leading to a more balanced and purposeful life. These clips offer just a glimpse of the profound impact that Virtueism Reiki can have on your spiritual journey.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="glass-panel relative overflow-hidden rounded-2xl border border-violet-400/30 p-3 w-full max-w-[424px]">
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-violet-300/20 bg-black">
                  <VideoSlideshow videos={videoClips} />
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.title} className="glass-panel rounded-xl border border-violet-500/20 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="text-violet-100/80 text-sm">{service.description}</p>
                </div>
                <Link href={service.href} className="mt-4 inline-block text-sm text-violet-200 underline underline-offset-4 hover:text-violet-100">
                  More info
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="verification" className="mx-auto w-full max-w-6xl px-4 py-14 border-t border-violet-500/10">
          <div className="glass-panel rounded-3xl border border-accent/30 p-8 md:p-16 text-center space-y-8 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <Award className="mx-auto text-accent" size={48} />
              <h2 className="text-3xl md:text-4xl font-bold">Verify a Practitioner</h2>
              <p className="max-w-2xl mx-auto text-violet-100/70">
                Official Virtueism Reiki certificates include the contact info of the practitioner
                who has completed the Master level with Baba Virtuehearts. Enter a certificate number below to verify their status.
              </p>
            </div>
            <CertificateLookup />
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
            <p className="font-medium text-violet-100">Virtueism.org / Virtueism Institute of Wellness</p>
            <p>Contact: admin@virtueism.org</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="flex items-center justify-end gap-2">
              <MapPin className="h-4 w-4" /> Toronto Canada (GTA Area organization)
            </p>
            <p className="flex items-center justify-end gap-2">
              <MessageCircle className="h-4 w-4" /> Remote sessions available (Worldwide)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
