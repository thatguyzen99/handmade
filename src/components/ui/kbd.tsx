import * as React from "react";
import { cn } from "@/lib/utils";

/** A key cap: h-5 rounded-xs, a hairline ring and muted text. Group keys of one shortcut with KbdGroup. */
function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn("inline-flex h-5 min-w-5 items-center justify-center rounded-xs bg-surface px-1 font-sans text-ui-xs text-fg-subtle ring-1 ring-inset ring-line", className)}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"span">) {
  return <span data-slot="kbd-group" className={cn("inline-flex items-center gap-1", className)} {...props} />;
}

export { Kbd, KbdGroup };
