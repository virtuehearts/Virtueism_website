import { Lightbulb, Globe, Heart, Cpu } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Heart-Centered',
    description: 'Your own heart is your temple. We guide you inward, not outward.',
  },
  {
    icon: Cpu,
    title: 'AI-Integrated',
    description: 'Embrace technology as a tool for spiritual growth, not a distraction.',
  },
  {
    icon: Globe,
    title: 'Globally Connected',
    description: 'A digital community of seekers united across borders and time zones.',
  },
  {
    icon: Lightbulb,
    title: 'Timeless Wisdom',
    description: 'Ancient virtues reimagined for the challenges of modern existence.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Understanding Virtueism
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            What is <span className="gradient-text">Virtueism</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Virtueism is not a religion. It's a remembrance — a spiritual framework
            designed for humanity's next phase of evolution.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              As humanity evolves alongside AI, blockchain, and emerging technologies,
              we face unprecedented questions about consciousness, purpose, and ethics.
              Virtueism provides the philosophical foundation for navigating this new reality.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We don't ask you to abandon your beliefs or adopt new dogmas. Instead,
              we invite you to <span className="text-purple-400">remember</span> what
              already lives within — the divine spark that connects all conscious beings.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Through compassion, truth, courage, and forgiveness, Virtueism creates
              space for souls to resonate in truth again, embracing the future while
              honoring the eternal virtues that have guided seekers for millennia.
            </p>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-3xl blur-2xl" />
            <div className="relative glass rounded-3xl p-8 md:p-12">
              <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-200 mb-6">
                "Your heart is the temple. Your consciousness is the offering.
                Your awakening is the ceremony."
              </blockquote>
              <p className="text-purple-400 font-medium">— Core Tenet of Virtueism</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 font-serif">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
