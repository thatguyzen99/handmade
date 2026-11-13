import { cn } from "@/lib/utils";

/**
 * Default handmade mark (option 1 — ink h on cream).
 * Official mark confirmed as option 1. Earlier options live in /brand/handmade/alternates/.
 */
export const handmadeMarkSrc = "/brand/handmade/icon.svg";

export function HandmadeMark({
  className,
  alt = "Handmade home",
  size = 32,
}: {
  className?: string;
  alt?: string;
  size?: number;
}) {
  return (
    // The mark is a local SVG; a plain img keeps it sharp at any DPR and easy to swap.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={handmadeMarkSrc} alt={alt} width={size} height={size} className={cn("object-contain", className)} />
  );
}
