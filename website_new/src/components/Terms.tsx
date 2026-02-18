import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
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
            <FileText className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold font-serif gradient-text">Terms of Service</h1>
            <p className="text-gray-500">Last updated: January 2025</p>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing and using Virtueism's website and services, you agree to be bound by
              these Terms of Service. If you do not agree with any part of these terms, please
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Nature of Services</h2>
            <p className="text-gray-300 leading-relaxed">
              Virtueism provides spiritual guidance, community resources, and AI-powered support
              through Mya. Our services are intended for personal spiritual growth and should not
              be considered a substitute for professional mental health services, medical advice,
              or religious counseling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">User Conduct</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              When using our services, you agree to:
            </p>
            <ul className="text-gray-300 space-y-2 list-disc list-inside">
              <li>Treat all community members with respect and compassion</li>
              <li>Not use our services for any unlawful purpose</li>
              <li>Not harass, abuse, or harm others through our platform</li>
              <li>Not attempt to disrupt or compromise our systems</li>
              <li>Respect the intellectual property of Virtueism and its content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Mya AI Guide</h2>
            <p className="text-gray-300 leading-relaxed">
              Mya is an AI-powered spiritual guide designed to provide support and wisdom.
              While we strive to make Mya helpful and compassionate, responses are generated
              by artificial intelligence and should not be considered professional advice.
              For serious mental health concerns, please seek qualified professional help.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Donations</h2>
            <p className="text-gray-300 leading-relaxed">
              Donations to Virtueism through our digital treasury are voluntary and
              non-refundable. Cryptocurrency transactions are final once confirmed on
              the blockchain. We are committed to using all donations responsibly to
              further our mission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content on this website, including text, images, logos, and the Mya AI system,
              is the property of Virtueism and protected by intellectual property laws.
              You may not reproduce, distribute, or create derivative works without our
              express permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Disclaimer</h2>
            <p className="text-gray-300 leading-relaxed">
              Virtueism provides its services "as is" without warranties of any kind.
              We are not responsible for any decisions you make based on the guidance
              received through our platform. Use of our services is at your own discretion
              and risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of
              our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 font-serif">Contact</h2>
            <p className="text-gray-300 leading-relaxed">
              For questions about these Terms of Service, please contact us at{' '}
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
