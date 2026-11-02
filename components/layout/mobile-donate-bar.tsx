"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

/** Sticky donate bar on small screens; hidden inside the donate flow itself. */
export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate")) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-ink border-t-4 border-alarm px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0 text-white">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-alarm flex items-center gap-1.5">
          <span className="live-dot" aria-hidden /> Critical appeal
        </div>
        <div className="text-sm font-semibold truncate">Borno floods — every gift matched</div>
      </div>
      <Link href={`/donate?campaign=${siteConfig.topEmergencySlug}`} className="btn btn-alarm btn-sm">
        Donate
      </Link>
    </div>
  );
}
