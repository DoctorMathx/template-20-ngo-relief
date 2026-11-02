import type { NeedResponse } from "@/lib/types";
import { formatNumber, percent } from "@/lib/utils";

/** Horizontal "need vs reached" bars: full bar = need, filled = reached, remainder = gap. */
export function NeedsBars({ needs }: { needs: NeedResponse[] }) {
  return (
    <ul className="space-y-4">
      {needs.map((n) => {
        const pct = percent(n.reached, n.need);
        return (
          <li key={n.sector}>
            <div className="flex justify-between items-baseline gap-3 text-sm">
              <span className="font-semibold">{n.sector}</span>
              <span className="font-mono text-xs num text-right">
                {formatNumber(n.reached)} / {formatNumber(n.need)} {n.unit}
              </span>
            </div>
            <div className="mt-1.5 h-3 bg-white border border-ink relative" role="img" aria-label={`${n.sector}: ${pct}% of need met`}>
              <span className="absolute inset-y-0 left-0 bg-ink" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[11px] uppercase tracking-wider">
              <span>{pct}% covered</span>
              <span className="text-alarm-strong font-semibold">Gap {formatNumber(n.need - n.reached)}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
