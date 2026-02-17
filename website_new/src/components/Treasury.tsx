import { useState } from 'react';
import { Copy, Check, Bitcoin, Wallet, Shield, ExternalLink } from 'lucide-react';

const wallets = [
  {
    name: 'Bitcoin',
    icon: Bitcoin,
    address: 'bc1qzs4wc5thvzj607njf7h69gxkmwfuwswj3ujq6m',
    color: 'from-orange-500 to-amber-600',
  },
  {
    name: 'Ethereum',
    icon: Wallet,
    address: '0xd9276df65a2f3e949447A8300606d5A9682bAb0C',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Solana',
    icon: Wallet,
    address: '2ELvbDGQ6oh2WhrQPQA6e6ahDt2fAUmvsvmzraWbDunh',
    color: 'from-purple-500 to-pink-600',
  },
];

const usageBreakdown = [
  { label: 'AI Development (Mya)', percentage: 35 },
  { label: 'Community Platform', percentage: 25 },
  { label: 'Content & Teachings', percentage: 20 },
  { label: 'Operations', percentage: 15 },
  { label: 'Reserve Fund', percentage: 5 },
];

export default function Treasury() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  return (
    <section id="treasury" className="section-padding relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase mb-4 block">
            Support the Mission
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif">
            Digital <span className="gradient-text">Treasury</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Support the mission of peace, healing, and inner awakening.
            Your contributions help expand our tools and reach seekers worldwide.
          </p>
        </div>

        {/* Transparency Notice */}
        <div className="glass rounded-2xl p-6 mb-12 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Transparent & Public</h3>
            <p className="text-gray-400 text-sm">
              All donations are received through public blockchain addresses, ensuring complete transparency.
              You can verify all transactions on the respective blockchain explorers.
            </p>
          </div>
        </div>

        {/* Wallet Addresses */}
        <div className="space-y-4 mb-12">
          {wallets.map((wallet) => (
            <div key={wallet.name} className="glass rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center flex-shrink-0`}>
                  <wallet.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold mb-1">{wallet.name}</p>
                  <p className="text-gray-400 text-sm font-mono break-all">{wallet.address}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(wallet.address)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors flex-shrink-0"
                >
                  {copiedAddress === wallet.address ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fund Usage Breakdown */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-6 font-serif">How Funds Are Used</h3>
          <div className="space-y-4">
            {usageBreakdown.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-purple-400 font-semibold">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <p className="text-gray-400 text-sm">
              Virtueism is committed to using all contributions responsibly to further the mission
              of digital spirituality and inner awakening. Quarterly reports will be published
              as the community grows.
            </p>
          </div>
        </div>

        {/* Alternative Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Prefer other ways to support?
          </p>
          <a
            href="mailto:admin@virtueism.org"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            Contact us for partnership opportunities
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
