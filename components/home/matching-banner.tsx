import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { daysLeft, formatNaira, percent } from "@/lib/utils";

export function MatchingBanner() {
  const m = siteConfig.matching;
  if (!m.active) return null;
  const pct = percent(m.matchedSoFar, m.cap);
  return (
    <section className="bg-alarm-strong text-white" aria-labelledby="match-title">
      <div className="container-x py-10 md:py-12 grid grid-cols-1 [&>*]:min-w-0 gap-8 lg:grid-cols-[1.3fr_1fr] items-center">
        <div>
          <div className="kicker flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full" aria-hidden /> Emergency match · {daysLeft(m.endsOn)} days left
          </div>
          <h2 id="match-title" className="font-display font-bold text-4xl md:text-6xl mt-3">
            Your gift, doubled. ×{m.multiplier}
          </h2>
          <p className="mt-3 text-lg text-white/90 max-w-xl">
            {m.partner} is matching every naira given to the Borno flood appeal, up to {formatNaira(m.cap)}.
          </p>
        </div>
        <div className="bg-ink p-6">
          <div className="flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1">
            <span className="font-display-normal text-3xl font-bold num">{formatNaira(m.matchedSoFar)}</span>
            <span className="font-mono text-sm num">{pct}% of cap</span>
          </div>
          <div className="bar bar-dark mt-3 h-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Match used">
            <span style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-dark num">{formatNaira(m.cap - m.matchedSoFar)} of matching left</div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/donate?campaign=${m.appealSlug}`} className="btn btn-white">
              Double my gift
            </Link>
            <Link href="/partnerships#matching" className="btn btn-outline-light">
              Match as a company
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
