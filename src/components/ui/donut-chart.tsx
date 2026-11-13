"use client";

import * as React from "react";
import { animate } from "motion";
import { AnimatePresence, motion } from "motion/react";
import { BriefcaseIcon, HouseIcon, PlaneIcon, ReceiptIcon, ShoppingBagIcon, TruckIcon, UtensilsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionSprings, useVisualStyle } from "@/lib/motion-style";

export type DonutSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
  /** Light icon on a dark swatch (ink). */
  invertIcon?: boolean;
};

const VB = 400;
const CX = 200;
const CY = 200;
const RADIUS = 127;
const STROKE_REST = 48;
const STROKE_ACTIVE = 54;
const STROKE_IDLE = 44;
const GAP = 3;
const ELONGATE = 0.16;
const MIN_ACTIVE_VISUAL = 30;
const TWEEN = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as const };
const IDLE_GREY = "color-mix(in oklab, var(--fg) 14%, var(--surface))";
const IDLE_ICON = "color-mix(in oklab, var(--fg) 48%, var(--surface))";

export const defaultExpenseData: DonutSlice[] = [
  { id: "food", label: "Food", value: 816, color: "#E07A14", icon: <UtensilsIcon /> },
  { id: "travel", label: "Travel", value: 612, color: "#FFCA05", icon: <PlaneIcon /> },
  { id: "home", label: "Home", value: 423, color: "#FAAC18", icon: <HouseIcon /> },
  { id: "shopping", label: "Shopping", value: 290, color: "#9A9186", icon: <ShoppingBagIcon /> },
  { id: "work", label: "Work", value: 148, color: "#C4922A", icon: <BriefcaseIcon /> },
  { id: "bills", label: "Bills", value: 92, color: "#D4B45A", icon: <ReceiptIcon /> },
  { id: "deliveries", label: "Deliveries", value: 55, color: "var(--fg)", icon: <TruckIcon />, invertIcon: true },
];

type LaidOut = DonutSlice & {
  mid: number;
  visual: number;
  showAmount: boolean;
};

function capHalf(stroke: number, radius: number) {
  return (Math.atan(stroke / 2 / radius) * 180) / Math.PI;
}

function layoutSlices(data: DonutSlice[]): LaidOut[] {
  const total = data.reduce((sum, slice) => sum + slice.value, 0) || 1;
  const cap = capHalf(STROKE_REST, RADIUS);
  const minVisual = 2 * cap;
  const available = 360 - GAP * data.length;
  const raw = data.map((slice) => (slice.value / total) * available);
  let extra = 0;
  const visual = raw.map((span) => {
    if (span < minVisual) {
      extra += minVisual - span;
      return minVisual;
    }
    return span;
  });
  const shrinkSum = visual.reduce((sum, span) => (span > minVisual ? sum + span : sum), 0);
  const adjusted = visual.map((span) => (span > minVisual && shrinkSum > 0 ? span - (extra * span) / shrinkSum : span));

  // Start Food (largest in the default set, or first slice) near 7:30, going clockwise,
  // matching the reference expenses ring.
  let cursor = 210;
  const ranked = [...data].sort((a, b) => b.value - a.value);
  const top3 = new Set(ranked.slice(0, 3).map((slice) => slice.id));

  return data.map((slice, index) => {
    const span = adjusted[index] ?? minVisual;
    const mid = (cursor + span / 2) % 360;
    cursor += span + GAP;
    return { ...slice, mid, visual: span, showAmount: top3.has(slice.id) };
  });
}

function polar(radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function arcPath(radius: number, start: number, end: number) {
  let sweep = (end - start) % 360;
  if (sweep < 0) sweep += 360;
  sweep = Math.max(0.001, Math.min(359.99, sweep));
  const startPt = polar(radius, start);
  const endPt = polar(radius, start + sweep);
  const large = sweep > 180 ? 1 : 0;
  return `M ${startPt.x.toFixed(3)} ${startPt.y.toFixed(3)} A ${radius} ${radius} 0 ${large} 1 ${endPt.x.toFixed(3)} ${endPt.y.toFixed(3)}`;
}

function pathAngles(mid: number, visual: number, stroke: number) {
  const cap = capHalf(stroke, RADIUS);
  const pathSweep = Math.max(0.05, visual - 2 * cap);
  return { start: mid - pathSweep / 2, end: mid + pathSweep / 2, cap };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function MoneyOdometer({ value, reduce }: { value: number; reduce: boolean }) {
  const formatted = `$${value.toLocaleString("en-US")}`;
  const [snapshot, setSnapshot] = React.useState({ value, dir: 1 });
  if (value !== snapshot.value) {
    setSnapshot({ value, dir: value > snapshot.value ? 1 : -1 });
  }
  const dir = value !== snapshot.value ? (value > snapshot.value ? 1 : -1) : snapshot.dir;
  const tween = reduce ? { duration: 0.16, ease: "easeOut" as const } : TWEEN;

  return (
    <span className="flex items-baseline justify-center tabular-nums" aria-hidden>
      {formatted.split("").map((char, index) => {
        const isDigit = char >= "0" && char <= "9";
        if (!isDigit) {
          return (
            <span key={`p-${index}-${char}`} className="inline-block">
              {char}
            </span>
          );
        }
        return (
          <span key={`d-${index}`} className="relative inline-grid overflow-hidden">
            <span className="invisible col-start-1 row-start-1">0</span>
            <AnimatePresence initial={false} mode="popLayout" custom={dir}>
              <motion.span
                key={char}
                custom={dir}
                initial={reduce ? { opacity: 0 } : { y: `${dir * 70}%`, opacity: 0.2, filter: "blur(6px)" }}
                animate={reduce ? { opacity: 1 } : { y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { y: `${-dir * 70}%`, opacity: 0, filter: "blur(6px)" }}
                transition={tween}
                className="col-start-1 row-start-1 inline-block"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </span>
        );
      })}
    </span>
  );
}

function Segment({
  slice,
  emphasis,
  styleName,
  onActivate,
  onDeactivate,
  onToggle,
  onEscape,
}: {
  slice: LaidOut;
  emphasis: number;
  styleName: string;
  onActivate: () => void;
  onDeactivate: () => void;
  onToggle: () => void;
  onEscape: () => void;
}) {
  const t = Math.max(-1, Math.min(1, emphasis));
  const stroke =
    t >= 0 ? lerp(STROKE_REST, STROKE_ACTIVE, t) : lerp(STROKE_REST, STROKE_IDLE, -t);
  const visualRest = slice.visual;
  const visualActive = Math.max(visualRest * (1 + ELONGATE), MIN_ACTIVE_VISUAL);
  const visual = t > 0 ? lerp(visualRest, visualActive, t) : visualRest;
  const { start, end, cap } = pathAngles(slice.mid, visual, stroke);
  const d = arcPath(RADIUS, start, end);
  const color = t >= 0 ? slice.color : IDLE_GREY;
  const hit = arcPath(RADIUS, start, end);

  // Badge sits at the CW cap for labelled (top-3) slices, otherwise at mid — matching the reference.
  const badgeAngle = slice.showAmount ? slice.mid + visualRest / 2 - cap : slice.mid;
  const badge = polar(RADIUS, badgeAngle);
  const labelAngle = slice.mid - visual / 2 + cap + 7;
  const labelPos = polar(RADIUS, labelAngle);
  const badgeFill = t < 0 ? "transparent" : slice.color;
  const iconDark = t < 0 ? false : !slice.invertIcon;

  return (
    <g>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        className="pointer-events-none"
        style={{ transition: "none" }}
      />
      <path
        d={hit}
        fill="none"
        stroke="transparent"
        strokeWidth={STROKE_REST + 16}
        strokeLinecap="round"
        className="cursor-pointer"
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={onToggle}
      />
      {slice.showAmount && (
        <motion.text
          x={labelPos.x}
          y={labelPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="pointer-events-none select-none"
          fill={t < 0 ? "var(--fg-muted)" : "var(--fg)"}
          style={{ fontSize: 18, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}
          initial={false}
          animate={{ opacity: 1 }}
        >
          ${slice.value.toLocaleString("en-US")}
        </motion.text>
      )}
      <foreignObject
        x={badge.x - (STROKE_REST + 2) / 2}
        y={badge.y - (STROKE_REST + 2) / 2}
        width={STROKE_REST + 2}
        height={STROKE_REST + 2}
        className="overflow-visible"
      >
        <button
          type="button"
          aria-label={`${slice.label}: $${slice.value.toLocaleString("en-US")}`}
          aria-pressed={t > 0.5}
          onMouseEnter={onActivate}
          onMouseLeave={onDeactivate}
          onFocus={onActivate}
          onBlur={onDeactivate}
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              (event.currentTarget as HTMLButtonElement).blur();
              onEscape();
            }
          }}
          className={cn(
            "flex size-full items-center justify-center rounded-full outline-none",
            "focus-visible:shadow-focus",
            styleName === "brutal" && t >= 0 && "ring-2 ring-fg",
            t < 0 ? "bg-transparent" : "",
          )}
          style={{
            background: badgeFill,
            color: t < 0 ? IDLE_ICON : iconDark ? "#0A0A0A" : "var(--canvas)",
            width: "100%",
            height: "100%",
          }}
        >
          <span className="flex size-6 items-center justify-center [&_svg]:size-6 [&_svg]:stroke-[2]">{slice.icon}</span>
        </button>
      </foreignObject>
    </g>
  );
}

export function DonutChart({
  data = defaultExpenseData,
  title = "Expenses",
  restLabel = "This month",
  unitLabel = "spent",
  className,
  label,
}: {
  data?: DonutSlice[];
  title?: string;
  restLabel?: string;
  unitLabel?: string;
  className?: string;
  /** Accessible name for the chart. Defaults to the title. */
  label?: string;
}) {
  const springs = useMotionSprings();
  const style = useVisualStyle();
  const slices = React.useMemo(() => layoutSlices(data), [data]);
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  const [active, setActive] = React.useState<string | null>(null);
  const hoverRef = React.useRef<string | null>(null);
  const finePointer = React.useRef(true);

  React.useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    finePointer.current = media.matches;
    const onChange = () => {
      finePointer.current = media.matches;
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const current = slices.find((slice) => slice.id === active) ?? null;
  const amount = current ? current.value : total;
  const topLabel = current ? current.label : restLabel;

  // Per-slice emphasis: 0 rest, 1 active, -1 idle. Tweened together, no stagger.
  const targets = React.useMemo(
    () => Object.fromEntries(slices.map((slice) => [slice.id, active == null ? 0 : slice.id === active ? 1 : -1])),
    [slices, active],
  );
  const [emphases, setEmphases] = React.useState<Record<string, number>>(targets);
  const derived = springs.reduce ? targets : emphases;

  React.useEffect(() => {
    if (springs.reduce) return;
    const controls: Array<ReturnType<typeof animate>> = [];
    for (const slice of slices) {
      const target = targets[slice.id] ?? 0;
      const from = emphases[slice.id] ?? 0;
      if (from === target) continue;
      const ctrl = animate(from, target, {
        ...TWEEN,
        onUpdate: (value) => {
          setEmphases((current) => ({ ...current, [slice.id]: value }));
        },
      });
      controls.push(ctrl);
    }
    return () => controls.forEach((ctrl) => ctrl.stop());
    // tween from the values at the moment active changed; don't retrigger on each frame
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, springs.reduce, slices, targets]);

  const activate = (id: string) => {
    hoverRef.current = id;
    setActive(id);
  };
  const deactivate = (id: string) => {
    if (!finePointer.current) return;
    if (hoverRef.current === id) hoverRef.current = null;
    // Defer so moving from a path to its badge doesn't flash rest.
    requestAnimationFrame(() => {
      if (hoverRef.current == null) setActive(null);
    });
  };
  const toggle = (id: string) => {
    if (finePointer.current) {
      setActive(id);
      return;
    }
    setActive((value) => (value === id ? null : id));
  };
  const escapeToRest = () => {
    hoverRef.current = null;
    setActive(null);
  };

  const live = `$${amount.toLocaleString("en-US")} ${unitLabel}${current ? `, ${current.label}` : ""}`;

  // Draw inactive first, the active slice last so it sits on top. Neighbours stay put.
  const order = [...slices].sort((a, b) => {
    if (a.id === active) return 1;
    if (b.id === active) return -1;
    return 0;
  });

  return (
    <div
      data-slot="donut-chart"
      className={cn(
        "relative mx-auto aspect-square w-full max-w-md rounded-3xl bg-surface shadow-sm",
        style === "brutal" && "ring-2 ring-fg",
        className,
      )}
    >
      <h3 className="absolute top-6 left-6 z-10 text-heading-6 text-fg">{title}</h3>

      <svg
        viewBox={`0 0 ${VB} ${VB}`}
        className="absolute inset-0 size-full overflow-visible"
        role="img"
        aria-label={label ?? title}
      >
        {order.map((slice) => (
          <Segment
            key={slice.id}
            slice={slice}
            emphasis={derived[slice.id] ?? 0}
            styleName={style}
            onActivate={() => activate(slice.id)}
            onDeactivate={() => deactivate(slice.id)}
            onToggle={() => toggle(slice.id)}
            onEscape={escapeToRest}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="relative h-6 w-40 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={topLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={springs.reduce ? springs.fade : TWEEN}
              className="text-ui-sm text-fg-muted"
            >
              {topLabel}
            </motion.div>
          </AnimatePresence>
        </div>
        <div
          className="text-heading-3 text-fg tabular-nums tracking-tight"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="sr-only">{live}</span>
          <MoneyOdometer value={amount} reduce={springs.reduce} />
        </div>
        <div className="text-ui-sm text-fg-muted">{unitLabel}</div>
      </div>
    </div>
  );
}
