import type { Metadata } from "next";
import { Suspense } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { DonateForm } from "./donate-form";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give to an emergency appeal, the Rapid Response Fund or a relief kit. One-time, monthly or annual gifts by card, bank transfer or USSD.",
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-10 md:py-14 grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="kicker text-alarm flex items-center gap-2">
              <span className="live-dot" aria-hidden /> Secure donation
            </div>
            <h1 className="font-display font-bold text-5xl md:text-7xl mt-3">Give now. Reach them in 72 hours.</h1>
          </div>
          <ul className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75 space-y-2">
            <li className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-alarm" aria-hidden /> 256-bit encrypted checkout
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-alarm" aria-hidden /> Registered not-for-profit · Audited annually
            </li>
          </ul>
        </div>
        <div className="h-1.5 bg-alarm" aria-hidden />
      </section>
      <div className="container-x py-10 md:py-14">
        <Suspense fallback={<div className="h-[600px] bg-sand animate-pulse" aria-hidden />}>
          <DonateForm />
        </Suspense>
      </div>
    </>
  );
}
