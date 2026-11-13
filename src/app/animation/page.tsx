import type { Metadata } from "next";
import { systemName } from "@/design-system/brand";
import { AnimationTuner } from "@/components/studio/animation-tuner";

export const metadata: Metadata = {
  title: `Animation Tuner — ${systemName}`,
  description: `Fine-tune an entrance animation with live knobs for easing, spring physics, transform, opacity, blur and stagger, then copy CSS or Framer Motion, or apply it to the ${systemName} theme.`,
};

export default function AnimationPage() {
  return (
    <section className="space-y-6 pt-10 pb-16">
      <header className="max-w-2xl space-y-2">
        <h1 className="text-heading-3 text-fg">Animation Tuner</h1>
        <p className="text-body-lg text-fg-muted">
          Fine-tune an entrance with live knobs for easing, spring physics, transform, opacity, blur and stagger. Copy CSS or Framer Motion, or apply the easing and duration to the {systemName} theme so they ship in the registry and skill.
        </p>
      </header>
      <AnimationTuner />
    </section>
  );
}
