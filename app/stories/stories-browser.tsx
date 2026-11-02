"use client";

import { useState } from "react";
import type { Story } from "@/lib/types";
import { StoryCard } from "@/components/ui/story-card";

const CATS = ["All", "Field dispatch", "Survivor story", "News", "Opinion"] as const;

export function StoriesBrowser({ stories }: { stories: Story[] }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = stories.filter((s) => cat === "All" || s.category === cat);
  return (
    <>
      <div role="group" aria-label="Filter stories" className="flex flex-wrap gap-2 border-y-[1.5px] border-ink py-4 mb-10">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={cat === c}
            onClick={() => setCat(c)}
            className={`min-h-[44px] px-4 border-[1.5px] border-ink font-mono text-xs uppercase tracking-[0.12em] ${cat === c ? "bg-ink text-white" : "hover:bg-sand"}`}
          >
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="text-muted py-12 text-center">No stories in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {list.map((s) => (
            <StoryCard key={s.slug} story={s} />
          ))}
        </div>
      )}
    </>
  );
}
