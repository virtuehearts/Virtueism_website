import NextLink from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Shield,
  Sun,
  Compass,
  Anchor,
  Flame,
  Zap
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
    description: "Opening the heart to the suffering of others and acting to alleviate it.",
    icon: Heart
  },
  {
    title: "Courage",
    description: "The strength to face truth and walk your path even in the face of fear.",
    icon: Flame
  },
  {
    title: "Temperance",
    description: "Finding the middle path and maintaining balance in all things.",
    icon: Anchor
  },
  {
    title: "Wisdom",
    description: "Direct insight into the nature of energy and the interconnectedness of life.",
    icon: Compass
  },
  {
    title: "Justice",
    description: "Living in alignment with universal law and personal integrity.",
    icon: Shield
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
            The Path of Reiki & Virtue
          </h1>
          <p className="text-xl text-foreground/60 italic max-w-2xl mx-auto font-serif">
            &ldquo;The path of Reiki is paved with ancient techniques and modern devotion.
            It is a homecoming to your soul&apos;s original frequency.&rdquo;
          </p>
        </div>

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

        {/* 2. Core Virtues */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-10 text-center">The Core Virtues</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {virtues.map((v) => (
              <div key={v.title} className="glass-panel p-8 rounded-2xl border border-violet-500/20 hover:border-violet-500/40 transition-colors">
                <v.icon className="h-8 w-8 text-violet-300 mb-6" />
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{v.description}</p>
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
