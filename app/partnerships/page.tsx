import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { partners, partnerTiers, grantManagement } from "@/mock/partners";
import { testimonials } from "@/mock/impact";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { SimpleForm } from "@/components/ui/simple-form";
import { daysLeft, formatDate, formatNaira, percent } from "@/lib/utils";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "Partnerships & funding",
  description: "Emergency gift matching, Rapid Response partnerships, programme grants and in-kind support for corporates, foundations and institutional funders.",
};

export default function PartnershipsPage() {
  const m = siteConfig.matching;
  const pct = percent(m.matchedSoFar, m.cap);
  return (
    <>
      <PageHero
        kicker="Corporates · Foundations · Institutions"
        title="Partner with the first responders"
        lede="Your CSR budget, grant or match pledge moves within hours — with sitrep-grade reporting your board will actually read."
        image={photo("handshake", 1800)}
        imageAlt="Two people shaking hands"
      >
        <a href="#enquire" className="btn btn-alarm btn-lg">
          Start a partnership
        </a>
        <a href="#matching" className="btn btn-outline-light btn-lg">
          Emergency matching
        </a>
      </PageHero>

      <Section pad="md">
        <SectionHeader kicker="Why partner with URN" title="Built for speed and scrutiny" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink border-[1.5px] border-ink">
          {[
            ["41 hrs", "median time to first distribution"],
            ["87%", "of spending on programmes (audited)"],
            ["14", "institutional donors with live grants"],
            ["48 hrs", "sitrep cadence during emergencies"],
          ].map(([v, l]) => (
            <div key={l} className="bg-white p-6">
              <div className="font-display-normal text-5xl font-bold num">{v}</div>
              <div className="text-muted mt-2">{l}</div>
            </div>
          ))}
        </div>
      </Section>

      <section id="matching" className="bg-ink text-white scroll-mt-28" aria-labelledby="matching-h">
        <div className="container-x py-16 md:py-20">
          <div className="border-t-4 border-alarm pt-4">
            <div className="kicker text-alarm">Emergency corporate gift matching</div>
            <h2 id="matching-h" className="font-display font-bold text-5xl md:text-7xl mt-3">
              Turn every gift into two
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl">
              A match pledge is the single most powerful thing a company can do in the first week of a crisis. Public donors give up to 3× more when they know their gift will be doubled.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 [&>*]:min-w-0 gap-8 lg:grid-cols-[1.3fr_1fr]">
            {m.active && (
              <div className="bg-white text-ink p-6 md:p-8 border-t-[6px] border-alarm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="badge badge-critical">Live match</span>
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Ends {formatDate(m.endsOn)} · {daysLeft(m.endsOn)} days left
                  </span>
                </div>
                <h3 className="font-display text-4xl font-bold mt-4">{m.partner} × Borno Flood Emergency</h3>
                <p className="text-muted mt-2">
                  Matching every naira ×{m.multiplier} up to a cap of {formatNaira(m.cap)}.
                </p>
                <div className="mt-6 flex flex-wrap justify-between items-baseline gap-x-3 gap-y-1">
                  <span className="font-display-normal text-3xl sm:text-4xl font-bold num">{formatNaira(m.matchedSoFar)}</span>
                  <span className="font-mono text-sm num">{pct}% of cap used</span>
                </div>
                <div className="bar h-4 mt-3" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Match cap used">
                  <span style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-wider">
                  <div>
                    <div className="text-muted">Matching left</div>
                    <div className="text-lg font-semibold text-alarm-strong num normal-case">{formatNaira(m.cap - m.matchedSoFar)}</div>
                  </div>
                  <div>
                    <div className="text-muted">Total unlocked</div>
                    <div className="text-lg font-semibold num normal-case">{formatNaira(m.matchedSoFar * m.multiplier)}</div>
                  </div>
                </div>
                <Link href={`/donate?campaign=${m.appealSlug}`} className="btn btn-alarm btn-block btn-lg mt-6">
                  Give now — it&apos;s doubled
                </Link>
              </div>
            )}
            <div>
              <h3 className="font-display text-3xl font-bold">How a match pledge works</h3>
              <ol className="mt-5 space-y-5">
                {[
                  ["Pledge", "Choose a cap (from ₦10m), multiplier (1:1 or 2:1) and appeal. We can go live within 24 hours."],
                  ["Promote", "We feature your match across appeal pages, the site ticker, email and social — with a live tracker."],
                  ["Settle", "You pay only what's matched, invoiced weekly or at close. Unused cap is never charged."],
                  ["Report", "Receive a dedicated sitrep showing exactly what your match delivered."],
                ].map(([t, b], i) => (
                  <li key={t} className="grid grid-cols-[48px_1fr] gap-3">
                    <span className="font-display-normal text-3xl font-bold text-alarm num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="font-display text-xl font-bold">{t}</div>
                      <p className="text-white/75 text-sm mt-1">{b}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <a href="#enquire" className="btn btn-outline-light mt-7">
                Pledge a match
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section pad="md">
        <SectionHeader kicker="Ways to partner" title="Partnership packages" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 md:grid-cols-2 gap-6">
          {partnerTiers.map((t) => (
            <article key={t.name} className={`border-[1.5px] border-ink p-6 md:p-8 ${t.highlight ? "bg-sand" : "bg-white"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-3xl font-bold">{t.name}</h3>
                {t.highlight && <span className="badge badge-critical">Most urgent</span>}
              </div>
              <div className="font-mono text-sm mt-1">{t.range}</div>
              <p className="mt-3 text-muted">{t.summary}</p>
              <ul className="mt-5 space-y-2">
                {t.benefits.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Check className="w-4 h-4 text-alarm-strong mt-1 shrink-0" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="Our partners" title="In good company" />
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-px bg-ink border-[1.5px] border-ink">
          {partners.map((p) => (
            <li key={p.name} className="bg-white p-5 min-h-[120px] flex flex-col justify-between">
              <span className="font-display text-xl font-bold leading-tight">{p.name}</span>
              <span className="label-mono mt-3">{p.type}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-1 [&>*]:min-w-0 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure key={t.by} className="border-t-4 border-ink pt-4">
              <blockquote className="text-lg leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-semibold">{t.by}</span>
                <span className="block text-muted">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="Stewardship" title="How grant funds are managed" lede="The systems institutional donors audit us against — and that every naira benefits from." />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grantManagement.map((g, i) => (
            <div key={g.title} className="border-t-[1.5px] border-ink pt-4">
              <div className="font-mono text-alarm-strong text-sm font-semibold">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-2xl font-bold mt-1">{g.title}</div>
              <p className="text-muted mt-2">{g.body}</p>
            </div>
          ))}
        </div>
        <Link href="/transparency" className="btn btn-outline mt-10">
          View audited accounts
        </Link>
      </Section>

      <Section tone="ink" id="enquire" className="scroll-mt-28">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="kicker text-alarm">Partnership enquiry</div>
            <h2 className="font-display text-5xl md:text-6xl font-bold mt-3">Let&apos;s talk</h2>
            <p className="mt-4 text-white/80">Tell us about your organisation and goals. Our partnerships team replies within one working day — same day during an active emergency.</p>
            <div className="mt-6 font-mono text-sm space-y-1">
              <div>{siteConfig.brand.partnershipsEmail}</div>
              <div>{siteConfig.brand.phone}</div>
            </div>
          </div>
          <SimpleForm
            id="partner"
            dark
            fields={[
              { name: "org", label: "Organisation", required: true, half: true, autoComplete: "organization" },
              { name: "type", label: "Organisation type", type: "select", required: true, half: true, options: ["Corporate / CSR", "Foundation / trust", "Institutional donor / pooled fund", "Faith organisation", "Diaspora group", "Other"] },
              { name: "name", label: "Your name", required: true, half: true, autoComplete: "name" },
              { name: "role", label: "Role / title", half: true },
              { name: "email", label: "Work email", type: "email", required: true, half: true, autoComplete: "email" },
              { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
              { name: "interest", label: "Interested in", type: "select", required: true, options: ["Emergency gift matching", "Rapid Response partnership", "Programme grant / proposal", "In-kind & logistics", "Employee giving & volunteering"] },
              { name: "budget", label: "Indicative budget (₦)", type: "number", half: true, placeholder: "e.g. 25000000" },
              { name: "timeline", label: "Timeline", type: "select", half: true, options: ["Immediately (active emergency)", "This quarter", "Next financial year"] },
              { name: "message", label: "Tell us more", type: "textarea", placeholder: "Your goals, reporting needs, or a proposal call we should respond to." },
            ]}
            submitLabel="Send enquiry"
            successTitle="Enquiry received"
            successBody="Thank you. A member of our partnerships team will contact you within one working day with a tailored proposal."
          />
        </div>
      </Section>
    </>
  );
}
