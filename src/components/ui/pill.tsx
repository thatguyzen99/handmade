import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex max-w-full items-center gap-1 rounded-full font-medium outline-none select-none",
  {
    variants: {
      tone: {
        neutral: "bg-subtle text-fg-muted ring-1 ring-inset ring-line",
        highlight: "bg-highlight-subtle text-highlight-fg",
        success: "bg-success-subtle text-success-fg",
        warning: "bg-warning-subtle text-warning-fg",
        danger: "bg-danger-subtle text-danger-fg",
        info: "bg-info-subtle text-info-fg",
        outline: "bg-transparent text-fg ring-1 ring-inset ring-line",
      },
      size: {
        small: "h-6 px-2 text-ui-xs",
        medium: "h-7 px-2 text-ui-xs",
        large: "h-8 px-3 text-ui-sm",
      },
    },
    defaultVariants: { tone: "neutral", size: "medium" },
  },
);

type PillProps = React.ComponentProps<"span"> &
  VariantProps<typeof pillVariants> & {
    onRemove?: () => void;
    removeLabel?: string;
  };

function Pill({ className, tone, size, onRemove, removeLabel = "Remove", children, ...props }: PillProps) {
  return (
    <span data-slot="pill" className={cn(pillVariants({ tone, size }), className)} {...props}>
      <span className="min-w-0 truncate">{children}</span>
      {onRemove && (
        <button
          type="button"
          data-slot="pill-remove"
          aria-label={removeLabel}
          onClick={onRemove}
          className="-mr-1 flex size-4 items-center justify-center rounded-full text-current outline-none hover:bg-hover focus-visible:shadow-focus"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </span>
  );
}

function Tag({ className, ...props }: PillProps) {
  return <Pill data-slot="tag" className={cn("rounded-md", className)} {...props} />;
}

export { Pill, Tag, pillVariants };
