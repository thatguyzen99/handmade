import * as React from "react";
import { cn } from "@/lib/utils";

/** Loading placeholder in bg-track with a gentle pulse (static under reduced motion). Match the shape it stands in for. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="skeleton" aria-hidden className={cn("rounded-md bg-track motion-safe:animate-pulse", className)} {...props} />;
}

export { Skeleton };
