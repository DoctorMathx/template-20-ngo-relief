import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getProgramme, programmes } from "@/mock/programmes";
import { appeals } from "@/mock/appeals";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { AppealCard } from "@/components/ui/appeal-card";
import { formatNaira } from "@/lib/utils";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  return p ? { title: p.title, description: p.short } : { title: "Programme not found" };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const related = appeals.filter((a) => p.states.includes(a.state)).slice(0, 3);
  const others = programmes.filter((x) => x.slug !== p.slug);
  return (
    <>
      <PageHero kicker={`Programme · ${p.sdg}`} title={p.title} lede={p.short} image={p.image} imageAlt={p.imageAlt}>
        <Link href={`/donate?designation=${p.slug}`} className="btn btn-alarm btn-lg">
          Fund this programme
        </Link>
      </PageHero>
      <div className="bg-white border-b-[1.5px] border-ink">
        <dl className="container-x grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-3 sm:divide-x divide-ink">
          {p.stats.map((s) => (
            <div key={s.label} className="py-6 sm:px-6 first:pl-0 border-b sm:border-b-0 border-hair">
              <dd className="font-display-normal text-5xl font-bold num">{s.value}</dd>
              <dt className="label-mono mt-1">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="prose-news">
            {p.description.map((d) => (
              <p key={d.slice(0, 20)}>{d}</p>
            ))}
          </div>
          <aside className="space-y-6">
            <div className="bg-sand p-6 border-t-4 border-ink">
              <h2 className="font-display text-2xl font-bold">Key activities</h2>
              <ul className="mt-3 space-y-2">
                {p.activities.map((a) => (
                  <li key={a} className="flex gap-2.5">
                    <Check className="w-4 h-4 text-alarm-strong mt-1 shrink-0" aria-hidden />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-6">
              <div className="label-mono">Active in</div>
              <div className="font-display text-2xl font-bold mt-1">{p.states.join(" · ")}</div>
              <div className="label-mono mt-4">Annual budget</div>
              <div className="font-display-normal text-3xl font-bold num mt-1">{formatNaira(p.annualBudget)}</div>
            </div>
          </aside>
        </div>
      </Section>
      {related.length > 0 && (
        <Section tone="sand" pad="md">
          <SectionHeader kicker="Live now" title="Related emergency appeals" />
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <AppealCard key={a.slug} appeal={a} />
            ))}
          </div>
        </Section>
      )}
      <Section pad="sm">
        <div className="label-mono mb-3">Other programmes</div>
        <ul className="flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/programmes/${o.slug}`} className="btn btn-outline btn-sm">
                {o.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
