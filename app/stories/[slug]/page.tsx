import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, stories } from "@/mock/stories";
import { siteConfig } from "@/lib/site-config";
import { getAppeal } from "@/mock/appeals";
import { StoryCard } from "@/components/ui/story-card";
import { FundingMeter } from "@/components/ui/funding-meter";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.excerpt, openGraph: { title: s.title, description: s.excerpt, images: [{ url: s.image }], type: "article" } };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const top = getAppeal(siteConfig.topEmergencySlug);
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  return (
    <article>
      <header className="container-x pt-12 md:pt-16 max-w-5xl">
        <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider text-muted mb-5">
          <Link href="/stories" className="hover:text-alarm-strong">
            Stories
          </Link>{" "}
          / <span aria-current="page">{s.category}</span>
        </nav>
        <div className="kicker text-alarm-strong">{s.category}</div>
        <h1 className="font-display font-bold text-5xl md:text-7xl mt-3">{s.title}</h1>
        <p className="lede mt-5 max-w-3xl">{s.excerpt}</p>
        <div className="mt-6 py-3 border-y-[1.5px] border-ink font-mono text-xs uppercase tracking-wider flex flex-wrap gap-x-6 gap-y-1">
          <span>By {s.author}</span>
          <span>{formatDate(s.date, { day: "numeric", month: "long", year: "numeric" })}</span>
          <span>{s.location}</span>
          <span>{s.readMins} min read</span>
        </div>
      </header>
      <div className="container-x max-w-6xl mt-8">
        <div className="relative aspect-[16/8] bg-ink overflow-hidden">
          <Image src={s.image} alt={s.imageAlt} fill priority sizes="(min-width:1280px) 1152px, 100vw" className="object-cover photo-hc" />
        </div>
      </div>
      <div className="container-x max-w-5xl py-12 grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1fr_280px]">
        <div className="prose-news">
          {s.body.map((p, i) => (
            <Fragment key={i}>
              <p>{p}</p>
              {s.pullQuote && i === 1 && (
                <blockquote className="my-8 border-l-[6px] border-alarm pl-5">
                  <p className="font-display text-3xl md:text-4xl font-bold leading-tight mb-2">&ldquo;{s.pullQuote.quote}&rdquo;</p>
                  <cite className="not-italic font-mono text-xs uppercase tracking-wider text-muted">— {s.pullQuote.by}</cite>
                </blockquote>
              )}
            </Fragment>
          ))}
        </div>
        {top && (
          <aside className="lg:sticky lg:top-32 self-start card p-5 border-t-[6px] border-t-alarm">
            <div className="label-mono">Critical appeal</div>
            <div className="font-display text-2xl font-bold mt-1 mb-4">{top.title}</div>
            <FundingMeter raised={top.raised} goal={top.goal} donors={top.donors} endsOn={top.endsOn} size="sm" />
            <Link href={`/donate?campaign=${top.slug}`} className="btn btn-alarm btn-block mt-5">
              Donate now
            </Link>
          </aside>
        )}
      </div>
      <section className="bg-sand py-14">
        <div className="container-x">
          <h2 className="font-display text-4xl font-bold border-t-4 border-ink pt-3 mb-8">More dispatches</h2>
          <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {more.map((m) => (
              <StoryCard key={m.slug} story={m} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
