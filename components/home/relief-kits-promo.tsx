import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { reliefKits } from "@/mock/relief-kits";
import { Section } from "@/components/ui/section";
import { formatNaira } from "@/lib/utils";

export function ReliefKitsPromo() {
  return (
    <Section tone="sand" pad="md">
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.6fr] items-start">
        <div className="border-t-4 border-ink pt-4">
          <div className="kicker text-alarm-strong flex items-center gap-2">
            <span aria-hidden className="inline-block w-3 h-3 bg-alarm" /> In-kind giving
          </div>
          <h2 className="font-display font-bold text-5xl md:text-6xl mt-3">Build a relief kit</h2>
          <p className="lede mt-4">
            Choose exactly what goes on the next truck: food, water, shelter, medicine or a school-in-a-box. See your total and
            the people you&apos;ll reach, then give it in one tap.
          </p>
          <Link href="/relief-kits" className="btn btn-ink btn-lg mt-7">
            Start building <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-px bg-ink border-[1.5px] border-ink">
          {reliefKits.map((k) => (
            <li key={k.id} className="bg-white">
              <Link href={`/relief-kits?add=${k.id}`} className="group block h-full">
                <div className="relative aspect-[4/3] bg-ink overflow-hidden">
                  <Image src={k.image} alt={k.imageAlt} fill sizes="(min-width:768px) 20vw, 50vw" className="object-cover photo-mono group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3.5">
                  <div className="font-display text-lg font-bold leading-tight group-hover:text-alarm-strong">{k.name}</div>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-mono text-sm font-semibold num">{formatNaira(k.price)}</span>
                    <span className="label-mono text-right">{k.unitLabel}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
