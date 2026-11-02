import { siteConfig } from "./site-config";
import type { Urgency } from "./types";

export function formatNaira(value: number) {
  return `${siteConfig.donation.currency}${Math.round(value).toLocaleString("en-NG")}`;
}

export const formatPrice = formatNaira;

/** Compact Naira: ₦12.4m, ₦850k */
export function formatNairaShort(value: number) {
  const c = siteConfig.donation.currency;
  if (value >= 1_000_000_000) return `${c}${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}bn`;
  if (value >= 1_000_000) return `${c}${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}m`;
  if (value >= 1_000) return `${c}${Math.round(value / 1_000)}k`;
  return `${c}${value}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-NG");
}

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) {
  return new Date(iso).toLocaleDateString("en-NG", { timeZone: "Africa/Lagos", ...opts });
}

export function formatDateTime(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "Africa/Lagos" }).toUpperCase();
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Africa/Lagos" });
  return `${date} · ${time} WAT`;
}

export function percent(raised: number, goal: number) {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((raised / goal) * 100));
}

/** Days remaining relative to a fixed "today" so static builds stay stable. */
export const TODAY = "2026-10-28";
export function daysLeft(endsOn: string, today = TODAY) {
  const ms = new Date(endsOn).getTime() - new Date(today).getTime();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const urgencyLabel: Record<Urgency, string> = {
  critical: "Critical",
  high: "High",
  ongoing: "Ongoing",
};

export function processingFee(amount: number) {
  return Math.round(amount * siteConfig.donation.processingFeeRate);
}
