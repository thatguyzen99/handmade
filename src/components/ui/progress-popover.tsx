"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMotionSprings } from "@/lib/motion-style";

export type ProgressStep = { id: string; label: string };

const DEFAULT_STEPS: ProgressStep[] = [
  { id: "build", label: "Build" },
  { id: "sign", label: "Sign" },
  { id: "notarize", label: "Notarize" },
  { id: "upload", label: "Upload" },
];

const LOGS = [
  "Resolving tokens…",
  "Bundling routes…",
  "Signing artefact…",
  "Notarizing build…",
  "Uploading to edge…",
  "Warming cache…",
  "Site is live.",
];

export function useProgressRun({ duration = 8000, steps = DEFAULT_STEPS }: { duration?: number; steps?: ProgressStep[] } = {}) {
  const [running, setRunning] = React.useState(false);
  const [percent, setPercent] = React.useState(0);
  const [logIndex, setLogIndex] = React.useState(0);
  const [done, setDone] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const [badge, setBadge] = React.useState(false);
  const started = React.useRef<number | null>(null);

  const reset = React.useCallback(() => {
    started.current = null;
    setRunning(false);
    setPercent(0);
    setLogIndex(0);
    setDone(false);
    setDismissed(false);
    setBadge(false);
  }, []);

  const start = React.useCallback(() => {
    started.current = performance.now();
    setRunning(true);
    setPercent(0);
    setLogIndex(0);
    setDone(false);
    setDismissed(false);
    setBadge(false);
  }, []);

  React.useEffect(() => {
    if (!running) return;
    let frame = 0;
    const tick = (now: number) => {
      const t0 = started.current ?? now;
      const t = Math.min(1, (now - t0) / duration);
      setPercent(Math.round(t * 100));
      setLogIndex(Math.min(LOGS.length - 1, Math.floor(t * (LOGS.length - 1))));
      if (t >= 1) {
        setRunning(false);
        setDone(true);
        window.setTimeout(() => setDismissed(true), 900);
        window.setTimeout(() => setBadge(true), 1100);
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [running, duration]);

  const stepProgress = (index: number) => {
    const slice = 100 / steps.length;
    return Math.max(0, Math.min(100, (percent - index * slice) / slice * 100));
  };

  const remaining = Math.max(0, Math.ceil(((100 - percent) / 100) * (duration / 1000)));

  return { running, percent, logIndex, log: LOGS[logIndex], done, dismissed, badge, start, reset, stepProgress, remaining, steps };
}

export type ProgressRun = ReturnType<typeof useProgressRun>;

export function ProgressPopover({
  run,
  title = "Publishing",
  className,
}: {
  run: ProgressRun;
  title?: string;
  className?: string;
}) {
  const springs = useMotionSprings();
  const live = run.done && run.dismissed;

  return (
    <div data-slot="progress-popover-frame" className={cn("relative rounded-2xl bg-surface p-5 shadow-sm", className)}>
      <div className="flex items-center justify-between gap-3">
        <motion.button
          type="button"
          layout={!springs.reduce}
          transition={springs.layout}
          onClick={() => {
            if (!run.running && !run.done) run.start();
          }}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-ui-sm outline-none transition focus-visible:shadow-focus",
            live ? "bg-highlight text-highlight-fg" : "bg-subtle text-fg",
          )}
          aria-expanded={!run.dismissed && (run.running || !run.done)}
        >
          {live ? (
            <>
              <CheckIcon className="size-4" />
              {title} is live
            </>
          ) : (
            <>
              <span className="size-2 rounded-full bg-highlight" />
              {run.running ? "Publishing…" : "Publish"}
            </>
          )}
        </motion.button>

        <div className="relative">
          <Button size="small" variant="neutral" mode="outline">
            Share
          </Button>
          <AnimatePresence>
            {run.badge && (
              <motion.span
                initial={springs.reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0, y: 6 }}
                animate={springs.reduce ? { opacity: 1 } : { scale: 1, opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={springs.popIn}
                className="absolute -top-2 -right-2 rounded-full bg-highlight px-2 py-0 text-overline-2xs text-highlight-fg shadow-badge"
              >
                New
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {!run.dismissed && (run.running || run.done || run.percent > 0) && (
          <motion.div
            data-slot="progress-popover"
            initial={springs.reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
            animate={springs.reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={springs.reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
            transition={springs.panel}
            className="mt-4 rounded-2xl bg-floating p-4 shadow-md"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-ui-sm text-fg">{title}</div>
              <div className="font-mono text-[12px] text-fg-muted tabular-nums">
                <Rolling value={`${run.percent}%`} />
              </div>
            </div>

            <ol className="space-y-3">
              {run.steps.map((step, index) => {
                const value = run.stepProgress(index);
                const complete = value >= 100;
                return (
                  <li key={step.id} className="space-y-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-ui-xs text-fg">{step.label}</span>
                      <span className="flex size-4 items-center justify-center">
                        <AnimatePresence>
                          {complete && (
                            <motion.span
                              initial={springs.reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                              animate={springs.reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={springs.popIn}
                            >
                              <CheckIcon className="size-4 text-fg" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-track">
                      <motion.div
                        className="h-full rounded-full bg-highlight"
                        initial={false}
                        animate={{ width: `${value}%` }}
                        transition={springs.reduce ? springs.fade : { duration: 0.2, ease: "linear" }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="min-w-0 font-mono text-[12px] text-fg-muted">
                <Rolling value={run.log} />
              </div>
              <div className="shrink-0 font-mono text-[12px] text-fg-subtle tabular-nums">
                {run.done ? "0s left" : `${run.remaining}s left`}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <AnimatePresence mode="wait" initial={false}>
                {run.done ? (
                  <motion.div key="view" layout={!springs.reduce} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button size="small">View site</Button>
                  </motion.div>
                ) : (
                  <motion.div key="run" layout={!springs.reduce} className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Button size="small" variant="neutral" mode="outline" onClick={run.reset}>
                      Cancel
                    </Button>
                    <Button size="small" onClick={() => {}}>
                      {run.running ? "Publishing" : "Start"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Rolling({ value }: { value: string }) {
  const springs = useMotionSprings();
  return (
    <span className="relative inline-grid overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={springs.reduce ? { opacity: 0 } : { y: 8, opacity: 0 }}
          animate={springs.reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={springs.reduce ? { opacity: 0 } : { y: -8, opacity: 0 }}
          transition={springs.fade}
          className="col-start-1 row-start-1 truncate"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
