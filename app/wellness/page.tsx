import Link from "next/link";
import { wellnessServices } from "@/lib/wellness";

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-serif text-accent mb-4">Wellness Services</h1>
        <p className="text-foreground-muted mb-10 max-w-3xl">
          Explore Reiki sessions, Reiki classes, and massage offerings. Choose the path that best supports your healing and growth.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {wellnessServices.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-primary/20 bg-background-alt p-6">
              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
              <p className="text-foreground-muted mb-4">{service.summary}</p>
              <Link href={`/wellness/${service.slug}`} className="text-accent underline underline-offset-4">
                View details
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
