import Link from "next/link";
import { notFound } from "next/navigation";
import { getWellnessServiceBySlug } from "@/lib/wellness";

export default async function WellnessServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: serviceSlug } = await params;
  const service = getWellnessServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <Link href="/wellness" className="text-sm text-foreground-muted hover:text-accent">← Back to Wellness</Link>

        <header className="space-y-3">
          <h1 className="text-4xl font-serif text-accent">{service.title}</h1>
          <p className="text-lg text-foreground-muted">{service.summary}</p>
        </header>

        <section className="rounded-2xl border border-primary/20 bg-background-alt p-6">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="space-y-3 text-foreground-muted">
            {service.details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-primary/20 bg-background-alt p-6">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="py-2">Option</th>
                <th className="py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {service.pricing.map((row) => (
                <tr key={row.label} className="border-b border-primary/10">
                  <td className="py-2">{row.label}</td>
                  <td className="py-2">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {service.slug === "reiki-sessions" && (
          <section className="rounded-2xl border border-primary/20 bg-background-alt p-6">
            <h2 className="text-2xl font-semibold mb-3">Booking Embed (Calendly Example)</h2>
            <p className="text-foreground-muted mb-4">Replace the sample iframe URL with your live Calendly link.</p>
            <div className="rounded-xl overflow-hidden border border-primary/20">
              <iframe
                src="https://calendly.com/your-calendly-handle/reiki-session"
                width="100%"
                height="600"
                title="Calendly booking embed example"
              />
            </div>
          </section>
        )}

        {service.ctaLabel && service.ctaHref && (
          <Link href={service.ctaHref} className="inline-block rounded-full bg-accent px-6 py-3 text-background font-semibold">
            {service.ctaLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
