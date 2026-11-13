"use client";

import * as React from "react";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

/**
 * File upload. The drop area is a dashed ring-line-strong well (bg-subtle) that turns primary while a file
 * is dragged over it; the hidden input keeps it keyboard and screen-reader friendly.
 */
function Dropzone({ onFiles, accept, multiple = true, hint = "PNG, JPG or PDF up to 10MB", className, disabled }: {
  onFiles?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  hint?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [over, setOver] = React.useState(false);
  const id = React.useId();
  const take = (list: FileList | null) => list && onFiles?.(Array.from(list));

  return (
    <div
      data-slot="dropzone"
      data-dragging={over || undefined}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (!disabled) take(e.dataTransfer.files);
      }}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-line-strong bg-subtle px-6 py-8 text-center transition-colors duration-150",
        "hover:border-fg-subtle has-focus-visible:shadow-focus-primary data-dragging:border-primary data-dragging:bg-primary-subtle",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-full bg-surface text-fg-muted shadow-sm group-data-dragging:text-primary [&_svg]:size-5">
        <UploadCloudIcon />
      </div>
      <div className="space-y-1">
        <div className="text-ui-sm text-fg">
          <label htmlFor={id} className="cursor-pointer text-brand underline-offset-4 hover:underline">Click to upload</label> or drag and drop
        </div>
        {hint && <p className="text-body-xs text-fg-subtle">{hint}</p>}
      </div>
      <input id={id} ref={inputRef} type="file" accept={accept} multiple={multiple} disabled={disabled} className="sr-only" onChange={(e) => take(e.target.files)} />
    </div>
  );
}

/** One file in an upload list: icon, name, size, progress, remove. */
function FileItem({ name, size, progress, error, onRemove, className }: { name: string; size: string; progress?: number; error?: string; onRemove?: () => void; className?: string }) {
  const done = progress === undefined || progress >= 100;
  return (
    <div data-slot="file-item" className={cn("flex items-start gap-3 rounded-xl bg-surface p-3 shadow-xs ring-1 ring-inset ring-line", error && "ring-danger-line", className)}>
      <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-md bg-subtle text-fg-muted [&_svg]:size-4", error && "bg-danger-subtle text-danger")}>
        <FileIcon />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-ui-sm text-fg">{name}</span>
          <span className="shrink-0 text-body-xs text-fg-subtle tabular-nums">{error ? "Failed" : done ? size : `${Math.round(progress!)}%`}</span>
        </div>
        {error ? <p className="text-body-xs text-danger-fg">{error}</p> : !done && <Progress value={progress!} size="small" label={`Uploading ${name}`} />}
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} aria-label={`Remove ${name}`} className="flex size-6 shrink-0 items-center justify-center rounded-md text-fg-subtle outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus [&_svg]:size-4">
          <XIcon />
        </button>
      )}
    </div>
  );
}

export { Dropzone, FileItem };
