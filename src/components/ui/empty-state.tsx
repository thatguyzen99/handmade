import * as React from "react";
import { cn } from "@/lib/utils";

/** Centered placeholder for an empty list, search or first run: icon-in-ring, a heading-6 title, one line of help, one action. */
function EmptyState({ icon, title, description, action, className, children, ...props }: Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div data-slot="empty-state" className={cn("flex flex-col items-center justify-center gap-4 px-6 py-12 text-center", className)} {...props}>
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-surface text-fg-muted shadow-sm ring-1 ring-inset ring-line [&_svg]:size-5">
          {icon}
        </div>
      )}
      <div className="max-w-sm space-y-1">
        <div className="text-ui-md text-fg">{title}</div>
        {description && <p className="text-body-sm text-fg-muted">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap items-center justify-center gap-3">{action}</div>}
      {children}
    </div>
  );
}

export { EmptyState };
