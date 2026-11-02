import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  tone = "white",
  pad = "lg",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "white" | "sand" | "ink";
  pad?: "sm" | "md" | "lg";
  id?: string;
  labelledBy?: string;
}) {
  const tones = { white: "bg-white", sand: "bg-sand", ink: "bg-ink text-white" } as const;
  const pads = { sm: "py-10 md:py-12", md: "py-14 md:py-16", lg: "py-16 md:py-24" } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn(tones[tone], pads[pad], className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Newspaper-style section header: thick rule, mono kicker, condensed uppercase title. */
export function SectionHeader({
  kicker,
  title,
  lede,
  action,
  id,
  dark = false,
}: {
  kicker?: string;
  title: string;
  lede?: string;
  action?: React.ReactNode;
  id?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-10 md:mb-12 border-t-4 pt-4", dark ? "border-white" : "border-ink")}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div className="max-w-3xl">
          {kicker && (
            <div className={cn("kicker mb-3 flex items-center gap-2", dark ? "text-alarm" : "text-alarm-strong")}>
              <span aria-hidden className="inline-block w-3 h-3 bg-alarm" />
              {kicker}
            </div>
          )}
          <h2 id={id} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h2>
          {lede && <p className={cn("mt-4 max-w-2xl text-[1.05rem] leading-relaxed", dark ? "text-muted-dark" : "text-muted")}>{lede}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
