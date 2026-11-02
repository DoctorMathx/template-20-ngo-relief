import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Share2 } from "lucide-react";
import { appeals, getAppeal } from "@/mock/appeals";
import { getSitrep } from "@/mock/sitreps";
import { siteConfig } from "@/lib/site-config";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { FundingMeter } from "@/components/ui/funding-meter";
import { NeedsBars } from "@/components/ui/needs-bars";
import { AppealCard } from "@/components/ui/appeal-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { formatDate, formatDateTime, formatNaira, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return appeals.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAppeal(slug);
  if (!a) return { title: "Appeal not found" };
  return {
    title: `${a.title} — ${a.urgency === "critical" ? "Critical appeal" : "Appeal"}`,
    description: a.summary,
    openGraph: { title: a.title, description: a.summary, images: [{ url: a.image }] },
  };
}

export default async function AppealPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAppeal(slug);
  if (!a) notFound();
  const sitrep = a.sitrepSlug ? getSitrep(a.sitrepSlug) : undefined;
  const totalBudget = a.budget.reduce((s, b) => s + b.amount, 0);
  const m = siteConfig.matching;
  const matched = m.active && m.appealSlug === a.slug;
  const related = appeals.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <section className="relative bg-ink text-white overflow-hidden">
        <Image src={a.image} alt={a.imageAlt} fill priority sizes="100vw" className="object-cover photo-hc" />
        <div className="absolute inset-0 overlay-left" aria-hidden />
        <div className="container-x relative py-16 md:py-24">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider text-white/70 mb-6">
            <Link href="/appeals" className="hover:text-alarm">
              Appeals
            </Link>{" "}
            / <span aria-current="page">{a.state}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-2.5">
            <UrgencyBadge level={a.urgency} />
            <span className="badge badge-dark">{a.crisisType}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-white/75 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden /> Updated {formatDateTime(a.updatedAt)}
            </span>
          </div>
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl mt-5 max-w-4xl">{a.title}</h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4" aria-hidden /> {a.location}, {a.state} State · since {formatDate(a.startedOn)}
          </p>
          <p className="mt-5 max-w-2xl text-lg md:text-xl text-white/90">{a.summary}</p>
        </div>
        <div className="h-1.5 bg-alarm relative" aria-hidden />
      </section>

      <div className="bg-white border-b-[1.5px] border-ink">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 [&>*]:min-w-0 divide-x divide-ink">
          {[
            ["People affected", formatNumber(a.peopleAffected)],
            ["People reached", formatNumber(a.peopleReached)],
            ["Appeal target", formatNaira(a.goal)],
            ["Still needed", formatNaira(a.goal - a.raised)],
          ].map(([k, v], i) => (
            <div key={k} className={`py-5 px-3 sm:px-4 ${i === 2 ? "border-t md:border-t-0 border-ink" : ""} ${i === 3 ? "border-t md:border-t-0 border-ink" : ""}`}>
              <div className="label-mono">{k}</div>
              <div className={`font-display-normal text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold num mt-1 ${i === 3 ? "text-alarm-strong" : ""}`}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="kicker text-alarm-strong mb-4">The situation</div>
            <div className="prose-news">
              {a.story.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <h2 className="font-display text-4xl font-bold mt-12 border-t-4 border-ink pt-4">Your gift in action</h2>
            <div className="mt-6 grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-3 gap-px bg-ink border-[1.5px] border-ink">
              {a.impactAsks.map((ask) => (
                <Link key={ask.amount} href={`/donate?amount=${ask.amount}&campaign=${a.slug}`} className="bg-white p-5 hover:bg-sand group">
                  <div className="font-display-normal text-3xl font-bold num group-hover:text-alarm-strong">{formatNaira(ask.amount)}</div>
                  <p className="mt-2 text-sm text-muted">provides {ask.label}</p>
                  <span className="mt-3 inline-block font-mono text-xs uppercase tracking-wider underline underline-offset-4 decoration-alarm decoration-2">Give this →</span>
                </Link>
              ))}
            </div>

            <h2 className="font-display text-4xl font-bold mt-12 border-t-4 border-ink pt-4">How funds are used</h2>
            <p className="text-muted mt-2">Appeal budget: {formatNaira(totalBudget)}. Any surplus moves to the closest related need — we&apos;ll tell you if it does.</p>
            <table className="w-full mt-6 text-left border-collapse">
              <caption className="sr-only">Budget breakdown</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="label-mono py-2 font-normal">Line</th>
                  <th scope="col" className="label-mono py-2 font-normal text-right">Amount</th>
                  <th scope="col" className="label-mono py-2 font-normal text-right w-16 sm:w-24">Share</th>
                </tr>
              </thead>
              <tbody>
                {a.budget.map((b) => {
                  const pct = Math.round((b.amount / totalBudget) * 100);
                  return (
                    <tr key={b.label} className="border-b border-hair align-top">
                      <td className="py-3 pr-4">
                        <div className="font-semibold">{b.label}</div>
                        {b.note && <div className="text-xs text-muted">{b.note}</div>}
                        <div className="mt-2 h-1.5 bg-sand">
                          <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono text-sm num">{formatNaira(b.amount)}</td>
                      <td className="py-3 text-right font-mono text-sm num">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <h2 className="font-display text-4xl font-bold mt-12 border-t-4 border-ink pt-4">Response timeline</h2>
            <ol className="mt-6 border-l-2 border-ink">
              {a.updates.map((u) => (
                <li key={u.date + u.title} className="relative pl-7 pb-7 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-alarm" aria-hidden />
                  <time className="font-mono text-xs uppercase tracking-wider text-muted" dateTime={u.date}>
                    {formatDate(u.date)}
                  </time>
                  <h3 className="font-semibold text-lg mt-0.5">{u.title}</h3>
                  <p className="text-muted mt-1">{u.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-32 self-start">
            <div className="card p-6 border-t-[6px] border-t-alarm">
              <div className="kicker text-alarm-strong flex items-center gap-2 mb-4">
                <span className="live-dot" aria-hidden /> Live funding
              </div>
              <FundingMeter raised={a.raised} goal={a.goal} donors={a.donors} endsOn={a.endsOn} live />
              {matched && (
                <p className="mt-4 bg-sand border-l-4 border-alarm px-3 py-2.5 text-sm">
                  <strong>Doubled:</strong> {m.partner} matches every gift until {formatDate(m.endsOn)}.
                </p>
              )}
              <Link href={`/donate?campaign=${a.slug}`} className="btn btn-alarm btn-lg btn-block mt-5">
                Donate to this appeal
              </Link>
              <Link href={`/donate?campaign=${a.slug}&frequency=monthly`} className="btn btn-outline btn-block mt-2">
                Give monthly
              </Link>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${a.title}: ${a.summary}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 min-h-[44px] font-mono text-xs uppercase tracking-wider hover:text-alarm-strong"
              >
                <Share2 className="w-4 h-4" aria-hidden /> Share on WhatsApp
              </a>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold">Recent donors</h2>
              <ul className="mt-3 divide-y divide-hair">
                {a.recentDonors.map((d, i) => (
                  <li key={i} className="py-3 flex justify-between gap-3 text-sm">
                    <span>
                      <span className="font-semibold">{d.name}</span>
                      <span className="block text-xs text-muted font-mono">
                        {d.when}
                        {d.city ? ` · ${d.city}` : ""}
                      </span>
                    </span>
                    <span className="font-mono font-semibold num">{formatNaira(d.amount)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sitrep && (
              <div className="bg-sand p-6 border-t-4 border-ink">
                <div className="label-mono">Latest sitrep · #{sitrep.number}</div>
                <div className="font-mono text-xs mt-1">{formatDateTime(sitrep.publishedAt)}</div>
                <div className="mt-4">
                  <NeedsBars needs={sitrep.needs.slice(0, 3)} />
                </div>
                <Link href={`/situation-reports/${sitrep.slug}`} className="btn btn-ink btn-block mt-5">
                  Read full sitrep
                </Link>
              </div>
            )}
          </aside>
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="Also responding to" title="Other appeals" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <AppealCard key={r.slug} appeal={r} />
          ))}
        </div>
      </Section>
    </>
  );
}
