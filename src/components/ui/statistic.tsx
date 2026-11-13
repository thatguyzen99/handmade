import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function formatStatistic(value: number, opts: { type?: "number" | "percentage"; decimals?: number; disableFormatting?: boolean; fixedDecimals?: boolean }) {
  if (opts.disableFormatting) return String(value);
  const decimals = opts.decimals ?? (opts.type === "percentage" ? 1 : 0);
  const n = opts.fixedDecimals
    ? value.toFixed(decimals)
    : new Intl.NumberFormat(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: opts.fixedDecimals ? decimals : 0 }).format(value);
  return opts.type === "percentage" ? `${n}%` : n;
}

function Statistic({
  value,
  type = "number",
  trend,
  showTrend,
  decimals,
  emptyText = "—",
  suffix,
  prefix,
  disableFormatting,
  fixedDecimals,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "prefix"> & {
  value?: number | null;
  type?: "number" | "percentage";
  trend?: "up" | "down" | "neutral";
  showTrend?: boolean;
  decimals?: number;
  emptyText?: string;
  suffix?: string;
  prefix?: string;
  disableFormatting?: boolean;
  fixedDecimals?: boolean;
}) {
  const empty = value == null;
  const TrendIcon = trend === "up" ? ArrowUpIcon : trend === "down" ? ArrowDownIcon : MinusIcon;
  return (
    <div
      data-slot="statistic"
      className={cn("inline-flex items-baseline gap-1 tabular-nums text-heading-5 text-fg", className)}
      {...props}
    >
      {empty ? (
        <span className="text-fg-subtle">{emptyText}</span>
      ) : (
        <>
          {prefix && <span className="text-ui-sm text-fg-muted">{prefix}</span>}
          <span>{formatStatistic(value, { type, decimals, disableFormatting, fixedDecimals })}</span>
          {suffix && <span className="text-ui-sm text-fg-muted">{suffix}</span>}
        </>
      )}
      {showTrend && trend && !empty && (
        <span
          data-trend={trend}
          className={cn(
            "inline-flex items-center self-center text-ui-xs",
            trend === "up" && "text-success-fg",
            trend === "down" && "text-danger-fg",
            trend === "neutral" && "text-fg-subtle",
          )}
        >
          <TrendIcon className="size-4" />
        </span>
      )}
    </div>
  );
}

export { Statistic, formatStatistic };
