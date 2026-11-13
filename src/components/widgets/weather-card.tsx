import * as React from "react";
import { CloudRainIcon, CloudSunIcon, DropletsIcon, MapPinIcon, SunIcon, WindIcon } from "lucide-react";
import { Card, CardDivider } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { photos } from "@/lib/media";
import { cn } from "@/lib/utils";

const hours = [
  { t: "Now", icon: <SunIcon />, deg: 31 },
  { t: "14:00", icon: <SunIcon />, deg: 32 },
  { t: "15:00", icon: <CloudSunIcon />, deg: 31 },
  { t: "16:00", icon: <CloudSunIcon />, deg: 30 },
  { t: "17:00", icon: <CloudRainIcon />, deg: 28 },
];

/** Weather-style info card: a sky-gradient header with the big reading, then small facts and an hourly strip. */
export function WeatherCard({ className }: { className?: string }) {
  return (
    <Card data-slot="weather-card" className={cn("overflow-hidden tabular-nums", className)}>
      <div className="relative">
        <ImagePlaceholder gradient="high-noon" src={photos.weather} alt="Accra skyline under a clear sky" className="absolute inset-0" />
        {/* A light scrim keeps white text readable on the pale end of the sky. */}
        <div aria-hidden className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-start justify-between gap-4 p-5 text-white">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-ui-sm"><MapPinIcon className="size-4" /> Accra, Ghana</div>
            <div className="text-heading-2">31°</div>
            <div className="text-body-sm">Sunny · Feels like 35°</div>
          </div>
          <SunIcon className="size-12 fill-current" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-5 text-center">
        {[
          { icon: <DropletsIcon />, label: "Humidity", value: "74%" },
          { icon: <WindIcon />, label: "Wind", value: "14 km/h" },
          { icon: <CloudRainIcon />, label: "Rain", value: "40%" },
        ].map((f) => (
          <div key={f.label} className="space-y-1">
            <div className="flex justify-center text-fg-subtle [&_svg]:size-4">{f.icon}</div>
            <div className="text-ui-sm text-fg">{f.value}</div>
            <div className="text-body-xs text-fg-subtle">{f.label}</div>
          </div>
        ))}
      </div>
      <CardDivider />
      <div className="flex justify-between gap-1 p-4">
        {hours.map((h, i) => (
          <div key={h.t} className={cn("flex flex-1 flex-col items-center gap-2 rounded-xl py-2", i === 0 && "bg-subtle")}>
            <span className="text-ui-xs text-fg-subtle">{h.t}</span>
            <span className="text-fg-muted [&_svg]:size-5">{h.icon}</span>
            <span className="text-ui-sm text-fg">{h.deg}°</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
