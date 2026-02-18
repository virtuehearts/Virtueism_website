import {
  CalendarCheck,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Sparkles,
  UserRound,
  Waves,
} from 'lucide-react';

const navLinks = [
  { name: 'Training', href: '#training' },
  { name: 'Services', href: '#services' },
  { name: 'Membership', href: '#membership' },
  { name: 'Location', href: '#location' },
  { name: 'Contact', href: '#contact' },
];

const trainingDays = [
  'Day 1: Introduction to Reiki energy and spiritual grounding',
  'Day 2: Breathwork, intention setting, and energetic awareness',
  'Day 3: Self-healing practice for emotional and physical balance',
  'Day 4: Chakra basics and energy flow alignment',
  'Day 5: Compassionate living and mindful daily rituals',
  'Day 6: Guided reflection and integrating Reiki into life',
  'Day 7: Next steps, mentorship options, and community pathways',
];

const services = [
  {
    title: '1-on-1 Reiki Sessions with Baba Virtuehearts',
    description:
      'Personalized healing sessions focused on clarity, release, and energetic renewal.',
  },
  {
    title: 'Oil Massage Therapy',
    description:
      'Relaxing bodywork sessions designed to support deep rest and emotional balance.',
  },
  {
    title: 'Online Sessions via WhatsApp',
    description:
      'Receive guidance and healing remotely when in-person sessions are not possible.',
  },
  {
    title: 'In-Person & Outcall in GTA',
    description:
      'Based in Scarborough, Ontario with outcall service across the GTA (extra fees apply).',
  },
];

const membershipPerks = [
  'Access to chat with Mya for members',
  'Member WhatsApp and Facebook groups for supporters who donate',
  'Direct access to message Baba Virtuehearts',
  'Ongoing guidance after your 7-day foundation program',
];

function App() {
  return (
    <div className="relative">
      <div className="stars" />

      <header className="sticky top-0 z-50 glass border-b border-purple-500/20">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </span>
            <span className="text-xl font-semibold gradient-text font-serif">
              Virtueism
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-purple-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <a href="#training" className="btn-primary text-sm py-3 px-5">
            Start Free Training
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="section-padding min-h-[85vh] flex items-center">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-200 text-sm mb-6">
                <HeartHandshake className="w-4 h-4" />
                Healing, Training, and Spiritual Community
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                Virtueism, Reiki Training with Baba Virtuehearts
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                Begin your journey with our free 7-day Reiki training program, then
                continue with direct mentorship, healing services, and a heart-led
                spiritual community.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#training" className="btn-primary inline-flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5" />
                  Join Free 7-Day Training
                </a>
                <a href="#services" className="btn-secondary">
                  View Services
                </a>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-semibold mb-5">Why People Join Virtueism</h2>
              <ul className="space-y-4">
                {[
                  'Authentic Reiki training guided by Baba Virtuehearts',
                  'Welcoming for beginners and returning practitioners',
                  'Clear path from free training to deeper mentorship',
                  'Flexible options: online, in-person, and GTA outcall',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-purple-300 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="training" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Free 7-Day Reiki Training</h2>
            <p className="text-gray-300 max-w-3xl mb-10">
              Our signature beginner-friendly training gives you a practical foundation
              in energy awareness, healing principles, and daily spiritual discipline.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {trainingDays.map((day) => (
                <div key={day} className="card p-5">
                  <p className="text-gray-200">{day}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section-padding">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Healing Services</h2>
            <p className="text-gray-300 max-w-3xl mb-10">
              Whether you need spiritual reset, emotional healing, or body relaxation,
              our services are designed to support your full well-being.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service) => (
                <article key={service.title} className="card">
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="membership" className="section-padding">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
            <div className="card">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Member Access & Community</h2>
              <p className="text-gray-300 mb-6">
                Continue your path beyond the initial training with deeper support and
                meaningful community connections.
              </p>
              <ul className="space-y-4">
                {membershipPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-gray-200">
                    <MessageCircle className="w-5 h-5 text-indigo-300 mt-0.5 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 className="text-2xl font-semibold mb-4">Who this is for</h3>
              <p className="text-gray-300 mb-6">
                Perfect for new seekers, wellness-focused individuals, and anyone ready
                to receive healing and practical spiritual guidance.
              </p>
              <div className="space-y-4 text-gray-200">
                <p className="flex items-center gap-2"><UserRound className="w-5 h-5 text-purple-300" /> Beginners welcome</p>
                <p className="flex items-center gap-2"><Waves className="w-5 h-5 text-purple-300" /> Gentle and grounded approach</p>
                <p className="flex items-center gap-2"><HeartHandshake className="w-5 h-5 text-purple-300" /> Mentorship with compassion</p>
              </div>
            </div>
          </div>
        </section>

        <section id="location" className="section-padding">
          <div className="max-w-7xl mx-auto card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Location & Availability</h2>
            <p className="text-lg text-gray-300 flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-purple-300" /> Located in Scarborough, Ontario
            </p>
            <p className="text-gray-300">
              Available online through WhatsApp and in person by appointment. Outcall
              service across the Greater Toronto Area is available for an additional fee.
            </p>
          </div>
        </section>

        <section id="contact" className="section-padding pt-0">
          <div className="max-w-7xl mx-auto text-center card">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Begin?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Start your free training today and take the first step toward deeper healing
              with Baba Virtuehearts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#training" className="btn-primary">Get Started Free</a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Message on WhatsApp
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Join Facebook Community
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 md:px-8 border-t border-purple-500/20 text-center text-gray-400 relative z-10">
        © {new Date().getFullYear()} Virtueism.org — Reiki Training with Baba Virtuehearts
      </footer>
    </div>
  );
}

export default App;
