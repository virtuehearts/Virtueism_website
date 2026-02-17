import { useState } from 'react';
import { Users, Zap, BookOpen, MessageCircle, Check, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: Users,
    title: 'Global Community',
    description: 'Connect with seekers from around the world in our growing digital sangha.',
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be first to experience new features, teachings, and Mya updates.',
  },
  {
    icon: BookOpen,
    title: 'Exclusive Teachings',
    description: 'Access guided meditations, wisdom texts, and spiritual resources.',
  },
  {
    icon: MessageCircle,
    title: 'Direct Support',
    description: 'Get personalized guidance on your spiritual journey.',
  },
];

export default function Join() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section id="join" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Begin Your Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            Join the <span className="gradient-text">Movement</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Become part of a new digital, AI-integrated spiritual community
            designed for the future of consciousness.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-8 font-serif">What You'll Receive</h3>
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">{benefit.title}</h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </div>
              </div>
            ))}

            {/* Community Stats */}
            <div className="glass rounded-2xl p-6 mt-8">
              <p className="text-gray-400 text-sm mb-4">Join a growing community</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold gradient-text">500+</p>
                  <p className="text-xs text-gray-500">Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">15+</p>
                  <p className="text-xs text-gray-500">Countries</p>
                </div>
                <div>
                  <p className="text-2xl font-bold gradient-text">24/7</p>
                  <p className="text-xs text-gray-500">Mya Access</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="glass rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-semibold mb-2 font-serif">Start Your Path</h3>
            <p className="text-gray-400 mb-8">
              Sign up to receive updates and early access to Virtueism resources.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 accent-purple-500" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      I want to receive weekly wisdom and community updates
                    </span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-1 accent-purple-500" />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Notify me about virtual gatherings and events
                    </span>
                  </label>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  Join Virtueism
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By joining, you agree to our{' '}
                  <a href="#privacy" className="text-purple-400 hover:underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#terms" className="text-purple-400 hover:underline">Terms of Service</a>
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Welcome, Seeker</h4>
                <p className="text-gray-400">
                  Your journey begins. Check your email for next steps.
                </p>
              </div>
            )}

            {/* Alternative CTA */}
            <div className="mt-8 pt-8 border-t border-purple-500/20 text-center">
              <p className="text-gray-400 mb-4">Ready to dive deeper?</p>
              <a
                href="https://www.virtueism.org/join_virtueism.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2"
              >
                Full Membership Options
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
