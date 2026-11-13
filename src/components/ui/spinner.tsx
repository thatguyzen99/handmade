import * as React from "react";
import { cn } from "@/lib/utils";

function Spinner({
  size = 20,
  className,
  label = "Loading",
  ...props
}: React.ComponentProps<"svg"> & { size?: number; label?: string }) {
  return (
    <svg
      data-slot="spinner"
      role="status"
      aria-label={label}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("animate-spin text-fg-muted motion-reduce:animate-none", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export { Spinner };
