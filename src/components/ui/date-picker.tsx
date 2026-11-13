"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const triggerClass = cn(
  "group flex h-9 w-full items-center gap-2 rounded-lg bg-control px-3 text-left text-body-sm text-fg shadow-button outline-none max-md:h-11",
  "transition-[color,background-color,box-shadow,scale] duration-150 ease-tactile hover:bg-control-hover active:scale-[0.97] data-[state=open]:bg-control-hover",
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-subtle tabular-nums",
);

/** A select-style trigger that opens a calendar in a popover and closes on pick. */
function DatePicker({ value, onChange, placeholder = "Pick a date", locale = "en-US", className, defaultMonth, disabled }: {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  locale?: string;
  className?: string;
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const fmt = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric", year: "numeric" });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" data-slot="date-picker-trigger" className={cn(triggerClass, className)}>
          <CalendarIcon />
          <span className={cn("flex-1 truncate", !value && "text-fg-subtle")}>{value ? fmt.format(value) : placeholder}</span>
          <ChevronDownIcon className="transition-[rotate] duration-150 ease-tactile group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value ?? defaultMonth}
          disabled={disabled}
          locale={locale}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

/** Range version: stays open until both ends are picked. */
function DateRangePicker({ value, onChange, placeholder = "Pick dates", locale = "en-US", className, defaultMonth }: {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  placeholder?: string;
  locale?: string;
  className?: string;
  defaultMonth?: Date;
}) {
  const [open, setOpen] = React.useState(false);
  const fmt = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
  const label = value?.from ? `${fmt.format(value.from)} – ${value.to ? fmt.format(value.to) : "…"}` : placeholder;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" data-slot="date-range-trigger" className={cn(triggerClass, className)}>
          <CalendarIcon />
          <span className={cn("flex-1 truncate", !value?.from && "text-fg-subtle")}>{label}</span>
          <ChevronDownIcon className="transition-[rotate] duration-150 ease-tactile group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-3">
        <Calendar
          mode="range"
          selected={value}
          defaultMonth={value?.from ?? defaultMonth}
          locale={locale}
          onSelect={(r) => {
            onChange?.(r);
            if (r.from && r.to) setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker };
