"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [alerts, setAlerts] = useState(true);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className={`flex items-start gap-3 p-4 border-[1.5px] ${dark ? "border-white" : "border-ink"}`} role="status">
        <Check className="w-5 h-5 text-alarm shrink-0 mt-0.5" aria-hidden />
        <p>
          <strong>You&apos;re on the list.</strong> Check {email} to confirm.{alerts ? " You'll also get emergency alerts when we launch a new appeal." : ""}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
          setError("Enter a valid email address.");
          return;
        }
        setError("");
        setDone(true);
      }}
    >
      <label htmlFor="nl-email" className={`label ${dark ? "label-light" : ""}`}>
        Email address
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          className="input flex-1"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? "nl-error" : undefined}
        />
        <button type="submit" className="btn btn-alarm">
          Subscribe <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
      {error && (
        <p id="nl-error" className="field-error">
          {error}
        </p>
      )}
      <label className="mt-3 flex items-center gap-2.5 text-sm min-h-[44px] cursor-pointer">
        <input type="checkbox" className="check" checked={alerts} onChange={(e) => setAlerts(e.target.checked)} />
        Send me emergency alerts when a new crisis appeal launches
      </label>
    </form>
  );
}
