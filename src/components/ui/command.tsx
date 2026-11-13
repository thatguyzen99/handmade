"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type CommandRootProps = React.ComponentProps<typeof CommandPrimitive> & {
  /** When true, the root sits inside a dialog and drops its own radius, fill and ring. */
  inDialog?: boolean;
};

/** Root command menu (cmdk): a search field over a filtered, keyboard-driven list. */
function CommandRoot({ className, inDialog = false, ...props }: CommandRootProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      data-in-dialog={inDialog || undefined}
      className={cn(
        "flex w-full flex-col overflow-hidden text-fg",
        inDialog ? "rounded-none bg-transparent" : "rounded-parent-2xl bg-floating shadow-sm ring-1 ring-inset ring-line",
        className,
      )}
      {...props}
    />
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div data-slot="command-input" className="flex h-12 items-center gap-2 border-b border-line px-4 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-fg-subtle">
      <SearchIcon />
      <CommandPrimitive.Input
        className={cn("h-full w-full bg-transparent text-body-sm text-fg outline-none placeholder:text-fg-subtle disabled:cursor-not-allowed", className)}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return <CommandPrimitive.List data-slot="command-list" className={cn("max-h-80 scroll-py-2 overflow-x-hidden overflow-y-auto p-2", className)} {...props} />;
}

function CommandEmpty({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty data-slot="command-empty" className={cn("py-8 text-center text-body-sm text-fg-muted", className)} {...props} />;
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:text-overline-xs [&_[cmdk-group-heading]]:text-fg-subtle not-first:mt-2", className)}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-pointer items-center gap-2 rounded-concentric-2 p-2 text-body-sm text-fg-muted outline-none select-none transition-colors duration-150 ease-tactile not-first:mt-1",
        "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-subtle",
        "data-[selected=true]:bg-brand-subtle data-[selected=true]:text-fg data-[selected=true]:[&_svg]:text-brand",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:text-fg-disabled",
        className,
      )}
      {...props}
    />
  );
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return <CommandPrimitive.Separator data-slot="command-separator" className={cn("-mx-2 my-2 h-px bg-line", className)} {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="command-shortcut" className={cn("ml-auto text-ui-xs text-fg-subtle", className)} {...props} />;
}

/** Command menu inside a modal dialog. Focus is trapped; Escape closes it. */
function CommandDialog({
  children,
  title = "Command menu",
  description = "Search for a page, section or command.",
  ...props
}: React.ComponentProps<typeof Dialog> & { title?: string; description?: string }) {
  return (
    <Dialog {...props}>
      <DialogContent showClose={false} className="max-w-[560px] overflow-hidden p-0 [&>:not([data-slot])]:p-0">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <CommandRoot inDialog>{children}</CommandRoot>
      </DialogContent>
    </Dialog>
  );
}

/** Compound command menu. `Command` is the root; `Command.Root`, `Command.Input` and the rest are aliases. */
const Command = Object.assign(CommandRoot, {
  Root: CommandRoot,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Shortcut: CommandShortcut,
  Dialog: CommandDialog,
});

export {
  Command,
  CommandRoot,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  CommandDialog,
};
