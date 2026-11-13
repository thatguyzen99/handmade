import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * A tiny trend line for stat cards. Plain SVG, no chart library: a 1.5px stroke in the primary (or a
 * status color) over a soft fill of the same color. Decorative; put the number it summarises in text.
 */
function Sparkline({ points, className, tone = "primary", fill = true, width = 120, height = 32 }: {
  points: number[];
  className?: string;
  tone?: "primary" | "success" | "danger" | "neutral";
  fill?: boolean;
  width?: number;
  height?: number;
}) {
  const id = React.useId();
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = width / Math.max(1, points.length - 1);
  const coords = points.map((p, i) => [i * step, height - 2 - ((p - min) / span) * (height - 4)] as const);
  const line = coords.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const color = { primary: "var(--primary)", success: "var(--success)", danger: "var(--danger)", neutral: "var(--fg-subtle)" }[tone];
  return (
    <svg aria-hidden data-slot="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={cn("h-8 w-full overflow-visible", className)}>
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.18} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${id})`} />
        </>
      )}
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export { Sparkline };
