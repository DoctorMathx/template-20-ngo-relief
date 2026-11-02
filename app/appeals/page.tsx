import type { Metadata } from "next";
import { appeals } from "@/mock/appeals";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { AppealsBrowser } from "./appeals-browser";
import { formatNaira, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Emergency appeals",
  description: "Every live emergency and campaign Ubuntu Relief Network is responding to — with funding gaps, people affected and the latest field updates.",
};

export default function AppealsPage() {
  const gap = appeals.reduce((s, a) => s + (a.goal - a.raised), 0);
  const affected = appeals.filter((a) => a.kind === "emergency").reduce((s, a) => s + a.peopleAffected, 0);
  return (
    <>
      <PageHero
        kicker="Crisis desk"
        title="Emergency appeals"
        lede="Every live emergency we're responding to, with real-time funding gaps. Restricted gifts go only to the appeal you choose."
        meta={
          <dl className="grid grid-cols-3 max-w-2xl border-t-2 border-white">
            {[
              ["Active appeals", String(appeals.length)],
              ["People affected", formatNumber(affected)],
              ["Combined gap", formatNaira(gap)],
            ].map(([k, v], i) => (
              <div key={k} className={`pt-3 pr-3 ${i ? "pl-3 border-l border-white/30" : ""}`}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">{k}</dt>
                <dd className="font-display-normal text-2xl md:text-4xl font-bold num mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />
      <Section pad="md">
        <AppealsBrowser appeals={appeals} />
      </Section>
    </>
  );
}
