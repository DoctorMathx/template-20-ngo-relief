import type { Programme } from "@/lib/types";
import { photo } from "@/lib/images";

export const programmes: Programme[] = [
  {
    slug: "rapid-emergency-response",
    title: "Rapid Emergency Response",
    short: "Teams and stock pre-positioned to reach families within 72 hours of a flood, attack or outbreak.",
    description: [
      "Our Rapid Emergency Response programme is the backbone of everything we do. Three field warehouses — in Maiduguri, Yola and Makurdi — hold enough food, water and shelter stock to serve 25,000 people for the first two weeks of any emergency.",
      "Trained response teams are on 24-hour standby. When an alert comes in from our community early-warning network, NEMA or a state emergency agency, a rapid needs assessment is completed within 24 hours and the first distributions begin within 72.",
    ],
    image: photo("responders", 1400),
    imageAlt: "Emergency response team in orange vests standing together",
    stats: [
      { label: "Median time to first distribution", value: "41 hrs" },
      { label: "Emergencies responded to (2025)", value: "23" },
      { label: "People on standby rosters", value: "380" },
    ],
    activities: ["Rapid needs assessments", "Search & evacuation support (boats)", "Hot meals and dry rations", "Emergency shelter", "Pre-positioned warehousing"],
    states: ["Borno", "Adamawa", "Yobe", "Benue", "Kogi", "Niger"],
    annualBudget: 1_240_000_000,
    sdg: "SDG 1 · SDG 11",
  },
  {
    slug: "water-sanitation-hygiene",
    title: "Water, Sanitation & Hygiene",
    short: "Water trucking, borehole rehabilitation, latrines and hygiene promotion to stop cholera before it starts.",
    description: [
      "Most deaths after a flood are not from the water itself but from the disease that follows. Our WASH teams restore safe water quickly — trucking, chlorination, emergency boreholes — and build latrines and hand-washing points in camps.",
      "Between emergencies, we rehabilitate community water points and train WASH committees so villages are more resilient next season.",
    ],
    image: photo("water", 1400),
    imageAlt: "Hands under a stream of clean water",
    stats: [
      { label: "People with safe water (2025)", value: "312,000" },
      { label: "Boreholes rehabilitated", value: "148" },
      { label: "Latrine stances built", value: "2,640" },
    ],
    activities: ["Water trucking & chlorination", "Borehole rehabilitation", "Emergency latrines", "Hygiene kit distribution", "Cholera risk communication"],
    states: ["Borno", "Adamawa", "Yobe", "Benue"],
    annualBudget: 680_000_000,
    sdg: "SDG 6",
  },
  {
    slug: "food-security-nutrition",
    title: "Food Security & Nutrition",
    short: "Cash transfers, food parcels and therapeutic feeding to keep families — and children under five — from going hungry.",
    description: [
      "We prefer cash wherever markets work: it is faster, cheaper to deliver and lets families decide what they need most. Where markets have collapsed, we distribute food parcels sourced from Nigerian suppliers.",
      "Our nutrition teams screen children with MUAC tapes and enrol severely malnourished children in outpatient therapeutic feeding, with a recovery rate of 91% in 2025.",
    ],
    image: photo("foodLine", 1400),
    imageAlt: "Food being sorted and distributed by gloved hands",
    stats: [
      { label: "Households receiving cash (2025)", value: "21,400" },
      { label: "Children treated for SAM", value: "6,850" },
      { label: "Therapeutic feeding recovery rate", value: "91%" },
    ],
    activities: ["Multipurpose cash transfers", "Family food parcels", "Malnutrition screening", "Outpatient therapeutic feeding", "Seeds & tools for recovery"],
    states: ["Borno", "Yobe", "Adamawa", "Kogi"],
    annualBudget: 1_020_000_000,
    sdg: "SDG 2",
  },
  {
    slug: "emergency-health",
    title: "Emergency Health",
    short: "Mobile clinics, outbreak response and referrals in places where health facilities have been destroyed or overwhelmed.",
    description: [
      "Our mobile health teams — a doctor, two nurses and a community health extension worker — travel to camps and cut-off villages to treat malaria, diarrhoea, respiratory infections and injuries.",
      "During outbreaks we run Oral Rehydration Points, support cholera treatment centres and train community volunteers in surveillance and referral.",
    ],
    image: photo("medical", 1400),
    imageAlt: "Medical supplies and a stethoscope",
    stats: [
      { label: "Consultations (2025)", value: "148,000" },
      { label: "Mobile health teams", value: "11" },
      { label: "Community health volunteers", value: "640" },
    ],
    activities: ["Mobile clinics", "Cholera & measles outbreak response", "Maternal health referrals", "Community surveillance"],
    states: ["Borno", "Adamawa", "Benue"],
    annualBudget: 540_000_000,
    sdg: "SDG 3",
  },
  {
    slug: "protection-education",
    title: "Protection & Education in Emergencies",
    short: "Child-friendly spaces, family tracing, survivor support and temporary learning so children stay safe and keep learning.",
    description: [
      "Crises make children, women and people with disabilities more vulnerable to violence, exploitation and separation from family. Our protection teams run child-friendly spaces and safe referral pathways for survivors.",
      "Temporary learning spaces with trained teachers and school-in-a-box kits keep displaced children learning, using curricula agreed with State Universal Basic Education Boards.",
    ],
    image: photo("children", 1400),
    imageAlt: "A group of smiling children crowded together",
    stats: [
      { label: "Children in safe spaces (2025)", value: "9,800" },
      { label: "Children reunited with family", value: "412" },
      { label: "Temporary learning spaces", value: "22" },
    ],
    activities: ["Child-friendly spaces", "Family tracing & reunification", "GBV case management", "Temporary learning spaces", "Psychosocial support"],
    states: ["Borno", "Benue", "Adamawa"],
    annualBudget: 410_000_000,
    sdg: "SDG 4 · SDG 16",
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
