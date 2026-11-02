import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Logo({ dark = false, onClick }: { dark?: boolean; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2.5 shrink-0" aria-label={`${siteConfig.brand.name} — home`}>
      <span aria-hidden className="relative w-10 h-10 bg-alarm-strong grid place-items-center">
        <span className="absolute w-5 h-[5px] bg-white" />
        <span className="absolute w-[5px] h-5 bg-white" />
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-bold tracking-[0.04em] ${dark ? "text-white" : "text-ink"}`}>Ubuntu Relief</span>
        <span className={`block font-mono text-[10px] uppercase tracking-[0.28em] mt-1 ${dark ? "text-muted-dark" : "text-muted"}`}>Network · Nigeria</span>
      </span>
    </Link>
  );
}
