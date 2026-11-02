import type { Metadata } from "next";
import Link from "next/link";
import { headlineStats, outcomes, yearByYear, testimonials } from "@/mock/impact";
import { stories } from "@/mock/stories";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/story-card";
import { formatNumber } from "@/lib/utils";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impact",
  description: "1.2 million people reached in 2025. Outcomes, year-by-year growth and stories from Ubuntu Relief Network's emergency response.",
};

export default function ImpactPage() {
  const max = Math.max(...yearByYear.map((y) => y.reached));
  return (
    <>
      <PageHero kicker="2025 in numbers" title="Our impact" lede="Measured, verified and published — including the parts that didn't go to plan." image={photo("children", 1800)} imageAlt="A group of smiling children" />
      <section className="bg-ink text-white" aria-label="Headline figures">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {headlineStats.map((s, i) => (
            <div key={s.label} className={`py-10 px-4 md:px-6 ${i ? "border-l border-ink-3" : ""} ${i === 2 ? "border-l-0 lg:border-l border-t lg:border-t-0" : ""} ${i === 3 ? "border-t lg:border-t-0" : ""} border-ink-3`}>
              <dd className="font-display-normal text-5xl md:text-6xl font-bold num">{s.value}</dd>
              <dt className="font-display text-lg mt-2">{s.label}</dt>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-dark">{s.note}</div>
            </div>
          ))}
        </dl>
      </section>

      <Section pad="md">
        <SectionHeader kicker="Outcomes" title="What changed in 2025" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink border-[1.5px] border-ink">
          {outcomes.map((o) => (
            <div key={o.label} className="bg-white p-6">
              <div className="font-display-normal text-5xl font-bold num">{o.value}</div>
              <div className="font-display text-xl font-bold mt-2">{o.label}</div>
              <p className="text-sm text-muted mt-2">{o.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="Growth" title="People reached, year by year" />
        <div className="flex items-end gap-3 md:gap-6 h-72 border-b-2 border-ink" role="img" aria-label="Bar chart of people reached per year from 2021 to 2025">
          {yearByYear.map((y, i) => (
            <div key={y.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="font-mono text-xs md:text-sm font-semibold num mb-2">{formatNumber(y.reached)}</div>
              <div className={`w-full ${i === yearByYear.length - 1 ? "bg-alarm-strong" : "bg-ink"}`} style={{ height: `${(y.reached / max) * 80}%` }} />
            </div>
          ))}
        </div>
        <div className="flex gap-3 md:gap-6 mt-2">
          {yearByYear.map((y) => (
            <div key={y.year} className="flex-1 text-center font-display text-xl font-bold">
              {y.year}
            </div>
          ))}
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="In their words" title="Voices" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <figure key={t.by} className="border-t-4 border-alarm pt-4">
              <blockquote className="font-display-normal text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{t.by}</span>
                <span className="block text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader
          kicker="Stories"
          title="Behind the numbers"
          action={
            <Link href="/stories" className="btn btn-outline">
              All stories
            </Link>
          }
        />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.slice(0, 3).map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      </Section>
    </>
  );
}
