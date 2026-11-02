import type { TickerItem } from "@/lib/types";

// The scrolling situation ticker under the header. Newest first.
export const tickerItems: TickerItem[] = [
  { time: "09:40", tag: "BORNO", text: "Sitrep #7: 412,000 affected, 96,000 displaced across 14 sites", href: "/situation-reports/borno-flood-sitrep-07" },
  { time: "08:55", tag: "BORNO", text: "Mobile health teams screen 640 in Bulabulin; 21 suspected cholera cases referred", href: "/appeals/borno-flood-response-2026" },
  { time: "07:15", tag: "ADAMAWA", text: "14th Oral Rehydration Point opens in Mubi South", href: "/appeals/adamawa-cholera-outbreak" },
  { time: "YDAY", tag: "MATCH", text: "Kestrel Energy doubling every gift to the Borno appeal up to ₦50m", href: "/partnerships#matching" },
  { time: "YDAY", tag: "BENUE", text: "1,200 shelter kits distributed at Abagena camp ahead of harmattan", href: "/appeals/benue-displacement-emergency" },
  { time: "26 OCT", tag: "YOBE", text: "Cash transfer round 3 reaches 8,400 households", href: "/situation-reports/ne-food-security-sitrep-02" },
];
