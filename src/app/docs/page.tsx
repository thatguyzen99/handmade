import { redirect } from "next/navigation";
import { getStartedHref } from "@/components/docs/catalog";

export default function DocsIndexPage() {
  redirect(getStartedHref);
}
