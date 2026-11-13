import type { Metadata } from "next";
import Link from "next/link";
import { author, siteUrl, systemName, upstream } from "@/design-system/brand";

export const metadata: Metadata = {
  title: `Get started — ${systemName}`,
  description: `What ${systemName} is, how to install it, and why this site is public.`,
};

export default function GetStartedPage() {
  const origin = siteUrl.includes("localhost") ? "https://melxels.vercel.app" : siteUrl;
  const registry = `${origin}/r/handmade.json`;
  const skill = `${origin}/skill/handmade.md`;
  return (
    <article className="mx-auto max-w-2xl space-y-10">
      <header className="space-y-3">
        <p className="text-overline-xs text-fg-subtle">Docs</p>
        <h1 className="text-heading-3 text-fg">Get started</h1>
        <p className="text-body-lg text-fg-muted">
          {systemName} is {author.name}&apos;s design system — a calm, card-based language for products, sites and brands.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-heading-5 text-fg">What is {systemName}?</h2>
        <p className="text-body-md text-fg-muted">
          {systemName} is a working design system built with React, Next.js, TypeScript, Tailwind CSS and shadcn-style
          components (Radix primitives, cva, <code className="font-mono text-ui-xs text-fg">data-slot</code>). It started
          from {upstream.author}&apos;s open-source {upstream.name} studio ({upstream.license}) and has been extended
          into a branded system — tokens, components, widgets, patterns, a live customizer, a shadcn registry and an
          agent skill. <span className="text-fg-subtle">{upstream.credit}.</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-heading-5 text-fg">How to use it</h2>
        <p className="text-body-md text-fg-muted">
          If you already have a shadcn/ui project, add the registry. That installs the tokens, the components and the
          widgets, along with the small set of dependencies they need:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-subtle p-4 font-mono text-[12px] leading-[1.6] text-fg-muted ring-1 ring-inset ring-line">
          {`npx shadcn@latest add ${registry}`}
        </pre>
        <p className="text-body-md text-fg-muted">
          The same system is available as an agent skill. This drops a <code className="font-mono text-ui-xs text-fg">SKILL.md</code> into
          your project so a coding agent can follow the tokens, recipes and rules:
        </p>
        <pre className="overflow-x-auto rounded-xl bg-subtle p-4 font-mono text-[12px] leading-[1.6] text-fg-muted ring-1 ring-inset ring-line">
          {`mkdir -p .claude/skills/handmade && curl -fsSL ${skill} -o .claude/skills/handmade/SKILL.md`}
        </pre>
        <p className="text-body-md text-fg-muted">
          Previous registry and skill URLs at <code className="font-mono text-ui-xs text-fg">/r/melxels.json</code>,{" "}
          <code className="font-mono text-ui-xs text-fg">/skill/melxels.md</code>,{" "}
          <code className="font-mono text-ui-xs text-fg">/r/zen.json</code> and{" "}
          <code className="font-mono text-ui-xs text-fg">/skill/zen.md</code> still work as aliases.
        </p>
        <p className="text-body-md text-fg-muted">
          The studio on the home page can also mint a prompt, a registry URL and a skill with your custom fonts, color,
          radius and style already baked in. Browse every component, with a live preview and a props table, from the sidebar.
          Three visual styles — Handmade, Glass and Brutal — are documented in the{" "}
          <Link href="/docs/styles" className="text-brand underline-offset-4 hover:underline">
            styles guide
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-heading-5 text-fg">Why this site is public</h2>
        <p className="text-body-md text-fg-muted">
          I keep {systemName} in the open because this is how I think about craft: the quiet decisions, the spacing, the
          contrast, the way a card sits on the page. Publishing the system is a way of showing that work clearly, not
          hiding it behind a private file.
        </p>
        <p className="text-body-md text-fg-muted">
          If you&apos;d like to work together, I&apos;m{" "}
          <a href={author.xUrl} target="_blank" rel="noreferrer" className="text-brand underline-offset-4 hover:underline">
            {author.handle}
          </a>{" "}
          on X — that&apos;s the best place to reach me about a project.
        </p>
      </section>

      <p className="text-body-sm text-fg-subtle">
        Looking for a component? Start with the{" "}
        <Link href="/docs/command" className="text-brand underline-offset-4 hover:underline">
          Command Bar
        </Link>{" "}
        or pick any name in the sidebar.
      </p>
    </article>
  );
}
