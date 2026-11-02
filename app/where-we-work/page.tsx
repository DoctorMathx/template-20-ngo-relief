import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/mock/regions";
import { appeals } from "@/mock/appeals";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { TileMap } from "@/components/ui/tile-map";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Where we work",
  description: "Ubuntu Relief Network's field offices, active emergency operations and partner-led responses across Nigeria.",
};

export default function WhereWeWorkPage() {
  const totalReached = regions.reduce((s, r) => s + r.peopleReached, 0);
  const ops = regions.reduce((s, r) => s + r.activeOperations, 0);
  return (
    <>
      <PageHero
        kicker="Operations map"
        title="Where we work"
        lede="Three field offices in the states hit hardest by conflict, floods and disease — and a network of local partners everywhere else."
        meta={
          <dl className="grid grid-cols-3 max-w-xl border-t-2 border-white">
            {[
              ["People reached", formatNumber(totalReached)],
              ["Active operations", String(ops)],
              ["Field offices", String(siteConfig.org.fieldOffices.length)],
            ].map(([k, v], i) => (
              <div key={k} className={`pt-3 pr-3 ${i ? "pl-3 border-l border-white/30" : ""}`}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">{k}</dt>
                <dd className="font-display-normal text-3xl md:text-4xl font-bold num mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <Section pad="md">
        <SectionHeader kicker="Select a state" title="Nigeria operations grid" lede="Each square is a state. Tap or hover to see what's happening there." />
        <TileMap />
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="By region" title="Regional operations" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-2">
          {regions.map((r) => {
            const live = appeals.filter((a) => r.states.includes(a.state));
            return (
              <article key={r.id} className="bg-white border-[1.5px] border-ink">
                <div className="p-6 border-b-[1.5px] border-ink flex justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl font-bold">{r.name}</h3>
                    <div className="label-mono mt-1">{r.states.join(" · ")}</div>
                    {r.office && <div className="text-sm mt-2 font-medium">{r.office}</div>}
                  </div>
                  <div className="text-right">
                    <div className="font-display-normal text-3xl font-bold num">{formatNumber(r.peopleReached)}</div>
                    <div className="label-mono">people reached</div>
                  </div>
                </div>
                <div className="p-6 grid gap-4">
                  <div className="flex flex-wrap gap-2">
                    {r.focus.map((f) => (
                      <span key={f} className="badge badge-plain">
                        {f}
                      </span>
                    ))}
                  </div>
                  {live.length > 0 ? (
                    <ul className="divide-y divide-hair border-t border-hair">
                      {live.map((a) => (
                        <li key={a.slug} className="py-3 flex items-center justify-between gap-3">
                          <Link href={`/appeals/${a.slug}`} className="font-semibold hover:text-alarm-strong">
                            {a.title}
                          </Link>
                          <UrgencyBadge level={a.urgency} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted">No live appeals — preparedness and partner support only.</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="Offices" title="Find us" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border-[1.5px] border-ink">
          {[siteConfig.org.hq, ...siteConfig.org.fieldOffices].map((o) => (
            <div key={o.label} className="bg-white p-5">
              <div className="label-mono">{o.label}</div>
              <div className="font-display text-2xl font-bold mt-1">{o.city}</div>
              <p className="text-sm text-muted mt-1">{o.address}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
