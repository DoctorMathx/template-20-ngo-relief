import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart, Megaphone, Building2, Package } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { SimpleForm } from "@/components/ui/simple-form";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Volunteer with Ubuntu Relief Network, fundraise for an emergency appeal, or partner with us as a company or community group.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        kicker="Join the response"
        title="Get involved"
        lede="Pack kits in Lagos. Join the standby roster in Maiduguri. Run a marathon. Rally your church, mosque or office. There's a role for everyone."
        image={photo("volunteer", 1800)}
        imageAlt="A volunteer in a VOLUNTEER t-shirt, seen from behind"
      />
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border-[1.5px] border-ink">
          {[
            [HandHeart, "Volunteer", "Kit-packing days, office support or our trained field roster.", "#volunteer"],
            [Megaphone, "Fundraise", "Run, cycle, fast or celebrate — and raise money for an appeal.", "#fundraise"],
            [Building2, "Partner", "Corporate matching, CSR, and employee giving.", "/partnerships"],
            [Package, "Build a kit", "Choose the exact relief items you want to fund.", "/relief-kits"],
          ].map(([Icon, t, b, href]) => {
            const I = Icon as typeof HandHeart;
            return (
              <Link key={t as string} href={href as string} className="bg-white p-6 group hover:bg-ink hover:text-white transition-colors">
                <I className="w-7 h-7 text-alarm-strong group-hover:text-alarm" aria-hidden />
                <div className="font-display text-3xl font-bold mt-4">{t as string}</div>
                <p className="mt-2 text-sm opacity-80">{b as string}</p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section tone="sand" id="volunteer" className="scroll-mt-28">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader kicker="Volunteer application" title="Volunteer with us" />
            <ul className="space-y-4">
              {[
                ["Kit-packing days", "Lagos & Abuja · no experience needed · groups welcome"],
                ["Standby roster", "Trained volunteers deployed within 48 hrs to the North-East and North-Central"],
                ["Skilled volunteering", "Doctors, nurses, engineers, data analysts, translators (Hausa, Kanuri, Fulfulde, Tiv)"],
              ].map(([t, b]) => (
                <li key={t} className="border-l-4 border-ink pl-4">
                  <div className="font-display text-xl font-bold">{t}</div>
                  <div className="text-sm text-muted">{b}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border-[1.5px] border-ink p-6 md:p-8">
            <SimpleForm
              id="volunteer"
              fields={[
                { name: "first", label: "First name", required: true, half: true, autoComplete: "given-name" },
                { name: "last", label: "Last name", required: true, half: true, autoComplete: "family-name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone (WhatsApp)", type: "tel", required: true, half: true, autoComplete: "tel" },
                { name: "state", label: "State of residence", type: "select", required: true, half: true, options: ["Abuja (FCT)", "Lagos", "Borno", "Adamawa", "Yobe", "Benue", "Kano", "Kaduna", "Rivers", "Oyo", "Enugu", "Other"] },
                { name: "role", label: "I'd like to", type: "select", required: true, half: true, options: ["Pack kits at an event", "Join the field standby roster", "Offer professional skills", "Help at the office"] },
                { name: "skills", label: "Skills & languages", placeholder: "e.g. nurse, Hausa speaker, logistics", hint: "Separate with commas." },
                { name: "availability", label: "Availability", type: "select", options: ["Weekends", "Weekdays", "On-call for emergencies", "Flexible"] },
                { name: "why", label: "Why do you want to volunteer?", type: "textarea" },
                { name: "consent", label: "I agree to a background check and to abide by URN's safeguarding code of conduct.", type: "checkbox", required: true },
              ]}
              submitLabel="Submit application"
              successTitle="Application received"
              successBody="Thank you for stepping up. Our volunteer coordinator will contact you within 5 working days with next steps and training dates."
            />
          </div>
        </div>
      </Section>

      <Section id="fundraise" className="scroll-mt-28">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHeader kicker="Fundraise for us" title="Start a fundraiser" lede="Birthdays, weddings, Ramadan, marathons, office challenges — we'll give you a personal page, a fundraising pack and a thank-you call from the field." />
            <ol className="space-y-3">
              {["Tell us your idea", "Get your fundraising pack & page", "Share with friends on WhatsApp", "See the sitrep showing what you funded"].map((s, i) => (
                <li key={s} className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-ink text-white grid place-items-center font-display text-lg font-bold">{i + 1}</span>
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-[1.5px] border-ink p-6 md:p-8">
            <SimpleForm
              id="fundraise"
              fields={[
                { name: "name", label: "Your name", required: true, half: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "type", label: "Type of fundraiser", type: "select", required: true, half: true, options: ["Sporting challenge", "Birthday / celebration", "Faith community collection", "School or university", "Workplace", "Other"] },
                { name: "target", label: "Target (₦)", type: "number", required: true, half: true, placeholder: "250000" },
                { name: "appeal", label: "Support which appeal?", type: "select", options: ["Wherever most needed (Rapid Response Fund)", "Borno Flood Emergency", "Adamawa Cholera Outbreak", "Benue Displacement Emergency", "North-East Lean Season Food Crisis"] },
                { name: "idea", label: "Your idea", type: "textarea" },
              ]}
              submitLabel="Get my fundraising pack"
              successTitle="Let's do this!"
              successBody="Your fundraising pack is on its way. A supporter care officer will call to set up your page within 2 working days."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
