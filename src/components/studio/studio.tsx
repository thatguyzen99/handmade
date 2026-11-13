"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover } from "radix-ui";
import { ArrowUpRightIcon, BookOpenIcon, CopyIcon, MenuIcon, SlidersHorizontalIcon, TerminalIcon, XIcon } from "lucide-react";
import { Toaster } from "@/components/ui/toast";
import { XBrandIcon } from "@/components/ui/brand-icons";
import { Avatar } from "@/components/ui/avatar";
import { CHROME_CLASS } from "@/design-system/tokens";
import { author, systemName } from "@/design-system/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { people } from "@/lib/media";
import { HandmadeMark } from "@/components/brand/handmade-mark";
import { gradientCss } from "@/lib/gradients";
import { AnimationTuner } from "./animation-tuner";
import { Brand } from "./brand-section";
import { ComponentsShowcase } from "./components-showcase";
import { ExtendedComponents } from "./extended-components";
import { Widgets } from "./widgets";
import { Credits } from "./credits";
import { Customizer } from "./customizer";
import { Colors, Shape, Spacing, Typography } from "./foundations";
import { Patterns } from "./patterns";
import { PromptDialog } from "./prompt-dialog";
import { DocSection } from "./section";
import { CommandPalette } from "./command-palette";
import { ThemeProvider } from "./theme-provider";

const nav = [
  { href: "/#brand", label: "Brand" },
  { href: "/#colors", label: "Color" },
  { href: "/#typography", label: "Typography" },
  { href: "/#spacing", label: "Spacing" },
  { href: "/#shape", label: "Radius & elevation" },
  { href: "/#components", label: "Components" },
  { href: "/#widgets", label: "Widgets" },
  { href: "/#patterns", label: "Patterns" },
  { href: "/animation", label: "Animation" },
  { href: "/docs/get-started", label: "Docs" },
];

/** Shared chrome for every page: theme, header, customizer sidebar and credits. */
export function StudioShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <Shell>{children}</Shell>
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
}

/** Homepage content. */
export function HomeSections() {
  return (
    <>
      <Hero />
      <div>
        <Brand />
        <Colors />
        <Typography />
        <Spacing />
        <Shape />
        <ComponentsShowcase />
        <ExtendedComponents />
        <Widgets />
        <Patterns />
        <DocSection
          id="animation"
          title="Animation Tuner"
          description="Fine-tune an entrance animation with live knobs, then copy CSS or Framer Motion, or apply easing and duration to the theme export."
        >
          <p className="text-body-sm text-fg-muted">
            Prefer a focused page? <Link href="/animation" className="text-brand underline-offset-4 hover:underline">Open the Animation Tuner</Link>.
          </p>
          <AnimationTuner />
        </DocSection>
      </div>
    </>
  );
}

const navLinkClass = "rounded-md px-3 py-2 whitespace-nowrap text-ui-sm text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus";

/** The nav links in a dropdown, for tablets and small laptops. Phones have no nav. */
function MobileNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="neutral" mode="ghost" iconOnly className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <XIcon /> : <MenuIcon />}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          collisionPadding={16}
          // Returning focus to the trigger would scroll back up, away from the section just picked.
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="z-50 w-56 origin-(--radix-popover-content-transform-origin) animate-menu-in rounded-parent-2xl bg-floating p-2 shadow-menu data-[state=closed]:animate-menu-out motion-reduce:animate-menu-fade-in motion-reduce:data-[state=closed]:animate-menu-fade-out"
        >
          <nav aria-label="Main" className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className={navLinkClass} onClick={() => setOpen(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  const [panelOpen, setPanelOpen] = React.useState(false);
  const pathname = usePathname() ?? "/";
  const isDocs = pathname.startsWith("/docs");
  return (
    <div className="min-h-screen">
      <div id="studio">
        {/* Studio chrome: keeps default spacing and type size so it always lines up with the sidebar. */}
        <header className="relative z-40" style={{ "--ds-spacing": "4px", "--ds-font-scale": "1" } as React.CSSProperties}>
          <div className="flex h-16 items-center gap-3 sm:gap-6 px-6">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Handmade home">
              <HandmadeMark className="size-8" alt="Handmade home" />
            </Link>
            <CommandPalette />
            <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className={navLinkClass}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <Avatar
                size="32"
                color="blue"
                src={people.melvin.src}
                alt={people.melvin.alt}
                objectPosition={people.melvin.objectPosition}
                className="max-sm:hidden"
              >
                {people.melvin.initials}
              </Avatar>
              {!isDocs && (
                <Button variant="neutral" mode="raised" className="xl:hidden" aria-label="Customize" onClick={() => setPanelOpen((o) => !o)}>
                  <SlidersHorizontalIcon /> <span className="max-sm:hidden">Customize</span>
                </Button>
              )}
              <Button variant="neutral" mode="ghost" iconOnly asChild>
                <a href={author.xUrl} target="_blank" rel="noreferrer" aria-label={`${author.name} on X`} title={`${author.handle} on X`}>
                  <XBrandIcon />
                </a>
              </Button>
              <PromptDialog>
                <Button className="max-sm:hidden"><CopyIcon /> Copy prompt</Button>
              </PromptDialog>
              <MobileNav />
            </div>
          </div>
        </header>

        <div className="flex">
          {!isDocs && (
            <aside
              className={cn(
                CHROME_CLASS,
                "fixed top-16 left-4 z-30 max-h-[calc(100vh-5rem)] w-[300px] shrink-0 scroll-pt-16 scroll-pb-4 overflow-y-auto rounded-2xl bg-surface shadow-sm transition-transform duration-300",
                "xl:sticky xl:top-4 xl:max-h-[calc(100vh-2rem)] xl:ml-4 xl:self-start xl:translate-x-0",
                panelOpen ? "translate-x-0 shadow-lg" : "-translate-x-[calc(100%+1rem)]",
              )}
            >
              <Customizer />
            </aside>
          )}
          <main className="min-w-0 flex-1">
            {isDocs ? (
              children
            ) : (
              <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
                {children}
                <Credits />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="space-y-6 pt-12 pb-8">
      <div aria-hidden className="h-1 w-14 rounded-full" style={{ backgroundImage: gradientCss("sunrise") }} />
      <h1 className="max-w-3xl text-heading-2 text-fg">A calm, card-based design language for products, sites and brands.</h1>
      <p className="max-w-2xl text-body-lg text-fg-muted">
        {systemName} is {author.name}&apos;s working system. Tune the color, type and radius on the left; every token, component, widget and pattern on this page updates live, and the prompt, skill and registry you copy carry all of it.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <PromptDialog>
          <Button><CopyIcon /> Copy prompt</Button>
        </PromptDialog>
        <PromptDialog defaultTab="skill">
          <Button variant="neutral" mode="raised"><BookOpenIcon /> Skill</Button>
        </PromptDialog>
        <PromptDialog defaultTab="install">
          <Button variant="neutral" mode="raised"><TerminalIcon /> Install</Button>
        </PromptDialog>
      </div>
      <a href={author.xUrl} target="_blank" rel="noreferrer" className="group block max-w-2xl rounded-2xl outline-none focus-visible:shadow-focus">
        <Card className="flex items-center gap-4 p-5 transition group-hover:shadow-md">
          <Avatar size="48" color="blue" src={people.melvin.src} alt={people.melvin.alt} objectPosition={people.melvin.objectPosition}>{people.melvin.initials}</Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="text-ui-md text-fg">Designed by {author.name}</div>
            <p className="text-body-sm text-fg-muted">{author.role}. Follow along on X {author.handle}.</p>
          </div>
          <ArrowUpRightIcon aria-hidden className="size-5 shrink-0 text-fg-muted transition group-hover:text-fg" />
        </Card>
      </a>
    </section>
  );
}
