"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMotionSprings } from "@/lib/motion-style";

export type MegaMenuTab = {
  id: string;
  label: string;
  panel: React.ReactNode;
};

export function MegaMenu({
  tabs,
  label = "Product",
  className,
}: {
  tabs: MegaMenuTab[];
  label?: string;
  className?: string;
}) {
  const springs = useMotionSprings();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(tabs[0]?.id ?? "");
  const closeTimer = React.useRef<number | null>(null);

  const clearClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  React.useEffect(() => () => clearClose(), []);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = tabs.findIndex((tab) => tab.id === active);
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const dir = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(index + dir + tabs.length) % tabs.length];
      if (next) {
        setActive(next.id);
        setOpen(true);
      }
    }
  };

  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div
      ref={rootRef}
      data-slot="mega-menu"
      className={cn("relative", className)}
      onMouseEnter={clearClose}
      onMouseLeave={scheduleClose}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center gap-1" role="menubar" aria-label={label}>
        {tabs.map((tab) => {
          const isActive = open && tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="menuitem"
              aria-expanded={isActive}
              aria-haspopup="true"
              data-active={isActive}
              className={cn(
                "rounded-md px-3 py-2 text-ui-sm text-fg-muted outline-none transition",
                "hover:bg-hover hover:text-fg focus-visible:shadow-focus",
                "data-[active=true]:bg-brand-subtle data-[active=true]:text-fg",
              )}
              onMouseEnter={() => {
                clearClose();
                setActive(tab.id);
                setOpen(true);
              }}
              onFocus={() => {
                clearClose();
                setActive(tab.id);
                setOpen(true);
              }}
              onClick={() => {
                setActive(tab.id);
                setOpen((value) => (tab.id === active ? !value : true));
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {open && current && (
          <motion.div
            role="menu"
            aria-label={current.label}
            data-slot="mega-menu-panel"
            initial={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={springs.reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={springs.panel}
            className="absolute top-full left-0 z-50 mt-2 origin-top overflow-hidden rounded-2xl bg-floating shadow-md"
          >
            <motion.div layout={!springs.reduce} transition={springs.panel} className="w-max max-w-[40rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={current.id}
                  initial={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={springs.reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={springs.reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={springs.fade}
                >
                  {current.panel}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MegaMenuPreviewList({
  items,
  preview,
}: {
  items: { id: string; title: string; description: string; image: string; alt: string }[];
  preview?: { image: string; alt: string };
}) {
  const [hover, setHover] = React.useState(items[0]?.id ?? "");
  const current = items.find((item) => item.id === hover) ?? items[0];
  const shown = current ?? (preview ? { image: preview.image, alt: preview.alt, title: "", description: "", id: "" } : null);
  if (!shown) return null;
  return (
    <div className="flex gap-6 p-5">
      <ul className="w-56 space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onMouseEnter={() => setHover(item.id)}
              onFocus={() => setHover(item.id)}
              className={cn(
                "w-full rounded-xl px-3 py-2 text-left outline-none transition",
                "hover:bg-hover focus-visible:shadow-focus",
                item.id === hover && "bg-brand-subtle",
              )}
            >
              <div className="text-ui-sm text-fg">{item.title}</div>
              <div className="text-body-xs text-fg-muted">{item.description}</div>
            </button>
          </li>
        ))}
      </ul>
      <div className="w-56 shrink-0 overflow-hidden rounded-xl bg-subtle">
        <img src={shown.image} alt={shown.alt} className="h-40 w-full object-cover" />
      </div>
    </div>
  );
}

export function MegaMenuCardGrid({
  items,
}: {
  items: { id: string; title: string; description: string; image: string; alt: string }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-3 p-5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="w-40 overflow-hidden rounded-xl bg-surface outline-none ring-1 ring-line transition hover:shadow-sm focus-visible:shadow-focus"
        >
          <img src={item.image} alt={item.alt} className="h-24 w-full object-cover" />
          <div className="space-y-1 p-3">
            <div className="text-ui-sm text-fg">{item.title}</div>
            <div className="text-body-xs text-fg-muted">{item.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function MegaMenuSimpleList({ items }: { items: { id: string; title: string; href?: string }[] }) {
  return (
    <ul className="min-w-56 p-3">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href ?? `#${item.id}`}
            className="block rounded-md px-3 py-2 text-ui-sm text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
