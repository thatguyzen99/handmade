import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Statistic } from "@/components/ui/statistic";

function Highlights({
  title,
  bigValue,
  endIcon,
  statistic,
  isLoading,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  title?: React.ReactNode;
  bigValue?: React.ReactNode;
  endIcon?: React.ReactNode;
  statistic?: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div data-slot="highlights" className={cn("space-y-3 rounded-2xl bg-surface p-5 shadow-sm", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        {isLoading ? <Skeleton className="h-4 w-24" /> : title != null && <div className="text-ui-sm text-fg-muted">{title}</div>}
        {endIcon && <div className="text-fg-subtle [&_svg]:size-4">{endIcon}</div>}
      </div>
      {isLoading ? (
        <Skeleton className="h-8 w-28" />
      ) : (
        <div className="text-heading-3 text-fg tabular-nums">{bigValue}</div>
      )}
      {isLoading ? <Skeleton className="h-4 w-20" /> : statistic}
    </div>
  );
}

function HighlightsGrid({
  children,
  columns = 3,
  isLoading,
  className,
  ...props
}: React.ComponentProps<"div"> & { columns?: number; isLoading?: boolean }) {
  return (
    <div
      data-slot="highlights-grid"
      className={cn("grid gap-4", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...props}
    >
      {isLoading
        ? Array.from({ length: columns }, (_, i) => <Highlights key={i} isLoading />)
        : children}
    </div>
  );
}

export { Highlights, HighlightsGrid, Statistic };
