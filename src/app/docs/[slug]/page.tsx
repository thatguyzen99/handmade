import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { systemName } from "@/design-system/brand";
import { componentSlugs, getComponentDoc } from "@/components/docs/catalog";
import { ComponentDocView } from "@/components/docs/doc-page";

export function generateStaticParams() {
  return componentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — ${systemName} docs`,
    description: doc.description,
  };
}

export default async function ComponentDocsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getComponentDoc(slug);
  if (!doc) notFound();
  return <ComponentDocView doc={doc} />;
}
