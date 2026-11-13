import type { Metadata } from "next";
import Link from "next/link";
import { systemName } from "@/design-system/brand";
import { visualStyleMeta } from "@/design-system/config";
import { StyleCompare, StyleGallery } from "@/components/studio/style-preview-docs";

export const metadata: Metadata = {
  title: `Styles — ${systemName}`,
  description: `The three ${systemName} visual styles — Handmade, Glass and Brutal — and how to set data-style.`,
};

export default function StylesPage() {
  return (
    <article className="mx-auto max-w-5xl space-y-10">
      <header className="space-y-3">
        <p className="text-overline-xs text-fg-subtle">Docs</p>
        <h1 className="text-heading-3 text-fg">Styles</h1>
        <p className="text-body-lg text-fg-muted">
          {systemName} has three visual languages on the same semantic tokens: Handmade, the default; Glass, a
          glassmorphic treatment; and Brutal, a neubrutal one. Switching the style restyles every component, in light
          and dark mode.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-heading-5 text-fg">How to set it</h2>
        <p className="text-body-md text-fg-muted">
          Put a <code className="font-mono text-ui-xs text-fg">data-style</code> attribute on{" "}
          <code className="font-mono text-ui-xs text-fg">&lt;html&gt;</code>. Valid values are{" "}
          <code className="font-mono text-ui-xs text-fg">handmade</code> (the default),{" "}
          <code className="font-mono text-ui-xs text-fg">glass</code> and{" "}
          <code className="font-mono text-ui-xs text-fg">brutal</code>. The studio persists the choice in{" "}
          <code className="font-mono text-ui-xs text-fg">localStorage</code> with the rest of the theme, and an inline
          script in the document head applies it before first paint so the page does not flash the wrong style.
        </p>
        <pre className="overflow-x-auto rounded-xl bg-subtle p-4 font-mono text-[12px] leading-[1.6] text-fg-muted ring-1 ring-inset ring-line">
          {`<html lang="en" data-style="glass">
  <!-- handmade | glass | brutal -->
</html>`}
        </pre>
        <p className="text-body-md text-fg-muted">
          Import <code className="font-mono text-ui-xs text-fg">visual-styles.css</code> next to the theme stylesheet.
          The registry ships that file so an install can choose a style without rewriting components. Tokens do most of
          the work — radius, border width and color, shadow, surface background, backdrop blur, heading weight and
          motion — with a few targeted overrides where a token cannot express the look.
        </p>
        <p className="text-body-md text-fg-muted">
          In this studio, switch styles from the control next to the theme toggle in the nav, the Style segmented
          control in the customizer, or a ⌘K command beginning with “Switch style:”.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-heading-5 text-fg">The three styles</h2>
        <ul className="list-disc space-y-3 pl-5 text-body-md text-fg-muted">
          <li>
            <span className="text-fg">{visualStyleMeta.handmade.label}.</span> {visualStyleMeta.handmade.hint} Soft
            corners, quiet shadows, ink and cream. This is the system as designed.
          </li>
          <li>
            <span className="text-fg">{visualStyleMeta.glass.label}.</span> {visualStyleMeta.glass.hint} Surfaces use
            translucent white or ink, a thin light border and a soft glow. A Sunrise-tinted, blurred gradient sits
            behind the page so the glass can read. Text stays solid so contrast stays at AA. If{" "}
            <code className="font-mono text-ui-xs text-fg">backdrop-filter</code> is not supported, surfaces fall back
            to opaque fills.
          </li>
          <li>
            <span className="text-fg">{visualStyleMeta.brutal.label}.</span> {visualStyleMeta.brutal.hint} Two-to-three
            pixel solid ink borders, hard offset shadows (4px 4px 0) that shift on press, little or no radius, flat
            yellow <code className="font-mono text-ui-xs text-fg">#FFCA05</code> and orange{" "}
            <code className="font-mono text-ui-xs text-fg">#FAAC18</code> fills on cream, heavier headings and snappy
            motion.
          </li>
        </ul>
        <p className="text-body-md text-fg-muted">
          None of the styles introduce purple. Highlight color stays yellow and orange.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-heading-5 text-fg">Try them</h2>
        <p className="text-body-md text-fg-muted">
          Each preview is scoped with its own <code className="font-mono text-ui-xs text-fg">data-style</code>, so you
          can compare without leaving this page. Use the switcher in the nav to restyle the whole site.
        </p>
        <StyleGallery />
      </section>

      <section id="styles-compare" className="scroll-mt-8 space-y-4">
        <h2 className="text-heading-5 text-fg">Side by side</h2>
        <p className="text-body-md text-fg-muted">
          The same card, button and input in all three styles. This is also the source of the comparison screenshot.
        </p>
        <StyleCompare />
      </section>

      <p className="text-body-sm text-fg-subtle">
        New here? Start with{" "}
        <Link href="/docs/get-started" className="text-brand underline-offset-4 hover:underline">
          Get started
        </Link>
        , or open the{" "}
        <Link href="/#styles" className="text-brand underline-offset-4 hover:underline">
          Styles section
        </Link>{" "}
        on the home page.
      </p>
    </article>
  );
}
