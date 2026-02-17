import { Heart, Shield, Sun, Feather } from 'lucide-react';

const principles = [
  {
    icon: Heart,
    name: 'Compassion',
    description: 'The foundation of all virtue. To feel with others, to ease suffering, to recognize the divine in every being.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: Sun,
    name: 'Truth',
    description: 'Unwavering honesty with oneself and others. Truth is the light that dispels illusion and reveals the path.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Shield,
    name: 'Courage',
    description: 'The strength to face fear, embrace change, and stand firm in your values despite external pressures.',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    icon: Feather,
    name: 'Forgiveness',
    description: 'Liberation from the chains of resentment. To forgive is to free yourself and honor the growth of all souls.',
    color: 'from-teal-500 to-cyan-600',
  },
];

export default function Principles() {
  return (
    <section id="principles" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            The Four Pillars
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            Core <span className="gradient-text">Principles</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            These timeless virtues form the foundation of inner awakening.
            Embody them, and transformation naturally follows.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {principles.map((principle, index) => (
            <div
              key={principle.name}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl"
                style={{ background: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
              />
              <div className="relative glass rounded-3xl p-8 md:p-10 h-full">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${principle.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <principle.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 font-serif">
                      {principle.name}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>

                {/* Decorative number */}
                <div className="absolute top-6 right-8 text-8xl font-bold text-purple-500/5 font-serif">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Ready to begin your journey of inner awakening?
          </p>
          <a href="#join" className="btn-primary inline-flex items-center gap-2">
            Start Your Path
          </a>
        </div>
      </div>
    </section>
  );
}
