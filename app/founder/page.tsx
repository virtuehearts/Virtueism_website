import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, Instagram, Facebook, Award, BookOpen, Heart, Sparkles } from "lucide-react";

export default function FounderPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-violet-300 hover:text-violet-100 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-20">
        {/* Hero Section */}
        <section className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-12 border border-violet-500/20 shadow-2xl">
          <Image
            src="/founder.jpg"
            alt="Baba Virtuehearts"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Baba Virtuehearts</h1>
            <p className="text-xl md:text-2xl text-violet-200 font-medium">(Warren Kreklo)</p>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Left Column: Info & Links */}
          <div className="space-y-8">
            <div className="glass-panel p-6 rounded-2xl border border-violet-500/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-violet-300" />
                Contact
              </h2>
              <a href="mailto:admin@virtueism.org" className="text-violet-200 hover:text-white underline break-all">
                admin@virtueism.org
              </a>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-violet-500/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Instagram className="h-5 w-5 text-violet-300" />
                Social Media
              </h2>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/virtuehearts/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-200 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/warren.kreklo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-violet-200 hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                  Facebook
                </a>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-violet-500/20">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-violet-300" />
                Qualifications
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-violet-300 shrink-0" />
                  <span>Reiki Master (Learned in Japan for 6 months)</span>
                </li>
                <li className="flex gap-3">
                  <Heart className="h-5 w-5 text-violet-300 shrink-0" />
                  <span>Ayurvedic Massage (Learned in India for 3 months)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="md:col-span-2 space-y-8">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-violet-100">Founder of Virtueism</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Baba Virtuehearts (Warren Kreklo) is a dedicated spiritual teacher and Reiki Master
                whose journey has been defined by a deep commitment to global wellness and the
                awakening of the human heart. After years of intensive study in the birthplaces of
                ancient healing traditions, he founded Virtueism—a path that bridges traditional
                wisdom with modern spiritual needs.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                His teachings emphasize the integration of Reiki energy, mindful presence, and
                the cultivation of core virtues. By focusing on healing the aura and balancing
                energy flow, he helps students move beyond anxiety and stress into a state of
                profound inner peace and purpose.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Through the Virtueism Institute of Wellness, Baba Virtuehearts provides a
                sanctuary for those seeking authentic transformation, whether through
                one-on-one sessions, comprehensive Reiki training, or the supportive
                community he has built worldwide.
              </p>
            </section>

            <div className="pt-8 border-t border-violet-500/10">
              <Link
                href="/teachings"
                className="group inline-flex items-center gap-4 p-6 glass-panel rounded-2xl border border-violet-500/30 hover:bg-violet-500/10 transition-all w-full"
              >
                <div className="bg-gradient-to-br from-violet-600 to-indigo-500 p-3 rounded-xl group-hover:scale-110 transition-transform">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-violet-100">Baba Virtuehearts Teachings</h3>
                  <p className="text-foreground/60 text-sm">Explore the Path of Reiki & Virtue</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
