import { appeals } from "./appeals";
import { programmes } from "./programmes";

export type Frequency = "one-time" | "monthly" | "annual";

export const frequencies: { id: Frequency; label: string; note: string }[] = [
  { id: "one-time", label: "One-time", note: "A single gift, deployed now" },
  { id: "monthly", label: "Monthly", note: "Join the First Responders" },
  { id: "annual", label: "Annual", note: "One planned gift each year" },
];

export const presetAmounts: Record<Frequency, { amount: number; impact: string }[]> = {
  "one-time": [
    { amount: 10_000, impact: "₦10,000 provides oral rehydration treatment for 12 cholera patients" },
    { amount: 25_000, impact: "₦25,000 gives a family clean water and a hygiene kit for a month" },
    { amount: 50_000, impact: "₦50,000 feeds a displaced family of six for two weeks" },
    { amount: 120_000, impact: "₦120,000 shelters a family with tarpaulins, mats, blankets and a solar lamp" },
    { amount: 250_000, impact: "₦250,000 keeps a mobile health team in the field for two days" },
  ],
  monthly: [
    { amount: 5_000, impact: "₦5,000/month keeps chlorination tablets stocked for 8 families" },
    { amount: 10_000, impact: "₦10,000/month pre-positions a food parcel before the next flood" },
    { amount: 20_000, impact: "₦20,000/month funds a trained community health volunteer" },
    { amount: 50_000, impact: "₦50,000/month keeps a rescue boat fuelled and crewed on standby" },
  ],
  annual: [
    { amount: 60_000, impact: "₦60,000/year stocks hygiene kits for 3 families before outbreak season" },
    { amount: 150_000, impact: "₦150,000/year pre-positions shelter for a displaced family" },
    { amount: 500_000, impact: "₦500,000/year funds a full first-week response for 60 people" },
  ],
};

export type Designation = { id: string; label: string; group: "General" | "Emergency appeal" | "Programme" | "In-kind" };

export const designations: Designation[] = [
  { id: "rapid-response", label: "Rapid Response Fund (where most needed)", group: "General" },
  { id: "relief-kits", label: "Relief kits (in-kind items)", group: "In-kind" },
  ...appeals.map((a) => ({ id: a.slug, label: a.title, group: "Emergency appeal" as const })),
  ...programmes.map((p) => ({ id: p.slug, label: p.title, group: "Programme" as const })),
];

export const designationLabel = (id: string) => designations.find((d) => d.id === id)?.label ?? "Rapid Response Fund (where most needed)";
