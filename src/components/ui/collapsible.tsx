"use client";

import * as React from "react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Collapsible({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" className={cn(className)} {...props} />;
}

function CollapsibleTrigger({
  className,
  children,
  showHoverBackground = true,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger> & { showHoverBackground?: boolean }) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      className={cn(
        "group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-ui-sm text-fg outline-none transition",
        showHoverBackground && "hover:bg-hover",
        "focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50",
        "[&[data-state=open]_svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-tactile" />
    </CollapsiblePrimitive.Trigger>
  );
}

function CollapsibleContent({ className, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden text-body-sm text-fg-muted data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out",
        className,
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
