import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";

const timeline = [
  { t: "H+0", text: "Alert from community early-warning volunteer or SEMA" },
  { t: "H+4", text: "Rapid Response Fund releases cash — no waiting for an appeal" },
  { t: "H+24", text: "Needs assessment complete; pre-positioned stock moving" },
  { t: "H+41", text: "Median time to first distribution in 2025" },
  { t: "H+72", text: "Public appeal launched with full sitrep" },
];

export function RapidResponse() {
  return (
    <Section tone="ink" className="grid-lines">
      <SectionHeader
        dark
        kicker="Rapid Response Fund"
        title="Be a First Responder"
        lede="Disasters don't wait for fundraising. A monthly, unrestricted gift lets us move in hours — before the cameras arrive and before an appeal exists."
      />
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-2">
        <ol className="border-l-2 border-alarm">
          {timeline.map((s) => (
            <li key={s.t} className="relative pl-8 pb-7 last:pb-0">
              <span className="absolute -left-[9px] top-1 w-4 h-4 bg-ink border-2 border-alarm" aria-hidden />
              <div className="font-mono text-alarm text-sm font-semibold">{s.t}</div>
              <div className="text-lg mt-0.5">{s.text}</div>
            </li>
          ))}
        </ol>
        <div className="border-[1.5px] border-white p-6 md:p-8 self-start">
          <div className="kicker text-alarm">Why unrestricted?</div>
          <ul className="mt-4 space-y-4">
            {[
              ["Speed", "Funds released within 4 hours of an alert, not 4 weeks."],
              ["Forgotten crises", "Small floods and outbreaks rarely make the news — they still need a response."],
              ["Preparedness", "Stock bought in the dry season costs up to 30% less than in a crisis."],
            ].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[96px_1fr] sm:grid-cols-[120px_1fr] gap-3 sm:gap-4 border-t border-ink-3 pt-4">
                <span className="font-display text-xl font-bold">{k}</span>
                <span className="text-white/80">{v}</span>
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/donate?frequency=monthly&designation=rapid-response&amount=10000" className="btn btn-alarm btn-lg">
              Give ₦10,000 monthly
            </Link>
            <Link href="/rapid-response-fund" className="btn btn-outline-light btn-lg">
              How it works <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
