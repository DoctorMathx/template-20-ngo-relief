import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { regions } from "@/mock/regions";
import { Section, SectionHeader } from "@/components/ui/section";
import { TileMap } from "@/components/ui/tile-map";
import { formatNumber } from "@/lib/utils";

export function WhereWeWorkSection() {
  return (
    <Section pad="md">
      <SectionHeader
        kicker="Operations map"
        title="Where we work"
        action={
          <Link href="/where-we-work" className="btn btn-outline">
            Full map <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        }
      />
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1fr] items-start">
        <TileMap compact />
        <div className="border-t-[1.5px] border-ink">
          {regions.map((r) => (
            <div key={r.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-4 border-b-[1.5px] border-ink">
              <div>
                <div className="font-display text-2xl font-bold">{r.name}</div>
                <div className="label-mono mt-1">{r.states.join(" · ")}</div>
              </div>
              <div className="text-right">
                <div className="font-display-normal text-2xl font-bold num">{formatNumber(r.peopleReached)}</div>
                <div className="label-mono">
                  reached · <span className="text-alarm-strong font-semibold">{r.activeOperations} active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
