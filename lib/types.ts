export type Urgency = "critical" | "high" | "ongoing";

export type NavItem = { label: string; href: string };

export type BudgetLine = { label: string; amount: number; note?: string };

export type AppealUpdate = { date: string; title: string; body: string };

export type RecentDonor = { name: string; amount: number; when: string; city?: string };

export type Appeal = {
  slug: string;
  title: string;
  kind: "emergency" | "campaign";
  urgency: Urgency;
  crisisType: string;
  location: string;
  state: string;
  summary: string;
  story: string[];
  image: string;
  imageAlt: string;
  goal: number;
  raised: number;
  donors: number;
  endsOn: string;
  peopleAffected: number;
  peopleReached: number;
  startedOn: string;
  updatedAt: string;
  updates: AppealUpdate[];
  recentDonors: RecentDonor[];
  budget: BudgetLine[];
  impactAsks: { amount: number; label: string }[];
  sitrepSlug?: string;
};

export type SitrepFigure = { label: string; value: string; change?: string };

export type NeedResponse = { sector: string; need: number; reached: number; unit: string };

export type SitrepEntry = { time: string; location: string; text: string };

export type Sitrep = {
  slug: string;
  number: number;
  title: string;
  appealSlug?: string;
  urgency: Urgency;
  location: string;
  publishedAt: string;
  period: string;
  summary: string;
  author: string;
  figures: SitrepFigure[];
  needs: NeedResponse[];
  entries: SitrepEntry[];
  gaps: string[];
  nextUpdate: string;
};

export type ReliefKit = {
  id: string;
  name: string;
  price: number;
  image: string;
  imageAlt: string;
  contents: string[];
  impact: string;
  unitLabel: string; // e.g. "family for 2 weeks"
  peoplePerUnit: number;
};

export type Programme = {
  slug: string;
  title: string;
  short: string;
  description: string[];
  image: string;
  imageAlt: string;
  stats: { label: string; value: string }[];
  activities: string[];
  states: string[];
  annualBudget: number;
  sdg: string;
};

export type Story = {
  slug: string;
  title: string;
  category: "Field dispatch" | "Survivor story" | "News" | "Opinion";
  excerpt: string;
  body: string[];
  image: string;
  imageAlt: string;
  author: string;
  date: string;
  location: string;
  readMins: number;
  pullQuote?: { quote: string; by: string };
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  type: "Fundraiser" | "Briefing" | "Training" | "Volunteer day" | "Virtual";
  description: string;
  cta: string;
};

export type Person = { name: string; role: string; bio: string; initials: string };

export type Partner = { name: string; type: string };

export type PartnerTier = {
  name: string;
  range: string;
  summary: string;
  benefits: string[];
  highlight?: boolean;
};

export type Region = {
  id: string;
  name: string;
  states: string[];
  peopleReached: number;
  activeOperations: number;
  focus: string[];
  office?: string;
};

export type StateTile = {
  code: string;
  name: string;
  col: number;
  row: number;
  status: "active" | "office" | "partner" | "none";
  note?: string;
  reached?: number;
};

export type Faq = { q: string; a: string; category: "Donations" | "Tax & receipts" | "Refunds" | "Operations" | "Volunteering" };

export type TickerItem = { time: string; tag: string; text: string; href?: string };

export type AnnualReport = { year: string; title: string; size: string; kind: string };
