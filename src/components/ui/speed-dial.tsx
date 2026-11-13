"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionSprings } from "@/lib/motion-style";

export type SpeedDialItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export function SpeedDial({
  items,
  label = "Create",
  className,
  onSelect,
}: {
  items: SpeedDialItem[];
  label?: string;
  className?: string;
  onSelect?: (item: SpeedDialItem) => void;
}) {
  const springs = useMotionSprings();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string | null>(null);
  const current = items.find((item) => item.id === selected);

  const choose = (item: SpeedDialItem) => {
    setSelected(item.id);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <LayoutGroup>
      <div data-slot="speed-dial" className={cn("relative flex h-64 w-full items-end justify-center", className)}>
        <AnimatePresence>
          {open && (
            <div className="absolute bottom-16 flex flex-col items-center gap-2">
              {items.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.8 }}
                  animate={springs.reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  exit={springs.reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.8 }}
                  transition={{ ...springs.pop, delay: springs.reduce ? 0 : (items.length - 1 - index) * 0.04 }}
                  onClick={() => choose(item)}
                  className="flex items-center gap-2 rounded-full bg-floating px-3 py-2 text-ui-sm text-fg shadow-md outline-none focus-visible:shadow-focus"
                  aria-label={item.label}
                >
                  <motion.span layoutId={springs.reduce ? undefined : `speed-dial-icon-${item.id}`} className="flex size-5 items-center justify-center [&_svg]:size-4">
                    {item.icon}
                  </motion.span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-expanded={open}
          aria-label={current ? current.label : label}
          onClick={() => setOpen((value) => !value)}
          className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-primary outline-none focus-visible:shadow-focus-primary"
          whileTap={springs.reduce ? undefined : { scale: 0.94 }}
        >
          {current && !open ? (
            <motion.span layoutId={springs.reduce ? undefined : `speed-dial-icon-${current.id}`} className="flex items-center justify-center [&_svg]:size-5">
              {current.icon}
            </motion.span>
          ) : (
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={springs.fade}>
              <PlusIcon className="size-5" />
            </motion.span>
          )}
        </motion.button>
      </div>
    </LayoutGroup>
  );
}
