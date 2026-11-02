import { daysLeft, formatNaira, formatNumber, percent, cn } from "@/lib/utils";
import { LiveGap } from "./live-gap";

export function FundingMeter({
  raised,
  goal,
  donors,
  endsOn,
  dark = false,
  size = "md",
  live = false,
}: {
  raised: number;
  goal: number;
  donors: number;
  endsOn: string;
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  live?: boolean;
}) {
  const pct = percent(raised, goal);
  const days = daysLeft(endsOn);
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div>
          <div className={cn("font-display-normal font-bold num", size === "lg" ? "text-4xl md:text-5xl" : size === "md" ? "text-2xl" : "text-xl")}>
            {formatNaira(raised)}
          </div>
          <div className={cn("label-mono mt-1", dark && "text-muted-dark")}>raised of {formatNaira(goal)}</div>
        </div>
        <div className={cn("font-display-normal font-bold num text-alarm", size === "lg" ? "text-4xl" : "text-2xl")}>{pct}%</div>
      </div>
      <div
        className={cn("bar mt-3", dark && "bar-dark", size === "lg" && "h-3.5")}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label={`${pct}% funded`}
      >
        <span style={{ width: `${pct}%` }} />
      </div>
      <div className={cn("mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)] gap-2 border-t pt-3", dark ? "border-ink-3" : "border-hair")}>
        <div>
          <div className="font-mono text-sm font-semibold num">{formatNumber(donors)}</div>
          <div className={cn("label-mono", dark && "text-muted-dark")}>donors</div>
        </div>
        <div>
          <div className="font-mono text-sm font-semibold num">{days}</div>
          <div className={cn("label-mono", dark && "text-muted-dark")}>days left</div>
        </div>
        <div>
          {live ? (
            <LiveGap gap={goal - raised} />
          ) : (
            <div className="font-mono text-sm font-semibold num text-alarm-strong">{formatNaira(Math.max(0, goal - raised))}</div>
          )}
          <div className={cn("label-mono", dark && "text-muted-dark")}>still needed</div>
        </div>
      </div>
    </div>
  );
}
