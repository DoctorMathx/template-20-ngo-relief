import type { MetadataRoute } from "next";
import { appeals } from "@/mock/appeals";
import { sitreps } from "@/mock/sitreps";
import { programmes } from "@/mock/programmes";
import { stories } from "@/mock/stories";

const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-20-ngo-relief.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/appeals",
    "/situation-reports",
    "/relief-kits",
    "/rapid-response-fund",
    "/where-we-work",
    "/donate",
    "/partnerships",
    "/transparency",
    "/programmes",
    "/impact",
    "/stories",
    "/events",
    "/get-involved",
    "/about",
    "/contact",
    "/faq",
  ];
  return [
    ...staticRoutes.map((r) => ({ url: `${base}${r}`, changeFrequency: "daily" as const, priority: r === "" ? 1 : 0.7 })),
    ...appeals.map((a) => ({ url: `${base}/appeals/${a.slug}`, lastModified: a.updatedAt, changeFrequency: "hourly" as const, priority: 0.9 })),
    ...sitreps.map((s) => ({ url: `${base}/situation-reports/${s.slug}`, lastModified: s.publishedAt, priority: 0.8 })),
    ...programmes.map((p) => ({ url: `${base}/programmes/${p.slug}`, priority: 0.6 })),
    ...stories.map((s) => ({ url: `${base}/stories/${s.slug}`, lastModified: s.date, priority: 0.6 })),
  ];
}
