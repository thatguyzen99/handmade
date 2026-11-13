"use client";

import * as React from "react";
import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, LoaderCircleIcon, TriangleAlertIcon } from "lucide-react";

/**
 * Toasts (Sonner), drawn from the system's floating layer: bg-floating, shadow-md, rounded-2xl,
 * status icon in its state color, title text-ui-sm, description text-body-xs. Call `toast()` anywhere.
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      gap={8}
      icons={{
        success: <CircleCheckIcon className="size-5 text-success" />,
        info: <InfoIcon className="size-5 text-info" />,
        warning: <TriangleAlertIcon className="size-5 text-warning" />,
        error: <CircleAlertIcon className="size-5 text-danger" />,
        loading: <LoaderCircleIcon className="size-5 animate-spin text-fg-subtle" />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "group/toast flex w-full items-start gap-3 rounded-2xl bg-floating p-4 text-fg shadow-md font-sans",
          icon: "mt-0 flex size-5 shrink-0 items-center justify-center",
          content: "flex min-w-0 flex-1 flex-col gap-1",
          title: "text-ui-sm text-fg",
          description: "text-body-xs text-fg-muted",
          actionButton: "ml-auto h-7 shrink-0 rounded-button-sm bg-primary px-2 text-ui-sm text-primary-foreground shadow-primary transition hover:bg-primary-hover",
          cancelButton: "h-7 shrink-0 rounded-button-sm bg-control px-2 text-ui-sm text-fg shadow-button transition hover:bg-control-hover",
          closeButton: "bg-floating text-fg-muted shadow-button",
        },
      }}
      {...props}
    />
  );
}

export { Toaster, toast };
