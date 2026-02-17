import { Check, Circle, Clock, Rocket, Users, Globe, BookOpen, Sparkles } from 'lucide-react';

const phases = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'completed',
    icon: Check,
    items: [
      'Launch Virtueism website',
      'Introduce Mya AI Guide (Beta)',
      'Establish core principles',
      'Create founder message',
      'Set up digital treasury',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Community Building',
    status: 'in-progress',
    icon: Clock,
    items: [
      'Launch community platform',
      'Weekly virtual gatherings',
      'Mya AI improvements',
      'Meditation resources library',
      'Newsletter and teachings',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'Expansion',
    status: 'upcoming',
    icon: Circle,
    items: [
      'Mobile app development',
      'Multi-language support',
      'Partnership with wellness platforms',
      'Advanced Mya capabilities',
      'Virtual retreat experiences',
    ],
  },
  {
    phase: 'Phase 4',
    title: 'Global Presence',
    status: 'upcoming',
    icon: Circle,
    items: [
      'Regional community chapters',
      'Certification programs',
      'Collaboration with researchers',
      'Documentary and media',
      'Sustainable growth model',
    ],
  },
];

const stats = [
  { icon: Users, value: '500+', label: 'Members' },
  { icon: Globe, value: '15+', label: 'Countries' },
  { icon: BookOpen, value: '20+', label: 'Teachings' },
  { icon: Sparkles, value: '10K+', label: 'Mya Conversations' },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="section-padding relative">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Our Vision
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            The <span className="gradient-text">Roadmap</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Virtueism is evolving. Here's our journey toward creating a global
            movement of conscious digital spirituality.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center">
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-3xl font-bold gradient-text mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-indigo-500/50 to-purple-500/50 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {phases.map((phase, index) => (
              <div
                key={phase.phase}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    phase.status === 'completed'
                      ? 'bg-green-500'
                      : phase.status === 'in-progress'
                      ? 'bg-purple-500 animate-pulse'
                      : 'bg-gray-700'
                  }`}>
                    <phase.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className={`md:w-1/2 pl-16 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <div className={`glass rounded-2xl p-6 md:p-8 ${
                    phase.status === 'in-progress' ? 'border-purple-500/50' : ''
                  }`}>
                    <div className={`flex items-center gap-3 mb-4 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        phase.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : phase.status === 'in-progress'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-gray-700/50 text-gray-400'
                      }`}>
                        {phase.status === 'completed' ? 'Completed' :
                         phase.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-purple-400 text-sm mb-2">{phase.phase}</p>
                    <h3 className="text-2xl font-bold mb-4 font-serif">{phase.title}</h3>
                    <ul className={`space-y-2 ${
                      index % 2 === 0 ? 'md:text-right' : ''
                    }`}>
                      {phase.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-gray-400">
                          {index % 2 !== 0 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                          )}
                          <span>{item}</span>
                          {index % 2 === 0 && (
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 md:order-first" />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <Rocket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 font-serif">Help Shape the Future</h3>
            <p className="text-gray-400 mb-6">
              Virtueism grows through the support of seekers like you.
              Join us in building a spiritual framework for the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#join" className="btn-primary">Join the Movement</a>
              <a href="#treasury" className="btn-secondary">Support the Mission</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
