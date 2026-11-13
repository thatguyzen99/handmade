"use client";

import * as React from "react";
import { Dialog as DrawerPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Drawer = DrawerPrimitive.Root;
const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerClose = DrawerPrimitive.Close;

const drawerVariants = cva(
  "fixed z-50 flex flex-col bg-floating shadow-lg outline-none motion-reduce:data-[state=open]:animate-menu-fade-in! motion-reduce:data-[state=closed]:animate-menu-fade-out!",
  {
    variants: {
      placement: {
        bottom: "inset-x-2 bottom-2 max-h-[85vh] rounded-3xl data-[state=open]:animate-[ds-sheet-up_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-down_200ms_ease-in_forwards]",
        top: "inset-x-2 top-2 max-h-[85vh] rounded-3xl data-[state=open]:animate-[ds-sheet-down_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-up_200ms_ease-in_forwards]",
        right: "inset-y-2 right-2 w-[calc(100%-1rem)] max-w-sm rounded-3xl data-[state=open]:animate-[ds-sheet-right_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-right-out_200ms_ease-in_forwards]",
        left: "inset-y-2 left-2 w-[calc(100%-1rem)] max-w-sm rounded-3xl data-[state=open]:animate-[ds-sheet-left_300ms_var(--ease-tactile)] data-[state=closed]:animate-[ds-sheet-left-out_200ms_ease-in_forwards]",
      },
    },
    defaultVariants: { placement: "bottom" },
  },
);

function DrawerContent({
  className,
  children,
  placement = "bottom",
  width,
  showClose = true,
  withOverlay = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content> &
  VariantProps<typeof drawerVariants> & {
    width?: number;
    showClose?: boolean;
    withOverlay?: boolean;
  }) {
  const sideStyle = width && (placement === "left" || placement === "right") ? { width, maxWidth: "calc(100% - 1rem)" } : undefined;
  return (
    <DrawerPrimitive.Portal>
      {withOverlay && (
        <DrawerPrimitive.Overlay data-slot="drawer-overlay" className="fixed inset-0 z-50 bg-overlay backdrop-blur-[6px] data-[state=open]:animate-[ds-fade_200ms_ease-out] data-[state=closed]:animate-menu-fade-out" />
      )}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-placement={placement}
        style={sideStyle}
        className={cn(drawerVariants({ placement }), className)}
        {...props}
      >
        {placement === "bottom" && <div aria-hidden className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-track-strong" />}
        {placement === "top" && <div aria-hidden className="mx-auto mb-0 mt-auto h-1 w-10 shrink-0 rounded-full bg-track-strong order-last" />}
        {children}
        {showClose && placement !== "bottom" && placement !== "top" && (
          <DrawerPrimitive.Close
            aria-label="Close"
            data-slot="drawer-close"
            className="absolute top-4 right-4 flex size-6 items-center justify-center rounded-md text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus [&_svg]:size-5"
          >
            <XIcon />
          </DrawerPrimitive.Close>
        )}
      </DrawerPrimitive.Content>
    </DrawerPrimitive.Portal>
  );
}

function DrawerHeader({ className, title, description, children, ...props }: Omit<React.ComponentProps<"div">, "title"> & { title?: React.ReactNode; description?: React.ReactNode }) {
  return (
    <div data-slot="drawer-header" className={cn("flex flex-col gap-1 p-5", className)} {...props}>
      {title !== undefined && <DrawerPrimitive.Title className="text-ui-md text-fg">{title}</DrawerPrimitive.Title>}
      {description !== undefined ? (
        <DrawerPrimitive.Description className="text-body-sm text-fg-muted">{description}</DrawerPrimitive.Description>
      ) : (
        title !== undefined && <DrawerPrimitive.Description className="sr-only">{title}</DrawerPrimitive.Description>
      )}
      {children}
    </div>
  );
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-body" className={cn("min-h-0 flex-1 overflow-y-auto border-t border-line p-5", className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("flex items-center justify-end gap-3 border-t border-line px-5 py-4", className)} {...props} />;
}

const DrawerTitle = DrawerPrimitive.Title;
const DrawerDescription = DrawerPrimitive.Description;

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription };
