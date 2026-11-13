"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useMotionSprings } from "@/lib/motion-style";

export type GalleryCard = {
  id: string;
  title: string;
  image: string;
  alt: string;
  avatar?: string;
};

function GalleryItem({
  item,
  container,
  reduce,
  onOpen,
}: {
  item: GalleryCard;
  container: React.RefObject<HTMLDivElement | null>;
  reduce: boolean;
  onOpen: (item: GalleryCard) => void;
}) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { scrollXProgress } = useScroll({
    container,
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollXProgress as MotionValue<number>, [0, 0.5, 1], reduce ? [0, 0, 0] : [48, -28, 48]);
  const rotate = useTransform(scrollXProgress as MotionValue<number>, [0, 0.5, 1], reduce ? [0, 0, 0] : [-8, 0, 8]);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ y, rotate }}
      onClick={() => onOpen(item)}
      className="w-44 shrink-0 snap-center overflow-hidden rounded-2xl bg-surface text-left shadow-sm outline-none focus-visible:shadow-focus"
    >
      <div className="relative">
        <img src={item.image} alt={item.alt} className="h-40 w-full object-cover" />
        {item.avatar && (
          <motion.img
            layoutId={`gallery-avatar-${item.id}`}
            src={item.avatar}
            alt=""
            className="absolute right-2 bottom-2 size-8 rounded-full object-cover ring-2 ring-surface"
          />
        )}
      </div>
      <div className="p-3 text-ui-sm text-fg">{item.title}</div>
    </motion.button>
  );
}

export function CurvedGallery({ items, className }: { items: GalleryCard[]; className?: string }) {
  const springs = useMotionSprings();
  const scroller = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState<GalleryCard | null>(null);

  return (
    <LayoutGroup>
      <div data-slot="curved-gallery" className={cn("space-y-3", className)}>
        <div
          ref={scroller}
          className="flex snap-x gap-4 overflow-x-auto px-6 py-12 [scrollbar-width:thin]"
        >
          {items.map((item) => (
            <GalleryItem key={item.id} item={item} container={scroller} reduce={springs.reduce} onOpen={setOpen} />
          ))}
        </div>

        <AnimatePresence>
          {open && (
            <motion.button
              type="button"
              className="fixed inset-0 z-50 flex items-center justify-center bg-overlay p-6"
              onClick={() => setOpen(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label={`Close ${open.title}`}
            >
              <motion.div
                layout
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md overflow-hidden rounded-3xl bg-floating shadow-lg"
              >
                <div className="relative">
                  <img src={open.image} alt={open.alt} className="h-56 w-full object-cover" />
                  {open.avatar && (
                    <motion.img
                      layoutId={`gallery-avatar-${open.id}`}
                      src={open.avatar}
                      alt=""
                      className="absolute right-4 bottom-4 size-14 rounded-full object-cover ring-2 ring-surface"
                    />
                  )}
                </div>
                <div className="p-5">
                  <div className="text-heading-6 text-fg">{open.title}</div>
                  <p className="mt-1 text-body-sm text-fg-muted">A still from the studio. Click the backdrop to close.</p>
                </div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

const STROKES = [
  { id: "ink", label: "Ink", color: "var(--fg)" },
  { id: "yellow", label: "Yellow", color: "#FFCA05" },
  { id: "orange", label: "Orange", color: "#FAAC18" },
  { id: "sunrise", label: "Sunrise", color: "#FFE7A3" },
] as const;

const SIZES = [2, 4, 8] as const;

function mid(a: { x: number; y: number }, b: { x: number; y: number }) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function DrawPad({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [color, setColor] = React.useState<(typeof STROKES)[number]["id"]>("ink");
  const [size, setSize] = React.useState<(typeof SIZES)[number]>(4);
  const drawing = React.useRef(false);
  const last = React.useRef<{ x: number; y: number } | null>(null);
  const midpt = React.useRef<{ x: number; y: number } | null>(null);

  const resolveColor = () => STROKES.find((stroke) => stroke.id === color)?.color ?? "var(--fg)";

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const box = canvas.getBoundingClientRect();
    const scaleX = canvas.width / box.width;
    const scaleY = canvas.height / box.height;
    return { x: (event.clientX - box.left) * scaleX, y: (event.clientY - box.top) * scaleY };
  };

  const prepare = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  React.useEffect(() => {
    prepare();
    const onResize = () => prepare();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [prepare]);

  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    prepare();
    drawing.current = true;
    const p = point(event);
    last.current = p;
    midpt.current = p;
  };

  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;
    const p = point(event);
    const m = mid(last.current, p);
    ctx.strokeStyle = resolveColor();
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo((midpt.current ?? last.current).x, (midpt.current ?? last.current).y);
    ctx.quadraticCurveTo(last.current.x, last.current.y, m.x, m.y);
    ctx.stroke();
    last.current = p;
    midpt.current = m;
  };

  const end = () => {
    drawing.current = false;
    last.current = null;
    midpt.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    prepare();
  };

  return (
    <div data-slot="draw-pad" className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-full bg-subtle p-1">
          {STROKES.map((stroke) => (
            <button
              key={stroke.id}
              type="button"
              aria-pressed={color === stroke.id}
              aria-label={stroke.label}
              onClick={() => setColor(stroke.id)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full outline-none focus-visible:shadow-focus",
                color === stroke.id && "ring-2 ring-fg",
              )}
            >
              <span className="size-4 rounded-full ring-1 ring-line" style={{ background: stroke.color }} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-full bg-subtle p-1">
          {SIZES.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={size === value}
              aria-label={`${value} pixel brush`}
              onClick={() => setSize(value)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-ui-xs text-fg-muted outline-none focus-visible:shadow-focus",
                size === value && "bg-raised text-fg shadow-sm",
              )}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={clear}
          className="rounded-full px-3 py-1 text-ui-xs text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus"
        >
          Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={start}
        onPointerMove={move}
        onPointerUp={end}
        onPointerLeave={end}
        className="h-64 w-full touch-none rounded-2xl bg-surface shadow-sm"
        aria-label="Draw pad"
      />
    </div>
  );
}
