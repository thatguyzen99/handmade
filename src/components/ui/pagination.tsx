"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pages to show around the current one, with ellipses: 1 … 4 5 6 … 12. */
function pageRange(page: number, count: number, siblings = 1): (number | "gap")[] {
  const out: (number | "gap")[] = [];
  const start = Math.max(2, page - siblings);
  const end = Math.min(count - 1, page + siblings);
  out.push(1);
  if (start > 2) out.push("gap");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < count - 1) out.push("gap");
  if (count > 1) out.push(count);
  return out;
}

const pageButton = cn(
  "inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-button-sm px-2 text-ui-sm tabular-nums text-fg-muted outline-none",
  "transition-[color,background-color,box-shadow,scale] duration-150 ease-tactile hover:bg-hover hover:text-fg active:scale-[0.97]",
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus",
  "disabled:pointer-events-none disabled:text-fg-disabled [&_svg]:size-4",
);

function Pagination({ page, count, onPageChange, className, siblings = 1 }: { page: number; count: number; onPageChange: (page: number) => void; className?: string; siblings?: number }) {
  return (
    <nav aria-label="Pagination" data-slot="pagination" className={cn("flex items-center gap-1", className)}>
      <button type="button" className={pageButton} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
        <ChevronLeftIcon /> <span className="max-sm:hidden">Previous</span>
      </button>
      {pageRange(page, count, siblings).map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="inline-flex size-8 items-center justify-center text-fg-subtle [&_svg]:size-4"><EllipsisIcon /></span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onPageChange(p)}
            className={cn(pageButton, p === page && "bg-control text-fg shadow-button hover:bg-control-hover")}
          >
            {p}
          </button>
        ),
      )}
      <button type="button" className={pageButton} disabled={page >= count} onClick={() => onPageChange(page + 1)} aria-label="Next page">
        <span className="max-sm:hidden">Next</span> <ChevronRightIcon />
      </button>
    </nav>
  );
}

export { Pagination, pageRange };
