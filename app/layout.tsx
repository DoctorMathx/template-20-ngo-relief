import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Oswald } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SituationTicker } from "@/components/layout/situation-ticker";
import { MobileDonateBar } from "@/components/layout/mobile-donate-bar";
import { siteConfig } from "@/lib/site-config";

const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], display: "swap", weight: ["400", "500", "600"] });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-20-ngo-relief.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: [
    "Nigeria emergency relief",
    "humanitarian NGO Nigeria",
    "Borno flood appeal",
    "donate to flood victims Nigeria",
    "cholera response",
    "IDP camps",
    "FinStore NGO template",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteUrl,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] btn btn-ink">
          Skip to content
        </a>
        <SiteHeader />
        <SituationTicker />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileDonateBar />
      </body>
    </html>
  );
}
