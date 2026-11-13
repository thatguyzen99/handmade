"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDivider } from "@/components/ui/card";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { cn } from "@/lib/utils";

export type Plan = { name: string; blurb: string; monthly: number; yearly: number; features: string[]; featured?: boolean; cta: string };

/** One plan: name + blurb, a big tabular price, the CTA, then a checked feature list. The featured plan gets a primary ring and the only solid CTA. */
export function PricingCard({ plan, billing, className }: { plan: Plan; billing: "monthly" | "yearly"; className?: string }) {
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  return (
    <Card data-slot="pricing-card" className={cn("flex flex-col tabular-nums", plan.featured && "ring-2 ring-primary", className)}>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-2">
          <div className="text-ui-md text-fg">{plan.name}</div>
          {plan.featured && <Badge status="primary" size="small">Most popular</Badge>}
        </div>
        <p className="text-body-sm text-fg-muted">{plan.blurb}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-heading-3 text-fg">${price}</span>
          <span className="text-body-sm text-fg-subtle">/ month{billing === "yearly" && price > 0 ? ", billed yearly" : ""}</span>
        </div>
        <Button className="w-full" variant={plan.featured ? "primary" : "neutral"} mode={plan.featured ? "solid" : "outline"}>{plan.cta}</Button>
      </div>
      <CardDivider />
      <ul className="flex-1 space-y-3 p-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-body-sm text-fg-muted">
            <CheckIcon className={cn("mt-0 size-5 shrink-0", plan.featured ? "text-primary" : "text-fg-subtle")} /> {f}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export const plans: Plan[] = [
  { name: "Starter", blurb: "For a single brand or landing page.", monthly: 0, yearly: 0, cta: "Start free", features: ["1 project", "Core components", "Light and dark mode", "Community support"] },
  { name: "Studio", blurb: "For designers shipping client work.", monthly: 24, yearly: 19, featured: true, cta: "Start 14-day trial", features: ["Unlimited projects", "Widgets and patterns", "Registry + agent skill export", "Custom fonts and colors", "Priority email support"] },
  { name: "Team", blurb: "For small teams sharing one system.", monthly: 64, yearly: 52, cta: "Talk to Melvin", features: ["Everything in Studio", "5 editor seats", "Shared presets", "Design review sessions"] },
];

/** Single-card widget version with its own billing switch. */
export function PricingWidget({ className }: { className?: string }) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("yearly");
  return (
    <div className={cn("space-y-4", className)}>
      <SegmentedControl value={billing} onValueChange={(v) => setBilling(v as "monthly" | "yearly")} aria-label="Billing" className="w-full">
        <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
        <SegmentedControlItem value="yearly">Yearly <Badge status="success" size="small">−20%</Badge></SegmentedControlItem>
      </SegmentedControl>
      <PricingCard plan={plans[1]} billing={billing} />
    </div>
  );
}
