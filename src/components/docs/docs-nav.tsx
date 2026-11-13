"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetBody, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { componentDocs, getStartedHref, stylesHref } from "./catalog";

const itemClass = cn(
  "block rounded-md px-3 py-2 text-ui-sm text-fg-muted outline-none transition",
  "hover:bg-hover hover:text-fg focus-visible:shadow-focus",
  "data-[active=true]:bg-brand-subtle data-[active=true]:text-fg",
);

export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Docs" data-slot="docs-sidebar-nav" className="space-y-6">
      <div>
        <div className="px-3 pb-2 text-overline-xs text-fg-subtle">Guide</div>
        <Link href={getStartedHref} onClick={onNavigate} className={itemClass} data-active={pathname === getStartedHref || pathname === "/docs"}>
          Get started
        </Link>
        <Link href={stylesHref} onClick={onNavigate} className={itemClass} data-active={pathname === stylesHref}>
          Styles
        </Link>
      </div>
      <div>
        <div className="px-3 pb-2 text-overline-xs text-fg-subtle">Components</div>
        <div className="flex flex-col gap-1">
          {componentDocs.map((c) => {
            const href = `/docs/${c.slug}`;
            return (
              <Link key={c.slug} href={href} onClick={onNavigate} className={itemClass} data-active={pathname === href}>
                {c.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <aside
        data-slot="docs-sidebar"
        className="sticky top-20 hidden max-h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto self-start py-10 pr-6 lg:block"
      >
        <DocsNav />
      </aside>
      <div className="min-w-0 flex-1">
        <div className="border-b border-line px-6 py-3 lg:hidden">
          <Button variant="neutral" mode="outline" size="small" onClick={() => setOpen(true)} aria-label="Open docs menu">
            <MenuIcon /> Components
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-72">
              <SheetHeader title="Docs" />
              <SheetBody>
                <DocsNav onNavigate={() => setOpen(false)} />
              </SheetBody>
            </SheetContent>
          </Sheet>
        </div>
        <div className="px-6 py-10 lg:px-10 lg:py-12">{children}</div>
      </div>
    </div>
  );
}
