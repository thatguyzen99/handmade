import * as React from "react";
import { cn } from "@/lib/utils";

/** Sliding highlight behind the active item in a relative vertical list. Set --item-height on the list. */
function ActiveBar({
  top = 0,
  leftOffset = 4,
  rightOffset = 4,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & { top?: number; leftOffset?: number; rightOffset?: number }) {
  return (
    <span
      data-slot="active-bar"
      aria-hidden
      className={cn("pointer-events-none absolute rounded-md bg-brand-subtle transition-[top] duration-300 ease-tactile", className)}
      style={{ top, left: leftOffset, right: rightOffset, height: "var(--item-height, 40px)", ...style }}
      {...props}
    />
  );
}

export { ActiveBar };
