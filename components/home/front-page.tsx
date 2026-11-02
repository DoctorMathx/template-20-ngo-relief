import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { appeals } from "@/mock/appeals";
import { siteConfig } from "@/lib/site-config";
import { Section, SectionHeader } from "@/components/ui/section";
import { UrgencyBadge } from "@/components/ui/urgency-badge";
import { formatNaira, formatNairaShort, formatNumber, percent } from "@/lib/utils";

/** News-front-page grid of every active appeal except the hero emergency. */
export function FrontPage() {
  const rest = appeals.filter((a) => a.slug !== siteConfig.topEmergencySlug);
  const [lead, ...others] = rest;
  if (!lead) return null;
  const leadPct = percent(lead.raised, lead.goal);
  return (
    <Section pad="md">
      <SectionHeader
        kicker={`${appeals.length} active appeals · updated hourly`}
        title="Crisis desk"
        lede="Every live emergency we're responding to, ranked by urgency. Give to one appeal, or let us send your gift where the need is greatest."
        action={
          <Link href="/appeals" className="btn btn-outline">
            All appeals <ArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        }
      />
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-8 lg:grid-cols-12">
        <article className="lg:col-span-7 lg:border-r-[1.5px] lg:border-ink lg:pr-8 group">
          <Link href={`/appeals/${lead.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-ink">
            <Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover photo-hc group-hover:scale-[1.02] transition-transform duration-500" />
            <div className="absolute inset-0 overlay-bottom" aria-hidden />
            <div className="absolute top-3 left-3">
              <UrgencyBadge level={lead.urgency} />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="font-mono text-xs uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" aria-hidden /> {lead.location}, {lead.state}
              </div>
            </div>
          </Link>
          <h3 className="font-display font-bold text-4xl md:text-5xl mt-5">
            <Link href={`/appeals/${lead.slug}`} className="hover:text-alarm-strong">
              {lead.title}
            </Link>
          </h3>
          <p className="lede mt-3">{lead.summary}</p>
          <div className="mt-5 grid grid-cols-3 [&>*]:min-w-0 border-y-[1.5px] border-ink divide-x divide-ink">
            <div className="p-2.5 sm:p-3">
              <div className="label-mono">Affected</div>
              <div className="font-display-normal text-lg sm:text-2xl font-bold num">{formatNumber(lead.peopleAffected)}</div>
            </div>
            <div className="p-2.5 sm:p-3">
              <div className="label-mono">Funded</div>
              <div className="font-display-normal text-lg sm:text-2xl font-bold num">{leadPct}%</div>
            </div>
            <div className="p-2.5 sm:p-3">
              <div className="label-mono">Still needed</div>
              <div className="font-display-normal text-lg sm:text-2xl font-bold num text-alarm-strong"><span className="sm:hidden">{formatNairaShort(lead.goal - lead.raised)}</span>
                <span className="hidden sm:inline">{formatNaira(lead.goal - lead.raised)}</span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/donate?campaign=${lead.slug}`} className="btn btn-alarm">
              Donate to this appeal
            </Link>
            {lead.sitrepSlug && (
              <Link href={`/situation-reports/${lead.sitrepSlug}`} className="btn btn-outline">
                Latest sitrep
              </Link>
            )}
          </div>
        </article>

        <div className="lg:col-span-5">
          <ol className="divide-y-[1.5px] divide-ink border-y-[1.5px] border-ink">
            {others.map((a, i) => {
              const pct = percent(a.raised, a.goal);
              return (
                <li key={a.slug} className="py-5 grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                  <span className="font-display-normal text-3xl font-bold text-hair num leading-none w-8" aria-hidden>
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <UrgencyBadge level={a.urgency} />
                      <span className="label-mono">
                        {a.crisisType} · {a.state}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-bold mt-2">
                      <Link href={`/appeals/${a.slug}`} className="hover:text-alarm-strong">
                        {a.title}
                      </Link>
                    </h3>
                    <div className="mt-3 bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${pct}% funded`}>
                      <span style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-2 flex justify-between font-mono text-xs num">
                      <span>{pct}% funded</span>
                      <span className="text-alarm-strong font-semibold">{formatNaira(a.goal - a.raised)} needed</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
