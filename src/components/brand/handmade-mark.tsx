import { cn } from "@/lib/utils";

/**
 * Default handmade mark (option 1 — ink h on cream).
 * Swap the filename to option-2.svg or option-3.svg to try the other marks.
 */
export const handmadeMarkSrc = "/brand/handmade/icon.svg";

export function HandmadeMark({
  className,
  alt = "Melxels home",
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
