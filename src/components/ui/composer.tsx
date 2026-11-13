"use client";

import * as React from "react";
import { ArrowUpIcon, SquareIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ActivityState = "idle" | "working" | "success" | "disabled";
type SendState = "idle" | "typing" | "streaming";

function Composer({
  activityState = "idle",
  sendState,
  sendDisabled,
  onSubmit,
  onStop,
  footerStart,
  footerEnd,
  disclaimer,
  attachments,
  validationMessage,
  placeholder = "Ask a question…",
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  activityState?: ActivityState;
  sendState?: SendState;
  sendDisabled?: boolean;
  onSubmit?: () => void;
  onStop?: () => void;
  footerStart?: React.ReactNode;
  footerEnd?: React.ReactNode;
  disclaimer?: React.ReactNode;
  attachments?: React.ReactNode;
  validationMessage?: React.ReactNode;
  placeholder?: string;
}) {
  const resolvedSend: SendState = sendState ?? (activityState === "working" ? "streaming" : "idle");
  const disabled = activityState === "disabled";
  const [value, setValue] = React.useState("");
  const canSend = !disabled && !sendDisabled && (resolvedSend === "streaming" || value.trim().length > 0);

  return (
    <form
      data-slot="composer"
      data-activity={activityState}
      className={cn("space-y-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (resolvedSend === "streaming") {
          onStop?.();
          return;
        }
        if (!canSend) return;
        onSubmit?.();
        setValue("");
      }}
      {...props}
    >
      <div
        className={cn(
          "rounded-2xl bg-surface shadow-sm ring-1 ring-inset ring-line transition",
          activityState === "working" && "ring-2 ring-highlight",
          activityState === "success" && "ring-2 ring-success",
          disabled && "opacity-60",
        )}
      >
        {attachments && <div data-slot="composer-attachments" className="border-b border-line px-4 py-2">{attachments}</div>}
        {children ?? (
          <textarea
            data-slot="composer-input"
            rows={3}
            disabled={disabled}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="block w-full resize-none bg-transparent px-4 py-3 text-body-sm text-fg outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                (e.currentTarget.form as HTMLFormElement | null)?.requestSubmit();
              }
            }}
          />
        )}
        <div data-slot="composer-footer" className="flex items-center gap-2 px-3 pb-3">
          {footerStart}
          <div className="ml-auto flex items-center gap-2">
            {footerEnd}
            {resolvedSend === "streaming" ? (
              <Button type="submit" size="small" iconOnly aria-label="Stop">
                <SquareIcon className="fill-current" />
              </Button>
            ) : (
              <Button type="submit" size="small" iconOnly aria-label="Send" disabled={!canSend}>
                <ArrowUpIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
      {validationMessage && <p className="text-body-xs text-danger-fg">{validationMessage}</p>}
      {disclaimer && <p className="text-body-xs text-fg-subtle">{disclaimer}</p>}
    </form>
  );
}

export { Composer };
export type { ActivityState, SendState };
