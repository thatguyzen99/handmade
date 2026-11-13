"use client";

import * as React from "react";
import { Toggle as TogglePrimitive, ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Toggles are pressable on/off controls for formatting and view options. They sit flat (ghost)
 * or as white outline buttons; "on" is bg-selected + text-fg, never a primary fill.
 */
const toggleVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 text-ui-sm whitespace-nowrap text-fg-muted outline-none",
    "transition-[color,background-color,box-shadow,scale] duration-150 ease-tactile active:scale-[0.94]",
    "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus",
    "hover:bg-hover hover:text-fg data-[state=on]:bg-selected data-[state=on]:text-fg",
    "disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:[stroke-width:2.25]",
  ],
  {
    variants: {
      variant: {
        ghost: "bg-transparent",
        outline: "bg-control shadow-button hover:bg-control-hover data-[state=on]:bg-control-hover data-[state=on]:text-primary",
      },
      size: {
        medium: "h-9 min-w-9 rounded-button px-2",
        small: "h-8 min-w-8 rounded-button-sm px-2",
        xsmall: "h-7 min-w-7 rounded-button-sm px-1",
      },
    },
    defaultVariants: { variant: "ghost", size: "small" },
  },
);

function Toggle({ className, variant, size, ...props }: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive.Root data-slot="toggle" className={cn(toggleVariants({ variant, size }), className)} {...props} />;
}

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({ variant: "ghost", size: "small" });

/** A row of toggles. `type="single"` for one choice (alignment), `type="multiple"` for independent options (bold, italic). */
function ToggleGroup({ className, variant, size, children, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn("inline-flex items-center gap-1", className)} {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({ className, variant, size, ...props }: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const ctx = React.useContext(ToggleGroupContext);
  return <ToggleGroupPrimitive.Item data-slot="toggle-group-item" className={cn(toggleVariants({ variant: variant ?? ctx.variant, size: size ?? ctx.size }), className)} {...props} />;
}

export { Toggle, ToggleGroup, ToggleGroupItem, toggleVariants };
