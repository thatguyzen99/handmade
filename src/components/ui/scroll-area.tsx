"use client";

import * as React from "react";
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function ScrollArea({
  className,
  children,
  orientation = "vertical",
  viewportLabel,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  orientation?: "vertical" | "horizontal" | "both";
  viewportLabel?: string;
}) {
  const vertical = orientation === "vertical" || orientation === "both";
  const horizontal = orientation === "horizontal" || orientation === "both";
  return (
    <ScrollAreaPrimitive.Root data-slot="scroll-area" className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        aria-label={viewportLabel}
        tabIndex={viewportLabel ? 0 : undefined}
        className="size-full rounded-[inherit] outline-none focus-visible:shadow-focus"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {vertical && (
        <ScrollAreaPrimitive.Scrollbar
          data-slot="scroll-area-scrollbar"
          orientation="vertical"
          className="flex w-1 touch-none p-px transition select-none"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-line-strong" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {horizontal && (
        <ScrollAreaPrimitive.Scrollbar
          data-slot="scroll-area-scrollbar"
          orientation="horizontal"
          className="flex h-1 touch-none p-px transition select-none"
        >
          <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-line-strong" />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

export { ScrollArea };
