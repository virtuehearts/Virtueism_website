import { ArrowDown, Sparkles, Heart, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float" style={{ animationDelay: '0s' }}>
          <Sparkles className="w-8 h-8 text-purple-400/40" />
        </div>
        <div className="absolute top-40 right-[15%] animate-float" style={{ animationDelay: '1s' }}>
          <Heart className="w-6 h-6 text-pink-400/40" />
        </div>
        <div className="absolute bottom-40 left-[20%] animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="w-7 h-7 text-indigo-400/40" />
        </div>
        <div className="absolute bottom-32 right-[25%] animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-5 h-5 text-purple-400/40" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            A New Paradigm for the Digital Age
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in-up font-serif" style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text glow-text">VIRTUEISM</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in-up font-serif italic" style={{ animationDelay: '0.4s' }}>
          Where Ancient Wisdom Meets Digital Consciousness
        </p>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          A spiritual framework for souls seeking truth in the age of AI.
          Reconnect with your divine core through compassion, courage, and inner awakening.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {['Inner Peace', 'Digital Wisdom', 'Community', 'AI Guidance'].map((benefit) => (
            <span key={benefit} className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/20 text-sm text-gray-300">
              {benefit}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <a href="#mya" className="btn-primary inline-flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Meet Mya, Your AI Guide
          </a>
          <a href="#about" className="btn-secondary inline-flex items-center justify-center gap-2">
            Explore Virtueism
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-purple-400/60 hover:text-purple-400 transition-colors">
            <ArrowDown className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
