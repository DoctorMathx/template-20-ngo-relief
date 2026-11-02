"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { primaryNav } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b-4 border-ink">
      {/* utility strip */}
      <div className="hidden md:block bg-ink text-white">
        <div className="container-x flex items-center justify-between h-9 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span className="flex items-center gap-2">
            <span className="live-dot" aria-hidden /> Emergency desk open 24/7
          </span>
          <div className="flex items-center gap-6">
            <Link href="/transparency" className="hover:text-alarm">Transparency</Link>
            <Link href="/get-involved" className="hover:text-alarm">Get involved</Link>
            <Link href="/contact" className="hover:text-alarm">Contact</Link>
            <a href={`tel:${siteConfig.brand.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-alarm">
              <Phone className="w-3 h-3" aria-hidden /> {siteConfig.brand.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x">
        <div className="flex items-center justify-between h-16 md:h-[72px] gap-3 xl:gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:flex items-stretch h-full">
            {primaryNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center px-2.5 2xl:px-3.5 whitespace-nowrap font-display text-[15px] font-medium tracking-[0.06em] border-b-4 -mb-1 transition-colors ${
                    active ? "border-alarm text-ink" : "border-transparent hover:border-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/rapid-response-fund" className="hidden lg:inline-flex xl:hidden 2xl:inline-flex btn btn-outline btn-sm">
              Give monthly
            </Link>
            <Link href="/donate" className="hidden sm:inline-flex btn btn-alarm btn-sm">
              Donate now
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="xl:hidden w-11 h-11 grid place-items-center border-[1.5px] border-ink"
            >
              <Menu className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-[60] bg-ink text-white flex flex-col">
          <div className="container-x flex items-center justify-between h-16 border-b border-ink-3">
            <Logo dark onClick={() => setOpen(false)} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="w-11 h-11 grid place-items-center border-[1.5px] border-white"
              autoFocus
            >
              <X className="w-5 h-5" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-6">
            <ul>
              {[...primaryNav, { label: "Rapid Response Fund", href: "/rapid-response-fund" }, { label: "Impact", href: "/impact" }, { label: "Stories", href: "/stories" }, { label: "Transparency", href: "/transparency" }, { label: "Get involved", href: "/get-involved" }, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href} className="border-b border-ink-3">
                  <Link href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-4 font-display text-3xl font-bold hover:text-alarm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container-x py-5 border-t border-ink-3 grid grid-cols-2 gap-3">
            <Link href="/relief-kits" onClick={() => setOpen(false)} className="btn btn-outline-light">
              Build a kit
            </Link>
            <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-alarm">
              Donate now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
