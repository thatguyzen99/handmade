"use client";

import * as React from "react";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Tables live inside a card, full-bleed, with a bg-table-head header row and hairline row dividers. */
function Table({ className, wrapperClassName, ...props }: React.ComponentProps<"table"> & { wrapperClassName?: string }) {
  return (
    <div data-slot="table-wrapper" className={cn("relative w-full overflow-x-auto", wrapperClassName)}>
      <table data-slot="table" className={cn("w-full caption-bottom text-left tabular-nums", className)} {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("bg-table-head", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("divide-y divide-line", className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("border-t border-line bg-table-head text-ui-sm text-fg", className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("transition-colors hover:bg-hover data-[state=selected]:bg-primary-subtle [thead_&]:hover:bg-transparent", className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn("h-9 px-5 font-[inherit] text-ui-xs whitespace-nowrap text-fg-muted", className)} {...props} />;
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("px-5 py-3 text-body-sm text-fg-muted", className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("py-4 text-body-xs text-fg-subtle", className)} {...props} />;
}

type SortDirection = "asc" | "desc";
type SortState<K extends string> = { key: K; direction: SortDirection } | null;

/** Header button that cycles a column through ascending → descending → unsorted. */
function TableSortButton({ direction, onClick, children, className }: { direction: SortDirection | false; onClick: () => void; children: React.ReactNode; className?: string }) {
  const Icon = direction === "asc" ? ArrowUpIcon : direction === "desc" ? ArrowDownIcon : ChevronsUpDownIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      data-slot="table-sort"
      className={cn(
        "-mx-2 inline-flex h-7 items-center gap-1 rounded-md px-2 text-ui-xs outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus",
        direction ? "text-fg" : "text-fg-muted",
        "[&_svg]:size-4 [&_svg]:text-fg-subtle",
        className,
      )}
    >
      {children}
      <Icon aria-hidden />
    </button>
  );
}

/** Client-side sorting for a small table. `sortProps(key)` wires a TableSortButton and its th aria-sort. */
function useTableSort<T, K extends Extract<keyof T, string>>(rows: T[], initial: SortState<K> = null) {
  const [sort, setSort] = React.useState<SortState<K>>(initial);
  const sorted = React.useMemo(() => {
    if (!sort) return rows;
    const { key, direction } = sort;
    return [...rows].sort((a, b) => {
      const av = a[key], bv = b[key];
      const cmp = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
      return direction === "asc" ? cmp : -cmp;
    });
  }, [rows, sort]);
  const toggle = (key: K) =>
    setSort((s) => (!s || s.key !== key ? { key, direction: "asc" } : s.direction === "asc" ? { key, direction: "desc" } : null));
  const sortProps = (key: K) => {
    const direction = sort?.key === key ? sort.direction : false;
    return {
      button: { direction, onClick: () => toggle(key) } as const,
      "aria-sort": (direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none") as React.AriaAttributes["aria-sort"],
    };
  };
  return { rows: sorted, sort, setSort, sortProps };
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption, TableSortButton, useTableSort, type SortState, type SortDirection };
