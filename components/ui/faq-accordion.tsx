"use client";

import { useId, useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Faq } from "@/lib/types";

export function FaqAccordion({ items, defaultOpen = 0 }: { items: Faq[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();
  return (
    <div className="border-b-[1.5px] border-ink">
      {items.map((f, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          <div key={f.q} className="border-t-[1.5px] border-ink">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-btn`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-6 py-5 text-left min-h-[44px] group"
              >
                <span className="font-semibold text-[1.05rem] group-hover:text-alarm-strong">{f.q}</span>
                <span className={`shrink-0 w-9 h-9 grid place-items-center border-[1.5px] border-ink ${isOpen ? "bg-ink text-white" : ""}`} aria-hidden>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!isOpen} className="pb-6 pr-14 text-muted leading-relaxed">
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
