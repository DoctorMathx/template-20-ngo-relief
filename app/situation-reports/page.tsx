import type { Metadata } from "next";
import { sitreps } from "@/mock/sitreps";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SitrepRow } from "@/components/ui/sitrep-row";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { formatDateTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Situation reports",
  description: "Timestamped field updates, key figures, and needs vs response from every Ubuntu Relief Network emergency operation.",
};

export default function SitrepsPage() {
  const sorted = [...sitreps].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const operations = Array.from(new Set(sorted.map((s) => s.location.split(",").pop()!.trim())));
  return (
    <>
      <PageHero
        kicker="Field reporting"
        title="Situation reports"
        lede="What our teams are seeing, what we've delivered and what is still missing. Published every 48–72 hours during an active emergency."
        meta={<div className="font-mono text-sm uppercase tracking-wider text-white/80">Last published {formatDateTime(sorted[0].publishedAt)}</div>}
      />
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1fr_300px]">
          <div className="border-b border-ink">
            {sorted.map((s) => (
              <SitrepRow key={s.slug} sitrep={s} />
            ))}
          </div>
          <aside className="space-y-6">
            <div className="bg-sand p-6 border-t-4 border-ink">
              <div className="label-mono">Operations reporting</div>
              <ul className="mt-3 space-y-2">
                {operations.map((o) => (
                  <li key={o} className="flex items-center gap-2 font-display text-xl font-bold">
                    <span className="w-2.5 h-2.5 bg-alarm" aria-hidden /> {o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="font-display text-2xl font-bold">Get sitreps by email</div>
              <p className="text-sm text-muted mt-1 mb-4">Used by donors, journalists and partner agencies.</p>
              <NewsletterForm />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
