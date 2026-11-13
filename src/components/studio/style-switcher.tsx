"use client";

import * as React from "react";
import { CheckIcon, MoonIcon, SunIcon, SwatchBookIcon } from "lucide-react";
import { visualStyleMeta, visualStyles, type VisualStyle } from "@/design-system/config";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { config, update } = useTheme();
  const next = config.mode === "dark" ? "light" : "dark";
  return (
    <Button
      variant="neutral"
      mode="ghost"
      iconOnly
      className={className}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => update({ mode: next })}
    >
      {config.mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export function StyleSwitcher({ className }: { className?: string }) {
  const { config, update } = useTheme();
  const current = visualStyleMeta[config.style ?? "handmade"];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="neutral"
          mode="outline"
          size="small"
          className={className}
          aria-label={`Style: ${current.label}`}
          title="Switch style"
        >
          <SwatchBookIcon />
          <span className="max-sm:hidden">{current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Style</DropdownMenuLabel>
        {visualStyles.map((style) => {
          const meta = visualStyleMeta[style];
          const selected = (config.style ?? "handmade") === style;
          return (
            <DropdownMenuItem
              key={style}
              aria-checked={selected}
              onSelect={() => update({ style: style as VisualStyle })}
            >
              {selected ? <CheckIcon /> : <SwatchBookIcon />}
              <span className="flex min-w-0 flex-col">
                <span className="text-ui-sm text-fg">{meta.label}</span>
                <span className="text-body-xs text-fg-subtle">{meta.hint}</span>
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
