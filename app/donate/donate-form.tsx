"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Landmark, Smartphone, Heart, Lock, AlertTriangle, Users } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { designations, designationLabel, frequencies, presetAmounts, type Frequency } from "@/mock/donate";
import { reliefKits } from "@/mock/relief-kits";
import { getAppeal } from "@/mock/appeals";
import { CopyButton } from "@/components/ui/copy-button";
import { cn, formatNaira, processingFee } from "@/lib/utils";

type Method = "card" | "transfer" | "ussd";
type Errors = Partial<Record<string, string>>;

const isFreq = (v: string | null): v is Frequency => v === "one-time" || v === "monthly" || v === "annual";

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36).toUpperCase().padStart(6, "0").slice(0, 6);
}

function parseKit(raw: string | null) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((p) => {
      const [id, n] = p.split(":");
      const kit = reliefKits.find((k) => k.id === id);
      const q = Number(n);
      return kit && Number.isInteger(q) && q > 0 ? { kit, n: Math.min(q, 99) } : null;
    })
    .filter((x): x is { kit: (typeof reliefKits)[number]; n: number } => !!x);
}

export function DonateForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { donation, matching } = siteConfig;

  const kitLines = useMemo(() => parseKit(params.get("kit")), [params]);
  const kitTotal = kitLines.reduce((s, l) => s + l.kit.price * l.n, 0);

  const initialFreq: Frequency = isFreq(params.get("frequency")) ? (params.get("frequency") as Frequency) : donation.defaultFrequency;
  const paramAmount = Number(params.get("amount"));
  const initialAmount = kitTotal > 0 ? kitTotal : Number.isInteger(paramAmount) && paramAmount > 0 ? paramAmount : donation.defaultAmount;
  const campaign = params.get("campaign");
  const desigParam = params.get("designation");
  const initialDesignation =
    (campaign && designations.some((d) => d.id === campaign) && campaign) ||
    (desigParam && designations.some((d) => d.id === desigParam) && desigParam) ||
    (kitLines.length ? "relief-kits" : "rapid-response");

  const [frequency, setFrequency] = useState<Frequency>(initialFreq);
  const [preset, setPreset] = useState<number | null>(presetAmounts[initialFreq].some((p) => p.amount === initialAmount) ? initialAmount : null);
  const [custom, setCustom] = useState<string>(presetAmounts[initialFreq].some((p) => p.amount === initialAmount) ? "" : String(initialAmount));
  const [designation, setDesignation] = useState(initialDesignation);
  const [coverFees, setCoverFees] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [tributeOn, setTributeOn] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeNotify, setTributeNotify] = useState("");
  const [employerMatch, setEmployerMatch] = useState(false);
  const [employer, setEmployer] = useState("");
  const [donor, setDonor] = useState({ first: "", last: "", email: "", phone: "", updates: true });
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const amount = preset ?? (custom.trim() === "" ? 0 : Number(custom));
  const amountValid = Number.isInteger(amount) && amount >= donation.minimum;
  const fee = coverFees && amountValid ? processingFee(amount) : 0;
  const total = amountValid ? amount + fee : 0;
  const matchApplies = matching.active && designation === matching.appealSlug;
  const appeal = getAppeal(designation);
  const reference = `URN-${hash(`${donor.last}${donor.email}${amount}${designation}`)}`;
  const freqSuffix = frequency === "monthly" ? "/month" : frequency === "annual" ? "/year" : "";
  const presets = presetAmounts[frequency];
  const selectedImpact = presets.find((p) => p.amount === amount)?.impact;

  function changeFrequency(f: Frequency) {
    setFrequency(f);
    if (preset !== null && !presetAmounts[f].some((p) => p.amount === preset)) {
      setPreset(presetAmounts[f][1]?.amount ?? presetAmounts[f][0].amount);
    }
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!amountValid) e.amount = `Enter a whole-naira amount of at least ${formatNaira(donation.minimum)}.`;
    if (amount > 100_000_000) e.amount = "For gifts above ₦100m please contact our partnerships team.";
    if (!donor.first.trim()) e.first = "Enter your first name.";
    if (!donor.last.trim()) e.last = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(donor.email.trim())) e.email = "Enter a valid email so we can send your receipt.";
    if (donor.phone.trim() && !/^(\+?234|0)[789][01]\d{8}$/.test(donor.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid Nigerian mobile number, e.g. 0803 123 4567.";
    if (tributeOn && !tributeName.trim()) e.tributeName = "Enter the name of the person you're honouring.";
    if (tributeOn && tributeNotify.trim() && !/^\S+@\S+\.\S+$/.test(tributeNotify.trim())) e.tributeNotify = "Enter a valid email or leave blank.";
    if (employerMatch && !employer.trim()) e.employer = "Enter your employer's name.";
    if (method === "card") {
      const num = card.number.replace(/\s/g, "");
      if (!/^\d{16,19}$/.test(num)) e.cardNumber = "Enter a valid 16–19 digit card number.";
      if (!card.name.trim()) e.cardName = "Enter the name on the card.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) e.cardExpiry = "Use MM/YY.";
      else {
        const exp = new Date(2000 + Number(m[2]), Number(m[1]), 1);
        if (exp < new Date()) e.cardExpiry = "This card has expired.";
      }
      if (!/^\d{3,4}$/.test(card.cvv)) e.cardCvv = "3 or 4 digits.";
    }
    if (method === "transfer" && !transferConfirmed) e.transfer = "Confirm you've made (or will make) the transfer using your reference.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
      return;
    }
    setSubmitting(true);
    const q = new URLSearchParams({
      ref: reference,
      amount: String(amount),
      fee: String(fee),
      frequency,
      designation,
      method,
      name: anonymous ? "Anonymous" : `${donor.first.trim()} ${donor.last.trim()}`,
      email: donor.email.trim(),
    });
    if (tributeOn) q.set("tribute", `${tributeType}:${tributeName.trim()}`);
    if (matchApplies) q.set("matched", "1");
    if (employerMatch) q.set("employer", employer.trim());
    if (kitLines.length && designation === "relief-kits") q.set("kit", kitLines.map((l) => `${l.kit.id}:${l.n}`).join(","));
    window.setTimeout(() => router.push(`/donate/thank-you?${q.toString()}`), 700);
  }

  const err = (k: string) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-err` } : {});
  const errMsg = (k: string) =>
    errors[k] ? (
      <p id={`${k}-err`} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  const errorList = Object.entries(errors).filter(([, v]) => v);

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 [&>*]:min-w-0 gap-10 lg:grid-cols-[1.6fr_1fr] items-start">
      <div className="space-y-10">
        {errorList.length > 0 && (
          <div id="error-summary" tabIndex={-1} role="alert" className="border-[1.5px] border-alarm-strong bg-alarm-soft p-5 focus:outline-none focus-visible:outline-[3px]">
            <div className="flex items-center gap-2 font-display text-xl font-bold">
              <AlertTriangle className="w-5 h-5 text-alarm-strong" aria-hidden /> Please fix {errorList.length} thing{errorList.length > 1 ? "s" : ""}
            </div>
            <ul className="mt-2 text-sm list-disc pl-5 space-y-0.5">
              {errorList.map(([k, v]) => (
                <li key={k}>{v}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 1. Frequency + amount */}
        <fieldset>
          <legend className="w-full border-t-4 border-ink pt-3 mb-5 flex items-baseline gap-3">
            <span className="font-mono text-alarm-strong font-semibold">01</span>
            <span className="font-display text-3xl font-bold">Your gift</span>
          </legend>
          <div role="radiogroup" aria-label="Donation frequency" className="grid grid-cols-3 border-[1.5px] border-ink">
            {frequencies.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={frequency === f.id}
                onClick={() => changeFrequency(f.id)}
                className={cn("py-3 px-2 min-h-[56px] text-center", i > 0 && "border-l-[1.5px] border-ink", frequency === f.id ? "bg-ink text-white" : "hover:bg-sand")}
              >
                <span className="block font-display text-lg font-bold">{f.label}</span>
                <span className={cn("block text-[11px] font-mono uppercase tracking-wider", frequency === f.id ? "text-alarm" : "text-muted")}>{f.note}</span>
              </button>
            ))}
          </div>

          {kitLines.length > 0 && (
            <div className="mt-5 bg-sand border-l-4 border-alarm p-4">
              <div className="label-mono">Your relief kit</div>
              <ul className="mt-2 text-sm grid grid-cols-1 [&>*]:min-w-0 sm:grid-cols-2 gap-x-6 gap-y-1">
                {kitLines.map((l) => (
                  <li key={l.kit.id} className="flex justify-between gap-3">
                    <span>
                      {l.n} × {l.kit.name}
                    </span>
                    <span className="font-mono num">{formatNaira(l.kit.price * l.n)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div role="radiogroup" aria-label="Choose an amount" className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presets.map((p) => (
              <button
                key={p.amount}
                type="button"
                role="radio"
                aria-checked={preset === p.amount}
                onClick={() => {
                  setPreset(p.amount);
                  setCustom("");
                }}
                className={cn(
                  "min-h-[64px] border-[1.5px] border-ink font-display-normal font-bold text-2xl num",
                  preset === p.amount ? "bg-alarm-strong text-white border-alarm-strong" : "hover:bg-sand"
                )}
              >
                {formatNaira(p.amount)}
                <span className="text-sm font-normal">{freqSuffix}</span>
              </button>
            ))}
            <div className={cn("relative border-[1.5px] min-h-[64px] flex items-center", preset === null ? "border-alarm-strong outline outline-2 outline-alarm-strong" : "border-ink")}>
              <label htmlFor="custom-amount" className="sr-only">
                Custom amount in naira
              </label>
              <span className="pl-3 font-display-normal text-2xl font-bold" aria-hidden>
                ₦
              </span>
              <input
                id="custom-amount"
                inputMode="numeric"
                placeholder="Other"
                value={custom}
                onFocus={() => setPreset(null)}
                onChange={(e) => {
                  setPreset(null);
                  setCustom(e.target.value.replace(/[^\d]/g, "").slice(0, 9));
                }}
                className="w-full h-full bg-transparent px-2 font-display-normal text-2xl font-bold num focus:outline-none"
                {...err("amount")}
              />
            </div>
          </div>
          {errMsg("amount")}
          <p className="mt-4 min-h-[48px] flex items-start gap-2 text-[0.95rem]" aria-live="polite">
            <Heart className="w-4 h-4 text-alarm-strong mt-1 shrink-0" aria-hidden />
            <span>
              {selectedImpact ??
                (amountValid
                  ? `${formatNaira(amount)}${freqSuffix} goes straight to ${designationLabel(designation)}.`
                  : `Minimum gift ${formatNaira(donation.minimum)}.`)}
            </span>
          </p>
        </fieldset>

        {/* 2. Designation */}
        <fieldset>
          <legend className="w-full border-t-4 border-ink pt-3 mb-5 flex items-baseline gap-3">
            <span className="font-mono text-alarm-strong font-semibold">02</span>
            <span className="font-display text-3xl font-bold">Where it goes</span>
          </legend>
          <label htmlFor="designation" className="label">
            Designate your gift
          </label>
          <select id="designation" className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
            {(["General", "Emergency appeal", "In-kind", "Programme"] as const).map((g) => (
              <optgroup key={g} label={g}>
                {designations
                  .filter((d) => d.group === g)
                  .map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          {designation === "rapid-response" && <p className="mt-2 text-sm text-muted">Unrestricted gifts let us respond within hours — this is where your gift does the most good.</p>}
          {appeal && (
            <p className="mt-2 text-sm text-muted">
              {appeal.urgency === "critical" ? "Critical appeal. " : ""}
              {formatNaira(appeal.goal - appeal.raised)} still needed to fully fund this response.
            </p>
          )}
          {matchApplies && (
            <div className="mt-3 flex items-start gap-3 bg-ink text-white p-4">
              <span className="font-display text-3xl font-bold text-alarm leading-none">×{matching.multiplier}</span>
              <p className="text-sm">
                <strong>{matching.partner}</strong> will match this gift naira-for-naira until the {formatNaira(matching.cap)} cap is reached.
              </p>
            </div>
          )}
        </fieldset>

        {/* 3. Options */}
        <fieldset>
          <legend className="w-full border-t-4 border-ink pt-3 mb-5 flex items-baseline gap-3">
            <span className="font-mono text-alarm-strong font-semibold">03</span>
            <span className="font-display text-3xl font-bold">Gift options</span>
          </legend>
          <div className="space-y-1">
            <label className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer">
              <input type="checkbox" className="check mt-0.5" checked={coverFees} onChange={(e) => setCoverFees(e.target.checked)} />
              <span>
                <span className="font-semibold">Cover the {(donation.processingFeeRate * 100).toFixed(1)}% processing fee</span>
                <span className="block text-sm text-muted">Adds {amountValid ? formatNaira(processingFee(amount)) : "—"} so 100% of your gift reaches the field.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer">
              <input type="checkbox" className="check mt-0.5" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
              <span>
                <span className="font-semibold">Give anonymously</span>
                <span className="block text-sm text-muted">Your name won&apos;t appear in recent donor lists. You&apos;ll still get a receipt.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer">
              <input type="checkbox" className="check mt-0.5" checked={tributeOn} onChange={(e) => setTributeOn(e.target.checked)} aria-controls="tribute-fields" aria-expanded={tributeOn} />
              <span>
                <span className="font-semibold">Dedicate this gift</span>
                <span className="block text-sm text-muted">In honour or in memory of someone special.</span>
              </span>
            </label>
            {tributeOn && (
              <div id="tribute-fields" className="ml-8 bg-sand p-4 grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2 flex gap-2" role="radiogroup" aria-label="Tribute type">
                  {(["honour", "memory"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={tributeType === t}
                      onClick={() => setTributeType(t)}
                      className={cn("min-h-[44px] px-4 border-[1.5px] border-ink font-mono text-xs uppercase tracking-wider", tributeType === t ? "bg-ink text-white" : "bg-white")}
                    >
                      In {t} of
                    </button>
                  ))}
                </div>
                <div>
                  <label htmlFor="tribute-name" className="label">
                    Their name
                  </label>
                  <input id="tribute-name" className="input" value={tributeName} onChange={(e) => setTributeName(e.target.value)} {...err("tributeName")} />
                  {errMsg("tributeName")}
                </div>
                <div>
                  <label htmlFor="tribute-notify" className="label">
                    Notify someone (optional email)
                  </label>
                  <input id="tribute-notify" type="email" className="input" value={tributeNotify} onChange={(e) => setTributeNotify(e.target.value)} {...err("tributeNotify")} />
                  {errMsg("tributeNotify")}
                </div>
              </div>
            )}
            <label className="flex items-start gap-3 min-h-[44px] py-2 cursor-pointer">
              <input type="checkbox" className="check mt-0.5" checked={employerMatch} onChange={(e) => setEmployerMatch(e.target.checked)} />
              <span>
                <span className="font-semibold">My employer matches gifts</span>
                <span className="block text-sm text-muted">We&apos;ll send your HR team the paperwork to double your donation.</span>
              </span>
            </label>
            {employerMatch && (
              <div className="ml-8 bg-sand p-4">
                <label htmlFor="employer" className="label">
                  Employer name
                </label>
                <input id="employer" className="input" value={employer} onChange={(e) => setEmployer(e.target.value)} {...err("employer")} />
                {errMsg("employer")}
              </div>
            )}
          </div>
        </fieldset>

        {/* 4. Details */}
        <fieldset>
          <legend className="w-full border-t-4 border-ink pt-3 mb-5 flex items-baseline gap-3">
            <span className="font-mono text-alarm-strong font-semibold">04</span>
            <span className="font-display text-3xl font-bold">Your details</span>
          </legend>
          <div className="grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="first" className="label">
                First name *
              </label>
              <input id="first" autoComplete="given-name" className="input" value={donor.first} onChange={(e) => setDonor({ ...donor, first: e.target.value })} {...err("first")} />
              {errMsg("first")}
            </div>
            <div>
              <label htmlFor="last" className="label">
                Last name *
              </label>
              <input id="last" autoComplete="family-name" className="input" value={donor.last} onChange={(e) => setDonor({ ...donor, last: e.target.value })} {...err("last")} />
              {errMsg("last")}
            </div>
            <div>
              <label htmlFor="email" className="label">
                Email (for your receipt) *
              </label>
              <input id="email" type="email" autoComplete="email" className="input" value={donor.email} onChange={(e) => setDonor({ ...donor, email: e.target.value })} {...err("email")} />
              {errMsg("email")}
            </div>
            <div>
              <label htmlFor="phone" className="label">
                Phone (optional)
              </label>
              <input id="phone" type="tel" autoComplete="tel" placeholder="0803 123 4567" className="input" value={donor.phone} onChange={(e) => setDonor({ ...donor, phone: e.target.value })} {...err("phone")} />
              {errMsg("phone")}
            </div>
          </div>
          <label className="mt-3 flex items-center gap-3 min-h-[44px] cursor-pointer text-sm">
            <input type="checkbox" className="check" checked={donor.updates} onChange={(e) => setDonor({ ...donor, updates: e.target.checked })} />
            Send me sitreps showing how my gift is used
          </label>
        </fieldset>

        {/* 5. Payment */}
        <fieldset>
          <legend className="w-full border-t-4 border-ink pt-3 mb-5 flex items-baseline gap-3">
            <span className="font-mono text-alarm-strong font-semibold">05</span>
            <span className="font-display text-3xl font-bold">Payment</span>
          </legend>
          <div role="tablist" aria-label="Payment method" className="grid grid-cols-3 border-[1.5px] border-ink">
            {(
              [
                ["card", "Card", CreditCard],
                ["transfer", "Bank transfer", Landmark],
                ["ussd", "USSD", Smartphone],
              ] as const
            ).map(([id, label, Icon], i) => (
              <button
                key={id}
                type="button"
                role="tab"
                id={`tab-${id}`}
                aria-selected={method === id}
                aria-controls={`panel-${id}`}
                onClick={() => setMethod(id)}
                className={cn("min-h-[52px] flex items-center justify-center gap-2 font-display text-base font-bold tracking-wide", i > 0 && "border-l-[1.5px] border-ink", method === id ? "bg-ink text-white" : "hover:bg-sand")}
              >
                <Icon className="w-4 h-4" aria-hidden /> <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{id === "transfer" ? "Transfer" : label}</span>
              </button>
            ))}
          </div>

          <div className="border-[1.5px] border-t-0 border-ink p-5">
            {method === "card" && (
              <div role="tabpanel" id="panel-card" aria-labelledby="tab-card" className="grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="cc-number" className="label">
                    Card number
                  </label>
                  <input
                    id="cc-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="5399 0000 0000 0000"
                    className="input font-mono num"
                    value={card.number}
                    onChange={(e) =>
                      setCard({
                        ...card,
                        number: e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 19)
                          .replace(/(.{4})/g, "$1 ")
                          .trim(),
                      })
                    }
                    {...err("cardNumber")}
                  />
                  {errMsg("cardNumber")}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cc-name" className="label">
                    Name on card
                  </label>
                  <input id="cc-name" autoComplete="cc-name" className="input" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} {...err("cardName")} />
                  {errMsg("cardName")}
                </div>
                <div>
                  <label htmlFor="cc-exp" className="label">
                    Expiry (MM/YY)
                  </label>
                  <input
                    id="cc-exp"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="08/28"
                    className="input font-mono"
                    value={card.expiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d });
                    }}
                    {...err("cardExpiry")}
                  />
                  {errMsg("cardExpiry")}
                </div>
                <div>
                  <label htmlFor="cc-cvv" className="label">
                    CVV
                  </label>
                  <input
                    id="cc-cvv"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    className="input font-mono"
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                    {...err("cardCvv")}
                  />
                  {errMsg("cardCvv")}
                </div>
                <p className="sm:col-span-2 text-xs text-muted flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" aria-hidden /> Visa, Mastercard and Verve accepted. {frequency !== "one-time" && "Your card will be charged automatically each period — cancel any time."}
                </p>
              </div>
            )}

            {method === "transfer" && (
              <div role="tabpanel" id="panel-transfer" aria-labelledby="tab-transfer">
                <p className="text-sm text-muted mb-4">Transfer {total ? <strong className="text-ink">{formatNaira(total)}</strong> : "your gift"} to the account below. Use your reference so we can match your gift and send a receipt.</p>
                <dl className="divide-y divide-hair border-y border-ink">
                  {[
                    ["Bank", donation.bank.bankName, null],
                    ["Account name", donation.bank.accountName, null],
                    ["Account number", donation.bank.accountNumber, donation.bank.accountNumber],
                    ["Your reference", reference, reference],
                  ].map(([k, v, copy]) => (
                    <div key={k} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <dt className="label-mono">{k}</dt>
                        <dd className={cn("font-semibold [overflow-wrap:anywhere]", (k === "Account number" || k === "Your reference") && "font-mono text-lg num")}>{v}</dd>
                      </div>
                      {copy && <CopyButton value={copy} />}
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-muted">
                  Diaspora donors: USD to {donation.usdBank.bankName}, {donation.usdBank.accountNumber}, SWIFT {donation.usdBank.swift}.
                </p>
                <label className="mt-4 flex items-start gap-3 min-h-[44px] cursor-pointer">
                  <input type="checkbox" className="check mt-0.5" checked={transferConfirmed} onChange={(e) => setTransferConfirmed(e.target.checked)} {...err("transfer")} />
                  <span className="text-sm">I&apos;ve made (or will make) this transfer using reference {reference}.</span>
                </label>
                {errMsg("transfer")}
              </div>
            )}

            {method === "ussd" && (
              <div role="tabpanel" id="panel-ussd" aria-labelledby="tab-ussd">
                <p className="text-sm text-muted">Dial from the phone linked to your {donation.ussd.bank} account:</p>
                <div className="mt-3 flex items-center justify-between gap-3 bg-ink text-white p-4 sm:p-5">
                  <span className="font-mono text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider min-w-0 [overflow-wrap:anywhere]">{donation.ussd.code.replace("000", amountValid ? String(total) : "AMOUNT")}</span>
                  <CopyButton value={donation.ussd.code.replace("000", amountValid ? String(total) : "")} label="Copy code" />
                </div>
                <ol className="mt-4 text-sm space-y-1.5 list-decimal pl-5">
                  <li>Dial the code above and confirm the amount.</li>
                  <li>Enter your bank PIN to authorise.</li>
                  <li>
                    Enter reference <strong className="font-mono">{reference}</strong> when prompted.
                  </li>
                </ol>
                {frequency !== "one-time" && <p className="mt-3 text-xs text-muted">USSD gifts are one-off. For automatic {frequency} giving, choose Card.</p>}
              </div>
            )}
          </div>
        </fieldset>

        <div className="lg:hidden">
          <SubmitButton total={total} freqSuffix={freqSuffix} submitting={submitting} method={method} />
        </div>
      </div>

      {/* Sticky summary */}
      <aside className="lg:sticky lg:top-32 bg-ink text-white" aria-label="Donation summary">
        <div className="p-6 border-b border-ink-3">
          <div className="kicker text-alarm">Summary</div>
          <div className="font-display-normal text-5xl font-bold num mt-2" aria-live="polite">
            {total ? formatNaira(total) : "₦—"}
            <span className="text-lg font-normal text-muted-dark">{freqSuffix}</span>
          </div>
        </div>
        <dl className="p-6 space-y-3 text-sm">
          <Row k="Gift" v={amountValid ? formatNaira(amount) : "—"} />
          <Row k="Processing fee" v={fee ? formatNaira(fee) : "Not covered"} />
          <Row k="Frequency" v={frequencies.find((f) => f.id === frequency)!.label} />
          <Row k="Designation" v={designationLabel(designation)} />
          {tributeOn && tributeName && <Row k="Dedication" v={`In ${tributeType} of ${tributeName}`} />}
          {anonymous && <Row k="Visibility" v="Anonymous" />}
          <Row k="Method" v={method === "card" ? "Card" : method === "transfer" ? "Bank transfer" : "USSD"} />
        </dl>
        {matchApplies && amountValid && (
          <div className="mx-6 mb-4 p-4 bg-alarm-strong">
            <div className="flex items-center gap-2 font-display text-lg font-bold">
              <Users className="w-4 h-4" aria-hidden /> Total impact {formatNaira(amount * matching.multiplier)}
            </div>
            <p className="text-xs mt-1 text-white/90">Including {formatNaira(amount * (matching.multiplier - 1))} matched by {matching.partner}.</p>
          </div>
        )}
        <div className="px-6 pb-6 hidden lg:block">
          <SubmitButton total={total} freqSuffix={freqSuffix} submitting={submitting} method={method} />
          <p className="mt-3 text-xs text-muted-dark leading-relaxed">
            Demo checkout — no payment is taken. Refunds within {donation.refundWindowDays} days on request. {siteConfig.org.legalName}.
          </p>
        </div>
      </aside>
    </form>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-ink-3 pb-2.5">
      <dt className="label-mono text-muted-dark">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}

function SubmitButton({ total, freqSuffix, submitting, method }: { total: number; freqSuffix: string; submitting: boolean; method: Method }) {
  const verb = method === "card" ? "Donate" : "Confirm";
  return (
    <button type="submit" disabled={submitting} className="btn btn-alarm btn-lg btn-block">
      {submitting ? "Processing…" : total ? `${verb} ${formatNaira(total)}${freqSuffix}` : `${verb} now`}
    </button>
  );
}
