"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useMotionSprings } from "@/lib/motion-style";

export type DonutSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
};


function layoutSlices(data: DonutSlice[], total: number) {
  let cursor = 0;
  return data.map((slice) => {
    const start = cursor;
    const sweep = (slice.value / total) * 360;
    cursor += sweep;
    return { ...slice, start, end: start + sweep, mid: start + sweep / 2 };
  });
}

function polar(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const sweep = Math.max(0, Math.min(359.99, end - start));
  const startPt = polar(cx, cy, r, start);
  const endPt = polar(cx, cy, r, start + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${startPt.x} ${startPt.y} A ${r} ${r} 0 ${large} 1 ${endPt.x} ${endPt.y}`;
}

export function DonutChart({
  data,
  size = 240,
  className,
  label = "Breakdown",
}: {
  data: DonutSlice[];
  size?: number;
  className?: string;
  label?: string;
}) {
  const springs = useMotionSprings();
  const [active, setActive] = React.useState<string | null>(null);
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const current = data.find((slice) => slice.id === active) ?? null;
  const displayValue = current ? current.value : total;
  const displayLabel = current ? current.label : "Total";

  const sprung = useSpring(displayValue, springs.reduce ? { stiffness: 800, damping: 50 } : { stiffness: 160, damping: 24 });
  const [shown, setShown] = React.useState(displayValue);
  React.useEffect(() => {
    sprung.set(displayValue);
  }, [displayValue, sprung]);
  useMotionValueEvent(sprung, "change", (value) => setShown(Math.round(value)));

  const cx = size / 2;
  const cy = size / 2;
  const radius = 72;
  const slices = layoutSlices(data, total);

  const onKey = (event: React.KeyboardEvent, id: string) => {
    const index = data.findIndex((slice) => slice.id === id);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      const next = data[(index + 1) % data.length];
      setActive(next.id);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = data[(index - 1 + data.length) % data.length];
      setActive(next.id);
    }
  };

  return (
    <div data-slot="donut-chart" className={cn("flex flex-col items-center gap-4", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="group" aria-label={label} className="overflow-visible">
        {slices.map((slice) => {
          const isActive = active === slice.id;
          const faded = active !== null && !isActive;
          const r = isActive && !springs.reduce ? radius + 4 : radius;
          const stroke = isActive && !springs.reduce ? 22 : 16;
          const end = isActive && !springs.reduce ? slice.end + 2 : slice.end;
          const badge = polar(cx, cy, r + 28, slice.mid);
          return (
            <g key={slice.id}>
              <motion.path
                d={arcPath(cx, cy, r, slice.start + 1.5, end - 1.5)}
                fill="none"
                stroke={slice.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                tabIndex={0}
                role="img"
                aria-label={`${slice.label}: ${slice.value}`}
                className="cursor-pointer outline-none focus-visible:opacity-100"
                initial={false}
                animate={{ opacity: faded ? 0.28 : 1 }}
                transition={springs.fade}
                onMouseEnter={() => setActive(slice.id)}
                onMouseLeave={() => setActive((value) => (value === slice.id ? null : value))}
                onFocus={() => setActive(slice.id)}
                onBlur={() => setActive((value) => (value === slice.id ? null : value))}
                onKeyDown={(event) => onKey(event, slice.id)}
              />
              {isActive && (
                <text
                  x={polar(cx, cy, r, slice.mid).x}
                  y={polar(cx, cy, r, slice.mid).y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-fg font-mono text-[10px] tabular-nums pointer-events-none"
                >
                  {slice.value}
                </text>
              )}
              {slice.icon && (
                <g transform={`translate(${badge.x - 12}, ${badge.y - 12})`} className="pointer-events-none">
                  <circle cx="12" cy="12" r="12" className="fill-surface" />
                  <foreignObject width="24" height="24">
                    <div className="flex size-6 items-center justify-center text-fg [&_svg]:size-3">{slice.icon}</div>
                  </foreignObject>
                </g>
              )}
            </g>
          );
        })}
        <foreignObject x={cx - 48} y={cy - 28} width="96" height="56">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="text-heading-6 text-fg tabular-nums">{shown.toLocaleString()}</div>
            <div className="relative h-5 w-full overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={displayLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={springs.fade}
                  className="text-body-xs text-fg-muted"
                >
                  {displayLabel}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </foreignObject>
      </svg>
      <ul className="flex flex-wrap justify-center gap-3">
        {data.map((slice) => (
          <li key={slice.id}>
            <button
              type="button"
              onMouseEnter={() => setActive(slice.id)}
              onMouseLeave={() => setActive((value) => (value === slice.id ? null : value))}
              onFocus={() => setActive(slice.id)}
              onBlur={() => setActive((value) => (value === slice.id ? null : value))}
              className={cn(
                "flex items-center gap-2 rounded-full px-2 py-1 text-ui-xs text-fg-muted outline-none transition hover:text-fg focus-visible:shadow-focus",
                active === slice.id && "bg-brand-subtle text-fg",
              )}
            >
              <span className="size-2 rounded-full" style={{ background: slice.color }} />
              {slice.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
