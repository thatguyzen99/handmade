import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = { title: React.ReactNode; description?: React.ReactNode };

/**
 * Progress through a multi-step flow. Done steps show a check on bg-primary, the current step a
 * primary ring, upcoming steps a hairline ring. Connectors fill in as steps complete.
 */
function Stepper({ steps, current, orientation = "horizontal", className, onStepClick }: {
  steps: Step[];
  /** Zero-based index of the current step. */
  current: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onStepClick?: (index: number) => void;
}) {
  const vertical = orientation === "vertical";
  return (
    <ol data-slot="stepper" data-orientation={orientation} className={cn("flex", vertical ? "flex-col" : "items-start", className)}>
      {steps.map((s, i) => {
        const state = i < current ? "done" : i === current ? "current" : "upcoming";
        const last = i === steps.length - 1;
        const Marker = onStepClick && i < current ? "button" : "span";
        return (
          <li key={i} data-state={state} aria-current={state === "current" ? "step" : undefined} className={cn("relative flex min-w-0", vertical ? "gap-3 pb-6 last:pb-0" : "flex-1 flex-col gap-3 last:flex-none")}>
            <div className={cn("flex items-center", vertical ? "flex-col self-stretch" : "w-full")}>
              <Marker
                {...(Marker === "button" ? { type: "button" as const, onClick: () => onStepClick?.(i), "aria-label": `Go to step ${i + 1}` } : {})}
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full text-ui-xs tabular-nums outline-none transition duration-200 ease-tactile [&_svg]:size-4 [&_svg]:[stroke-width:2.5] focus-visible:shadow-focus-primary",
                  state === "done" && "bg-primary text-primary-foreground",
                  state === "current" && "bg-surface text-primary ring-2 ring-inset ring-primary",
                  state === "upcoming" && "bg-surface text-fg-subtle ring-1 ring-inset ring-line-strong",
                )}
              >
                {state === "done" ? <CheckIcon /> : i + 1}
              </Marker>
              {!last && (
                <span aria-hidden className={cn("rounded-full transition-colors duration-300", vertical ? "mt-2 w-0.5 flex-1" : "mx-2 h-0.5 flex-1", i < current ? "bg-primary" : "bg-track")} />
              )}
            </div>
            <div className={cn("min-w-0 space-y-1", !vertical && "pr-4")}>
              <div className={cn("text-ui-sm", state === "upcoming" ? "text-fg-muted" : "text-fg")}>{s.title}</div>
              {s.description && <div className="text-body-xs text-fg-subtle">{s.description}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { Stepper, type Step };
