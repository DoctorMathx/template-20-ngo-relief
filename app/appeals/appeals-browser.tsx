"use client";

import { useMemo, useState } from "react";
import type { Appeal, Urgency } from "@/lib/types";
import { AppealCard } from "@/components/ui/appeal-card";
import { urgencyLabel } from "@/lib/utils";

type Filter = "all" | Urgency;
type Sort = "urgency" | "gap" | "newest";

const ORDER: Record<Urgency, number> = { critical: 0, high: 1, ongoing: 2 };

export function AppealsBrowser({ appeals }: { appeals: Appeal[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("urgency");

  const list = useMemo(() => {
    const l = appeals.filter((a) => filter === "all" || a.urgency === filter);
    return [...l].sort((a, b) =>
      sort === "urgency" ? ORDER[a.urgency] - ORDER[b.urgency] : sort === "gap" ? b.goal - b.raised - (a.goal - a.raised) : b.startedOn.localeCompare(a.startedOn)
    );
  }, [appeals, filter, sort]);

  const filters: Filter[] = ["all", "critical", "high", "ongoing"];

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-y-[1.5px] border-ink py-4 mb-8">
        <div role="group" aria-label="Filter by urgency" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "all" ? appeals.length : appeals.filter((a) => a.urgency === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`min-h-[44px] px-4 border-[1.5px] font-mono text-xs uppercase tracking-[0.12em] ${
                  filter === f ? "bg-ink text-white border-ink" : "border-ink hover:bg-sand"
                }`}
              >
                {f === "all" ? "All" : urgencyLabel[f]} <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-3 text-sm">
          <span className="label-mono">Sort by</span>
          <select className="input w-auto min-w-[180px]" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="urgency">Urgency</option>
            <option value="gap">Largest funding gap</option>
            <option value="newest">Most recent</option>
          </select>
        </label>
      </div>
      {list.length === 0 ? (
        <p className="py-16 text-center text-muted">No appeals at this urgency level right now.</p>
      ) : (
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a, i) => (
            <AppealCard key={a.slug} appeal={a} priority={i < 3} />
          ))}
        </div>
      )}
    </>
  );
}
