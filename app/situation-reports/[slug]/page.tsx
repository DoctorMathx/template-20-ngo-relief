import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Download, Printer } from "lucide-react";
import { getSitrep, sitreps } from "@/mock/sitreps";
import { getAppeal } from "@/mock/appeals";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { NeedsBars } from "@/components/ui/needs-bars";
import { FundingMeter } from "@/components/ui/funding-meter";
import { formatDateTime, formatNumber, percent } from "@/lib/utils";

export function generateStaticParams() {
  return sitreps.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSitrep(slug);
  if (!s) return { title: "Situation report not found" };
  return { title: s.title, description: s.summary };
}

export default async function SitrepPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSitrep(slug);
  if (!s) notFound();
  const appeal = s.appealSlug ? getAppeal(s.appealSlug) : undefined;
  const siblings = sitreps.filter((x) => x.appealSlug === s.appealSlug && x.slug !== s.slug);

  return (
    <article>
      <header className="bg-ink text-white">
        <div className="container-x py-12 md:py-16">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-wider text-white/70 mb-6">
            <Link href="/situation-reports" className="hover:text-alarm">
              Situation reports
            </Link>{" "}
            / <span aria-current="page">#{s.number}</span>
          </nav>
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-[auto_1fr] items-start">
            <div className="font-display-normal font-bold text-alarm text-8xl md:text-9xl leading-[0.8] num">#{String(s.number).padStart(2, "0")}</div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <UrgencyBadge level={s.urgency} />
                <span className="badge badge-dark">Sitrep</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-6xl mt-4">{s.title}</h1>
              <dl className="mt-6 grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-3 gap-4 font-mono text-xs uppercase tracking-wider border-t border-ink-3 pt-4">
                <div>
                  <dt className="text-muted-dark">Published</dt>
                  <dd className="mt-1">{formatDateTime(s.publishedAt)}</dd>
                </div>
                <div>
                  <dt className="text-muted-dark">Reporting period</dt>
                  <dd className="mt-1">{s.period}</dd>
                </div>
                <div>
                  <dt className="text-muted-dark">Next update</dt>
                  <dd className="mt-1 text-alarm">{formatDateTime(s.nextUpdate)}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-alarm" aria-hidden />
      </header>

      <div className="container-x py-12 md:py-16 grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <section aria-labelledby="summary-h">
            <h2 id="summary-h" className="kicker text-alarm-strong">Summary</h2>
            <p className="mt-3 text-xl md:text-2xl leading-snug font-medium">{s.summary}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">{s.location} · Filed by {s.author}</p>
          </section>

          <section aria-labelledby="figures-h" className="mt-12">
            <h2 id="figures-h" className="font-display text-3xl font-bold border-t-4 border-ink pt-3">Key figures</h2>
            <table className="w-full mt-4 border-collapse">
              <caption className="sr-only">Key figures for this reporting period</caption>
              <thead>
                <tr className="border-b-2 border-ink text-left">
                  <th scope="col" className="label-mono font-normal py-2">Indicator</th>
                  <th scope="col" className="label-mono font-normal py-2 text-right">Current</th>
                  <th scope="col" className="label-mono font-normal py-2 text-right">Since last</th>
                </tr>
              </thead>
              <tbody>
                {s.figures.map((f) => (
                  <tr key={f.label} className="border-b border-hair">
                    <th scope="row" className="py-3 text-left font-medium">{f.label}</th>
                    <td className="py-3 text-right font-display-normal text-2xl font-bold num">{f.value}</td>
                    <td className={`py-3 text-right font-mono text-sm num ${f.change ? "text-alarm-strong font-semibold" : "text-muted"}`}>{f.change ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section aria-labelledby="needs-h" className="mt-12">
            <h2 id="needs-h" className="font-display text-3xl font-bold border-t-4 border-ink pt-3">Needs vs response</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full min-w-[520px] border-collapse">
                <caption className="sr-only">Needs compared with people reached, by sector</caption>
                <thead>
                  <tr className="border-b-2 border-ink text-left">
                    <th scope="col" className="label-mono font-normal py-2">Sector</th>
                    <th scope="col" className="label-mono font-normal py-2 text-right">Need</th>
                    <th scope="col" className="label-mono font-normal py-2 text-right">Reached</th>
                    <th scope="col" className="label-mono font-normal py-2 text-right">Gap</th>
                    <th scope="col" className="label-mono font-normal py-2 text-right">Coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {s.needs.map((n) => {
                    const pct = percent(n.reached, n.need);
                    return (
                      <tr key={n.sector} className="border-b border-hair">
                        <th scope="row" className="py-3 text-left font-medium">
                          {n.sector}
                          <span className="block text-xs text-muted font-normal">{n.unit}</span>
                        </th>
                        <td className="py-3 text-right font-mono text-sm num">{formatNumber(n.need)}</td>
                        <td className="py-3 text-right font-mono text-sm num">{formatNumber(n.reached)}</td>
                        <td className="py-3 text-right font-mono text-sm num text-alarm-strong font-semibold">{formatNumber(n.need - n.reached)}</td>
                        <td className="py-3 text-right">
                          <span className={`badge ${pct < 40 ? "badge-critical" : pct < 70 ? "badge-high" : "badge-ongoing"}`}>{pct}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-sand p-5">
              <NeedsBars needs={s.needs} />
            </div>
          </section>

          <section aria-labelledby="log-h" className="mt-12">
            <h2 id="log-h" className="font-display text-3xl font-bold border-t-4 border-ink pt-3">Field log</h2>
            <ol className="mt-4">
              {s.entries.map((e) => (
                <li key={e.time} className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-[170px_1fr] gap-2 sm:gap-6 py-4 border-b border-hair">
                  <div>
                    <time dateTime={e.time} className="font-mono text-xs font-semibold uppercase tracking-wider block">
                      {formatDateTime(e.time)}
                    </time>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-alarm-strong mt-0.5">{e.location}</div>
                  </div>
                  <p className="leading-relaxed">{e.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="gaps-h" className="mt-12 border-[1.5px] border-alarm-strong p-6">
            <h2 id="gaps-h" className="font-display text-3xl font-bold flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-alarm-strong" aria-hidden /> Critical gaps
            </h2>
            <ul className="mt-4 space-y-3">
              {s.gaps.map((g) => (
                <li key={g} className="flex gap-3">
                  <span className="w-2 h-2 bg-alarm mt-2.5 shrink-0" aria-hidden />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-32 self-start">
          {appeal && (
            <div className="card p-6 border-t-[6px] border-t-alarm">
              <div className="label-mono">Fund this response</div>
              <div className="font-display text-2xl font-bold mt-1 mb-4">{appeal.title}</div>
              <FundingMeter raised={appeal.raised} goal={appeal.goal} donors={appeal.donors} endsOn={appeal.endsOn} live />
              <Link href={`/donate?campaign=${appeal.slug}`} className="btn btn-alarm btn-block mt-5">
                Close the gap
              </Link>
              <Link href={`/appeals/${appeal.slug}`} className="btn btn-outline btn-block mt-2">
                View appeal
              </Link>
            </div>
          )}
          <div className="card p-6">
            <div className="label-mono mb-3">Downloads</div>
            <a href="#" className="flex items-center justify-between min-h-[44px] border-b border-hair hover:text-alarm-strong">
              <span>Sitrep #{s.number} (PDF, 1.2 MB)</span> <Download className="w-4 h-4" aria-hidden />
            </a>
            <a href="#" className="flex items-center justify-between min-h-[44px] hover:text-alarm-strong">
              <span>Print-friendly version</span> <Printer className="w-4 h-4" aria-hidden />
            </a>
          </div>
          {siblings.length > 0 && (
            <div className="bg-sand p-6">
              <div className="label-mono mb-2">Earlier reports</div>
              <ul>
                {siblings.map((x) => (
                  <li key={x.slug}>
                    <Link href={`/situation-reports/${x.slug}`} className="flex justify-between gap-3 py-2 min-h-[44px] items-center border-b border-sand-deep hover:text-alarm-strong">
                      <span className="font-display text-lg font-bold">Sitrep #{x.number}</span>
                      <span className="font-mono text-xs">{formatDateTime(x.publishedAt)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}
