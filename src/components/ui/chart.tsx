"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Chart helpers for Recharts (or any SVG chart). Series colors are CSS variables, so charts follow
 * the theme and dark mode: the primary leads, then the chart-* status hues. Grid lines use --line,
 * axis text --fg-subtle at text-ui-xs, tooltips are the floating layer.
 */
const chartColors = {
  primary: "var(--primary)",
  muted: "var(--track-strong)",
  "chart-1": "var(--chart-1)",
  "chart-2": "var(--chart-2)",
  "chart-3": "var(--chart-3)",
  "chart-4": "var(--chart-4)",
  "chart-5": "var(--chart-5)",
} as const;

/** Shared props for axes and grids so every chart reads the same. */
const chartAxis = {
  tick: { fill: "var(--fg-subtle)", fontSize: 12 },
  tickLine: false,
  axisLine: false,
} as const;
const chartGrid = { stroke: "var(--line)", strokeDasharray: "0", vertical: false } as const;

type TooltipPayload = { name?: string | number; value?: number | string; color?: string; dataKey?: string | number }[];

/** Tooltip body: pass as `<Tooltip content={<ChartTooltip format={…} />} />`. */
function ChartTooltip({ active, payload, label, format = (v) => String(v), className }: {
  active?: boolean;
  payload?: TooltipPayload;
  label?: string | number;
  format?: (value: number | string) => string;
  className?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div data-slot="chart-tooltip" className={cn("min-w-32 space-y-1 rounded-xl bg-floating px-3 py-2 shadow-md tabular-nums", className)}>
      {label !== undefined && <div className="text-ui-xs text-fg-muted">{label}</div>}
      {payload.map((p) => (
        <div key={String(p.dataKey ?? p.name)} className="flex items-center gap-2 text-ui-sm text-fg">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="flex-1 text-fg-muted">{p.name}</span>
          <span>{p.value !== undefined ? format(p.value) : "–"}</span>
        </div>
      ))}
    </div>
  );
}

/** Legend row under a chart. */
function ChartLegend({ items, className }: { items: { label: string; color: string }[]; className?: string }) {
  return (
    <div data-slot="chart-legend" className={cn("flex flex-wrap items-center gap-4 text-ui-xs text-fg-muted", className)}>
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}

export { chartColors, chartAxis, chartGrid, ChartTooltip, ChartLegend };
