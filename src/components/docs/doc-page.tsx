"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Specimen, SubHeading } from "@/components/studio/section";
import { type DocEntry } from "./catalog";
import { ComponentPreview } from "./previews";

export function ComponentDocView({ doc }: { doc: DocEntry }) {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-3">
        <p className="text-overline-xs text-fg-subtle">Components</p>
        <h1 className="text-heading-3 text-fg">{doc.title}</h1>
        <p className="text-body-lg text-fg-muted">{doc.description}</p>
      </header>

      <section className="space-y-3">
        <SubHeading>Preview</SubHeading>
        <Specimen bodyClassName="p-6">
          <ComponentPreview slug={doc.slug} />
        </Specimen>
      </section>

      <section className="space-y-3">
        <SubHeading>Usage</SubHeading>
        <pre className="overflow-x-auto rounded-xl bg-subtle p-4 font-mono text-[12px] leading-[1.6] whitespace-pre-wrap text-fg-muted ring-1 ring-inset ring-line">
          {doc.usage}
        </pre>
      </section>

      <section className="space-y-6">
        <SubHeading>Props</SubHeading>
        {doc.props.map((group) => (
          <div key={group.component} className="space-y-3">
            <h3 className="text-ui-md text-fg">{group.component}</h3>
            <div className="overflow-hidden rounded-2xl bg-surface shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prop</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.props.map((row) => (
                    <TableRow key={`${group.component}-${row.name}`}>
                      <TableCell className="font-mono text-[12px] text-fg">{row.name}</TableCell>
                      <TableCell className="font-mono text-[12px] text-fg-muted">{row.type}</TableCell>
                      <TableCell className="text-body-sm text-fg-muted">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}
