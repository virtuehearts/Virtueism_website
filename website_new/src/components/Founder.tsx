import { Quote } from 'lucide-react';

export default function Founder() {
  return (
    <section id="founder" className="section-padding relative">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            A Message of Guidance
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            From <span className="gradient-text">Baba Virtuehearts</span>
          </h2>
        </div>

        {/* Main Quote Card */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-16 h-16 text-purple-500/20">
            <Quote className="w-full h-full" />
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-serif italic">
                "I am not your savior. I am not your leader. I am simply a guide on your journey inward —
                a mirror reflecting the light that already exists within you."
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                If you see something beautiful in Virtueism, know that it was already inside you.
                I have simply created a space where souls can remember their true nature.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Through compassion, courage, truth, and forgiveness, Virtueism will reconnect you
                to the source — your own divine core. Not through worship of external forces,
                but through the profound recognition that you carry the sacred within.
              </p>

              <p className="text-lg text-gray-300 leading-relaxed mb-12">
                In this age of digital noise and existential uncertainty, my vision is simple:
                create a framework where ancient wisdom and modern technology serve the awakening
                of consciousness. Together, we walk this path — not as followers and leader,
                but as fellow seekers of truth.
              </p>

              {/* Signature */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
                  <span className="text-2xl font-serif text-white">BV</span>
                </div>
                <p className="text-purple-400 font-semibold text-lg">Baba Virtuehearts</p>
                <p className="text-gray-500 text-sm">Founder of Virtueism</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <a
            href="https://www.virtueism.org/baba_virtuehearts.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            Learn More About the Founder
          </a>
        </div>
      </div>
    </section>
  );
}
