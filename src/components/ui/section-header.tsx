import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function SectionHeader({
  title,
  subtitle,
  children,
  badge,
  isTitleLoading,
  isSubtitleLoading,
  id,
  className,
  ...props
}: Omit<React.ComponentProps<"header">, "title"> & {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  isTitleLoading?: boolean;
  isSubtitleLoading?: boolean;
}) {
  return (
    <header data-slot="section-header" id={id} className={cn("flex flex-wrap items-start justify-between gap-4", className)} {...props}>
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          {isTitleLoading ? <Skeleton className="h-6 w-40" /> : title != null && <h2 className="text-heading-5 text-fg">{title}</h2>}
          {badge}
        </div>
        {isSubtitleLoading ? <Skeleton className="h-4 w-64" /> : subtitle != null && <p className="text-body-sm text-fg-muted">{subtitle}</p>}
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </header>
  );
}

function Section({ className, spacing = true, ...props }: React.ComponentProps<"section"> & { spacing?: boolean }) {
  return <section data-slot="section" className={cn(spacing && "space-y-6", className)} {...props} />;
}

export { SectionHeader, Section };
