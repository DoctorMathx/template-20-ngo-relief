import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { stories } from "@/mock/stories";
import { Section, SectionHeader } from "@/components/ui/section";
import { StoryCard } from "@/components/ui/story-card";

export function StoriesSection() {
  const sorted = [...stories].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;
  return (
    <Section pad="md">
      <SectionHeader
        kicker="Dispatches"
        title="Stories from the field"
        action={
          <Link href="/stories" className="btn btn-outline">
            All stories <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        }
      />
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <StoryCard story={lead} />
        <div className="space-y-6">
          {rest.slice(0, 4).map((s) => (
            <StoryCard key={s.slug} story={s} variant="compact" />
          ))}
        </div>
      </div>
    </Section>
  );
}
