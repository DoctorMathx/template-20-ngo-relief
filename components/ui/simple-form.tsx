"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea" | "number" | "date" | "checkbox";
  required?: boolean;
  options?: string[];
  half?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
};

/**
 * Generic client-side form: controlled inputs, inline validation, success state.
 * Sends nothing — wire `onSubmit` to your provider (Formspree, Airtable, CRM…) when you go live.
 */
export function SimpleForm({
  id,
  fields,
  submitLabel,
  successTitle,
  successBody,
  dark = false,
}: {
  id: string;
  fields: Field[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  dark?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      const v = values[f.name];
      if (f.type === "checkbox") {
        if (f.required && !v) e[f.name] = "Please confirm to continue.";
        continue;
      }
      const s = String(v ?? "").trim();
      if (f.required && !s) e[f.name] = `${f.label.replace(/\s*\*$/, "")} is required.`;
      else if (s && f.type === "email" && !/^\S+@\S+\.\S+$/.test(s)) e[f.name] = "Enter a valid email address.";
      else if (s && f.type === "tel" && !/^(\+?234|0)[789][01]\d{8}$/.test(s.replace(/[\s-]/g, ""))) e[f.name] = "Enter a valid Nigerian phone number.";
      else if (s && f.type === "number" && !(Number.isInteger(Number(s)) && Number(s) > 0)) e[f.name] = "Enter a positive whole number.";
    }
    return e;
  };

  if (done) {
    return (
      <div role="status" className={cn("p-6 border-[1.5px]", dark ? "border-white" : "border-ink bg-sand")}>
        <CheckCircle2 className="w-8 h-8 text-alarm-strong" aria-hidden />
        <div className="font-display text-3xl font-bold mt-3">{successTitle}</div>
        <p className={cn("mt-2", dark ? "text-white/80" : "text-muted")}>{successBody}</p>
        <button
          type="button"
          className={cn("btn btn-sm mt-5", dark ? "btn-outline-light" : "btn-outline")}
          onClick={() => {
            setValues(Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : ""])));
            setDone(false);
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(ev) => {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length === 0) setDone(true);
        else document.getElementById(`${id}-${Object.keys(e)[0]}`)?.focus();
      }}
      className="grid grid-cols-1 [&>*]:min-w-0 gap-4 sm:grid-cols-2"
    >
      {fields.map((f) => {
        const fid = `${id}-${f.name}`;
        const err = errors[f.name];
        const a11y = { id: fid, "aria-invalid": !!err || undefined, "aria-describedby": err ? `${fid}-err` : f.hint ? `${fid}-hint` : undefined };
        const set = (v: string | boolean) => setValues((s) => ({ ...s, [f.name]: v }));
        if (f.type === "checkbox") {
          return (
            <div key={f.name} className="sm:col-span-2">
              <label className="flex items-start gap-3 min-h-[44px] cursor-pointer text-sm">
                <input type="checkbox" className="check mt-0.5" checked={!!values[f.name]} onChange={(e) => set(e.target.checked)} {...a11y} />
                <span>{f.label}</span>
              </label>
              {err && (
                <p id={`${fid}-err`} className="field-error">
                  {err}
                </p>
              )}
            </div>
          );
        }
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={fid} className={cn("label", dark && "label-light")}>
              {f.label}
              {f.required && <span className="text-alarm-strong"> *</span>}
            </label>
            {f.type === "select" ? (
              <select className="input" value={String(values[f.name])} onChange={(e) => set(e.target.value)} {...a11y}>
                <option value="">Select…</option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea className="input min-h-[130px]" placeholder={f.placeholder} value={String(values[f.name])} onChange={(e) => set(e.target.value)} {...a11y} />
            ) : (
              <input
                className="input"
                type={f.type === "number" ? "text" : f.type ?? "text"}
                inputMode={f.type === "number" ? "numeric" : undefined}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                value={String(values[f.name])}
                onChange={(e) => set(e.target.value)}
                {...a11y}
              />
            )}
            {f.hint && !err && (
              <p id={`${fid}-hint`} className={cn("text-xs mt-1", dark ? "text-muted-dark" : "text-muted")}>
                {f.hint}
              </p>
            )}
            {err && (
              <p id={`${fid}-err`} className="field-error">
                {err}
              </p>
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-alarm btn-lg">
          {submitLabel}
        </button>
        <p className={cn("text-xs mt-3", dark ? "text-muted-dark" : "text-muted")}>We&apos;ll only use your details to respond. See our data protection policy (NDPA 2023).</p>
      </div>
    </form>
  );
}
