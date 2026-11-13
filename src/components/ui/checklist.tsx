"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionSprings } from "@/lib/motion-style";

export type ChecklistItem = { id: string; label: string; done?: boolean };

function RollingDigit({ value, className }: { value: string | number; className?: string }) {
  const springs = useMotionSprings();
  return (
    <span className={cn("relative inline-grid overflow-hidden tabular-nums", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={String(value)}
          initial={springs.reduce ? { opacity: 0 } : { y: 14, opacity: 0 }}
          animate={springs.reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={springs.reduce ? { opacity: 0 } : { y: -14, opacity: 0 }}
          transition={springs.fade}
          className="col-start-1 row-start-1"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Checklist({
  title = "Set up your workspace",
  doneTitle = "You're all set",
  items,
  onChange,
  className,
}: {
  title?: string;
  doneTitle?: string;
  items: ChecklistItem[];
  onChange?: (items: ChecklistItem[]) => void;
  className?: string;
}) {
  const springs = useMotionSprings();
  const [rows, setRows] = React.useState(items);

  const total = rows.length;
  const done = rows.filter((row) => row.done).length;
  const complete = total > 0 && done === total;
  const progress = total === 0 ? 0 : (done / total) * 100;

  const toggle = (id: string) => {
    const next = rows.map((row) => (row.id === id ? { ...row, done: !row.done } : row));
    setRows(next);
    onChange?.(next);
  };

  return (
    <div data-slot="checklist" className={cn("w-full max-w-md rounded-2xl bg-surface p-5 shadow-sm", className)}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.h3
              key={complete ? "done" : "todo"}
              initial={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={springs.reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={springs.reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={springs.fade}
              className="text-heading-6 text-fg"
            >
              {complete ? doneTitle : title}
            </motion.h3>
          </AnimatePresence>
        </div>
        <div className="flex h-8 w-12 items-center justify-end text-ui-sm text-fg-muted tabular-nums" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            {complete ? (
              <motion.span
                key="check"
                initial={springs.reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0 }}
                animate={springs.reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                exit={springs.reduce ? { opacity: 0 } : { scale: 0.6, opacity: 0 }}
                transition={springs.popIn}
                className="inline-flex size-6 items-center justify-center rounded-full bg-highlight text-highlight-fg"
                aria-label="Complete"
              >
                <CheckIcon className="size-4" />
              </motion.span>
            ) : (
              <motion.span key="count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-baseline gap-0">
                <RollingDigit value={done} />
                <span>/{total}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-track" role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={total} aria-label="Checklist progress">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundImage: "var(--gradient-sunrise)" }}
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={springs.layout}
        />
      </div>

      <ul className="space-y-1">
        {rows.map((row) => (
          <li key={row.id}>
            <button
              type="button"
              onClick={() => toggle(row.id)}
              className="group flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left outline-none transition hover:bg-hover focus-visible:shadow-focus"
              aria-pressed={!!row.done}
            >
              <motion.span
                data-slot="checklist-check"
                whileTap={springs.reduce ? undefined : { scale: 0.9 }}
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full ring-2 ring-inset transition",
                  row.done ? "bg-highlight text-highlight-fg ring-highlight" : "bg-control ring-line-strong text-transparent",
                )}
              >
                <AnimatePresence>
                  {row.done && (
                    <motion.span
                      key="tick"
                      initial={springs.reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                      animate={springs.reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                      exit={springs.reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                      transition={springs.popIn}
                    >
                      <CheckIcon className="size-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
              <span className={cn("relative text-ui-sm", row.done ? "text-fg-muted" : "text-fg")}>
                {row.label}
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-0.5 origin-left -translate-y-1/2 bg-fg"
                  initial={false}
                  animate={{ scaleX: row.done ? 1 : 0, opacity: row.done ? 1 : 0 }}
                  transition={springs.reduce ? springs.fade : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
