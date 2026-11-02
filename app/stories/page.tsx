import type { Metadata } from "next";
import { stories } from "@/mock/stories";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { StoriesBrowser } from "./stories-browser";

export const metadata: Metadata = {
  title: "Stories & news",
  description: "Field dispatches, survivor stories, news and opinion from Ubuntu Relief Network's teams across Nigeria.",
};

export default function StoriesPage() {
  const sorted = [...stories].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero kicker="Dispatches" title="Stories & news" lede="Reporting from the places we work, by the people who live there." />
      <Section pad="md">
        <StoriesBrowser stories={sorted} />
      </Section>
    </>
  );
}
