"use client";

import * as React from "react";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDivider } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Todo = { id: number; text: string; done: boolean; tag?: string };

/** To-do / checklist: progress header, checkable rows (done rows strike through and mute), add-item field. */
export function ChecklistWidget({ className }: { className?: string }) {
  const [todos, setTodos] = React.useState<Todo[]>([
    { id: 1, text: "Answer the portfolio story questions", done: true, tag: "Portfolio" },
    { id: 2, text: "Export Wayfold brand sheets", done: true, tag: "Wayfold" },
    { id: 3, text: "Write the Jeety case study intro", done: false, tag: "Portfolio" },
    { id: 4, text: "Send three outreach pitches", done: false },
    { id: 5, text: "Review Telling print proofs", done: false, tag: "Telling" },
  ]);
  const [draft, setDraft] = React.useState("");
  const done = todos.filter((t) => t.done).length;
  const add = () => {
    const text = draft.trim();
    if (!text) return;
    setTodos((t) => [...t, { id: Date.now(), text, done: false }]);
    setDraft("");
  };
  return (
    <Card data-slot="checklist-widget" className={className}>
      <div className="space-y-3 p-5">
        <div className="flex items-baseline justify-between">
          <div className="text-ui-md text-fg">Today</div>
          <span className="text-body-xs text-fg-muted tabular-nums">{done} of {todos.length} done</span>
        </div>
        <Progress value={(done / Math.max(1, todos.length)) * 100} size="small" status={done === todos.length ? "success" : "primary"} label="Checklist progress" />
      </div>
      <CardDivider />
      <ul className="space-y-1 p-2">
        {todos.map((t) => (
          <li key={t.id} className="group flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-hover">
            <Checkbox id={`todo-${t.id}`} checked={t.done} onCheckedChange={(v) => setTodos((all) => all.map((x) => (x.id === t.id ? { ...x, done: v === true } : x)))} />
            <label htmlFor={`todo-${t.id}`} className={cn("min-w-0 flex-1 cursor-pointer text-body-sm transition-colors", t.done ? "text-fg-subtle line-through decoration-line-strong" : "text-fg")}>{t.text}</label>
            {t.tag && <Badge size="small" className="max-sm:hidden">{t.tag}</Badge>}
            <button type="button" aria-label={`Delete ${t.text}`} onClick={() => setTodos((all) => all.filter((x) => x.id !== t.id))} className="flex size-6 items-center justify-center rounded-md text-fg-subtle opacity-0 outline-none transition group-hover:opacity-100 hover:bg-hover hover:text-fg focus-visible:opacity-100 focus-visible:shadow-focus max-md:opacity-100 [&_svg]:size-4">
              <Trash2Icon />
            </button>
          </li>
        ))}
      </ul>
      <CardDivider />
      <form className="p-4" onSubmit={(e) => { e.preventDefault(); add(); }}>
        <Input size="small" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Add a task and press Enter" leading={<PlusIcon />} aria-label="New task" />
      </form>
    </Card>
  );
}
