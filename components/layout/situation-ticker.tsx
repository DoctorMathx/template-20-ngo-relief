import Link from "next/link";
import { tickerItems } from "@/mock/ticker";

/** Scrolling "live situation" bar under the header. Pauses on hover/focus and for reduced motion. */
export function SituationTicker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="ticker bg-ink text-white border-b border-ink-3 relative z-30" role="region" aria-label="Situation updates">
      <div className="flex items-stretch h-11">
        <div className="shrink-0 bg-alarm-strong px-3 md:px-4 flex items-center gap-2 font-display font-bold tracking-[0.1em] text-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse motion-reduce:animate-none" aria-hidden />
          <span className="hidden sm:inline">Situation</span> Live
        </div>
        <div className="overflow-hidden flex-1 relative">
          <ul className="ticker-track h-full items-center">
            {items.map((t, i) => (
              <li key={i} className="flex items-center shrink-0 h-full" aria-hidden={i >= tickerItems.length ? true : undefined}>
                <Link
                  href={t.href ?? "/situation-reports"}
                  tabIndex={i >= tickerItems.length ? -1 : undefined}
                  className="flex items-center gap-3 px-5 h-full text-sm hover:text-alarm whitespace-nowrap"
                >
                  <span className="font-mono text-xs text-muted-dark num">{t.time}</span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.12em] text-alarm">{t.tag}</span>
                  <span>{t.text}</span>
                </Link>
                <span aria-hidden className="w-1.5 h-1.5 bg-ink-3 rotate-45 border border-muted-dark" />
              </li>
            ))}
          </ul>
        </div>
        <Link
          href="/situation-reports"
          className="hidden md:flex shrink-0 items-center px-4 border-l border-ink-3 font-mono text-[11px] uppercase tracking-[0.12em] hover:bg-ink-2"
        >
          All sitreps →
        </Link>
      </div>
    </div>
  );
}
