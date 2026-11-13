"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useMotionSprings } from "@/lib/motion-style";

export type BentoItem = {
  id: string;
  title: string;
  description?: string;
  image?: string;
  alt?: string;
  span?: "default" | "wide" | "tall" | "hero";
  tags?: string[];
};

const spanClass: Record<NonNullable<BentoItem["span"]>, string> = {
  default: "col-span-1 row-span-1",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  hero: "col-span-2 row-span-2",
};

function RollingCount({ value }: { value: number }) {
  const springs = useMotionSprings();
  return (
    <span className="inline-grid overflow-hidden tabular-nums">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={springs.reduce ? { opacity: 0 } : { y: 10, opacity: 0 }}
          animate={springs.reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={springs.reduce ? { opacity: 0 } : { y: -10, opacity: 0 }}
          transition={springs.fade}
          className="col-start-1 row-start-1"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function BentoGrid({
  items,
  query: queryProp,
  onQueryChange,
  className,
}: {
  items: BentoItem[];
  query?: string;
  onQueryChange?: (value: string) => void;
  className?: string;
}) {
  const springs = useMotionSprings();
  const [inner, setInner] = React.useState("");
  const query = queryProp ?? inner;
  const setQuery = onQueryChange ?? setInner;
  const needle = query.trim().toLowerCase();
  const visible = items.filter((item) => {
    if (!needle) return true;
    const hay = `${item.title} ${item.description ?? ""} ${(item.tags ?? []).join(" ")}`.toLowerCase();
    return hay.includes(needle);
  });

  return (
    <div data-slot="bento-grid" className={cn("space-y-4", className)}>
      <div className="flex items-center gap-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter cards"
          leading={<SearchIcon />}
          aria-label="Filter cards"
        />
        <div className="shrink-0 text-ui-xs text-fg-muted tabular-nums">
          <RollingCount value={visible.length} /> / {items.length}
        </div>
      </div>

      <LayoutGroup>
        <div className="grid auto-rows-[10rem] grid-cols-2 gap-3 sm:grid-cols-4">
          <AnimatePresence initial={false}>
            {visible.map((item) => (
              <motion.article
                key={item.id}
                layout={!springs.reduce}
                initial={springs.reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                animate={springs.reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={springs.reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                transition={springs.layout}
                className={cn(
                  "overflow-hidden rounded-2xl bg-surface shadow-sm",
                  spanClass[item.span ?? "default"],
                )}
              >
                {item.image && (
                  <img src={item.image} alt={item.alt ?? ""} className="h-24 w-full object-cover" />
                )}
                <div className="space-y-1 p-4">
                  <h3 className="text-ui-sm text-fg">{item.title}</h3>
                  {item.description && <p className="text-body-xs text-fg-muted">{item.description}</p>}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}
