import { siteConfig } from "@/lib/site-config";
import { HeroSection } from "@/components/home/hero-section";
import { FrontPage } from "@/components/home/front-page";
import { KeyFigures } from "@/components/home/key-figures";
import { SitrepsSection } from "@/components/home/sitreps-section";
import { ReliefKitsPromo } from "@/components/home/relief-kits-promo";
import { RapidResponse } from "@/components/home/rapid-response";
import { WhereWeWorkSection } from "@/components/home/where-we-work-section";
import { MatchingBanner } from "@/components/home/matching-banner";
import { ProgrammesSection } from "@/components/home/programmes-section";
import { StoriesSection } from "@/components/home/stories-section";
import { TransparencySnapshot } from "@/components/home/transparency-snapshot";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { FinalCta } from "@/components/home/final-cta";

// The homepage is data-driven — reorder or remove keys in `siteConfig.home.modules`.
const MODULE_MAP = {
  hero: HeroSection,
  frontPage: FrontPage,
  keyFigures: KeyFigures,
  sitreps: SitrepsSection,
  reliefKits: ReliefKitsPromo,
  rapidResponse: RapidResponse,
  whereWeWork: WhereWeWorkSection,
  matching: MatchingBanner,
  programmes: ProgrammesSection,
  stories: StoriesSection,
  transparency: TransparencySnapshot,
  newsletter: NewsletterSection,
  finalCta: FinalCta,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
