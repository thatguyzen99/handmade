"use client";

import * as React from "react";
import { HeartIcon, ListMusicIcon, PauseIcon, PlayIcon, RepeatIcon, ShuffleIcon, SkipBackIcon, SkipForwardIcon, Volume2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { photos } from "@/lib/media";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Music player: gradient cover art, title + artist, a scrubber with tabular times, filled media controls. */
export function MusicPlayer({ className }: { className?: string }) {
  const length = 214;
  const [playing, setPlaying] = React.useState(false);
  const [pos, setPos] = React.useState([78]);
  const [liked, setLiked] = React.useState(true);

  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos(([p]) => [p >= length ? 0 : p + 1]), 1000);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <Card data-slot="music-player" className={cn("space-y-5 p-5 tabular-nums", className)}>
      <div className="flex items-center gap-4">
        <ImagePlaceholder gradient="afterglow" src={photos.album} alt="Album art" className="size-16 shrink-0 rounded-xl shadow-sm" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-ui-md text-fg">Harmattan Light</div>
          <div className="truncate text-body-sm text-fg-muted">Ebo Taylor · Studio sessions</div>
        </div>
        <Button variant="neutral" mode="ghost" size="small" iconOnly aria-pressed={liked} aria-label={liked ? "Unlike" : "Like"} onClick={() => setLiked((l) => !l)}>
          <HeartIcon className={cn(liked && "fill-current text-danger!")} />
        </Button>
      </div>
      <div className="space-y-2">
        <Slider value={pos} onValueChange={setPos} max={length} step={1} aria-label="Seek" />
        <div className="flex justify-between text-body-xs text-fg-subtle">
          <span>{fmt(pos[0])}</span>
          <span>−{fmt(length - pos[0])}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button variant="neutral" mode="ghost" size="small" iconOnly aria-label="Shuffle"><ShuffleIcon /></Button>
        <div className="flex items-center gap-2">
          <Button variant="neutral" mode="ghost" iconOnly aria-label="Previous"><SkipBackIcon className="fill-current" /></Button>
          <Button iconOnly className="size-12 rounded-full max-md:size-12" aria-label={playing ? "Pause" : "Play"} onClick={() => setPlaying((p) => !p)}>
            {playing ? <PauseIcon className="size-5! fill-current" /> : <PlayIcon className="size-5! fill-current" />}
          </Button>
          <Button variant="neutral" mode="ghost" iconOnly aria-label="Next"><SkipForwardIcon className="fill-current" /></Button>
        </div>
        <Button variant="neutral" mode="ghost" size="small" iconOnly aria-label="Repeat"><RepeatIcon /></Button>
      </div>
      <div className="flex items-center gap-3 text-fg-subtle">
        <Volume2Icon className="size-4 shrink-0" />
        <Slider defaultValue={[70]} max={100} aria-label="Volume" className="flex-1" />
        <ListMusicIcon className="size-4 shrink-0" />
      </div>
    </Card>
  );
}
