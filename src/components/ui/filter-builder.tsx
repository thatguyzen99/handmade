"use client";

import * as React from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type FilterOperator = { id: string; label: string };
export type FilterField = { id: string; label: string; type?: "text" | "number" | "select"; operators: FilterOperator[]; options?: { id: string; label: string }[] };
export type FilterRow = { id: string; field: string; operator: string; value: string };

function FilterBuilder({
  filters,
  fields,
  onChange,
  onAdd,
  onRemove,
  className,
}: {
  filters: FilterRow[];
  fields: FilterField[];
  onChange: (filters: FilterRow[]) => void;
  onAdd?: () => void;
  onRemove?: (id: string) => void;
  className?: string;
}) {
  const update = (id: string, patch: Partial<FilterRow>) => onChange(filters.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const remove = (id: string) => (onRemove ? onRemove(id) : onChange(filters.filter((f) => f.id !== id)));

  return (
    <div data-slot="filter-builder" className={cn("space-y-2", className)}>
      {filters.map((row) => {
        const field = fields.find((f) => f.id === row.field) ?? fields[0];
        return (
          <div key={row.id} data-slot="filter-row" className="flex flex-wrap items-center gap-2">
            <Select value={row.field} onValueChange={(fieldId) => {
              const next = fields.find((f) => f.id === fieldId);
              update(row.id, { field: fieldId, operator: next?.operators[0]?.id ?? "", value: "" });
            }}>
              <SelectTrigger className="w-36" aria-label="Field"><SelectValue /></SelectTrigger>
              <SelectContent>
                {fields.map((f) => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={row.operator} onValueChange={(operator) => update(row.id, { operator })}>
              <SelectTrigger className="w-36" aria-label="Operator"><SelectValue /></SelectTrigger>
              <SelectContent>
                {(field?.operators ?? []).map((op) => <SelectItem key={op.id} value={op.id}>{op.label}</SelectItem>)}
              </SelectContent>
            </Select>
            {field?.type === "select" ? (
              <Select value={row.value} onValueChange={(value) => update(row.id, { value })}>
                <SelectTrigger className="min-w-36 flex-1" aria-label="Value"><SelectValue placeholder="Choose…" /></SelectTrigger>
                <SelectContent>
                  {(field.options ?? []).map((opt) => <SelectItem key={opt.id} value={opt.id}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            ) : (
              <Input
                className="min-w-36 flex-1"
                type={field?.type === "number" ? "number" : "text"}
                value={row.value}
                onChange={(e) => update(row.id, { value: e.target.value })}
                aria-label="Value"
              />
            )}
            <Button type="button" variant="neutral" mode="ghost" size="small" iconOnly aria-label="Remove filter" onClick={() => remove(row.id)}>
              <XIcon />
            </Button>
          </div>
        );
      })}
      <Button
        type="button"
        variant="neutral"
        mode="outline"
        size="small"
        onClick={() => {
          if (onAdd) return onAdd();
          const field = fields[0];
          onChange([...filters, { id: crypto.randomUUID(), field: field?.id ?? "", operator: field?.operators[0]?.id ?? "", value: "" }]);
        }}
      >
        <PlusIcon /> Add filter
      </Button>
    </div>
  );
}

export { FilterBuilder };
