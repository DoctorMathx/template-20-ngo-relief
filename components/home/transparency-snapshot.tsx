import Link from "next/link";
import { perThousand } from "@/mock/financials";
import { Section } from "@/components/ui/section";

const SHADES = ["bg-ink", "bg-alarm-strong", "bg-sand-deep", "bg-muted-dark"];

export function TransparencySnapshot() {
  return (
    <Section pad="md" className="border-t-[1.5px] border-ink">
      <div className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1fr_1.6fr] items-center">
        <div>
          <div className="kicker text-alarm-strong">Audited · FY2025</div>
          <h2 className="font-display font-bold text-5xl md:text-6xl mt-3">Of every ₦1,000 you give</h2>
          <p className="lede mt-4">Independently audited, published in full. No surprises.</p>
          <Link href="/transparency" className="btn btn-outline mt-6">
            See our financials
          </Link>
        </div>
        <div>
          <div className="flex h-16 border-[1.5px] border-ink" role="img" aria-label="Breakdown of every ₦1,000 donated">
            {perThousand.map((p, i) => (
              <div key={p.label} className={`${SHADES[i]} h-full`} style={{ width: `${p.value / 10}%` }} />
            ))}
          </div>
          <ul className="mt-5 grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 gap-4">
            {perThousand.map((p, i) => (
              <li key={p.label} className="flex gap-3 items-start border-t-[1.5px] border-ink pt-3">
                <span className={`w-4 h-4 mt-1 shrink-0 border border-ink ${SHADES[i]}`} aria-hidden />
                <div>
                  <div className="font-display-normal font-bold text-3xl num">₦{p.value}</div>
                  <div className="text-sm text-muted">{p.label}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
