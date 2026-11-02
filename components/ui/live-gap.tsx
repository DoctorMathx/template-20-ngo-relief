"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira } from "@/lib/utils";

/**
 * Funding gap that "ticks" down slowly to feel live. Purely cosmetic demo behaviour —
 * disable with `siteConfig.liveSimulation = false`. Starts from the real figure so SSR matches.
 */
export function LiveGap({ gap, big = false }: { gap: number; big?: boolean }) {
  const [value, setValue] = useState(Math.max(0, gap));
  useEffect(() => {
    if (!siteConfig.liveSimulation) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const floor = Math.max(0, gap - Math.round(gap * 0.004));
    const id = window.setInterval(() => {
      const step = [5_000, 10_000, 25_000, 50_000][Math.floor(Math.random() * 4)];
      setValue((v) => Math.max(floor, v - step));
    }, 4200);
    return () => window.clearInterval(id);
  }, [gap]);
  return (
    <span className={big ? "num" : "font-mono text-sm font-semibold num text-alarm-strong"} aria-live="off">
      {formatNaira(value)}
    </span>
  );
}
