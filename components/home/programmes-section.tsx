import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programmes } from "@/mock/programmes";
import { Section, SectionHeader } from "@/components/ui/section";

export function ProgrammesSection() {
  return (
    <Section tone="sand" pad="md">
      <SectionHeader kicker="What we do" title="Five ways we respond" />
      <ol className="border-t-[1.5px] border-ink">
        {programmes.map((p, i) => (
          <li key={p.slug} className="border-b-[1.5px] border-ink">
            <Link href={`/programmes/${p.slug}`} className="group grid grid-cols-[40px_minmax(0,1fr)_auto] sm:grid-cols-[48px_minmax(0,1fr)_auto] md:grid-cols-[80px_minmax(0,1.1fr)_minmax(0,1.5fr)_auto] gap-3 sm:gap-4 md:gap-8 py-6 items-center hover:bg-white transition-colors px-2">
              <span className="font-display-normal font-bold text-3xl md:text-4xl text-alarm num">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl md:text-3xl font-bold">{p.title}</span>
              <span className="hidden md:block text-muted">{p.short}</span>
              <span className="w-11 h-11 shrink-0 grid place-items-center border-[1.5px] border-ink group-hover:bg-ink group-hover:text-white" aria-hidden>
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  );
}
