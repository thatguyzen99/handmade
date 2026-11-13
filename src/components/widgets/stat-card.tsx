import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkline } from "@/components/ui/sparkline";
import { cn } from "@/lib/utils";

/** KPI card: label + icon, a large tabular value, a delta badge and a sparkline of the trend. */
export function StatCard({ label, value, delta, up = true, points, icon, hint = "vs last month", className }: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  points: number[];
  icon?: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <Card data-slot="stat-card" className={cn("flex flex-col gap-3 p-5 tabular-nums", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-ui-sm text-fg-muted">{label}</span>
        {icon && <span className="flex size-8 items-center justify-center rounded-full text-fg-subtle ring-1 ring-inset ring-line [&_svg]:size-4">{icon}</span>}
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="text-ui-xl text-fg">{value}</div>
        <Sparkline points={points} tone={up ? "highlight" : "danger"} className="h-8 w-20 shrink-0" />
      </div>
      <div className="flex items-center gap-2">
        <Badge status={up ? "success" : "danger"} size="small">{delta}</Badge>
        <span className="truncate text-body-xs text-fg-subtle">{hint}</span>
      </div>
    </Card>
  );
}
