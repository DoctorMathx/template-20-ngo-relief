import { Section } from "@/components/ui/section";
import { NewsletterForm } from "@/components/ui/newsletter-form";

export function NewsletterSection() {
  return (
    <Section tone="sand" pad="md">
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-8 lg:grid-cols-2 items-center">
        <div>
          <div className="kicker text-alarm-strong">Emergency alerts</div>
          <h2 className="font-display font-bold text-4xl md:text-5xl mt-3">Know when a crisis hits — and what your gift did</h2>
          <p className="lede mt-3">One email when we launch an appeal, plus a fortnightly digest of sitreps. Unsubscribe any time.</p>
        </div>
        <div className="bg-white border-[1.5px] border-ink p-6">
          <NewsletterForm />
        </div>
      </div>
    </Section>
  );
}
