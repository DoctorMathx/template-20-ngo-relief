import type { Partner, PartnerTier } from "@/lib/types";

export const partners: Partner[] = [
  { name: "Kestrel Energy", type: "Corporate · Emergency match" },
  { name: "Sahel Humanitarian Fund", type: "Pooled fund" },
  { name: "Okavango Foundation", type: "Foundation" },
  { name: "Northbridge Bank", type: "Corporate · CSR" },
  { name: "Aso Telecom", type: "Corporate · In-kind" },
  { name: "Lagos Business Circle", type: "Giving circle" },
  { name: "Harmattan Trust", type: "Foundation" },
  { name: "Delta Logistics", type: "Corporate · Logistics" },
  { name: "Unity Diaspora Fund (UK)", type: "Diaspora" },
  { name: "Greenfield Foods", type: "Corporate · In-kind" },
];

export const partnerTiers: PartnerTier[] = [
  {
    name: "Emergency Match Partner",
    range: "₦10m – ₦100m pledge",
    summary: "Unlock public giving in the first critical days by matching gifts to a live appeal.",
    benefits: ["Co-branded match campaign across our channels", "Real-time match tracker on appeal pages", "Field briefing for leadership", "Staff giving portal"],
    highlight: true,
  },
  {
    name: "Rapid Response Partner",
    range: "₦25m+ per year",
    summary: "Unrestricted, multi-year funding that lets us move within hours — the most valuable gift we receive.",
    benefits: ["Quarterly response briefings", "Named warehouse or boat", "Annual impact report", "Board-level relationship"],
  },
  {
    name: "Programme Grant",
    range: "₦5m – ₦500m",
    summary: "Restricted funding for a specific programme, state or emergency, with full donor reporting.",
    benefits: ["Logframe & budget co-design", "Narrative + financial reports", "Monitoring visits", "Third-party audit on request"],
  },
  {
    name: "In-kind & Logistics",
    range: "Goods, transport, airtime",
    summary: "Products, warehousing, trucking or connectivity that meet Sphere standards and reach people faster.",
    benefits: ["Specification support", "Proof-of-delivery reporting", "Recognition in sitreps", "Employee volunteering days"],
  },
];

export const grantManagement = [
  { title: "Segregated grant accounts", body: "Every restricted grant is coded to its own cost centre in our Sage Intacct ledger and reconciled monthly." },
  { title: "Procurement thresholds", body: "Three quotes above ₦1m; competitive tender with a procurement committee above ₦10m." },
  { title: "Independent audit", body: "Annual statutory audit by a top-tier firm, plus project audits on donor request." },
  { title: "Feedback & complaints", body: "A free, confidential hotline and help desks at every distribution — 2,140 cases logged and closed in 2025." },
  { title: "Safeguarding", body: "PSEA-compliant policies, staff vetting and a Safeguarding Committee reporting directly to the Board." },
  { title: "Donor reporting", body: "Narrative and financial reports on your schedule, with photo evidence and beneficiary data (anonymised)." },
];
