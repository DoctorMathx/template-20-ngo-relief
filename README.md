# Ubuntu Relief Network — Template 20 (NGO · Emergency Relief)

A premium FinStore website template for humanitarian and emergency-response NGOs. It is built around
urgency and rapid response: live emergency appeals with funding gaps, field situation reports, a
"build a relief kit" in-kind giving tool, a Rapid Response Fund for unrestricted monthly giving, and
emergency corporate gift matching.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. There is no backend:
all content lives in typed mock files, and every form and the donation checkout are simulated client-side.

The design language is an **urgent newsroom**: near-black and white, an alarm red-orange accent used sparingly,
sand panels, condensed uppercase Oswald headlines, IBM Plex Sans body copy, IBM Plex Mono for data labels and
timestamps, sharp corners, thick rules, front-page grids, a scrolling situation ticker and large tabular counters.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Modular homepage (see below), with the top emergency as the hero |
| `/appeals` | Emergency appeals and campaigns: filter by urgency, sort by gap or recency |
| `/appeals/[slug]` | Appeal detail: story, key figures, live funding gap, impact asks, budget table, response timeline, recent donors, latest sitrep |
| `/situation-reports` | Sitrep index |
| `/situation-reports/[slug]` | Sitrep: key figures table, needs vs response table and bars, timestamped field log, critical gaps |
| `/relief-kits` | **Build a relief kit**: quantity steppers, ready-made packs, running total, impact summary, then "Donate this kit" |
| `/rapid-response-fund` | First Responders monthly giving, why unrestricted funds matter, a log of fund releases |
| `/where-we-work` | Interactive tile map of Nigeria's 36 states and the FCT, regional operations and offices |
| `/donate` | Full donation flow |
| `/donate/thank-you` | Receipt, sharing and next steps |
| `/partnerships` | Funders and CSR: why partner, **emergency gift matching** (live match tracker and how it works), packages, partners, grant management, enquiry form |
| `/transparency` | "Of every ₦1,000", income donut (SVG), expenditure bars, annual reports, registration and governance, board |
| `/programmes`, `/programmes/[slug]` | Five programmes |
| `/impact` | Headline stats, outcomes, year-by-year chart, testimonials |
| `/stories`, `/stories/[slug]` | Field dispatches, survivor stories, news and opinion |
| `/events` | Briefings, fundraisers and volunteer days, with inline registration |
| `/get-involved` | Volunteer application, fundraiser sign-up, partner links |
| `/about` | Mission, vision, values, history timeline, team, board |
| `/contact` | Contact form, emergency line, WhatsApp, offices, map placeholder |
| `/faq` | Accordion grouped by Donations, Tax & receipts, Refunds, Operations, Volunteering |

Also included: `not-found.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` and `twitter-image.tsx`.

### Donate flow

- Frequency: one-time, monthly or annual. Each frequency has its own preset amounts with impact lines.
- Custom amount (positive whole naira, minimum set in config).
- Designation: Rapid Response Fund, relief kits, any appeal, or any programme.
- Cover the 1.5% processing fee, give anonymously, dedicate in honour or memory of someone (with optional notification), employer match.
- Donor details with validation and an error summary.
- Payment tabs: **Card** (formatted fields), **Bank transfer** (account details, a generated reference and copy buttons), **USSD** (dial code with the amount filled in).
- A sticky summary that recalculates as you go, and shows the corporate match when one applies.
- Prefill with query params: `/donate?amount=50000&campaign=borno-flood-response-2026&frequency=monthly`.
  `designation=` and `kit=food-parcel:2,hygiene-kit:1` are also supported (the relief-kit builder uses them).
- On submit you go to `/donate/thank-you?...`, which shows the receipt (reference, date, amount, fee, frequency, designation, tax note), sharing and next steps.

## Home modules

`siteConfig.home.modules` in `lib/site-config.ts` controls which homepage sections appear and in what order:

`hero` (top emergency, live gap, quick amounts) · `frontPage` (crisis desk grid) · `keyFigures` · `reliefKits` ·
`sitreps` (latest reports plus needs vs response) · `rapidResponse` · `whereWeWork` (tile map) · `matching` (corporate match banner) ·
`programmes` · `stories` · `transparency` (₦1,000 bar) · `newsletter` · `finalCta`

## Customising

| File | Controls |
| --- | --- |
| `lib/site-config.ts` | Brand, contacts, legal name, offices, bank/USSD details, fee rate, minimum gift, **top emergency**, **matching offer** (partner, cap, progress, end date), live-gap simulation toggle, home modules |
| `app/globals.css` | Design tokens (`@theme` colours and `:root`) and component classes (`.btn`, `.badge-critical`, `.card`, `.bar`, `.input`, `.kicker`, ticker…) |
| `app/layout.tsx` | Fonts (Oswald, IBM Plex Sans, IBM Plex Mono) and metadata |
| `mock/appeals.ts` | Appeals and campaigns: urgency, people affected, goal/raised, budget, updates, donors |
| `mock/sitreps.ts` | Situation reports |
| `mock/relief-kits.ts` | Relief kit items, prices, contents and impact |
| `mock/ticker.ts` | Situation ticker items |
| `mock/donate.ts` | Preset amounts per frequency, impact lines, designations |
| `mock/regions.ts` | Regions and the state tile map (status, people reached, notes) |
| `mock/programmes.ts`, `mock/stories.ts`, `mock/events.ts` | Content |
| `mock/partners.ts` | Partners, partnership packages, grant management |
| `mock/financials.ts` | Income, expenses, ₦1,000 breakdown, reports, governance |
| `mock/impact.ts` | Stats, outcomes, history, values, testimonials |
| `mock/people.ts` | Team and board |
| `mock/faqs.ts`, `mock/navigation.ts` | FAQ and navigation |
| `lib/images.ts` | Unsplash image IDs (all checked) |

Notes:
- The "live" funding gap ticks down slowly for demo effect, starting from the real figure. Set `liveSimulation: false` to turn it off. It also stops for users who prefer reduced motion.
- "Days left" uses a fixed `TODAY` constant in `lib/utils.ts` so static builds stay stable. Update it, or switch it to `new Date()` when you connect real data.
- Forms send nothing. Connect `components/ui/simple-form.tsx` and `app/donate/donate-form.tsx` to your CRM or payment provider (Paystack, Flutterwave…).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Optional: set `NEXT_PUBLIC_SITE_URL` for canonical URLs, Open Graph and the sitemap.
