"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DateRange = { from?: Date; to?: Date };

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a?: Date, b?: Date) => !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

/** Today's date, read only on the client so a prerendered page never disagrees with the browser. */
const subscribe = () => () => {};
function useToday() {
  const key = React.useSyncExternalStore(subscribe, () => dayKey(new Date()), () => "");
  return React.useMemo(() => {
    if (!key) return undefined;
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d);
  }, [key]);
}

/** Six weeks starting on Monday, so the grid never changes height between months. */
function monthGrid(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}

type CalendarProps = {
  className?: string;
  /** First month shown. Defaults to the selection, then to today. */
  defaultMonth?: Date;
  locale?: string;
  disabled?: (date: Date) => boolean;
  /** Dates to mark with a small dot (events, deadlines). */
  marked?: Date[];
} & (
  | { mode?: "single"; selected?: Date; onSelect?: (date: Date) => void }
  | { mode: "range"; selected?: DateRange; onSelect?: (range: DateRange) => void }
);

/**
 * Month calendar. Day cells are size-9 rounded-md buttons; the chosen day is bg-primary, a range
 * between two chosen days is bg-primary-subtle, today is text-primary, days outside the month are muted.
 * Arrow keys move by day and week, PageUp/PageDown by month.
 */
function Calendar(props: CalendarProps) {
  const { className, defaultMonth, locale = "en-US", disabled, marked } = props;
  const today = useToday();
  const initial = defaultMonth ?? (props.mode === "range" ? props.selected?.from : props.selected) ?? new Date();
  const [month, setMonth] = React.useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [focused, setFocused] = React.useState<Date>(() => startOfDay(initial));
  const gridRef = React.useRef<HTMLDivElement>(null);
  const shouldFocus = React.useRef(false);

  const days = monthGrid(month);
  const weekdays = React.useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
    return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(2024, 0, 1 + i)).slice(0, 2));
  }, [locale]);
  const title = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month);
  const labelFmt = new Intl.DateTimeFormat(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  React.useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${dayKey(focused)}"]`)?.focus();
  }, [focused, month]);

  const moveFocus = (next: Date) => {
    shouldFocus.current = true;
    setFocused(next);
    if (next.getMonth() !== month.getMonth() || next.getFullYear() !== month.getFullYear()) setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => new Date(focused.getFullYear(), focused.getMonth() - 1, focused.getDate()),
      PageDown: () => new Date(focused.getFullYear(), focused.getMonth() + 1, focused.getDate()),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      moveFocus(fn());
    }
  };

  const select = (d: Date) => {
    setFocused(d);
    if (props.mode === "range") {
      const { from, to } = props.selected ?? {};
      if (!from || (from && to)) props.onSelect?.({ from: d, to: undefined });
      else if (d < from) props.onSelect?.({ from: d, to: from });
      else props.onSelect?.({ from, to: d });
    } else {
      props.onSelect?.(d);
    }
  };

  const isSelected = (d: Date) =>
    props.mode === "range" ? sameDay(d, props.selected?.from) || sameDay(d, props.selected?.to) : sameDay(d, props.selected);
  const inRange = (d: Date) => {
    if (props.mode !== "range") return false;
    const { from, to } = props.selected ?? {};
    return !!from && !!to && d > from && d < to;
  };

  const navButton = "flex size-7 items-center justify-center rounded-button-sm text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus [&_svg]:size-4";

  return (
    <div data-slot="calendar" className={cn("w-fit space-y-3 tabular-nums", className)}>
      <div className="flex items-center justify-between gap-2">
        <button type="button" className={navButton} onClick={() => setMonth((m) => addMonths(m, -1))} aria-label="Previous month"><ChevronLeftIcon /></button>
        <div aria-live="polite" className="text-ui-sm text-fg">{title}</div>
        <button type="button" className={navButton} onClick={() => setMonth((m) => addMonths(m, 1))} aria-label="Next month"><ChevronRightIcon /></button>
      </div>
      <div role="grid" aria-label={title} ref={gridRef} onKeyDown={onKeyDown} className="grid grid-cols-7 gap-y-1">
        {weekdays.map((w) => (
          <div key={w} role="columnheader" className="flex h-7 items-center justify-center text-ui-xs text-fg-subtle">{w}</div>
        ))}
        {days.map((d) => {
          const outside = d.getMonth() !== month.getMonth();
          const sel = isSelected(d);
          const range = inRange(d);
          const isToday = sameDay(d, today);
          const off = disabled?.(d) ?? false;
          const mark = marked?.some((m) => sameDay(m, d));
          return (
            <div key={dayKey(d)} role="gridcell" aria-selected={sel || undefined} className={cn("flex justify-center", range && "bg-primary-subtle")}>
              <button
                type="button"
                data-day={dayKey(d)}
                tabIndex={sameDay(d, focused) ? 0 : -1}
                disabled={off}
                aria-label={labelFmt.format(d)}
                aria-current={isToday ? "date" : undefined}
                onClick={() => select(d)}
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-md text-body-sm outline-none transition-[color,background-color,scale] duration-150 ease-tactile active:scale-[0.94]",
                  "focus-visible:shadow-focus-primary disabled:pointer-events-none disabled:text-fg-disabled disabled:line-through",
                  sel ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "text-fg hover:bg-hover",
                  !sel && outside && "text-fg-disabled",
                  !sel && isToday && "text-primary",
                )}
              >
                {d.getDate()}
                {(mark || (isToday && !sel)) && (
                  <span aria-hidden className={cn("absolute bottom-1 size-1 rounded-full", sel ? "bg-primary-foreground" : mark ? "bg-fg-subtle" : "bg-primary")} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Calendar, type DateRange, type CalendarProps };
