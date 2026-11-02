import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { Appeal } from "@/lib/types";
import { UrgencyBadge } from "./urgency-badge";
import { daysLeft, formatNaira, formatNumber, percent } from "@/lib/utils";

export function AppealCard({ appeal, priority = false }: { appeal: Appeal; priority?: boolean }) {
  const pct = percent(appeal.raised, appeal.goal);
  return (
    <article className="card card-hover flex flex-col h-full group">
      <Link href={`/appeals/${appeal.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink" aria-label={appeal.title}>
        <Image
          src={appeal.image}
          alt={appeal.imageAlt}
          fill
          priority={priority}
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover photo-hc transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 overlay-bottom" aria-hidden />
        <div className="absolute top-3 left-3 flex gap-2">
          <UrgencyBadge level={appeal.urgency} />
          <span className="badge badge-dark">{appeal.crisisType}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" aria-hidden /> {appeal.location}, {appeal.state}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-2xl font-bold">
          <Link href={`/appeals/${appeal.slug}`} className="hover:text-alarm-strong">
            {appeal.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] text-muted line-clamp-3">{appeal.summary}</p>
        <div className="mt-4 flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
          <Users className="w-4 h-4 text-alarm-strong" aria-hidden />
          <span className="num font-semibold">{formatNumber(appeal.peopleAffected)}</span> people affected
        </div>
        <div className="mt-auto pt-5">
          <div className="bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${pct}% funded`}>
            <span style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-xs num">
            <span>
              <strong>{pct}%</strong> · {formatNumber(appeal.donors)} donors
            </span>
            <span>{daysLeft(appeal.endsOn)} days left</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t-[1.5px] border-ink pt-4">
            <div>
              <div className="label-mono">Still needed</div>
              <div className="font-display-normal text-xl font-bold text-alarm-strong num">{formatNaira(appeal.goal - appeal.raised)}</div>
            </div>
            <Link href={`/donate?campaign=${appeal.slug}`} className="btn btn-alarm btn-sm">
              Donate
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
