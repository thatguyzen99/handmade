"use client";

import * as React from "react";
import { DropdownMenu as MenuPrimitive } from "radix-ui";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const DropdownMenu = MenuPrimitive.Root;
const DropdownMenuTrigger = MenuPrimitive.Trigger;
const DropdownMenuGroup = MenuPrimitive.Group;
const DropdownMenuSub = MenuPrimitive.Sub;
const DropdownMenuRadioGroup = MenuPrimitive.RadioGroup;

const menuSurface = cn(
  "z-50 min-w-48 overflow-hidden rounded-parent-2xl bg-floating p-2 shadow-menu outline-none",
  "animate-menu-in data-[state=closed]:animate-menu-out motion-reduce:animate-menu-fade-in motion-reduce:data-[state=closed]:animate-menu-fade-out",
);

const itemBase = cn(
  "relative flex cursor-pointer items-center gap-2 rounded-concentric-2 p-2 text-body-sm text-fg-muted outline-none select-none transition-colors duration-150 ease-tactile",
  "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-fg-subtle",
  "data-highlighted:bg-hover data-highlighted:text-fg data-highlighted:[&_svg]:text-fg-muted",
  "data-disabled:pointer-events-none data-disabled:text-fg-disabled",
);

function DropdownMenuContent({ className, sideOffset = 8, align = "start", ...props }: React.ComponentProps<typeof MenuPrimitive.Content>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        collisionPadding={16}
        className={cn(menuSurface, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuItem({ className, variant = "default", shortcut, children, ...props }: React.ComponentProps<typeof MenuPrimitive.Item> & { variant?: "default" | "danger"; shortcut?: React.ReactNode }) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={cn(itemBase, variant === "danger" && "text-danger-fg data-highlighted:bg-danger-subtle data-highlighted:text-danger-fg [&_svg]:text-danger", className)}
      {...props}
    >
      {children}
      {shortcut && <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>}
    </MenuPrimitive.Item>
  );
}

function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof MenuPrimitive.CheckboxItem>) {
  return (
    <MenuPrimitive.CheckboxItem data-slot="dropdown-menu-checkbox-item" className={cn(itemBase, "pr-8", className)} {...props}>
      {children}
      <MenuPrimitive.ItemIndicator className="absolute right-2 flex items-center">
        <CheckIcon className="text-primary!" />
      </MenuPrimitive.ItemIndicator>
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof MenuPrimitive.RadioItem>) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(itemBase, "data-[state=checked]:bg-selected data-[state=checked]:text-fg", className)}
      {...props}
    >
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof MenuPrimitive.Label>) {
  return <MenuPrimitive.Label data-slot="dropdown-menu-label" className={cn("px-2 py-1 text-overline-xs text-fg-subtle", className)} {...props} />;
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof MenuPrimitive.Separator>) {
  return <MenuPrimitive.Separator data-slot="dropdown-menu-separator" className={cn("-mx-2 my-2 h-px bg-line", className)} {...props} />;
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="dropdown-menu-shortcut" className={cn("ml-auto pl-4 font-sans text-ui-xs text-fg-subtle", className)} {...props} />;
}

function DropdownMenuSubTrigger({ className, children, ...props }: React.ComponentProps<typeof MenuPrimitive.SubTrigger>) {
  return (
    <MenuPrimitive.SubTrigger data-slot="dropdown-menu-sub-trigger" className={cn(itemBase, "data-[state=open]:bg-hover data-[state=open]:text-fg", className)} {...props}>
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubTrigger>
  );
}

function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof MenuPrimitive.SubContent>) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        sideOffset={8}
        className={cn(menuSurface, "origin-(--radix-dropdown-menu-content-transform-origin)", className)}
        {...props}
      />
    </MenuPrimitive.Portal>
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
