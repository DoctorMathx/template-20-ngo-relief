import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/mock/faqs";
import type { Faq } from "@/lib/types";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about donating, tax receipts, refunds, how emergency funds are used, and volunteering with Ubuntu Relief Network.",
};

const ORDER: Faq["category"][] = ["Donations", "Tax & receipts", "Refunds", "Operations", "Volunteering"];

export default function FaqPage() {
  return (
    <>
      <PageHero kicker="Help desk" title="Frequently asked questions" lede="Everything about giving, receipts, refunds and how we work. Can't find it? Our supporter care team is a message away." />
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="FAQ categories" className="lg:sticky lg:top-32 self-start">
            <ul className="flex lg:flex-col flex-wrap gap-2">
              {ORDER.map((c) => (
                <li key={c}>
                  <a href={`#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="btn btn-outline btn-sm w-full justify-start">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {ORDER.map((c) => (
              <section key={c} id={c.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-32">
                <h2 className="font-display text-4xl font-bold mb-4">{c}</h2>
                <FaqAccordion items={faqs.filter((f) => f.category === c)} defaultOpen={null} />
              </section>
            ))}
            <div className="bg-sand p-6 border-t-4 border-alarm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-display text-2xl font-bold">Still have a question?</div>
                <p className="text-muted">We reply within one working day.</p>
              </div>
              <Link href="/contact" className="btn btn-ink">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
