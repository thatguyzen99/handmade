"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export type QuestionOption = { id: string; label: string; description?: string };
export type QuestionConfig = {
  id: string;
  title: string;
  type: "single" | "multi" | "text";
  options?: QuestionOption[];
};
export type QuestionAnswer = { questionId: string; values: string[] };

function QuestionTool({
  questions,
  questionIndex,
  totalQuestions,
  allowSkip = true,
  submitLabel = "Submit",
  nextLabel = "Next",
  skipLabel = "Skip",
  onSubmitAnswer,
  onSubmitAnswers,
  className,
}: {
  questions: QuestionConfig[];
  questionIndex?: number;
  totalQuestions?: number;
  allowSkip?: boolean;
  submitLabel?: string;
  nextLabel?: string;
  skipLabel?: string;
  onSubmitAnswer?: (answer: QuestionAnswer) => void;
  onSubmitAnswers?: (answers: Record<string, QuestionAnswer>) => void;
  className?: string;
}) {
  const [localIndex, setLocalIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});
  const index = questionIndex != null ? Math.max(0, questionIndex - 1) : localIndex;
  const current = questions[index];
  const total = totalQuestions ?? questions.length;
  const isLast = index >= questions.length - 1;
  const selected = current ? (answers[current.id] ?? []) : [];

  const toggle = (id: string) => {
    if (!current) return;
    setAnswers((prev) => {
      const cur = prev[current.id] ?? [];
      if (current.type === "single") return { ...prev, [current.id]: [id] };
      return { ...prev, [current.id]: cur.includes(id) ? cur.filter((v) => v !== id) : [...cur, id] };
    });
  };

  const commit = (skip = false) => {
    if (!current) return;
    const answer = { questionId: current.id, values: skip ? [] : selected };
    onSubmitAnswer?.(answer);
    const nextAnswers = { ...answers, [current.id]: answer.values };
    if (isLast) {
      const map = Object.fromEntries(questions.map((q) => [q.id, { questionId: q.id, values: nextAnswers[q.id] ?? [] }]));
      onSubmitAnswers?.(map);
    } else if (questionIndex == null) {
      setLocalIndex((i) => i + 1);
    }
  };

  if (!current) return null;

  return (
    <div data-slot="question-tool" className={cn("space-y-4 rounded-2xl bg-surface p-5 shadow-sm", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-ui-md text-fg">{current.title}</h3>
        <p className="text-body-xs text-fg-subtle">{index + 1} / {total}</p>
      </div>
      {current.type === "text" ? (
        <Textarea
          value={selected[0] ?? ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, [current.id]: [e.target.value] }))}
          placeholder="Type your answer…"
          rows={4}
        />
      ) : (
        <ul className="space-y-2" role={current.type === "single" ? "radiogroup" : "group"}>
          {(current.options ?? []).map((opt) => {
            const on = selected.includes(opt.id);
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  role={current.type === "single" ? "radio" : "checkbox"}
                  aria-checked={on}
                  onClick={() => toggle(opt.id)}
                  className={cn(
                    "flex w-full flex-col items-start rounded-xl px-4 py-3 text-left outline-none ring-1 ring-inset transition",
                    on ? "bg-brand-subtle ring-line-strong text-fg" : "bg-surface ring-line text-fg hover:bg-hover",
                    "focus-visible:shadow-focus",
                  )}
                >
                  <span className="text-ui-sm">{opt.label}</span>
                  {opt.description && <span className="text-body-xs text-fg-muted">{opt.description}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <div className="flex items-center justify-end gap-2">
        {allowSkip && (
          <Button type="button" variant="neutral" mode="ghost" size="small" onClick={() => commit(true)}>
            {skipLabel}
          </Button>
        )}
        <Button type="button" size="small" onClick={() => commit(false)} disabled={current.type !== "text" && selected.length === 0}>
          {isLast ? submitLabel : nextLabel}
        </Button>
      </div>
    </div>
  );
}

export { QuestionTool };
