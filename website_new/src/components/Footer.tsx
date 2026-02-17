import { Sparkles, Instagram, Mail, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { name: 'About Virtueism', href: '#about' },
      { name: 'Core Principles', href: '#principles' },
      { name: 'Meet Mya', href: '#mya' },
      { name: 'Founder', href: '#founder' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Join Us', href: '#join' },
      { name: 'Roadmap', href: '#roadmap' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Support', href: '#treasury' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Contact', href: 'mailto:admin@virtueism.org' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-4 md:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold gradient-text font-serif">Virtueism</span>
            </a>
            <p className="text-gray-400 mb-6 max-w-sm">
              A spiritual framework for the digital age. Where ancient wisdom meets
              digital consciousness, guiding souls toward inner awakening.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/virtuehearts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <Instagram className="w-5 h-5 text-purple-400" />
              </a>
              <a
                href="mailto:admin@virtueism.org"
                className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
              >
                <Mail className="w-5 h-5 text-purple-400" />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Virtueism.org — All Rights Reserved
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-pink-500" /> in Ontario, Canada
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
