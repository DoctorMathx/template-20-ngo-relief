import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Sitrep } from "@/lib/types";
import { UrgencyBadge } from "./urgency-badge";
import { formatDateTime } from "@/lib/utils";

export function SitrepRow({ sitrep, dark = false }: { sitrep: Sitrep; dark?: boolean }) {
  return (
    <article className={`grid grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[140px_minmax(0,1fr)_auto] gap-x-5 gap-y-2 py-5 border-t ${dark ? "border-ink-3" : "border-ink"} group`}>
      <div className="font-display-normal text-4xl font-bold text-alarm leading-none num">#{String(sitrep.number).padStart(2, "0")}</div>
      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <UrgencyBadge level={sitrep.urgency} />
          <span className={`font-mono text-xs uppercase tracking-wider ${dark ? "text-muted-dark" : "text-muted"}`}>{formatDateTime(sitrep.publishedAt)}</span>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-bold">
          <Link href={`/situation-reports/${sitrep.slug}`} className="hover:underline decoration-alarm decoration-2 underline-offset-4">
            {sitrep.title}
          </Link>
        </h3>
        <p className={`mt-1.5 text-[0.95rem] line-clamp-2 ${dark ? "text-white/75" : "text-muted"}`}>{sitrep.summary}</p>
      </div>
      <div className="hidden md:flex items-start">
        <Link href={`/situation-reports/${sitrep.slug}`} className={`btn btn-sm ${dark ? "btn-outline-light" : "btn-outline"}`} aria-label={`Read ${sitrep.title}`}>
          Read <ArrowUpRight className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
