import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { KitBuilder } from "./kit-builder";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Build a relief kit",
  description: "Choose food parcels, hygiene kits, shelter, clean water, medical supplies and school-in-a-box kits — then donate your custom relief kit in one step.",
};

export default function ReliefKitsPage() {
  return (
    <>
      <PageHero
        kicker="In-kind giving"
        title="Build a relief kit"
        lede="Pick what goes on the next truck. We buy every item in bulk from Nigerian suppliers close to the crisis — so your naira goes further and reaches families faster."
        image={photo("packing", 1800)}
        imageAlt="Volunteers packing relief boxes"
      />
      <Section pad="md">
        <Suspense fallback={<div className="h-96 bg-sand animate-pulse" aria-hidden />}>
          <KitBuilder />
        </Suspense>
      </Section>
      <Section tone="sand" pad="sm">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-3">
          {[
            ["Bought locally", "Items are procured in Maiduguri, Yola, Makurdi or Kano — supporting local traders and cutting transport time."],
            ["Delivered to need", "Kits go to the active emergency with the largest gap for that item, as shown in our sitreps."],
            ["Proof of delivery", "Distribution records and photos appear in the next situation report for that operation."],
          ].map(([t, b]) => (
            <div key={t} className="border-t-4 border-ink pt-3">
              <div className="font-display text-2xl font-bold">{t}</div>
              <p className="text-muted mt-2">{b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
