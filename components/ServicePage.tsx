import Link from "next/link";
import { notFound } from "next/navigation";
import { getWellnessServiceBySlug, WellnessService } from "@/lib/wellness";

interface ServicePageProps {
  slug: WellnessService["slug"];
}

export default function ServicePage({ slug }: ServicePageProps) {
  const service = getWellnessServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0d0720] text-white px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/" className="text-sm text-violet-300 hover:text-violet-100 flex items-center gap-2">
          ← Back to Home
        </Link>

        <header className="space-y-3">
          <h1 className="text-4xl font-bold text-violet-100">{service.title}</h1>
          <p className="text-lg text-violet-200/80">{service.summary}</p>
        </header>

        <section className="glass-panel rounded-2xl border border-violet-500/30 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-violet-100">Overview</h2>
          <div className="space-y-3 text-violet-200/70">
            {service.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-violet-500/30 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-violet-100">Pricing</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-violet-500/20">
                <th className="py-2 text-violet-100">Option</th>
                <th className="py-2 text-violet-100">Price</th>
              </tr>
            </thead>
            <tbody>
              {service.pricing.map((row) => (
                <tr key={row.label} className="border-b border-violet-500/10">
                  <td className="py-2 text-violet-200/80">{row.label}</td>
                  <td className="py-2 text-violet-200/80">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="glass-panel rounded-2xl border border-violet-500/30 p-6">
          <h2 className="text-2xl font-semibold mb-3 text-violet-100">Booking & Information</h2>
          <p className="text-violet-200/80 mb-4">
            For booking information and scheduling, please contact us directly:
          </p>
          <div className="rounded-xl bg-violet-500/10 border border-violet-500/20 p-4">
            <p className="text-lg font-medium text-violet-100">
              Email: <a href={`mailto:admin@virtuehearts.org?subject=Re: Interested in your ${service.title} sessions, send me info.`} className="underline hover:text-violet-300">admin@virtuehearts.org</a>
            </p>
            <p className="text-violet-200/70 mt-1">Our team will get back to you within 24 hours to coordinate your session.</p>
          </div>
        </section>

        {service.ctaLabel && service.ctaHref && (
          <Link href={service.ctaHref} className="inline-block rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition-opacity">
            {service.ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
