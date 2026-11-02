import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getAppeal, appeals } from "@/mock/appeals";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { FundingMeter } from "@/components/ui/funding-meter";
import { daysLeft, formatDateTime, formatNaira, formatNumber, TODAY } from "@/lib/utils";

export function HeroSection() {
  const a = getAppeal(siteConfig.topEmergencySlug) ?? appeals[0];
  const m = siteConfig.matching;
  const daysIn = Math.round((new Date(TODAY).getTime() - new Date(a.startedOn).getTime()) / 86_400_000) + 1;
  return (
    <section className="relative bg-ink text-white overflow-hidden" aria-labelledby="hero-title">
      <Image src={a.image} alt={a.imageAlt} fill priority sizes="100vw" className="object-cover photo-hc" />
      <div className="absolute inset-0 overlay-left" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" aria-hidden />

      <div className="container-x relative py-12 md:py-20 lg:py-24 grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1.5fr_1fr] items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <UrgencyBadge level={a.urgency} />
            <span className="badge badge-dark">{a.crisisType} · Day {daysIn}</span>
            <span className="font-mono text-xs uppercase tracking-wider text-white/75 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" aria-hidden /> Updated {formatDateTime(a.updatedAt)}
            </span>
          </div>
          <h1 id="hero-title" className="font-display font-bold text-[2.9rem] min-[400px]:text-[3.4rem] leading-[0.92] sm:text-7xl lg:text-[6.5rem] mt-5">
            {a.title.split(" ").slice(0, -1).join(" ")} <span className="text-alarm">{a.title.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-wider flex items-center gap-1.5 text-white/85">
            <MapPin className="w-4 h-4" aria-hidden /> {a.location}, {a.state} State
          </p>
          <p className="mt-5 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90">{a.summary}</p>

          <dl className="mt-8 grid grid-cols-3 [&>*]:min-w-0 max-w-2xl border-t-2 border-white">
            {[
              { k: "People affected", v: formatNumber(a.peopleAffected) },
              { k: "Reached by URN", v: formatNumber(a.peopleReached) },
              { k: "Days since onset", v: String(daysIn) },
            ].map((s, i) => (
              <div key={s.k} className={`pt-4 pr-2 sm:pr-4 ${i > 0 ? "pl-2 sm:pl-4 border-l border-white/30" : ""}`}>
                <dt className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.12em] text-white/70">{s.k}</dt>
                <dd className="font-display-normal font-bold text-2xl sm:text-4xl md:text-5xl num mt-1">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="bg-white text-ink border-t-[6px] border-alarm p-6 md:p-7" aria-label="Donate to this appeal">
          <div className="flex items-center justify-between">
            <div className="kicker text-alarm-strong flex items-center gap-2">
              <span className="live-dot" aria-hidden /> Live funding gap
            </div>
            <span className="label-mono">{daysLeft(a.endsOn)} days left</span>
          </div>
          <div className="mt-4">
            <FundingMeter raised={a.raised} goal={a.goal} donors={a.donors} endsOn={a.endsOn} live />
          </div>
          {m.active && m.appealSlug === a.slug && (
            <p className="mt-4 bg-sand border-l-4 border-alarm px-3 py-2.5 text-sm">
              <strong>Gifts doubled.</strong> {m.partner} is matching every naira up to {formatNaira(m.cap)}.
            </p>
          )}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {a.impactAsks.map((ask) => (
              <Link
                key={ask.amount}
                href={`/donate?amount=${ask.amount}&campaign=${a.slug}`}
                className="border-[1.5px] border-ink min-h-[48px] grid place-items-center font-display-normal font-bold text-lg num hover:bg-ink hover:text-white transition-colors"
                title={`${formatNaira(ask.amount)} — ${ask.label}`}
              >
                {formatNaira(ask.amount)}
              </Link>
            ))}
          </div>
          <Link href={`/donate?campaign=${a.slug}`} className="btn btn-alarm btn-lg btn-block mt-3">
            Donate to {a.state} now
          </Link>
          <Link href={`/appeals/${a.slug}`} className="mt-3 block text-center text-sm font-semibold underline underline-offset-4 decoration-2 decoration-alarm min-h-[44px] leading-[44px]">
            Read the full appeal &amp; latest sitrep
          </Link>
        </aside>
      </div>
    </section>
  );
}
