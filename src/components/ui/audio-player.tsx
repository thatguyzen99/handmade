"use client";

import * as React from "react";
import { PauseIcon, PlayIcon, RotateCcwIcon, RotateCwIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
};

function AudioPlayer({
  src,
  title,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & { src?: string; title?: string }) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(0.8);
  const [muted, setMuted] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);

  const seekBy = (delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.min(duration, Math.max(0, el.currentTime + delta));
  };

  React.useEffect(() => {
    const el = audioRef.current;
    if (el) el.playbackRate = speed;
  }, [speed]);

  React.useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = muted ? 0 : volume;
  }, [volume, muted]);

  return (
    <div data-slot="audio-player" className={cn("flex flex-wrap items-center gap-3 rounded-2xl bg-surface px-3 py-2 shadow-sm", className)} {...props}>
      {src ? <audio ref={audioRef} src={src} title={title} preload="metadata" onTimeUpdate={() => setTime(audioRef.current?.currentTime ?? 0)} onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} /> : null}
      <Button type="button" variant="neutral" mode="ghost" size="small" iconOnly aria-label="Back 10 seconds" onClick={() => seekBy(-10)}><RotateCcwIcon /></Button>
      <Button type="button" size="small" iconOnly aria-label={playing ? "Pause" : "Play"} onClick={() => {
        const el = audioRef.current;
        if (!el) { setPlaying((p) => !p); return; }
        if (el.paused) void el.play();
        else el.pause();
      }}>
        {playing ? <PauseIcon className="fill-current" /> : <PlayIcon className="fill-current" />}
      </Button>
      <Button type="button" variant="neutral" mode="ghost" size="small" iconOnly aria-label="Forward 10 seconds" onClick={() => seekBy(10)}><RotateCwIcon /></Button>
      <div className="flex min-w-40 flex-1 items-center gap-2 tabular-nums">
        <span className="text-body-xs text-fg-subtle">{fmt(time)}</span>
        <Slider value={[time]} max={Math.max(duration, 1)} step={1} aria-label="Seek" onValueChange={([v]) => { setTime(v); if (audioRef.current) audioRef.current.currentTime = v; }} className="flex-1" />
        <span className="text-body-xs text-fg-subtle">{fmt(duration)}</span>
      </div>
      <Button type="button" variant="neutral" mode="ghost" size="small" aria-label={`Speed ${speed}x`} onClick={() => setSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}>
        {speed}×
      </Button>
      <div className="flex w-28 items-center gap-2">
        <Button type="button" variant="neutral" mode="ghost" size="small" iconOnly aria-label={muted ? "Unmute" : "Mute"} onClick={() => setMuted((m) => !m)}>
          {muted || volume === 0 ? <VolumeXIcon /> : <Volume2Icon />}
        </Button>
        <Slider value={[muted ? 0 : volume * 100]} max={100} aria-label="Volume" onValueChange={([v]) => { setMuted(false); setVolume(v / 100); }} className="flex-1" />
      </div>
    </div>
  );
}

export { AudioPlayer };
