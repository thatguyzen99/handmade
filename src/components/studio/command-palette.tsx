"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  BookOpenIcon,
  FileJsonIcon,
  HomeIcon,
  MoonIcon,
  PaletteIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  SunIcon,
  SwatchBookIcon,
} from "lucide-react";
import { systemId } from "@/design-system/brand";
import { visualStyleMeta, visualStyles, type VisualStyle } from "@/design-system/config";
import { Button } from "@/components/ui/button";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { docsNav } from "@/components/docs/catalog";
import { useTheme } from "./theme-provider";

const studioSections = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/#brand", label: "Brand" },
  { href: "/#styles", label: "Styles" },
  { href: "/#colors", label: "Color" },
  { href: "/#typography", label: "Typography" },
  { href: "/#spacing", label: "Spacing" },
  { href: "/#shape", label: "Radius & elevation" },
  { href: "/#components", label: "Components" },
  { href: "/#more-components", label: "More components" },
  { href: "/#widgets", label: "Widgets" },
  { href: "/#patterns", label: "Patterns" },
  { href: "/animation", label: "Animation Tuner", icon: SlidersHorizontalIcon },
];


function useIsMac() {
  return React.useSyncExternalStore(
    () => () => {},
    () => /Mac|iPhone|iPad/.test(navigator.platform) || navigator.userAgent.includes("Mac"),
    () => true,
  );
}

export function CommandPalette({ triggerClassName }: { triggerClassName?: string }) {
  const [open, setOpen] = React.useState(false);
  const isMac = useIsMac();
  const router = useRouter();
  const { config, update, installCommand, skillCommand } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey) {
        const target = e.target as HTMLElement | null;
        if (target && (target.closest("input, textarea, [contenteditable=true]") || target.isContentEditable)) return;
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string, opts?: { external?: boolean }) => {
    setOpen(false);
    if (opts?.external) {
      window.open(href, "_blank", "noreferrer");
      return;
    }
    router.push(href);
  };

  const copy = async (text: string) => {
    setOpen(false);
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <>
      <Button
        type="button"
        variant="neutral"
        mode="outline"
        size="small"
        onClick={() => setOpen(true)}
        aria-label="Open command bar"
        title={isMac ? "Open command bar (⌘K)" : "Open command bar (Ctrl+K)"}
        className={triggerClassName}
      >
        <SearchIcon />
        <KbdGroup>
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} title="Command bar" description="Jump to a page, open the docs, switch style, or toggle the theme.">
        <Command.Input placeholder="Search pages, docs and commands…" />
        <Command.List>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Studio">
            {studioSections.map((item) => {
              const Icon = item.icon;
              return (
                <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                  {Icon ? <Icon /> : <PaletteIcon />}
                  {item.label}
                  {item.href === "/" && <CommandShortcut>H</CommandShortcut>}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Docs">
            {docsNav.map((item) => (
              <CommandItem key={item.href} value={`${item.title} docs`} onSelect={() => go(item.href)}>
                {item.slug === "get-started" || item.slug === "styles" ? <BookOpenIcon /> : <SwatchBookIcon />}
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              value="Toggle theme light dark"
              onSelect={() => {
                update({ mode: config.mode === "dark" ? "light" : "dark" });
                setOpen(false);
              }}
            >
              {config.mode === "dark" ? <SunIcon /> : <MoonIcon />}
              {config.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Style">
            {visualStyles.map((style) => {
              const label = visualStyleMeta[style].label;
              return (
                <CommandItem
                  key={style}
                  value={`Switch style: ${label}`}
                  onSelect={() => {
                    update({ style: style as VisualStyle });
                    setOpen(false);
                  }}
                >
                  <SwatchBookIcon />
                  Switch style: {label}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Export">
            <CommandItem value="Registry JSON" onSelect={() => go(`/r/${systemId}.json`, { external: true })}>
              <FileJsonIcon />
              Open registry
              <CommandShortcut>.json</CommandShortcut>
            </CommandItem>
            <CommandItem value="Skill markdown" onSelect={() => go(`/skill/${systemId}.md`, { external: true })}>
              <BookOpenIcon />
              Open skill
              <CommandShortcut>.md</CommandShortcut>
            </CommandItem>
            <CommandItem value="Copy install command" onSelect={() => copy(installCommand())}>
              <FileJsonIcon />
              Copy registry install command
            </CommandItem>
            <CommandItem value="Copy skill command" onSelect={() => copy(skillCommand())}>
              <BookOpenIcon />
              Copy skill install command
            </CommandItem>
          </CommandGroup>
        </Command.List>
      </CommandDialog>
    </>
  );
}
