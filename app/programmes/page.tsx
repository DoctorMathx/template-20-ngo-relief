import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programmes } from "@/mock/programmes";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { formatNairaShort } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Rapid emergency response, water and sanitation, food security, emergency health, and protection & education in emergencies.",
};

export default function ProgrammesPage() {
  return (
    <>
      <PageHero kicker="What we do" title="Programmes" lede="Five integrated programmes that take a family from the first night of a crisis to the day they rebuild." />
      <Section pad="md">
        <div className="space-y-px bg-ink border-[1.5px] border-ink">
          {programmes.map((p, i) => (
            <article key={p.slug} className="bg-white grid grid-cols-1 [&>*]:min-w-0 md:grid-cols-[1fr_1.3fr] group">
              <Link href={`/programmes/${p.slug}`} className={`relative aspect-[16/10] md:aspect-auto md:min-h-[320px] bg-ink overflow-hidden ${i % 2 ? "md:order-2" : ""}`} tabIndex={-1} aria-hidden>
                <Image src={p.image} alt="" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover photo-hc group-hover:scale-[1.03] transition-transform duration-500" />
              </Link>
              <div className="p-6 md:p-10 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-display-normal text-4xl font-bold text-alarm num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="label-mono">{p.sdg}</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
                  <Link href={`/programmes/${p.slug}`} className="hover:text-alarm-strong">
                    {p.title}
                  </Link>
                </h2>
                <p className="lede mt-3">{p.short}</p>
                <dl className="mt-6 grid grid-cols-3 border-y-[1.5px] border-ink divide-x divide-ink">
                  {p.stats.map((s) => (
                    <div key={s.label} className="p-3">
                      <dd className="font-display-normal text-2xl font-bold num">{s.value}</dd>
                      <dt className="text-xs text-muted mt-1">{s.label}</dt>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="label-mono">Annual budget {formatNairaShort(p.annualBudget)}</span>
                  <Link href={`/programmes/${p.slug}`} className="btn btn-outline btn-sm">
                    Explore <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
