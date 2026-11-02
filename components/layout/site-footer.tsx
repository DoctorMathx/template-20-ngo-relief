import Link from "next/link";
import { footerNav } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Logo } from "./logo";

export function SiteFooter() {
  const { brand, org, donation } = siteConfig;
  return (
    <footer className="bg-ink text-white pb-24 sm:pb-0">
      <div className="h-1.5 bg-alarm" aria-hidden />
      <div className="container-x py-14 md:py-16 grid grid-cols-1 [&>*]:min-w-0 gap-12 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo dark />
          <p className="mt-5 text-white/75 max-w-sm leading-relaxed">{brand.description}</p>
          <div className="mt-8">
            <div className="kicker text-alarm mb-3">Emergency alerts & sitreps</div>
            <NewsletterForm dark />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerNav.map((col) => (
            <div key={col.title}>
              <div className="font-display text-lg font-bold border-t-2 border-white pt-3 mb-4">{col.title}</div>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-[44px] items-center text-white/80 hover:text-alarm text-[0.95rem]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container-x grid grid-cols-1 [&>*]:min-w-0 gap-6 md:grid-cols-4 border-t border-ink-3 py-8 text-sm">
        <div>
          <div className="label-mono text-muted-dark mb-2">{org.hq.label}</div>
          <p className="text-white/80">
            {org.hq.address}
            <br />
            {org.hq.city}
          </p>
        </div>
        {org.fieldOffices.map((o) => (
          <div key={o.label}>
            <div className="label-mono text-muted-dark mb-2">{o.label}</div>
            <p className="text-white/80">
              {o.address}
              <br />
              {o.city}
            </p>
          </div>
        ))}
      </div>

      <div className="container-x border-t border-ink-3 py-6 grid grid-cols-1 [&>*]:min-w-0 gap-4 md:grid-cols-[1fr_auto] items-center font-mono text-[11px] uppercase tracking-[0.1em] text-muted-dark">
        <div className="space-y-1.5">
          <p>
            © {new Date().getFullYear()} {org.legalName}
          </p>
          <p>
            Donations: {donation.bank.bankName} · {donation.bank.accountNumber} · Emergency line {brand.emergencyLine}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(brand.social).map(([k, v]) => (
            <a key={k} href={v} className="hover:text-alarm min-h-[44px] inline-flex items-center" rel="noopener noreferrer" target="_blank">
              {k}
            </a>
          ))}
        </div>
      </div>
      <div className="container-x pb-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-dark/70">Website template by FinStore · finstore.africa</div>
    </footer>
  );
}
