"use client";

import { useState } from "react";
import { getAppeal } from "@/mock/appeals";

export function ShareButtons({ designation }: { designation: string }) {
  const [copied, setCopied] = useState(false);
  const appeal = getAppeal(designation);
  const path = appeal ? `/appeals/${appeal.slug}` : "/donate";
  const text = appeal ? `I just gave to the ${appeal.title}. Every naira helps families right now:` : "I just gave to Ubuntu Relief Network's emergency response. Join me:";
  const url = () => (typeof window !== "undefined" ? `${window.location.origin}${path}` : path);

  return (
    <div className="mt-5 grid grid-cols-2 gap-2">
      <a className="btn btn-white btn-sm" target="_blank" rel="noopener noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${text} ${path}`)}`} onClick={(e) => (e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(`${text} ${url()}`)}`)}>
        WhatsApp
      </a>
      <a className="btn btn-outline-light btn-sm" target="_blank" rel="noopener noreferrer" href={`https://x.com/intent/post?text=${encodeURIComponent(text)}`} onClick={(e) => (e.currentTarget.href = `https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url())}`)}>
        Post on X
      </a>
      <button
        type="button"
        className="btn btn-outline-light btn-sm col-span-2"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url());
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
