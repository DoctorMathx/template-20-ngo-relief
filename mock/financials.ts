import type { AnnualReport } from "@/lib/types";

export const financialYear = "2025";

export const totalIncome = 4_380_000_000;
export const totalExpenditure = 4_120_000_000;

export const incomeSources = [
  { label: "Institutional grants & pooled funds", amount: 1_970_000_000 },
  { label: "Individual donors (Nigeria)", amount: 920_000_000 },
  { label: "Corporate partners & matching", amount: 700_000_000 },
  { label: "Foundations & trusts", amount: 480_000_000 },
  { label: "Diaspora giving", amount: 240_000_000 },
  { label: "Gifts in kind (valued)", amount: 70_000_000 },
];

export const expenses = [
  { label: "Emergency response programmes", amount: 3_590_000_000, kind: "programme" as const },
  { label: "Fundraising", amount: 290_000_000, kind: "fundraising" as const },
  { label: "Management & governance", amount: 240_000_000, kind: "admin" as const },
];

// "Of every ₦1,000 you give"
export const perThousand = [
  { label: "Food, water, shelter & health in the field", value: 690 },
  { label: "Logistics, warehousing & pre-positioning", value: 180 },
  { label: "Fundraising to raise the next ₦1,000", value: 70 },
  { label: "Governance, audit & accountability", value: 60 },
];

export const annualReports: AnnualReport[] = [
  { year: "2025", title: "Annual Report & Audited Financial Statements", size: "6.4 MB", kind: "PDF" },
  { year: "2025", title: "Borno & Yobe Response Evaluation (independent)", size: "2.1 MB", kind: "PDF" },
  { year: "2024", title: "Annual Report & Audited Financial Statements", size: "5.8 MB", kind: "PDF" },
  { year: "2023", title: "Annual Report & Audited Financial Statements", size: "5.2 MB", kind: "PDF" },
  { year: "2022", title: "Annual Report & Audited Financial Statements", size: "4.9 MB", kind: "PDF" },
];

export const governance = [
  { label: "Registration", value: "Incorporated trustees, Corporate Affairs Commission" },
  { label: "SCUML", value: "Registered with the Special Control Unit against Money Laundering" },
  { label: "Auditor", value: "Adebayo Okafor & Co. (Chartered Accountants) — unqualified opinion, FY2025" },
  { label: "Memberships", value: "Nigeria INGO/NNGO Humanitarian Forum · Core Humanitarian Standard self-assessment 2025" },
  { label: "Policies", value: "Safeguarding & PSEA · Anti-fraud & anti-bribery · Whistleblowing · Data protection (NDPA 2023)" },
];
