import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sitreps } from "@/mock/sitreps";
import { Section, SectionHeader } from "@/components/ui/section";
import { SitrepRow } from "@/components/ui/sitrep-row";
import { NeedsBars } from "@/components/ui/needs-bars";
import { formatDateTime } from "@/lib/utils";

export function SitrepsSection() {
  const latest = [...sitreps].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const top = latest[0];
  return (
    <Section pad="md">
      <SectionHeader
        kicker="From the field"
        title="Situation reports"
        lede="Timestamped field updates, key figures and the gaps we still can't fill — published as often as every 48 hours during an emergency."
        action={
          <Link href="/situation-reports" className="btn btn-outline">
            All sitreps <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        }
      />
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="border-b border-ink">
          {latest.slice(0, 4).map((s) => (
            <SitrepRow key={s.slug} sitrep={s} />
          ))}
        </div>
        <aside className="bg-sand p-6 border-t-4 border-alarm self-start">
          <div className="label-mono">Needs vs response · Sitrep #{top.number}</div>
          <div className="font-display text-2xl font-bold mt-1">{top.location}</div>
          <div className="font-mono text-xs mt-1 text-muted">{formatDateTime(top.publishedAt)}</div>
          <div className="mt-5">
            <NeedsBars needs={top.needs} />
          </div>
          <Link href={`/situation-reports/${top.slug}`} className="btn btn-ink btn-block mt-6">
            Read sitrep #{top.number}
          </Link>
        </aside>
      </div>
    </Section>
  );
}
