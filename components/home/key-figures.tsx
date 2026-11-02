import { headlineStats } from "@/mock/impact";

export function KeyFigures() {
  return (
    <section className="bg-ink text-white" aria-label="Key figures">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {headlineStats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 md:py-14 px-3 sm:px-4 md:px-8 ${i % 2 === 1 ? "border-l border-ink-3" : ""} ${i > 1 ? "border-t lg:border-t-0 border-ink-3" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dd className="font-display-normal font-bold text-4xl min-[400px]:text-5xl md:text-7xl num leading-none">{s.value}</dd>
              <dt className="mt-3 font-display text-lg tracking-wide">{s.label}</dt>
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-dark mt-1">{s.note}</div>
            </div>
          ))}
        </dl>
      </div>
      <div className="h-1.5 bg-alarm" aria-hidden />
    </section>
  );
}
