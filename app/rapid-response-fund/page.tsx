import type { Metadata } from "next";
import Link from "next/link";
import { Zap, PackageCheck, Eye, Shield } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { photo } from "@/lib/images";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rapid Response Fund — become a First Responder",
  description: "Monthly, unrestricted gifts that let Ubuntu Relief Network move within hours of a flood, outbreak or displacement — before an appeal exists.",
};

const tiers = [
  { amount: 5_000, name: "Responder", line: "Chlorination tablets for 8 families, every month" },
  { amount: 10_000, name: "First Responder", line: "Pre-positions a food parcel before the next flood", featured: true },
  { amount: 20_000, name: "Field Partner", line: "Funds a trained community health volunteer" },
  { amount: 50_000, name: "Rescue Crew", line: "Keeps a rescue boat fuelled and crewed on standby" },
];

const releases = [
  { date: "05 OCT 2026", what: "Adamawa cholera", amount: 18_000_000, hrs: "22 hrs after state declaration" },
  { date: "21 OCT 2026", what: "Borno flood", amount: 45_000_000, hrs: "4 hrs after dam overflow" },
  { date: "14 JUL 2026", what: "Benue displacement", amount: 12_500_000, hrs: "36 hrs after first arrivals" },
  { date: "03 MAY 2026", what: "Niger State windstorm", amount: 6_200_000, hrs: "No public appeal launched" },
  { date: "19 MAR 2026", what: "Kogi river bank collapse", amount: 4_800_000, hrs: "No public appeal launched" },
];

export default function RapidResponseFundPage() {
  return (
    <>
      <PageHero
        kicker="Unrestricted monthly giving"
        title="The Rapid Response Fund"
        lede="When the call comes at 2am, we don't have time to fundraise. 4,800 First Responders give monthly so we can move the moment disaster strikes."
        image={photo("aidTruck", 1800)}
        imageAlt="Relief supplies being unloaded from a truck"
      >
        <Link href="/donate?frequency=monthly&designation=rapid-response&amount=10000" className="btn btn-alarm btn-lg">
          Become a First Responder
        </Link>
        <a href="#why" className="btn btn-outline-light btn-lg">
          Why unrestricted?
        </a>
      </PageHero>

      <Section pad="md">
        <SectionHeader kicker="Choose your monthly gift" title="Join the First Responders" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border-[1.5px] border-ink">
          {tiers.map((t) => (
            <div key={t.amount} className={`p-6 flex flex-col ${t.featured ? "bg-ink text-white" : "bg-white"}`}>
              {t.featured && <span className="badge badge-critical self-start mb-3">Most chosen</span>}
              <div className="font-display text-xl font-bold">{t.name}</div>
              <div className="font-display-normal text-5xl font-bold num mt-2">
                {formatNaira(t.amount)}
                <span className="text-base font-normal opacity-70">/mo</span>
              </div>
              <p className={`mt-3 text-sm flex-1 ${t.featured ? "text-white/80" : "text-muted"}`}>{t.line}</p>
              <Link href={`/donate?frequency=monthly&designation=rapid-response&amount=${t.amount}`} className={`btn mt-6 ${t.featured ? "btn-alarm" : "btn-outline"}`}>
                Give {formatNaira(t.amount)} monthly
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          Prefer another amount? <Link href="/donate?frequency=monthly&designation=rapid-response" className="underline decoration-alarm decoration-2 underline-offset-4">Choose your own</Link>. Cancel or change any time.
        </p>
      </Section>

      <Section tone="ink" id="why" className="grid-lines">
        <SectionHeader dark kicker="Why unrestricted funds matter" title="Speed is the whole point" lede="Restricted gifts are vital — but they can only move once an appeal exists. Unrestricted gifts close the gap between the alarm and the appeal." />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            [Zap, "Hours, not weeks", "The fund releases cash within 4 hours of a verified alert — before any appeal is launched."],
            [PackageCheck, "Stock before the storm", "We buy food, tarpaulins and ORS in the dry season, when prices are up to 30% lower."],
            [Eye, "Forgotten crises", "40% of 2025 releases went to emergencies that never made the national news."],
            [Shield, "Strong systems", "Unrestricted money funds the audits, safeguarding and logistics every response depends on."],
          ].map(([Icon, t, b]) => {
            const I = Icon as typeof Zap;
            return (
              <div key={t as string} className="border-t-2 border-alarm pt-4">
                <I className="w-7 h-7 text-alarm" aria-hidden />
                <div className="font-display text-2xl font-bold mt-3">{t as string}</div>
                <p className="text-white/75 mt-2">{b as string}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="Accountability" title="Recent fund releases" lede="Every release is logged and reported to First Responders in their quarterly briefing." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">Recent Rapid Response Fund releases</caption>
            <thead>
              <tr className="border-y-2 border-ink text-left">
                <th scope="col" className="label-mono font-normal py-3">Date</th>
                <th scope="col" className="label-mono font-normal py-3">Emergency</th>
                <th scope="col" className="label-mono font-normal py-3 text-right">Released</th>
                <th scope="col" className="label-mono font-normal py-3 pl-6">Speed</th>
              </tr>
            </thead>
            <tbody>
              {releases.map((r) => (
                <tr key={r.date} className="border-b border-hair">
                  <td className="py-4 font-mono text-sm">{r.date}</td>
                  <th scope="row" className="py-4 text-left font-display text-xl font-bold">{r.what}</th>
                  <td className="py-4 text-right font-display-normal text-xl font-bold num">{formatNaira(r.amount)}</td>
                  <td className="py-4 pl-6 text-sm text-muted">{r.hrs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-5xl font-bold">First Responder questions</h2>
            <p className="lede mt-3">What you get: a welcome pack, quarterly field briefings, priority invitations to donor calls and an annual impact statement.</p>
          </div>
          <FaqAccordion
            items={[
              { category: "Donations", q: "How is the fund governed?", a: "Releases above ₦10m need sign-off from the Executive Director and the Board Treasurer. All releases are reported to the Finance & Audit Committee monthly." },
              { category: "Donations", q: "Can I stop or change my monthly gift?", a: "Yes, any time — reply to a receipt email or call supporter care. Changes apply from your next billing date." },
              { category: "Donations", q: "Does my monthly gift count towards corporate matching?", a: "During an active emergency match, the first month of a new monthly gift designated to that appeal is matched." },
            ]}
          />
        </div>
      </Section>
    </>
  );
}
