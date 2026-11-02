"use client";

import { useState } from "react";
import { stateTiles } from "@/mock/regions";
import type { StateTile } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

const STATUS: Record<StateTile["status"], { label: string; cls: string }> = {
  active: { label: "Active emergency operation", cls: "bg-alarm-strong text-white border-alarm-strong" },
  office: { label: "Office / logistics hub", cls: "bg-ink text-white border-ink" },
  partner: { label: "Partner-led response", cls: "bg-sand-deep text-ink border-ink" },
  none: { label: "No current operation", cls: "bg-white text-muted border-hair" },
};

/** Stylised tile-grid map of Nigeria's 36 states + FCT. */
export function TileMap({ compact = false }: { compact?: boolean }) {
  const initial = stateTiles.find((t) => t.code === "BO") ?? stateTiles[0];
  const [sel, setSel] = useState<StateTile>(initial);
  const cols = 8;
  const rows = 7;

  return (
    <div className={compact ? "" : "grid gap-8 lg:grid-cols-[1.4fr_1fr] items-start"}>
      <div>
        <div
          className="grid gap-1 sm:gap-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
          role="group"
          aria-label="Map of Nigerian states showing where we work"
        >
          {stateTiles.map((t) => {
            const isSel = sel.code === t.code;
            return (
              <button
                key={t.code}
                type="button"
                onClick={() => setSel(t)}
                onMouseEnter={() => setSel(t)}
                aria-pressed={isSel}
                aria-label={`${t.name}: ${STATUS[t.status].label}`}
                style={{ gridColumn: t.col + 1, gridRow: t.row + 1 }}
                className={`relative aspect-square min-h-[36px] border-[1.5px] font-mono text-[11px] sm:text-xs font-semibold grid place-items-center transition-transform ${STATUS[t.status].cls} ${
                  isSel ? "outline outline-[3px] outline-ink outline-offset-1 z-10 scale-[1.06]" : "hover:scale-[1.04]"
                }`}
              >
                {t.code}
                {t.status === "active" && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse motion-reduce:animate-none" aria-hidden />}
              </button>
            );
          })}
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs">
          {(Object.keys(STATUS) as StateTile["status"][]).map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span className={`w-4 h-4 border-[1.5px] ${STATUS[k].cls}`} aria-hidden />
              <span className="font-mono uppercase tracking-wider">{STATUS[k].label}</span>
            </li>
          ))}
        </ul>
      </div>

      {!compact && (
        <div className="card p-6 lg:sticky lg:top-32" aria-live="polite">
          <div className="label-mono">Selected state</div>
          <div className="font-display text-4xl font-bold mt-1">{sel.name}</div>
          <div className="mt-3">
            <span className={`badge border-[1.5px] ${STATUS[sel.status].cls}`}>{STATUS[sel.status].label}</span>
          </div>
          {sel.note && <p className="mt-4 text-[1.05rem]">{sel.note}</p>}
          <div className="mt-5 border-t-[1.5px] border-ink pt-4">
            <div className="label-mono">People reached since 2024</div>
            <div className="font-display-normal text-5xl font-bold num mt-1">{sel.reached ? formatNumber(sel.reached) : "—"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
