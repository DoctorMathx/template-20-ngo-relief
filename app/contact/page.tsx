import type { Metadata } from "next";
import { Mail, MessageCircle, Phone, Siren } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { SimpleForm } from "@/components/ui/simple-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Ubuntu Relief Network — supporter care, media, partnerships and our 24/7 emergency desk in Abuja, Maiduguri, Yola and Makurdi.",
};

export default function ContactPage() {
  const { brand, org } = siteConfig;
  return (
    <>
      <PageHero kicker="Supporter care · Media · Partnerships" title="Contact us" lede="Our emergency desk is staffed 24/7. Supporter care replies within one working day." />
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-6">
            <div className="bg-alarm-strong text-white p-6">
              <Siren className="w-7 h-7" aria-hidden />
              <div className="font-display text-2xl font-bold mt-3">Report an emergency</div>
              <p className="text-sm text-white/90 mt-1">Community leaders and local officials can alert our desk any time.</p>
              <div className="font-mono text-base sm:text-lg font-semibold mt-3">{brand.emergencyLine}</div>
            </div>
            <ul className="border-t-[1.5px] border-ink">
              {[
                [Phone, "Phone", brand.phone, `tel:${brand.phone.replace(/\s/g, "")}`],
                [MessageCircle, "WhatsApp", brand.whatsapp, `https://wa.me/${brand.whatsapp.replace(/\D/g, "")}`],
                [Mail, "Supporter care", brand.email, `mailto:${brand.email}`],
                [Mail, "Partnerships", brand.partnershipsEmail, `mailto:${brand.partnershipsEmail}`],
              ].map(([Icon, k, v, href]) => {
                const I = Icon as typeof Phone;
                return (
                  <li key={k as string} className="border-b-[1.5px] border-ink">
                    <a href={href as string} className="flex items-center gap-3 sm:gap-4 py-4 min-h-[44px] hover:text-alarm-strong">
                      <I className="w-5 h-5 shrink-0" aria-hidden />
                      <span className="label-mono w-24 sm:w-32 shrink-0">{k as string}</span>
                      <span className="font-semibold min-w-0 [overflow-wrap:anywhere]">{v as string}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{org.hours}</p>

            <div className="relative aspect-[4/3] bg-sand border-[1.5px] border-ink overflow-hidden" role="img" aria-label={`Map placeholder showing ${org.hq.address}, ${org.hq.city}`}>
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(#DCD2C1 1px, transparent 1px), linear-gradient(90deg, #DCD2C1 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
                aria-hidden
              />
              <div className="absolute left-0 right-0 top-[58%] h-3 bg-white border-y border-sand-deep" aria-hidden />
              <div className="absolute top-0 bottom-0 left-[38%] w-3 bg-white border-x border-sand-deep" aria-hidden />
              <div className="absolute left-[38%] top-[58%] -translate-x-1/2 -translate-y-full flex flex-col items-center" aria-hidden>
                <span className="bg-ink text-white font-mono text-[11px] uppercase tracking-wider px-2 py-1 whitespace-nowrap">URN HQ · Mabushi</span>
                <span className="w-0 h-0 border-x-[8px] border-x-transparent border-t-[10px] border-t-ink" />
              </div>
              <div className="absolute bottom-3 left-3 bg-white border border-ink px-3 py-2 text-xs">
                <div className="font-semibold">{org.hq.address}</div>
                <div>{org.hq.city}</div>
              </div>
            </div>
          </div>

          <div className="border-[1.5px] border-ink p-5 sm:p-6 md:p-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Send a message</h2>
            <p className="text-muted mt-1 mb-6">For donation queries, please include your receipt reference.</p>
            <SimpleForm
              id="contact"
              fields={[
                { name: "name", label: "Full name", required: true, half: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
                { name: "topic", label: "Topic", type: "select", required: true, half: true, options: ["Donation or receipt", "Monthly giving", "Media enquiry", "Partnership", "Volunteering", "Feedback or complaint", "Other"] },
                { name: "ref", label: "Receipt reference (optional)", placeholder: "URN-XXXXXX" },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
              submitLabel="Send message"
              successTitle="Message sent"
              successBody="Thanks for getting in touch. Our supporter care team will reply within one working day."
            />
          </div>
        </div>
      </Section>
      <Section tone="sand" pad="sm">
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[org.hq, ...org.fieldOffices].map((o) => (
            <div key={o.label} className="border-t-4 border-ink pt-3">
              <div className="label-mono">{o.label}</div>
              <div className="font-display text-xl font-bold mt-1">{o.city}</div>
              <p className="text-sm text-muted">{o.address}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
