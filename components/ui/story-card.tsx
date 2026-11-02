import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function StoryCard({ story, variant = "default" }: { story: Story; variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <article className="border-t border-ink pt-4">
        <div className="kicker text-alarm-strong">{story.category}</div>
        <h3 className="font-display text-xl font-bold mt-2">
          <Link href={`/stories/${story.slug}`} className="hover:underline decoration-alarm decoration-2 underline-offset-4">
            {story.title}
          </Link>
        </h3>
        <div className="label-mono mt-2">
          {formatDate(story.date)} · {story.location}
        </div>
      </article>
    );
  }
  return (
    <article className="group flex flex-col h-full">
      <Link href={`/stories/${story.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ink" tabIndex={-1} aria-hidden>
        <Image src={story.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover photo-hc group-hover:scale-[1.03] transition-transform duration-500" />
        <span className="absolute top-0 left-0 bg-ink text-white kicker px-2.5 py-1.5">{story.category}</span>
      </Link>
      <div className="pt-4 border-b border-ink pb-5 flex-1">
        <div className="label-mono">
          {formatDate(story.date)} · {story.location} · {story.readMins} min read
        </div>
        <h3 className="font-display text-2xl font-bold mt-2">
          <Link href={`/stories/${story.slug}`} className="hover:underline decoration-alarm decoration-2 underline-offset-4">
            {story.title}
          </Link>
        </h3>
        <p className="mt-2 text-muted text-[0.95rem] line-clamp-3">{story.excerpt}</p>
      </div>
    </article>
  );
}
