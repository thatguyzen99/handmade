"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Stepper, type Step } from "@/components/ui/stepper";

function MultiStepForm({
  steps,
  current,
  defaultCurrent = 0,
  onCurrentChange,
  onSubmit,
  children,
  backLabel = "Back",
  nextLabel = "Next",
  submitLabel = "Submit",
  className,
}: {
  steps: Step[];
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (index: number) => void;
  onSubmit?: () => void;
  children: React.ReactNode;
  backLabel?: string;
  nextLabel?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultCurrent);
  const index = current ?? uncontrolled;
  const setIndex = (i: number) => {
    onCurrentChange?.(i);
    if (current == null) setUncontrolled(i);
  };
  const panels = React.Children.toArray(children);
  const last = index >= steps.length - 1;

  return (
    <form
      data-slot="multi-step-form"
      className={cn("space-y-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (last) onSubmit?.();
        else setIndex(index + 1);
      }}
    >
      <Stepper steps={steps} current={index} onStepClick={(i) => i <= index && setIndex(i)} />
      <div data-slot="multi-step-form-panel">{panels[index]}</div>
      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="neutral" mode="outline" size="small" disabled={index === 0} onClick={() => setIndex(Math.max(0, index - 1))}>
          {backLabel}
        </Button>
        <Button type="submit" size="small">{last ? submitLabel : nextLabel}</Button>
      </div>
    </form>
  );
}

function MultiStepFormStep({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="multi-step-form-step" className={cn("space-y-4", className)} {...props} />;
}

export { MultiStepForm, MultiStepFormStep };
