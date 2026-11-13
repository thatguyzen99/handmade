"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
import { AvatarGroup, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDivider } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { people } from "@/lib/media";

const week = [9, 10, 11, 12, 13, 14, 15];
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type Event = { time: string; end: string; title: string; where: string; tone: "primary" | "highlight" | "success" | "caution"; people?: string[] };
const events: Record<number, Event[]> = {
  13: [
    { time: "09:30", end: "10:00", title: "Studio stand-up", where: "Google Meet", tone: "primary", people: ["MF", "AO", "KM"] },
    { time: "11:00", end: "12:30", title: "Wayfold design review", where: "Figma", tone: "highlight", people: ["MF", "LP"] },
    { time: "15:00", end: "15:45", title: "Portfolio case study writing", where: "Focus block", tone: "success" },
    { time: "17:30", end: "18:00", title: "Invoice Telling", where: "Admin", tone: "caution" },
  ],
  12: [{ time: "10:00", end: "11:00", title: "Jeety kickoff", where: "Zoom", tone: "primary", people: ["MF", "KM"] }],
  14: [{ time: "08:00", end: "09:00", title: "Long run", where: "Labadi", tone: "success" }],
};
const bars = { primary: "bg-primary", highlight: "bg-highlight", success: "bg-success", caution: "bg-caution" };

/** Agenda widget: a week strip to pick a day, then that day's events as time-stamped rows with a category bar. */
export function AgendaWidget({ className }: { className?: string }) {
  const [day, setDay] = React.useState(13);
  const list = events[day] ?? [];
  return (
    <Card data-slot="agenda-widget" className={cn("tabular-nums", className)}>
      <div className="flex items-center justify-between gap-2 px-5 pt-5">
        <div>
          <div className="text-ui-md text-fg">November 2026</div>
          <div className="text-body-xs text-fg-subtle">Week 46</div>
        </div>
        <div className="flex gap-1">
          <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Previous week"><ChevronLeftIcon /></Button>
          <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Next week"><ChevronRightIcon /></Button>
        </div>
      </div>
      <div role="tablist" aria-label="Day" className="grid grid-cols-7 gap-1 p-4">
        {week.map((d, i) => (
          <button
            key={d}
            role="tab"
            type="button"
            aria-selected={d === day}
            onClick={() => setDay(d)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl py-2 outline-none transition-colors duration-150 focus-visible:shadow-focus-primary",
              d === day ? "bg-primary text-primary-foreground" : "text-fg-muted hover:bg-hover hover:text-fg",
            )}
          >
            <span className={cn("text-ui-xs", d === day ? "text-primary-foreground" : "text-fg-subtle")}>{dayNames[i]}</span>
            <span className="text-ui-md">{d}</span>
            <span aria-hidden className={cn("size-1 rounded-full", events[d] ? (d === day ? "bg-primary-foreground" : "bg-fg-subtle") : "bg-transparent")} />
          </button>
        ))}
      </div>
      <CardDivider />
      <ul className="space-y-1 p-2">
        {list.length === 0 && <li className="px-3 py-6 text-center text-body-sm text-fg-muted">Nothing scheduled. Enjoy the quiet.</li>}
        {list.map((e) => (
          <li key={e.title} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-hover">
            <span aria-hidden className={cn("h-10 w-1 shrink-0 rounded-full", bars[e.tone])} />
            <div className="w-12 shrink-0 text-body-xs text-fg-muted">
              <div className="text-ui-sm text-fg">{e.time}</div>
              {e.end}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-ui-sm text-fg">{e.title}</div>
              <div className="flex items-center gap-1 text-body-xs text-fg-subtle">{e.where.includes("Meet") || e.where === "Zoom" ? <VideoIcon className="size-3" /> : null}{e.where}</div>
            </div>
            {e.people && (
              <AvatarGroup className="max-sm:hidden">
                {e.people.map((p, i) => {
                  const person = Object.values(people).find((x) => x.initials === p);
                  return <Avatar key={p} size="24" color={(["blue", "purple", "green", "orange"] as const)[i % 4]} src={person?.src} alt={person?.alt ?? p} objectPosition={person?.objectPosition}>{p}</Avatar>;
                })}
              </AvatarGroup>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
