import * as React from "react";
import { cn } from "@/lib/utils";

type ProgressStatus = "primary" | "success" | "warning" | "danger";
const fills: Record<ProgressStatus, string> = { primary: "bg-primary", success: "bg-success", warning: "bg-warning", danger: "bg-danger" };
const strokes: Record<ProgressStatus, string> = { primary: "stroke-primary", success: "stroke-success", warning: "stroke-warning", danger: "stroke-danger" };

/** Linear progress: an h-2 track (bg-track) with a rounded fill in the primary or a status color. */
function Progress({ value, className, status = "primary", size = "medium", label }: { value: number; className?: string; status?: ProgressStatus; size?: "medium" | "small"; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      data-slot="progress"
      className={cn("w-full overflow-hidden rounded-full bg-track", size === "medium" ? "h-2" : "h-1", className)}
    >
      <div className={cn("h-full rounded-full transition-[width] duration-300 ease-tactile", fills[status])} style={{ width: `${v}%` }} />
    </div>
  );
}

/** Circular progress for compact spots (uploads, goals). The value sits in the middle in tabular figures. */
function ProgressRing({ value, size = 48, stroke = 4, status = "primary", showValue = true, className, label }: { value: number; size?: number; stroke?: number; status?: ProgressStatus; showValue?: boolean; className?: string; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} data-slot="progress-ring" className={cn("relative inline-flex shrink-0 items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-track" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} className={cn("transition-[stroke-dashoffset] duration-300 ease-tactile", strokes[status])} />
      </svg>
      {showValue && <span className="absolute text-ui-xs text-fg tabular-nums">{Math.round(v)}%</span>}
    </div>
  );
}

export { Progress, ProgressRing, type ProgressStatus };
