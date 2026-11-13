"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const sheetVariants = cva(
  "fixed z-50 flex flex-col bg-floating shadow-lg outline-none motion-reduce:data-[state=open]:animate-menu-fade-in! motion-reduce:data-[state=closed]:animate-menu-fade-out!",
  {
    variants: {
      side: {
        right: "inset-y-2 right-2 w-[calc(100%-1rem)] max-w-sm rounded-3xl data-[state=open]:animate-[ds-sheet-right_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-right-out_200ms_ease-in_forwards]",
        left: "inset-y-2 left-2 w-[calc(100%-1rem)] max-w-sm rounded-3xl data-[state=open]:animate-[ds-sheet-left_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-left-out_200ms_ease-in_forwards]",
        // The drawer: a bottom sheet with a grab handle, for phones and quick actions.
        bottom: "inset-x-2 bottom-2 max-h-[85vh] rounded-3xl data-[state=open]:animate-[ds-sheet-up_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-down_200ms_ease-in_forwards]",
      },
    },
    defaultVariants: { side: "right" },
  },
);

function SheetContent({ className, children, side = "right", showClose = true, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants> & { showClose?: boolean }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay data-slot="sheet-overlay" className="fixed inset-0 z-50 bg-overlay backdrop-blur-[6px] data-[state=open]:animate-[ds-fade_200ms_ease-out] data-[state=closed]:animate-menu-fade-out" />
      <SheetPrimitive.Content data-slot="sheet-content" data-side={side} className={cn(sheetVariants({ side }), className)} {...props}>
        {side === "bottom" && <div aria-hidden className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-track-strong" />}
        {children}
        {showClose && side !== "bottom" && (
          <SheetPrimitive.Close
            aria-label="Close"
            data-slot="sheet-close"
            className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-md text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus [&_svg]:size-5"
          >
            <XIcon />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, title, description, children, ...props }: Omit<React.ComponentProps<"div">, "title"> & { title?: React.ReactNode; description?: React.ReactNode }) {
  return (
    <div data-slot="sheet-header" className={cn("flex flex-col gap-1 p-5 pr-12", className)} {...props}>
      {title !== undefined && <SheetPrimitive.Title className="text-ui-md text-fg">{title}</SheetPrimitive.Title>}
      {description !== undefined ? (
        <SheetPrimitive.Description className="text-body-sm text-fg-muted">{description}</SheetPrimitive.Description>
      ) : (
        title !== undefined && <SheetPrimitive.Description className="sr-only">{title}</SheetPrimitive.Description>
      )}
      {children}
    </div>
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-body" className={cn("min-h-0 flex-1 overflow-y-auto border-t border-line p-5", className)} {...props} />;
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-footer" className={cn("flex items-center justify-end gap-3 border-t border-line px-5 py-4", className)} {...props} />;
}

const SheetTitle = SheetPrimitive.Title;
const SheetDescription = SheetPrimitive.Description;

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetBody, SheetFooter, SheetTitle, SheetDescription };
