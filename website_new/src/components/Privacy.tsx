import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <a href="#" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </a>

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 flex items-center justify-center">
            <Shield className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-serif gradient-text">Privacy Policy</h1>
            <p className="text-gray-500">Last updated: January 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Virtueism ("we," "our," or "us") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, and safeguard your information when you visit our
              website and use our services, including interactions with our AI spiritual guide, Mya.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Information We Collect</h2>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li><strong>Personal Information:</strong> Email address when you subscribe to our newsletter or join the community.</li>
              <li><strong>Usage Data:</strong> Anonymous analytics about how you interact with our website.</li>
              <li><strong>Conversation Data:</strong> Messages you share with Mya to provide personalized guidance.</li>
              <li><strong>Donation Information:</strong> Blockchain transaction records (publicly visible by nature of blockchain).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">How We Use Your Information</h2>
            <ul className="text-gray-300 space-y-3 list-disc list-inside">
              <li>To provide and improve our services and spiritual guidance</li>
              <li>To send community updates and teachings (with your consent)</li>
              <li>To enhance Mya's ability to provide meaningful support</li>
              <li>To maintain the security and integrity of our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Data Protection</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information.
              Conversations with Mya are treated with the utmost confidentiality and respect.
              We do not sell, trade, or share your personal information with third parties
              for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have questions about this Privacy Policy or our data practices, please
              contact us at{' '}
              <a href="mailto:admin@virtueism.org" className="text-purple-400 hover:underline">
                admin@virtueism.org
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
