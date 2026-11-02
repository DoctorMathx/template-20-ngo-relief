import type { Urgency } from "@/lib/types";
import { urgencyLabel } from "@/lib/utils";

export function UrgencyBadge({ level, className = "" }: { level: Urgency; className?: string }) {
  return (
    <span className={`badge badge-${level} ${className}`}>
      {level === "critical" && <span aria-hidden className="inline-block w-1.5 h-1.5 bg-white" />}
      {urgencyLabel[level]}
    </span>
  );
}
