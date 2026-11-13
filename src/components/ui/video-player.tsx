"use client";

import * as React from "react";
import { PauseIcon, PlayIcon, MaximizeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

function VideoPlayer({
  src,
  poster,
  title,
  description,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  src?: string;
  poster?: string;
  title?: string;
  description?: string;
}) {
  const ref = React.useRef<HTMLVideoElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  return (
    <div ref={rootRef} data-slot="video-player" className={cn("overflow-hidden rounded-2xl bg-inverse text-fg-inverse shadow-sm", className)} {...props}>
      <div className="relative aspect-video bg-black">
        <video
          ref={ref}
          src={src}
          poster={poster}
          title={title}
          className="size-full object-cover"
          onTimeUpdate={() => setTime(ref.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(ref.current?.duration || 0)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          playsInline
        />
        {!playing && (
          <button
            type="button"
            aria-label="Play"
            className="absolute inset-0 flex items-center justify-center bg-black/20 outline-none focus-visible:shadow-focus"
            onClick={() => { const el = ref.current; if (el?.src) void el.play(); else setPlaying(true); }}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
              <PlayIcon className="size-5 fill-current" />
            </span>
          </button>
        )}
      </div>
      {(title || description) && (
        <div className="space-y-1 px-4 py-3 bg-surface text-fg">
          {title && <div className="text-ui-md">{title}</div>}
          {description && <p className="text-body-sm text-fg-muted">{description}</p>}
        </div>
      )}
      <div className="flex items-center gap-3 bg-surface px-3 py-2 text-fg">
        <Button type="button" size="small" iconOnly aria-label={playing ? "Pause" : "Play"} onClick={() => {
          const el = ref.current;
          if (!el?.src) { setPlaying((p) => !p); return; }
          if (el.paused) void el.play();
          else el.pause();
        }}>
          {playing ? <PauseIcon className="fill-current" /> : <PlayIcon className="fill-current" />}
        </Button>
        <span className="text-body-xs tabular-nums text-fg-subtle">{fmt(time)}</span>
        <Slider value={[time]} max={Math.max(duration, 1)} step={1} aria-label="Seek" onValueChange={([v]) => { setTime(v); if (ref.current) ref.current.currentTime = v; }} className="flex-1" />
        <span className="text-body-xs tabular-nums text-fg-subtle">{fmt(duration)}</span>
        <Button type="button" variant="neutral" mode="ghost" size="small" iconOnly aria-label="Fullscreen" onClick={() => {
          const node = rootRef.current;
          if (!node) return;
          if (document.fullscreenElement) void document.exitFullscreen();
          else void node.requestFullscreen();
        }}>
          <MaximizeIcon />
        </Button>
      </div>
    </div>
  );
}

export { VideoPlayer };
