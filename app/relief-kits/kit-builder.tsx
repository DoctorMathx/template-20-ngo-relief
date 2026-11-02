"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Minus, Plus, Trash2, PackageOpen } from "lucide-react";
import { reliefKits } from "@/mock/relief-kits";
import { formatNaira, formatNumber } from "@/lib/utils";

type Qty = Record<string, number>;
const MAX = 99;

const BUNDLES: { name: string; desc: string; items: Qty }[] = [
  { name: "Family survival pack", desc: "Everything one displaced family needs for the first fortnight", items: { "food-parcel": 1, "hygiene-kit": 1, "water-kit": 1, "shelter-kit": 1 } },
  { name: "Cholera response pack", desc: "Protect five households and treat 50 patients", items: { "hygiene-kit": 5, "water-kit": 5, "medical-kit": 1 } },
  { name: "Camp classroom", desc: "Restart learning for 80 children", items: { "school-box": 2, "food-parcel": 1 } },
];

export function KitBuilder() {
  const params = useSearchParams();
  const [qty, setQty] = useState<Qty>(() => {
    const add = params.get("add");
    return add && reliefKits.some((k) => k.id === add) ? { [add]: 1 } : {};
  });

  const set = (id: string, n: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(MAX, Math.floor(n) || 0)) }));

  const lines = reliefKits.filter((k) => (qty[k.id] ?? 0) > 0).map((k) => ({ kit: k, n: qty[k.id] }));
  const total = lines.reduce((s, l) => s + l.kit.price * l.n, 0);
  const items = lines.reduce((s, l) => s + l.n, 0);

  const impact = useMemo(() => {
    const out: string[] = [];
    const get = (id: string) => qty[id] ?? 0;
    if (get("food-parcel")) out.push(`${formatNumber(get("food-parcel") * 6)} people fed for 14 days`);
    if (get("hygiene-kit")) out.push(`${formatNumber(get("hygiene-kit"))} household${get("hygiene-kit") > 1 ? "s" : ""} protected from cholera for a month`);
    if (get("shelter-kit")) out.push(`${formatNumber(get("shelter-kit"))} famil${get("shelter-kit") > 1 ? "ies" : "y"} given a dry place to sleep`);
    if (get("water-kit")) out.push(`${formatNumber(get("water-kit") * 6)} people with safe water for 3 months`);
    if (get("medical-kit")) out.push(`${formatNumber(get("medical-kit") * 50)} patients treated at a mobile clinic`);
    if (get("school-box")) out.push(`${formatNumber(get("school-box") * 40)} children back in learning`);
    return out;
  }, [qty]);

  const people = lines.reduce((s, l) => s + l.kit.peoplePerUnit * l.n, 0);
  const kitParam = lines.map((l) => `${l.kit.id}:${l.n}`).join(",");
  const donateHref = `/donate?amount=${total}&designation=relief-kits&kit=${encodeURIComponent(kitParam)}`;

  return (
    <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1.7fr_1fr] items-start">
      <div>
        <div className="border-t-4 border-ink pt-4 mb-6">
          <div className="kicker text-alarm-strong">Step 1</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Start from a ready-made pack, or build your own</h2>
        </div>
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-3 gap-3 mb-10">
          {BUNDLES.map((b) => (
            <button
              key={b.name}
              type="button"
              onClick={() => setQty({ ...b.items })}
              className="text-left border-[1.5px] border-ink p-4 hover:bg-ink hover:text-white transition-colors group min-h-[44px]"
            >
              <PackageOpen className="w-5 h-5 text-alarm-strong group-hover:text-alarm" aria-hidden />
              <div className="font-display text-xl font-bold mt-2">{b.name}</div>
              <div className="text-sm opacity-80 mt-1">{b.desc}</div>
              <div className="font-mono text-sm font-semibold mt-3 num">
                {formatNaira(Object.entries(b.items).reduce((s, [id, n]) => s + (reliefKits.find((k) => k.id === id)?.price ?? 0) * n, 0))}
              </div>
            </button>
          ))}
        </div>

        <ul className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 gap-5">
          {reliefKits.map((k) => {
            const n = qty[k.id] ?? 0;
            return (
              <li key={k.id} className={`card flex flex-col ${n > 0 ? "outline outline-[3px] outline-alarm -outline-offset-[1px]" : ""}`}>
                <div className="relative aspect-[16/9] bg-ink overflow-hidden">
                  <Image src={k.image} alt={k.imageAlt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw" className="object-cover photo-hc" />
                  <div className="absolute inset-0 overlay-bottom" aria-hidden />
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
                    <div className="font-display text-2xl font-bold">{k.name}</div>
                    <div className="font-display-normal text-2xl font-bold num">{formatNaira(k.price)}</div>
                  </div>
                  {n > 0 && <span className="absolute top-3 right-3 badge badge-critical">×{n} in kit</span>}
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="font-semibold">{k.impact}</p>
                  <ul className="mt-3 text-sm text-muted space-y-1">
                    {k.contents.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="w-1.5 h-1.5 bg-ink mt-2 shrink-0" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 flex items-center justify-between gap-3">
                    <span className="label-mono">{k.unitLabel}</span>
                    <div className="flex items-stretch border-[1.5px] border-ink" role="group" aria-label={`Quantity of ${k.name}`}>
                      <button type="button" onClick={() => set(k.id, n - 1)} disabled={n === 0} className="w-11 h-11 grid place-items-center hover:bg-sand disabled:opacity-30" aria-label={`Remove one ${k.name}`}>
                        <Minus className="w-4 h-4" aria-hidden />
                      </button>
                      <label className="sr-only" htmlFor={`q-${k.id}`}>
                        {k.name} quantity
                      </label>
                      <input
                        id={`q-${k.id}`}
                        inputMode="numeric"
                        value={n}
                        onChange={(e) => set(k.id, Number(e.target.value.replace(/\D/g, "")))}
                        className="w-12 text-center font-mono font-semibold border-x-[1.5px] border-ink num focus:outline-none focus:bg-sand"
                      />
                      <button type="button" onClick={() => set(k.id, n + 1)} disabled={n >= MAX} className="w-11 h-11 grid place-items-center bg-ink text-white hover:bg-black disabled:opacity-30" aria-label={`Add one ${k.name}`}>
                        <Plus className="w-4 h-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <aside className="lg:sticky lg:top-32 bg-ink text-white" aria-label="Your relief kit">
        <div className="p-6 border-b border-ink-3">
          <div className="kicker text-alarm">Step 2 · Your kit</div>
          <div className="font-display text-3xl font-bold mt-1">
            {items} item{items === 1 ? "" : "s"}
          </div>
        </div>
        {lines.length === 0 ? (
          <div className="p-6 text-white/70">
            <p>Your kit is empty. Add items or choose a ready-made pack to see the impact of your gift.</p>
          </div>
        ) : (
          <ul className="px-6 divide-y divide-ink-3">
            {lines.map((l) => (
              <li key={l.kit.id} className="py-3 flex items-center gap-3">
                <span className="font-mono text-sm text-alarm w-8 num">×{l.n}</span>
                <span className="flex-1 min-w-0">{l.kit.name}</span>
                <span className="font-mono text-sm num">{formatNaira(l.kit.price * l.n)}</span>
                <button type="button" onClick={() => set(l.kit.id, 0)} className="w-11 h-11 grid place-items-center text-muted-dark hover:text-alarm" aria-label={`Remove ${l.kit.name} from kit`}>
                  <Trash2 className="w-4 h-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="p-6 border-t-2 border-white mt-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <span className="label-mono text-muted-dark">Total</span>
            <span className="font-display-normal text-4xl sm:text-5xl font-bold num" aria-live="polite">
              {formatNaira(total)}
            </span>
          </div>
          {impact.length > 0 && (
            <div className="mt-5 bg-ink-2 p-4 border-l-4 border-alarm">
              <div className="label-mono text-muted-dark">Your kit delivers</div>
              <div className="font-display text-xl font-bold mt-1">≈ {formatNumber(people)} people helped</div>
              <ul className="mt-2 space-y-1.5 text-sm text-white/85">
                {impact.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-alarm" aria-hidden>
                      ■
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {total > 0 ? (
            <Link href={donateHref} className="btn btn-alarm btn-lg btn-block mt-5">
              Donate this kit
            </Link>
          ) : (
            <button type="button" disabled className="btn btn-alarm btn-lg btn-block mt-5">
              Donate this kit
            </button>
          )}
          {total > 0 && (
            <button type="button" onClick={() => setQty({})} className="mt-2 w-full min-h-[44px] font-mono text-xs uppercase tracking-wider text-muted-dark hover:text-white">
              Clear kit
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
