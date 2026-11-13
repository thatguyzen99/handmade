"use client";

import * as React from "react";
import { visualStyles } from "@/design-system/config";
import { StyleKit, StylePreview } from "./style-preview";

export function StyleGallery() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {visualStyles.map((style) => (
        <div key={style} className="overflow-hidden rounded-2xl ring-1 ring-line">
          <StylePreview style={style} />
        </div>
      ))}
    </div>
  );
}

/** Flat, equal-width columns of a card, button and input — used for styles-compare.png. */
export function StyleCompare() {
  return (
    <div
      id="styles-compare-stage"
      className="grid gap-6 overflow-visible rounded-2xl bg-canvas p-8 ring-1 ring-line md:grid-cols-3"
    >
      {visualStyles.map((style) => (
        <StylePreview key={style} style={style} className="min-w-0 rounded-2xl p-6">
          <StyleKit style={style} idPrefix={`compare-${style}`} />
        </StylePreview>
      ))}
    </div>
  );
}
