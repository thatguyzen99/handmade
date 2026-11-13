"use client";

import * as React from "react";
import Link from "next/link";
import { visualStyleMeta, visualStyles, type VisualStyle } from "@/design-system/config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocSection } from "./section";
import { StylePreview } from "./style-preview";
import { useTheme } from "./theme-provider";

export function StylesSection() {
  const { config, update } = useTheme();
  const current = config.style ?? "handmade";
  return (
    <DocSection
      id="styles"
      title="Styles"
      description="Three visual languages on the same tokens. Handmade is the default. Glass is translucent, with blur and a Sunrise-tinted backdrop. Brutal is neubrutal: hard ink borders, offset shadows and bold yellow-orange fills. Each one works in light and dark."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {visualStyles.map((style) => {
          const selected = current === style;
          const label = visualStyleMeta[style].label;
          return (
            <div
              key={style}
              className={cn(
                "overflow-hidden rounded-2xl",
                selected ? "ring-2 ring-fg" : "ring-1 ring-line",
              )}
            >
              <div className="flex items-center justify-between gap-3 px-6 pt-5">
                <span className="text-overline-xs text-fg-subtle">{selected ? "Current" : "Preview"}</span>
                <Button
                  size="small"
                  variant={selected ? "primary" : "neutral"}
                  mode={selected ? "solid" : "outline"}
                  onClick={() => update({ style: style as VisualStyle })}
                  aria-pressed={selected}
                >
                  {selected ? "In use" : `Use ${label}`}
                </Button>
              </div>
              <StylePreview style={style} />
            </div>
          );
        })}
      </div>
      <p className="text-body-sm text-fg-muted">
        The choice lives on <code className="font-mono text-ui-xs text-fg">data-style</code> on{" "}
        <code className="font-mono text-ui-xs text-fg">&lt;html&gt;</code>, and in the theme you persist. Read the{" "}
        <Link href="/docs/styles" className="text-brand underline-offset-4 hover:underline">
          styles guide
        </Link>{" "}
        for how to set it in an install.
      </p>
    </DocSection>
  );
}
