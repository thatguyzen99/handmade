"use client";

import * as React from "react";
import { useReducedMotion, type Transition } from "motion/react";
import { visualStyles, type VisualStyle } from "@/design-system/config";

/** Live visual style from `data-style` on <html>. */
export function useVisualStyle(): VisualStyle {
  const [style, setStyle] = React.useState<VisualStyle>("handmade");
  React.useEffect(() => {
    const el = document.documentElement;
    const read = () => {
      const value = el.dataset.style;
      setStyle(visualStyles.includes(value as VisualStyle) ? (value as VisualStyle) : "handmade");
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(el, { attributes: true, attributeFilter: ["data-style"] });
    return () => observer.disconnect();
  }, []);
  return style;
}

type Springs = {
  reduce: boolean;
  style: VisualStyle;
  /** Panel / dropdown size morph. */
  panel: Transition;
  /** Staggered pop-up items (speed dial). */
  pop: Transition;
  /** Calm reflow (bento, counters). */
  layout: Transition;
  /** Short fade + rise (~150ms). */
  fade: Transition;
  /** Snappy scale-in for checks and badges. */
  popIn: Transition;
};

export function useMotionSprings(): Springs {
  const style = useVisualStyle();
  const reduce = useReducedMotion() ?? false;
  if (reduce) {
    const fade: Transition = { duration: 0.2, ease: "easeOut" };
    return { reduce: true, style, panel: fade, pop: fade, layout: fade, fade, popIn: fade };
  }
  const brutal = style === "brutal";
  return {
    reduce: false,
    style,
    panel: { type: "spring", stiffness: brutal ? 600 : 400, damping: brutal ? 28 : 30 },
    pop: { type: "spring", stiffness: brutal ? 420 : 300, damping: brutal ? 16 : 20 },
    layout: { type: "spring", stiffness: brutal ? 320 : 200, damping: 30 },
    fade: { duration: 0.15, ease: [0.23, 1, 0.32, 1] },
    popIn: { type: "spring", stiffness: brutal ? 520 : 380, damping: brutal ? 16 : 20 },
  };
}
