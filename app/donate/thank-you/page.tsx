import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Download, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { designationLabel } from "@/mock/donate";
import { reliefKits } from "@/mock/relief-kits";
import { formatNaira, formatDate } from "@/lib/utils";
import { ShareButtons } from "./share-buttons";
import { PrintButton } from "./print-button";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your donation receipt from Ubuntu Relief Network.",
  robots: { index: false, follow: false },
};

type SP = Promise<{ [k: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ThankYouPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const amount = Number(one(sp.amount));
  const fee = Number(one(sp.fee)) || 0;
  const valid = Number.isInteger(amount) && amount > 0;
  const frequency = ["one-time", "monthly", "annual"].includes(one(sp.frequency)) ? one(sp.frequency) : "one-time";
  const designation = one(sp.designation) || "rapid-response";
  const method = one(sp.method) || "card";
  const ref = (one(sp.ref) || "URN-PENDING").replace(/[^A-Z0-9-]/gi, "").slice(0, 20);
  const name = one(sp.name).slice(0, 80) || "Friend";
  const email = one(sp.email).slice(0, 120);
  const tribute = one(sp.tribute);
  const matched = one(sp.matched) === "1";
  const employer = one(sp.employer).slice(0, 80);
  const kit = one(sp.kit)
    .split(",")
    .map((p) => {
      const [id, n] = p.split(":");
      const k = reliefKits.find((x) => x.id === id);
      return k && Number(n) > 0 ? { k, n: Math.min(99, Number(n)) } : null;
    })
    .filter((x): x is { k: (typeof reliefKits)[number]; n: number } => !!x);

  const total = valid ? amount + fee : 0;
  const today = new Date().toISOString();
  const freqLabel = frequency === "monthly" ? "Monthly" : frequency === "annual" ? "Annual" : "One-time";
  const pending = method !== "card";
  const { matching } = siteConfig;

  if (!valid) {
    return (
      <section className="container-x py-24 max-w-2xl">
        <div className="kicker text-alarm-strong">No donation found</div>
        <h1 className="font-display font-bold text-5xl mt-3">We couldn&apos;t find that receipt</h1>
        <p className="lede mt-4">This page shows a receipt after you complete a donation. If you&apos;ve just given and see this, please contact us with your bank reference.</p>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link href="/donate" className="btn btn-alarm">
            Make a donation
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact supporter care
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-14 md:py-20">
          <CheckCircle2 className="w-14 h-14 text-alarm" aria-hidden />
          <h1 className="font-display font-bold text-5xl md:text-7xl mt-5 max-w-4xl">
            Thank you, {name === "Anonymous" ? "friend" : name.split(" ")[0]}. You&apos;re in the response.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-white/85 max-w-2xl">
            {pending
              ? "We'll confirm your gift as soon as your transfer arrives — usually within 2 working days."
              : `Your ${freqLabel.toLowerCase()} gift is on its way to ${designationLabel(designation)}.`}
            {matched && ` ${matching.partner} will match it — doubling your impact.`}
          </p>
        </div>
        <div className="h-1.5 bg-alarm" aria-hidden />
      </section>

      <section className="container-x py-12 md:py-16 grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1.3fr_1fr] items-start">
        <article className="card p-6 md:p-8 border-t-[6px] border-t-ink" aria-labelledby="receipt-h">
          <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-4">
            <div>
              <div className="label-mono">Donation receipt</div>
              <h2 id="receipt-h" className="font-display text-3xl font-bold mt-1">
                {siteConfig.brand.name}
              </h2>
            </div>
            <span className={`badge ${pending ? "badge-high" : "badge-ongoing"}`}>{pending ? "Awaiting transfer" : "Confirmed"}</span>
          </div>
          <dl className="mt-4 divide-y divide-hair">
            {[
              ["Reference", ref],
              ["Date", formatDate(today, { day: "numeric", month: "long", year: "numeric" })],
              ["Donor", name],
              ...(email ? [["Receipt sent to", email]] : []),
              ["Frequency", freqLabel],
              ["Designation", designationLabel(designation)],
              ["Gift", formatNaira(amount)],
              ["Processing fee covered", fee ? formatNaira(fee) : "—"],
              ["Payment method", method === "card" ? "Card" : method === "transfer" ? "Bank transfer" : "USSD"],
              ...(tribute ? [["Dedication", `In ${tribute.split(":")[0]} of ${tribute.split(":").slice(1).join(":").slice(0, 80)}`]] : []),
              ...(matched ? [["Corporate match", `${formatNaira(amount * (matching.multiplier - 1))} by ${matching.partner}`]] : []),
              ...(employer ? [["Employer match", `Paperwork will be sent for ${employer}`]] : []),
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)] sm:grid-cols-[200px_minmax(0,1fr)] gap-3 sm:gap-4 py-2.5">
                <dt className="label-mono pt-0.5">{k}</dt>
                <dd className={k === "Reference" ? "font-mono font-semibold [overflow-wrap:anywhere]" : "font-medium [overflow-wrap:anywhere]"}>{v}</dd>
              </div>
            ))}
          </dl>
          {kit.length > 0 && (
            <div className="mt-4 bg-sand p-4">
              <div className="label-mono">Relief kit contents</div>
              <ul className="mt-2 text-sm space-y-1">
                {kit.map(({ k, n }) => (
                  <li key={k.id}>
                    {n} × {k.name} — {k.impact.toLowerCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-5 pt-4 border-t-2 border-ink flex flex-wrap items-baseline justify-between gap-x-3">
            <span className="font-display text-xl font-bold">Total</span>
            <span className="font-display-normal text-4xl font-bold num">
              {formatNaira(total)}
              {frequency === "monthly" ? "/mo" : frequency === "annual" ? "/yr" : ""}
            </span>
          </div>
          {method === "transfer" && (
            <p className="mt-4 text-sm bg-alarm-soft border-l-4 border-alarm-strong p-3">
              Transfer to {siteConfig.donation.bank.bankName} · {siteConfig.donation.bank.accountNumber} ({siteConfig.donation.bank.accountName}) using reference <strong className="font-mono">{ref}</strong>.
            </p>
          )}
          {method === "ussd" && (
            <p className="mt-4 text-sm bg-alarm-soft border-l-4 border-alarm-strong p-3">
              Dial <strong className="font-mono">{siteConfig.donation.ussd.code.replace("000", String(total))}</strong> and enter reference <strong className="font-mono">{ref}</strong>.
            </p>
          )}
          <p className="mt-5 text-xs text-muted leading-relaxed">{siteConfig.donation.receiptNote}</p>
          <p className="mt-2 text-xs text-muted">
            {siteConfig.org.legalName} · {siteConfig.org.hq.address}, {siteConfig.org.hq.city}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <PrintButton />
            <a href="#" className="btn btn-outline btn-sm">
              <Download className="w-4 h-4" aria-hidden /> PDF receipt
            </a>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="bg-ink text-white p-6">
            <div className="kicker text-alarm">Multiply your impact</div>
            <h2 className="font-display text-3xl font-bold mt-2">Share the appeal</h2>
            <p className="text-white/80 mt-2 text-sm">Donors who share bring in an average of ₦38,000 more from friends and family.</p>
            <ShareButtons designation={designation} />
          </div>
          <div className="card p-6">
            <h2 className="font-display text-2xl font-bold">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {[
                [Mail, "Receipt by email", pending ? "Once your transfer is matched (≤2 working days)." : "Within the next few minutes."],
                [CheckCircle2, "Funds allocated", "Your gift is assigned to the response within 7 days."],
                [Download, "Proof of impact", "You'll get the next situation report showing what was delivered."],
              ].map(([Icon, t, b], i) => {
                const I = Icon as typeof Mail;
                return (
                  <li key={i} className="flex gap-3">
                    <span className="w-9 h-9 shrink-0 grid place-items-center bg-sand border border-ink">
                      <I className="w-4 h-4" aria-hidden />
                    </span>
                    <div>
                      <div className="font-semibold">{t as string}</div>
                      <div className="text-sm text-muted">{b as string}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          {frequency === "one-time" && (
            <div className="bg-sand p-6 border-t-4 border-alarm">
              <h2 className="font-display text-2xl font-bold">Become a First Responder</h2>
              <p className="text-sm mt-2">A monthly gift to the Rapid Response Fund lets us move within hours of the next crisis.</p>
              <Link href="/donate?frequency=monthly&designation=rapid-response&amount=10000" className="btn btn-ink btn-block mt-4">
                Give ₦10,000 monthly
              </Link>
            </div>
          )}
          <Link href="/situation-reports" className="btn btn-outline btn-block">
            Read the latest sitreps
          </Link>
        </aside>
      </section>
    </>
  );
}
