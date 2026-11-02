"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";

export function EventRegister({ title, cta }: { title: string; cta: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const id = useId();

  if (done) {
    return (
      <p role="status" className="flex items-center gap-2 font-semibold md:w-64">
        <Check className="w-5 h-5 text-alarm-strong" aria-hidden /> You&apos;re registered. Details sent to {email}.
      </p>
    );
  }
  if (!open) {
    return (
      <button type="button" className="btn btn-ink" onClick={() => setOpen(true)} aria-expanded={open}>
        {cta}
      </button>
    );
  }
  return (
    <form
      noValidate
      className="md:w-72"
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError("Enter a valid email.");
        setError("");
        setDone(true);
      }}
    >
      <label htmlFor={id} className="label">
        Email to register for {title}
      </label>
      <input id={id} type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined} autoFocus />
      {error && (
        <p id={`${id}-e`} className="field-error">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-alarm btn-block mt-2">
        Confirm
      </button>
    </form>
  );
}
