"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ComboboxOption = { value: string; label: string; icon?: React.ReactNode; hint?: string };

/** Searchable single select: a select-style trigger that opens a command list in a popover. */
function Combobox({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "Nothing found.",
  className,
  "aria-label": ariaLabel,
}: {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const contentId = React.useId();
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const value = valueProp ?? inner;
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={contentId}
          aria-label={ariaLabel}
          data-slot="combobox-trigger"
          className={cn(
            "group flex h-9 w-full items-center gap-2 rounded-lg bg-control px-3 text-left text-body-sm text-fg shadow-button outline-none max-md:h-11",
            "transition-[color,background-color,box-shadow,scale] duration-150 ease-tactile hover:bg-control-hover active:scale-[0.97] data-[state=open]:bg-control-hover",
            "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus",
            "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-subtle",
            className,
          )}
        >
          {selected?.icon}
          <span className={cn("flex-1 truncate", !selected && "text-fg-subtle")}>{selected?.label ?? placeholder}</span>
          <ChevronsUpDownIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent id={contentId} align="start" className="w-(--radix-popover-trigger-width) min-w-56 p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={`${o.label} ${o.value}`}
                  onSelect={() => {
                    const next = o.value === value ? "" : o.value;
                    setInner(next);
                    onValueChange?.(next);
                    setOpen(false);
                  }}
                  className={cn(o.value === value && "bg-selected text-fg")}
                >
                  {o.icon}
                  <span className="flex-1 truncate">{o.label}</span>
                  {o.hint && <span className="text-body-xs text-fg-subtle">{o.hint}</span>}
                  {o.value === value && <CheckIcon className="text-primary!" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxOption };
