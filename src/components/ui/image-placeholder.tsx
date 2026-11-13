import * as React from "react";
import { gradientCss, type GradientId } from "@/lib/gradients";
import { cn } from "@/lib/utils";

/**
 * A photo, or a sky gradient where no photo is provided.
 * Registry-friendly: plain <img>, no next/image dependency.
 */
function ImagePlaceholder({
  gradient,
  src,
  alt = "",
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & { gradient: GradientId; src?: string; alt?: string }) {
  const decorative = !src || !alt;
  return (
    <div
      data-slot="image-placeholder"
      aria-hidden={decorative || undefined}
      className={cn("overflow-hidden bg-subtle", className)}
      style={src ? style : { backgroundImage: gradientCss(gradient), ...style }}
      {...props}
    >
      {src ? (
        // Plain img so the registry component stays Next-light.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : children}
    </div>
  );
}

export { ImagePlaceholder };
