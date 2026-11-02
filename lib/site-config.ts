// Central config — change these values and the whole template rebrands.
// Brand, organisation details, donation settings and homepage module order all live here.

export type HomeModule =
  | "hero"
  | "frontPage"
  | "keyFigures"
  | "sitreps"
  | "reliefKits"
  | "rapidResponse"
  | "whereWeWork"
  | "matching"
  | "programmes"
  | "stories"
  | "transparency"
  | "newsletter"
  | "finalCta";

export const siteConfig = {
  brand: {
    name: "Ubuntu Relief Network",
    shortName: "URN",
    tagline: "First in. Last out. Emergency response across Nigeria.",
    description:
      "Ubuntu Relief Network is a Nigerian-led humanitarian NGO responding to floods, displacement, food insecurity and disease outbreaks — reaching families within 72 hours of a crisis.",
    domain: "ubunturelief.org.ng",
    email: "respond@ubunturelief.org.ng",
    partnershipsEmail: "partners@ubunturelief.org.ng",
    phone: "+234 809 555 0142",
    whatsapp: "+234 809 555 0142",
    emergencyLine: "0800 URN HELP (0800 876 4357)",
    social: {
      x: "https://x.com/ubunturelief",
      instagram: "https://instagram.com/ubunturelief",
      facebook: "https://facebook.com/ubunturelief",
      linkedin: "https://linkedin.com/company/ubunturelief",
      youtube: "https://youtube.com/@ubunturelief",
    },
  },

  org: {
    legalName: "Ubuntu Relief Network (Incorporated Trustees)",
    founded: 2014,
    hq: {
      label: "Headquarters",
      address: "Plot 1187 Cadastral Zone B6, Mabushi District",
      city: "Abuja, FCT",
    },
    fieldOffices: [
      { label: "Maiduguri field office", address: "14 Baga Road, opposite Monday Market", city: "Maiduguri, Borno" },
      { label: "Yola field office", address: "22 Atiku Abubakar Road, Jimeta", city: "Yola, Adamawa" },
      { label: "Makurdi field office", address: "7 Old Otukpo Road, High Level", city: "Makurdi, Benue" },
    ],
    hours: "Office: Mon–Fri, 8:00–17:00 WAT · Emergency desk: 24/7",
  },

  donation: {
    currency: "₦",
    minimum: 1000,
    processingFeeRate: 0.015,
    defaultAmount: 25000,
    defaultFrequency: "one-time" as "one-time" | "monthly" | "annual",
    bank: {
      bankName: "Zenith Bank Plc",
      accountName: "Ubuntu Relief Network — Emergency Fund",
      accountNumber: "1016 482 937",
      sortCode: "057080011",
    },
    usdBank: {
      bankName: "Access Bank Plc (Domiciliary)",
      accountName: "Ubuntu Relief Network",
      accountNumber: "0739 105 284",
      swift: "ABNGNGLA",
    },
    ussd: { code: "*966*000*482937#", bank: "Zenith Bank (*966#)" },
    receiptNote:
      "Ubuntu Relief Network is registered with the Corporate Affairs Commission as incorporated trustees. Donations to approved charitable bodies may be deductible under Section 25 of the Companies Income Tax Act (as amended) — keep this receipt for your records.",
    refundWindowDays: 14,
  },

  // Simulated "live" ticks on appeal funding gaps — set to false to show static figures only.
  liveSimulation: true,

  // The appeal featured in the home hero and the site-wide ticker.
  topEmergencySlug: "borno-flood-response-2026",

  matching: {
    active: true,
    partner: "Kestrel Energy Nigeria",
    multiplier: 2,
    cap: 50_000_000,
    matchedSoFar: 31_750_000,
    endsOn: "2026-11-15",
    appealSlug: "borno-flood-response-2026",
  },

  home: {
    // Reorder or remove modules to change the homepage.
    modules: [
      "hero",
      "frontPage",
      "keyFigures",
      "reliefKits",
      "sitreps",
      "rapidResponse",
      "whereWeWork",
      "matching",
      "programmes",
      "stories",
      "transparency",
      "newsletter",
      "finalCta",
    ] as HomeModule[],
  },
} as const;
