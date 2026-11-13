import type { Metadata } from "next";
import { systemName } from "@/design-system/brand";
import { DocsShell } from "@/components/docs/docs-nav";
import { Credits } from "@/components/studio/credits";

export const metadata: Metadata = {
  title: `Docs — ${systemName}`,
  description: `How to use the ${systemName} design system: get started, then browse every component.`,
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DocsShell>{children}</DocsShell>
      <div className="px-6 lg:px-10">
        <Credits />
      </div>
    </>
  );
}
