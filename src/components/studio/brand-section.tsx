"use client";

import * as React from "react";
import Image from "next/image";
import { Mark, Wordmark } from "@/components/brand/logo";
import { brandColors, systemName } from "@/design-system/brand";
import { gradientCss } from "@/lib/gradients";
import { DocSection, SubHeading } from "./section";

const swatches = [
  { name: "Black", hex: brandColors.ink, use: "Primary (light)" },
  { name: "Cream", hex: brandColors.cream, use: "Light canvas / dark primary" },
  { name: "Purple", hex: brandColors.purple, use: "Accent" },
  { name: "Yellow", hex: brandColors.yellow, use: "Highlight" },
  { name: "Butter", hex: brandColors.butter, use: "Sunrise start" },
  { name: "Orange", hex: brandColors.orange, use: "Caution / spark" },
  { name: "Ink dark", hex: brandColors.canvasDark, use: "Dark canvas" },
  { name: "Accent dark", hex: brandColors.accentDark, use: "Accent on dark" },
  { name: "Navy", hex: brandColors.navy, use: "Optional / Royal gradient" },
] as const;

export function Brand() {
  return (
    <DocSection
      id="brand"
      title="Brand"
      description={`${systemName} is Melvin + Pexels: a black-and-cream primary on a cream canvas, with purple as the accent and yellow and orange as secondary highlights.`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm">
          <SubHeading hint="Black on cream, cream on near-black">Wordmark</SubHeading>
          <div className="flex min-h-24 items-center justify-center rounded-xl px-6 py-8" style={{ background: "#F7F4EE" }}>
            <Wordmark className="h-10 w-auto max-w-full !text-[#0A0A0A]" />
          </div>
          <div className="flex min-h-24 items-center justify-center rounded-xl px-6 py-8 dark:ring-1 dark:ring-line" style={{ background: "#111111" }}>
            <Wordmark className="h-10 w-auto max-w-full !text-[#F7F4EE]" />
          </div>
        </div>
        <div className="space-y-4 rounded-2xl bg-surface p-6 shadow-sm">
          <SubHeading hint="Solid currentColor, ink / cream">Mark</SubHeading>
          <div className="flex min-h-24 items-center justify-center rounded-xl px-6 py-8" style={{ background: "#F7F4EE" }}>
            <Mark variant="solid" className="size-20 !text-[#0A0A0A]" />
          </div>
          <div className="flex min-h-24 items-center justify-center rounded-xl px-6 py-8" style={{ background: "#111111" }}>
            <Mark variant="solid" className="size-20 !text-[#F7F4EE]" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Outline mark with a Sunrise stroke; the letter interior stays white">App icon</SubHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 shadow-sm" style={{ background: "#F7F4EE" }}>
            <Image src="/brand/melxels-icon-outline.png" alt={`${systemName} app icon`} width={96} height={96} className="size-24 object-contain" />
            <div className="text-body-xs text-fg-muted">On cream</div>
          </div>
          <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 shadow-sm dark:ring-1 dark:ring-line" style={{ background: "#111111" }}>
            <Image src="/brand/melxels-icon-outline.png" alt="" width={96} height={96} className="size-24 object-contain" />
            <div className="text-body-xs text-[#F7F4EE]/70">On near-black</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Original purple and royal-gradient marks, kept as alternates">Accent versions</SubHeading>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 shadow-sm" style={{ background: "#F7F4EE" }}>
            <Wordmark className="h-8 w-auto max-w-full !text-[#3D0066]" />
            <div className="text-body-xs text-[#5C564E]">Purple wordmark</div>
          </div>
          <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 shadow-sm" style={{ background: "#F7F4EE" }}>
            <Mark variant="gradient" className="size-16" />
            <div className="text-body-xs text-[#5C564E]">Royal gradient mark</div>
          </div>
          <div className="flex min-h-24 flex-col items-center justify-center gap-3 rounded-2xl px-6 py-8 shadow-sm" style={{ background: "#F7F4EE" }}>
            <Mark variant="solid" className="size-16 !text-[#3D0066]" />
            <div className="text-body-xs text-[#5C564E]">Purple mark</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Click a hex to copy">Palette</SubHeading>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map((s) => (
            <CopySwatch key={s.hex} {...s} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SubHeading hint="Sunrise is the featured brand gradient; Solar and Royal stay available. Text on Sunrise is ink.">Gradients</SubHeading>
        <div className="overflow-hidden rounded-2xl bg-surface shadow-sm">
          <div className="flex h-28 items-end p-5" style={{ backgroundImage: gradientCss("sunrise") }}>
            <div className="text-ui-sm text-[#0A0A0A]">Sunrise</div>
          </div>
          <div className="space-y-1 px-5 py-3">
            <div className="text-body-xs text-fg-muted">#FFE7A3 → #FFCA05 → #FAAC18 · 90deg · featured</div>
          </div>
        </div>
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

