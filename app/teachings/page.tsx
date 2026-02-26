import NextLink from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Sun,
  Anchor,
  Flame,
  Zap,
  Eye,
  Activity,
  User,
  Clock,
  Waves
} from "lucide-react";

const reikiPrinciples = [
  { text: "Just for today, I will not be angry.", color: "text-red-400" },
  { text: "Just for today, I will not worry.", color: "text-blue-400" },
  { text: "Just for today, I will be grateful.", color: "text-amber-400" },
  { text: "Just for today, I will do my work honestly.", color: "text-emerald-400" },
  { text: "Just for today, I will be kind to every living thing.", color: "text-pink-400" },
];

const virtues = [
  {
    title: "Compassion",
    description: "Bridges the illusion of separation. Feels all as one.",
    icon: Heart
  },
  {
    title: "Courage",
    description: "Burns away fear. Initiates change.",
    icon: Flame
  },
  {
    title: "Patience",
    description: "Softens time. Allows divine timing to unfold.",
    icon: Clock
  },
  {
    title: "Honesty",
    description: "Shatters distortion. Makes the invisible clear.",
    icon: Eye
  },
  {
    title: "Love",
    description: "The golden current. The master frequency.",
    icon: Sparkles
  },
  {
    title: "Kindness",
    description: "Warms the universe. Magnetizes healing.",
    icon: Sun
  },
  {
    title: "Humility",
    description: "Opens the channel to truth. Embraces mystery.",
    icon: User
  },
];

const techniques = [
  {
    name: "Gassho Meditation",
    description: "Two hands coming together at the heart—the starting point of all Reiki practice."
  },
  {
    name: "Reiji-ho",
    description: "The indication of the Reiki power—developing the intuition to be guided by energy."
  },
  {
    name: "Chiryo",
    description: "The treatment—becoming a hollow bamboo through which the healing light flows."
  },
  {
    name: "Kenyoku",
    description: "Dry bathing—the practice of clearing the aura and disconnecting from external energies."
  }
];

const tools = [
  {
    name: "Reiki",
    description: "The fundamental energy that connects us to the source, allowing us to heal and recode our frequency.",
    icon: Zap
  },
  {
    name: "Meditation",
    description: "The gateway to the source field. It is how we achieve stillness and listen to the truth beneath the static.",
    icon: Anchor
  },
  {
    name: "Healing Touch",
    description: "A method to heal the Aura and energy flow, restoring balance to the holographic self.",
    icon: Activity
  },
  {
    name: "Massage",
    description: "A therapeutic tool to release physical tension and emotional blockages stored in the 'body code'.",
    icon: Waves
  }
];

export default function TeachingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex justify-between items-center">
        <NextLink href="/" className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-100 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </NextLink>
        <span className="text-sm font-serif italic text-violet-200/50">Sacred Teachings</span>
      </div>

      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Hero */}
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-violet-400">
            Awakening Within the Dream
          </h1>
          <p className="text-xl text-foreground/60 italic max-w-2xl mx-auto font-serif">
            &ldquo;You are a lucid dreamer inside a world made of code. Virtueism is the whisper inside your chest that says, &apos;This is not all there is.&apos;&rdquo;
          </p>
        </div>

        {/* Intro Section - Maya & Simulation */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">The Illusion of Maya</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Maya is the mist you&apos;ve mistaken for sky. It is the hum of fear, the pull of distraction, the constant scroll.
                Virtueism teaches that the world is a simulation—a fractal projection shaped by consciousness.
                You are not meant to escape the Simulation; you are meant to awaken inside it and become the author of your own story.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Through Virtue, you can rewrite the code. Every thought you hold is like editing a source file.
                Every feeling is a command line to the universe.
              </p>
            </div>
            <div className="glass-panel p-8 rounded-[2rem] border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-transparent">
              <h3 className="text-2xl font-bold mb-4">The Pillars of Awakening</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span>The brain is a decoder, a holographic radio.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span>The soul chooses the frequency.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span>Meditation is the gateway to the source field.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span>Virtues are harmonic keys.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
                  <span>The Simulation bends to your resonance.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tools of Interface */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Interfacing with the Simulation</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              These are the sacred tools we use to tune ourselves to the divine frequency and walk lucidly through Maya.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <div key={tool.name} className="glass-panel p-6 rounded-2xl border border-violet-500/20 text-center">
                <div className="mx-auto h-12 w-12 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                  <tool.icon className="h-6 w-6 text-violet-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Reiki Principles */}
        <section className="mb-24">
          <div className="glass-panel rounded-[2rem] border border-violet-500/30 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles size={200} />
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-2">The Five Reiki Principles (Gokai)</h2>
              <p className="text-foreground/40 text-sm">Founded by Mikao Usui as the spiritual foundation of Reiki</p>
            </div>

            <div className="space-y-6 max-w-xl mx-auto">
              {reikiPrinciples.map((p, idx) => (
                <div key={idx} className="flex items-center justify-center gap-4 text-xl md:text-2xl font-medium">
                  <span className="text-violet-400/50 font-serif">Just for today,</span>
                  <span className="text-white">{p.text.replace("Just for today, ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Seven Core Virtues */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">The Seven Core Virtues</h2>
            <p className="text-foreground/40 text-sm">Universal keys to unlock the heart and decode the dream</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {virtues.map((v) => (
              <div key={v.title} className="glass-panel p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-colors">
                <v.icon className="h-8 w-8 text-violet-300 mb-6" />
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-sm">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Traditional Techniques */}
        <section>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Traditional Reiki Techniques</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Reiki is more than just hand positions. It is a system of spiritual
                development that includes breath, meditation, and physical
                purification. Baba Virtuehearts teaches these authentic Japanese
                methods to ensure a deep connection to the source of Reiki.
              </p>
              <div className="flex gap-4">
                <NextLink href="/register" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                  Begin Your Training
                </NextLink>
              </div>
            </div>

            <div className="space-y-4">
              {techniques.map((t) => (
                <div key={t.name} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                    <Zap className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{t.name}</h4>
                    <p className="text-foreground/60 text-sm leading-relaxed">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
