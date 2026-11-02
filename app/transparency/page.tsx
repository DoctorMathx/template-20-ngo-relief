import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { annualReports, expenses, financialYear, governance, incomeSources, perThousand, totalExpenditure, totalIncome } from "@/mock/financials";
import { board } from "@/mock/people";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { formatNaira, formatNairaShort } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Audited income and expenditure, where every ₦1,000 goes, annual reports, registration and governance for Ubuntu Relief Network.",
};

const DONUT = ["#0B0B0C", "#C9361A", "#55555B", "#DCD2C1", "#E5401F", "#A9A9B0"];

function Donut() {
  const r = 70;
  const c = 2 * Math.PI * r;
  const total = incomeSources.reduce((s, x) => s + x.amount, 0);
  const segments = incomeSources.reduce<{ len: number; off: number; color: string; label: string }[]>((acc, s, i) => {
    const off = acc.length ? acc[acc.length - 1].off + acc[acc.length - 1].len : 0;
    acc.push({ len: (s.amount / total) * c, off, color: DONUT[i % DONUT.length], label: s.label });
    return acc;
  }, []);
  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[320px]" role="img" aria-label={`Income by source, FY${financialYear}, total ${formatNaira(totalIncome)}`}>
      <g transform="rotate(-90 100 100)">
        {segments.map((s) => (
          <circle key={s.label} cx="100" cy="100" r={r} fill="none" stroke={s.color} strokeWidth="34" strokeDasharray={`${s.len} ${c - s.len}`} strokeDashoffset={-s.off} />
        ))}
      </g>
      <text x="100" y="94" textAnchor="middle" className="fill-current" style={{ font: "600 11px var(--font-plex-mono)", letterSpacing: 1 }}>
        INCOME FY{financialYear}
      </text>
      <text x="100" y="120" textAnchor="middle" style={{ font: "700 26px var(--font-oswald)" }}>
        {formatNairaShort(totalIncome)}
      </text>
    </svg>
  );
}

export default function TransparencyPage() {
  const totalIn = incomeSources.reduce((s, x) => s + x.amount, 0);
  const maxExp = Math.max(...expenses.map((e) => e.amount));
  return (
    <>
      <PageHero
        kicker={`Audited · FY${financialYear}`}
        title="Transparency & financials"
        lede="Your trust is the most important thing we hold. Here is exactly where our money comes from, where it goes, and who holds us accountable."
        meta={
          <dl className="grid grid-cols-3 max-w-2xl border-t-2 border-white">
            {[
              ["Income", formatNairaShort(totalIncome)],
              ["Expenditure", formatNairaShort(totalExpenditure)],
              ["On programmes", `${Math.round((expenses[0].amount / totalExpenditure) * 100)}%`],
            ].map(([k, v], i) => (
              <div key={k} className={`pt-3 pr-3 ${i ? "pl-3 border-l border-white/30" : ""}`}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70">{k}</dt>
                <dd className="font-display-normal text-3xl md:text-4xl font-bold num mt-1">{v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section pad="md">
        <SectionHeader kicker="The ₦1,000 test" title="Of every ₦1,000 you give" />
        <div className="flex h-20 border-[1.5px] border-ink" role="img" aria-label="Breakdown of every ₦1,000">
          {perThousand.map((p, i) => (
            <div key={p.label} className="h-full flex items-end p-2 text-white font-mono text-xs font-semibold" style={{ width: `${p.value / 10}%`, background: DONUT[i] , color: i === 3 ? "#0B0B0C" : "#fff" }}>
              <span className="hidden sm:inline">₦{p.value}</span>
            </div>
          ))}
        </div>
        <ul className="mt-6 grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perThousand.map((p, i) => (
            <li key={p.label} className="border-t-[1.5px] border-ink pt-3">
              <span className="inline-block w-4 h-4 border border-ink" style={{ background: DONUT[i] }} aria-hidden />
              <div className="font-display-normal text-5xl font-bold num mt-2">₦{p.value}</div>
              <div className="text-muted mt-1">{p.label}</div>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="sand" pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold border-t-4 border-ink pt-3">Income sources</h2>
            <div className="mt-6 grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-[auto_1fr] gap-8 items-center">
              <Donut />
              <ul className="space-y-3">
                {incomeSources.map((s, i) => (
                  <li key={s.label} className="flex items-start gap-3">
                    <span className="w-3.5 h-3.5 mt-1 shrink-0 border border-ink" style={{ background: DONUT[i] }} aria-hidden />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="font-mono text-xs num text-muted">
                        {formatNaira(s.amount)} · {Math.round((s.amount / totalIn) * 100)}%
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold border-t-4 border-ink pt-3">Expenditure</h2>
            <ul className="mt-6 space-y-6">
              {expenses.map((e) => {
                const pct = Math.round((e.amount / totalExpenditure) * 100);
                return (
                  <li key={e.label}>
                    <div className="flex justify-between items-baseline gap-3">
                      <span className="font-semibold">{e.label}</span>
                      <span className="font-display-normal text-2xl font-bold num">{pct}%</span>
                    </div>
                    <div className="mt-2 h-6 bg-white border border-ink">
                      <div className={`h-full ${e.kind === "programme" ? "bg-alarm-strong" : "bg-ink"}`} style={{ width: `${(e.amount / maxExp) * 100}%` }} />
                    </div>
                    <div className="font-mono text-xs mt-1 num">{formatNaira(e.amount)}</div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-muted">Surplus of {formatNaira(totalIncome - totalExpenditure)} held as restricted funds for ongoing 2026 responses and a 3-month operating reserve.</p>
          </div>
        </div>
      </Section>

      <Section pad="md">
        <div className="grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeader kicker="Publications" title="Annual reports" />
            <ul className="border-b-[1.5px] border-ink">
              {annualReports.map((r) => (
                <li key={r.year + r.title} className="border-t-[1.5px] border-ink py-4 grid grid-cols-[56px_minmax(0,1fr)_auto] sm:grid-cols-[64px_minmax(0,1fr)_auto] gap-3 sm:gap-4 items-center">
                  <span className="font-display-normal text-3xl font-bold num">{r.year}</span>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-alarm-strong" aria-hidden /> {r.title}
                    </div>
                    <div className="label-mono mt-0.5">
                      {r.kind} · {r.size}
                    </div>
                  </div>
                  <a href="#" className="btn btn-outline btn-sm" aria-label={`Download ${r.year} ${r.title}`}>
                    <Download className="w-4 h-4" aria-hidden /> <span className="hidden sm:inline">Download</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader kicker="Accountability" title="Registration & governance" />
            <dl className="space-y-4">
              {governance.map((g) => (
                <div key={g.label} className="border-l-4 border-ink pl-4">
                  <dt className="label-mono">{g.label}</dt>
                  <dd className="mt-1">{g.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 bg-alarm-soft border-l-4 border-alarm-strong p-4 text-sm">
              <strong>Report a concern.</strong> Fraud, safeguarding or misconduct can be reported confidentially to our independent whistleblowing line: integrity@ubunturelief.org.ng.
            </div>
          </div>
        </div>
      </Section>

      <Section tone="sand" pad="md">
        <SectionHeader kicker="Oversight" title="Board of Trustees" lede="Unpaid, independent trustees who meet quarterly and approve our budget, audited accounts and Rapid Response Fund releases above ₦10m." />
        <div className="grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-ink border-[1.5px] border-ink">
          {board.map((p) => (
            <div key={p.name} className="bg-white p-5">
              <div className="w-14 h-14 bg-ink text-white grid place-items-center font-display text-xl font-bold" aria-hidden>
                {p.initials}
              </div>
              <div className="font-semibold mt-4">{p.name}</div>
              <div className="label-mono mt-1 text-alarm-strong">{p.role}</div>
              <p className="text-sm text-muted mt-2">{p.bio}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
