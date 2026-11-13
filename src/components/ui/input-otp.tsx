"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";

/** One-time code input (input-otp). Slots are text fields: bg-field + shadow-field + ring-field-line; the active slot gets the focus halo. */
function InputOTP({ className, containerClassName, ...props }: React.ComponentProps<typeof OTPInput> & { containerClassName?: string }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn("flex items-center gap-2 has-disabled:opacity-60", containerClassName)}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="input-otp-group" className={cn("flex items-center gap-2", className)} {...props} />;
}

function InputOTPSlot({ index, className, hasError, ...props }: React.ComponentProps<"div"> & { index: number; hasError?: boolean }) {
  const ctx = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = ctx?.slots[index] ?? {};
  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-11 items-center justify-center rounded-lg bg-field text-ui-lg text-fg tabular-nums shadow-field ring-1 ring-inset ring-field-line transition duration-200 ease-out",
        "data-[active=true]:z-10 data-[active=true]:shadow-focus data-[active=true]:ring-line-focus",
        hasError && "ring-danger data-[active=true]:shadow-focus-danger data-[active=true]:ring-danger",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px bg-fg motion-safe:animate-[ds-caret_1s_steps(1)_infinite]" />
        </div>
      )}
    </div>
  );
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div data-slot="input-otp-separator" role="separator" className="text-fg-subtle" {...props}>
      <span className="block h-0.5 w-3 rounded-full bg-line-strong" />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
