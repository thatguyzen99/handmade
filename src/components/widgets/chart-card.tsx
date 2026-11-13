"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartColumnIcon, ChartSplineIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDivider } from "@/components/ui/card";
import { chartAxis, chartColors, chartGrid, ChartLegend, ChartTooltip } from "@/components/ui/chart";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Range = "6m" | "12m";
const data = [
  { m: "Dec", income: 6.2, spend: 3.1 },
  { m: "Jan", income: 5.8, spend: 2.9 },
  { m: "Feb", income: 7.4, spend: 3.4 },
  { m: "Mar", income: 6.9, spend: 3.8 },
  { m: "Apr", income: 8.6, spend: 3.6 },
  { m: "May", income: 9.1, spend: 4.2 },
  { m: "Jun", income: 8.4, spend: 4.0 },
  { m: "Jul", income: 10.2, spend: 4.4 },
  { m: "Aug", income: 9.7, spend: 4.1 },
  { m: "Sep", income: 11.4, spend: 4.9 },
  { m: "Oct", income: 12.1, spend: 5.2 },
  { m: "Nov", income: 13.6, spend: 5.0 },
];
const money = (v: number | string) => `$${Number(v).toFixed(1)}k`;

/** Chart card (Recharts): header with total + delta, range segmented control, area or bar view, token colors. */
export function ChartCard() {
  const [range, setRange] = React.useState<Range>("12m");
  const [kind, setKind] = React.useState("area");
  const rows = range === "6m" ? data.slice(-6) : data;
  const total = rows.reduce((s, r) => s + r.income, 0);
  const id = React.useId().replace(/:/g, "");

  return (
    <Card data-slot="chart-card" className="tabular-nums">
      <div className="flex flex-wrap items-start justify-between gap-4 p-5">
        <div className="space-y-1">
          <div className="text-ui-sm text-fg-muted">Studio income</div>
          <div className="flex items-center gap-2">
            <span className="text-ui-xl text-fg">{money(total)}</span>
            <Badge status="success" size="small">+18.2%</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ToggleGroup type="single" value={kind} onValueChange={(v) => v && setKind(v)} size="xsmall" aria-label="Chart type">
            <ToggleGroupItem value="area" aria-label="Area chart"><ChartSplineIcon /></ToggleGroupItem>
            <ToggleGroupItem value="bar" aria-label="Bar chart"><ChartColumnIcon /></ToggleGroupItem>
          </ToggleGroup>
          <SegmentedControl value={range} onValueChange={(v) => setRange(v as Range)} size="small" aria-label="Range">
            <SegmentedControlItem value="6m">6M</SegmentedControlItem>
            <SegmentedControlItem value="12m">12M</SegmentedControlItem>
          </SegmentedControl>
        </div>
      </div>
      <div className="h-56 px-2">
        <ResponsiveContainer width="100%" height="100%">
          {kind === "area" ? (
            <AreaChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`${id}-income`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...chartGrid} />
              <XAxis dataKey="m" {...chartAxis} dy={8} />
              <YAxis {...chartAxis} width={48} tickFormatter={(v) => `$${v}k`} />
              <Tooltip cursor={{ stroke: "var(--line-strong)" }} content={<ChartTooltip format={money} />} />
              <Area type="monotone" dataKey="spend" name="Spend" stroke={chartColors.muted} strokeWidth={1.5} fill="transparent" />
              <Area type="monotone" dataKey="income" name="Income" stroke={chartColors.primary} strokeWidth={2} fill={`url(#${id}-income)`} activeDot={{ r: 4, strokeWidth: 0 }} />
            </AreaChart>
          ) : (
            <BarChart data={rows} margin={{ top: 8, right: 16, left: 0, bottom: 0 }} barGap={4}>
              <CartesianGrid {...chartGrid} />
              <XAxis dataKey="m" {...chartAxis} dy={8} />
              <YAxis {...chartAxis} width={48} tickFormatter={(v) => `$${v}k`} />
              <Tooltip cursor={{ fill: "var(--hover)" }} content={<ChartTooltip format={money} />} />
              <Bar dataKey="income" name="Income" fill={chartColors.primary} radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="spend" name="Spend" fill={chartColors.muted} radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <CardDivider className="mt-4" />
      <div className="flex items-center justify-between gap-4 px-5 py-3">
        <ChartLegend items={[{ label: "Income", color: chartColors.primary }, { label: "Spend", color: chartColors.muted }]} />
        <span className="text-body-xs text-fg-subtle">In thousands, USD</span>
      </div>
    </Card>
  );
}
