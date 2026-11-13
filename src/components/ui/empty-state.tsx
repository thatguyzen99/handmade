import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const emptyVariants = cva("flex flex-col items-center justify-center gap-4 text-center", {
  variants: {
    size: {
      page: "px-6 py-16",
      section: "px-6 py-12",
      inline: "px-4 py-4",
    },
  },
  defaultVariants: { size: "section" },
});

type EmptyShared = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof emptyVariants> & {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
  };

/** Centered placeholder for an empty list, search or first run. */
function EmptyState({ icon, title, description, action, size, className, children, ...props }: EmptyShared) {
  return (
    <div data-slot="empty-state" className={cn(emptyVariants({ size }), className)} {...props}>
      {icon && (
        <div className="flex size-12 items-center justify-center rounded-full bg-surface text-fg-muted shadow-sm ring-1 ring-inset ring-line [&_svg]:size-5">
          {icon}
        </div>
      )}
      <div className="max-w-sm space-y-1">
        {title != null && <div className="text-ui-md text-fg">{title}</div>}
        {description && <p className="text-body-sm text-fg-muted">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap items-center justify-center gap-3">{action}</div>}
      {children}
    </div>
  );
}

/** Failure state with the same shape as EmptyState, so a failed fetch is never mistaken for an empty list. */
function ErrorState({
  icon,
  title = "We couldn't load this",
  description = "Something went wrong. Try again in a moment.",
  action,
  size,
  className,
  children,
  ...props
}: EmptyShared) {
  return (
    <div data-slot="error-state" role="alert" className={cn(emptyVariants({ size }), className)} {...props}>
      <div className="flex size-12 items-center justify-center rounded-full bg-danger-subtle text-danger-fg shadow-sm ring-1 ring-inset ring-danger-line [&_svg]:size-5">
        {icon ?? <AlertCircleIcon />}
      </div>
      <div className="max-w-sm space-y-1">
        <div className="text-ui-md text-fg">{title}</div>
        {description && <p className="text-body-sm text-fg-muted">{description}</p>}
      </div>
      {action && <div className="flex flex-wrap items-center justify-center gap-3">{action}</div>}
      {children}
    </div>
  );
}

export { EmptyState, ErrorState };
