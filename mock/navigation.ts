import type { NavItem } from "@/lib/types";

export const primaryNav: NavItem[] = [
  { label: "Emergencies", href: "/appeals" },
  { label: "Sitreps", href: "/situation-reports" },
  { label: "Relief kits", href: "/relief-kits" },
  { label: "Where we work", href: "/where-we-work" },
  { label: "Programmes", href: "/programmes" },
  { label: "Partners", href: "/partnerships" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Give",
    links: [
      { label: "Donate now", href: "/donate" },
      { label: "Emergency appeals", href: "/appeals" },
      { label: "Build a relief kit", href: "/relief-kits" },
      { label: "Rapid Response Fund", href: "/rapid-response-fund" },
      { label: "Corporate matching", href: "/partnerships#matching" },
    ],
  },
  {
    title: "Response",
    links: [
      { label: "Situation reports", href: "/situation-reports" },
      { label: "Where we work", href: "/where-we-work" },
      { label: "Programmes", href: "/programmes" },
      { label: "Impact", href: "/impact" },
      { label: "Stories & news", href: "/stories" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { label: "About us", href: "/about" },
      { label: "Transparency", href: "/transparency" },
      { label: "Partnerships", href: "/partnerships" },
      { label: "Events", href: "/events" },
      { label: "Get involved", href: "/get-involved" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
