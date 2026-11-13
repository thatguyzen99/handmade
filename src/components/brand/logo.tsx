import * as React from "react";
import { cn } from "@/lib/utils";
import { HandmadeMark } from "@/components/brand/handmade-mark";

/** Typographic Handmade wordmark in Familjen Grotesk. Ink in light mode, cream in dark. */
export function Wordmark({ className, title = "Handmade" }: { className?: string; title?: string }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn(
        "inline-block font-sans font-semibold tracking-tight text-[#0A0A0A] dark:text-[#F7F4EE]",
        className,
      )}
    >
      Handmade
    </span>
  );
}

/** Official Handmade mark (option 1: ink h on cream). */
export function Mark({
  className,
  title = "Handmade",
  variant = "solid",
}: {
  className?: string;
  title?: string;
  variant?: "auto" | "gradient" | "solid";
}) {
  void variant;
  return <HandmadeMark className={className} alt={title} />;
}
