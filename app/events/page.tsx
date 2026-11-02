import type { Metadata } from "next";
import { CalendarDays, MapPin } from "lucide-react";
import { events } from "@/mock/events";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { EventRegister } from "./event-register";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Donor briefings, fundraisers, kit-packing volunteer days and humanitarian training with Ubuntu Relief Network.",
};

export default function EventsPage() {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHero kicker="Diary" title="Events" lede="Briefings from the field, fundraisers, volunteer days and training. Come and see the response up close." />
      <Section pad="md">
        <ol className="border-b-[1.5px] border-ink">
          {sorted.map((e) => {
            const d = new Date(e.date);
            return (
              <li key={e.slug} id={e.slug} className="border-t-[1.5px] border-ink py-6 grid grid-cols-1 [&>*]:min-w-0 gap-5 md:grid-cols-[110px_1fr_auto] items-start scroll-mt-28">
                <div className="bg-ink text-white text-center py-3 w-[110px]">
                  <div className="font-display-normal text-5xl font-bold num leading-none">{d.getUTCDate()}</div>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] mt-1">{d.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })}</div>
                </div>
                <div>
                  <span className={`badge ${e.type === "Fundraiser" ? "badge-critical" : e.type === "Briefing" ? "badge-high" : "badge-ongoing"}`}>{e.type}</span>
                  <h2 className="font-display text-3xl font-bold mt-2">{e.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5" aria-hidden /> {formatDate(e.date, { weekday: "short", day: "numeric", month: "short" })} · {e.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" aria-hidden /> {e.venue}, {e.city}
                    </span>
                  </div>
                  <p className="mt-3 max-w-2xl">{e.description}</p>
                </div>
                <EventRegister title={e.title} cta={e.cta} />
              </li>
            );
          })}
        </ol>
      </Section>
    </>
  );
}
