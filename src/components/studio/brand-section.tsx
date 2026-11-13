"use client";

import * as React from "react";
import { Mark, Wordmark } from "@/components/brand/logo";
import { brandColors, systemName } from "@/design-system/brand";
import { gradientCss } from "@/lib/gradients";
import { DocSection, SubHeading } from "./section";

const swatches = [
  { name: "Cream", hex: brandColors.cream, use: "Light canvas" },
  { name: "Yellow", hex: brandColors.yellow, use: "Highlight" },
  { name: "Orange", hex: brandColors.orange, use: "Caution / spark" },
  { name: "Purple", hex: brandColors.purple, use: "Primary (light)" },
  { name: "Navy", hex: brandColors.navy, use: "Dark canvas" },
] as const;

export function Brand() {
  return (
    <DocSection
      id="brand"
      title="Brand"
      description={`${systemName} is Melvin + Pexels: a cream canvas, a deep purple accent, and a navy dark mode, with yellow and orange as highlights.`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm">
          <SubHeading hint="Purple in light mode, cream in dark">Wordmark</SubHeading>
          <div className="flex min-h-24 items-center justify-center rounded-xl px-6 py-8" style={{ background: "#F7F4EE" }}>
            <Wordmark className="h-10 w-auto max-w-full !text-[#3D0066]" />
          </div>
          <div className="flex min-h-24 items-center justify-center rounded-xl bg-[#1A1A2E] px-6 py-8 dark:ring-1 dark:ring-line">
            <Wordmark className="h-10 w-auto max-w-full !text-[#F7F4EE]" />
          </div>
        </div>
        <div className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm">
          <SubHeading hint="Royal gradient, cream on navy">Mark</SubHeading>
          <div className="flex min-h-24 items-center justify-center gap-8 rounded-xl px-6 py-8" style={{ background: "#F7F4EE" }}>
            <Mark variant="gradient" className="size-20" />
          </div>
          <div className="flex min-h-24 items-center justify-center rounded-xl bg-[#1A1A2E] px-6 py-8">
            <Mark variant="solid" className="size-20 text-[#F7F4EE]" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Click a hex to copy">Palette</SubHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s) => (
            <CopySwatch key={s.hex} {...s} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Featured Melxels gradients; sky gradients remain available">Gradients</SubHeading>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-surface shadow-sm">
            <div className="h-28" style={{ backgroundImage: gradientCss("solar") }} />
            <div className="space-y-1 px-5 py-3">
              <div className="text-ui-sm text-fg">Solar</div>
              <div className="text-body-xs text-fg-muted">#FFCA05 → #FAAC18</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl bg-surface shadow-sm">
            <div className="h-28" style={{ backgroundImage: gradientCss("royal") }} />
            <div className="space-y-1 px-5 py-3">
              <div className="text-ui-sm text-fg">Royal</div>
              <div className="text-body-xs text-fg-muted">#1B1A2E → #3D0066</div>
            </div>
          </div>
        </div>
      </div>
    </DocSection>
  );
}

function CopySwatch({ name, hex, use }: { name: string; hex: string; use: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(hex);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {}
      }}
      className="overflow-hidden rounded-2xl bg-surface text-left shadow-sm outline-none focus-visible:shadow-focus"
    >
      <div className="h-20 ring-1 ring-inset ring-line" style={{ background: hex }} />
      <div className="space-y-1 px-4 py-3">
        <div className="text-ui-sm text-fg">{copied ? "Copied" : name}</div>
        <div className="text-body-xs tabular-nums text-fg-muted">{hex}</div>
        <div className="text-body-xs text-fg-subtle">{use}</div>
      </div>
    </button>
  );
}

