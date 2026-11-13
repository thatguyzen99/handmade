"use client";

import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

/**
 * Segmented control: one choice from 2–5 options that switch a value (not a view — use Tabs for views).
 * The same tray as segmented tabs: bg-tray p-1, the chosen segment rises to bg-raised + shadow-sm.
 * Always has a value; clicking the chosen segment keeps it chosen.
 */
function SegmentedControl({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  size = "medium",
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToggleGroupPrimitive.Root>, "type" | "value" | "defaultValue" | "onValueChange"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: "medium" | "small";
}) {
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const value = valueProp ?? inner;
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      data-slot="segmented-control"
      data-size={size}
      value={value}
      onValueChange={(v) => {
        if (!v) return;
        setInner(v);
        onValueChange?.(v);
      }}
      className={cn("group/segmented inline-flex items-center gap-1 rounded-parent-lg bg-tray p-1", className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

function SegmentedControlItem({ className, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="segmented-control-item"
      className={cn(
        "flex h-7 flex-1 items-center justify-center gap-2 rounded-concentric-1 px-3 text-ui-sm whitespace-nowrap text-fg-muted outline-none transition duration-200 ease-out [&_svg]:size-4",
        "group-data-[size=small]/segmented:h-6 group-data-[size=small]/segmented:px-2 group-data-[size=small]/segmented:text-ui-xs",
        "hover:text-fg focus-visible:shadow-focus data-[state=on]:bg-raised data-[state=on]:text-fg data-[state=on]:shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export { SegmentedControl, SegmentedControlItem };
