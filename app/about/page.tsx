import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { history, values } from "@/mock/impact";
import { team, board } from "@/mock/people";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { photo } from "@/lib/images";

export const metadata: Metadata = {
  title: "About us",
  description: "Ubuntu Relief Network is a Nigerian-led humanitarian NGO founded in 2014. Our mission, values, history, team and board.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker={`Est. ${siteConfig.org.founded} · Abuja`}
        title="I am because we are"
        lede="Ubuntu Relief Network was founded by Nigerians who were tired of watching help arrive too late. Today we are one of the fastest humanitarian responders in the country."
        image={photo("responders", 1800)}
        imageAlt="Emergency response team standing together in orange vests"
      />
      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-px bg-ink border-[1.5px] border-ink md:grid-cols-2">
          <div className="bg-white p-8 md:p-10">
            <div className="kicker text-alarm-strong">Mission</div>
            <p className="font-display-normal text-3xl md:text-4xl font-bold leading-tight mt-3">
              To reach people affected by disaster and conflict in Nigeria within 72 hours — with what they need, when they need it, and with dignity.
            </p>
          </div>
          <div className="bg-ink text-white p-8 md:p-10">
            <div className="kicker text-alarm">Vision</div>
            <p className="font-display-normal text-3xl md:text-4xl font-bold leading-tight mt-3">A Nigeria where no family faces a crisis alone, and every community is ready for the next one.</p>
          </div>
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="What we stand for" title="Our values" />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={v.title} className="border-t-4 border-ink pt-4">
              <div className="font-mono text-alarm-strong font-semibold">{String(i + 1).padStart(2, "0")}</div>
              <div className="font-display text-2xl font-bold mt-1">{v.title}</div>
              <p className="text-muted mt-2">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="Since 2012" title="Our history" />
        <ol className="relative border-l-2 border-ink ml-2 md:ml-0 md:border-l-0 md:grid md:grid-cols-4 md:gap-px md:bg-ink md:border-[1.5px]">
          {history.map((h) => (
            <li key={h.year} className="relative pl-6 pb-8 md:p-6 md:bg-white">
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 bg-alarm md:hidden" aria-hidden />
              <div className="font-display-normal text-4xl font-bold text-alarm-strong num">{h.year}</div>
              <p className="mt-2">{h.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink" pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] bg-ink-2 overflow-hidden">
            <Image src={photo("portrait", 1200)} alt="Portrait of a smiling man" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover photo-mono" />
          </div>
          <blockquote>
            <p className="font-display text-4xl md:text-5xl font-bold leading-tight">&ldquo;Speed is not a luxury in a crisis. It is the difference between a scare and a funeral.&rdquo;</p>
            <footer className="mt-5 font-mono text-sm uppercase tracking-wider text-muted-dark">— {team[0].name}, {team[0].role}</footer>
          </blockquote>
        </div>
      </Section>

      <Section pad="md">
        <SectionHeader kicker="Leadership" title="Our team" lede="84% of our 312 staff come from the states they serve." />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink border-[1.5px] border-ink">
          {team.map((p) => (
            <div key={p.name} className="bg-white p-6 flex gap-4">
              <div className="w-16 h-16 shrink-0 bg-alarm-strong text-white grid place-items-center font-display text-2xl font-bold" aria-hidden>
                {p.initials}
              </div>
              <div>
                <div className="font-display text-xl font-bold">{p.name}</div>
                <div className="label-mono mt-0.5">{p.role}</div>
                <p className="text-sm text-muted mt-2">{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader
          kicker="Governance"
          title="Board of Trustees"
          action={
            <Link href="/transparency" className="btn btn-outline">
              Governance & accounts
            </Link>
          }
        />
        <ul className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {board.map((p) => (
            <li key={p.name} className="border-t-[1.5px] border-ink pt-3">
              <div className="font-semibold">{p.name}</div>
              <div className="label-mono mt-1 text-alarm-strong">{p.role}</div>
              <p className="text-sm text-muted mt-2">{p.bio}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs uppercase tracking-wider text-muted">
          {siteConfig.org.legalName} · Founded {siteConfig.org.founded}
        </p>
      </Section>
    </>
  );
}
