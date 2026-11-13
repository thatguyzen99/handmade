import * as React from "react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";
import { Progress } from "@/components/ui/progress";

function Divider({ className, label, ...props }: React.ComponentProps<"div"> & { label?: React.ReactNode }) {
  if (!label) return <div role="separator" className={cn("h-px w-full bg-line", className)} {...props} />;
  return (
    <div role="separator" className={cn("flex items-center gap-3 text-overline-2xs text-fg-subtle", className)} {...props}>
      <span className="h-px flex-1 bg-line" />
      {label}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export { Divider, Kbd, Progress };
