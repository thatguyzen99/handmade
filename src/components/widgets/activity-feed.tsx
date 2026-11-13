import * as React from "react";
import { CheckIcon, FileUpIcon, MessageSquareIcon, PenToolIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDivider, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Activity = { who: string; initials: string; color: "blue" | "purple" | "orange" | "green"; action: React.ReactNode; time: string; icon: React.ReactNode; note?: string };

const items: Activity[] = [
  { who: "Ama Owusu", initials: "AO", color: "purple", action: <>commented on <b className="text-fg">Wayfold homepage</b></>, time: "12m", icon: <MessageSquareIcon />, note: "Love the new hero. Can we try the serif on the stats too?" },
  { who: "You", initials: "MF", color: "blue", action: <>uploaded <b className="text-fg">logo-system-v3.fig</b></>, time: "1h", icon: <FileUpIcon /> },
  { who: "Kojo Mensah", initials: "KM", color: "green", action: <>approved <b className="text-fg">Jeety onboarding</b></>, time: "3h", icon: <CheckIcon /> },
  { who: "Lena Park", initials: "LP", color: "orange", action: <>started <b className="text-fg">Greenvolt icons</b></>, time: "Yesterday", icon: <PenToolIcon /> },
];

/** Activity feed: a hairline timeline of avatar + sentence + time, with an optional quoted note. */
export function ActivityFeed({ className }: { className?: string }) {
  return (
    <Card data-slot="activity-feed" className={className}>
      <CardHeader title="Activity" description="What changed across your projects." action={<Button variant="neutral" mode="ghost" size="xsmall">View all</Button>} />
      <CardDivider />
      <ol className="p-5">
        {items.map((a, i) => (
          <li key={i} className="relative flex gap-3 pb-5 last:pb-0">
            {i < items.length - 1 && <span aria-hidden className="absolute top-10 bottom-2 left-4 w-px bg-line" />}
            <div className="relative">
              <Avatar size="32" color={a.color}>{a.initials}</Avatar>
              <span className="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full bg-surface text-fg-muted shadow-xs ring-1 ring-line [&_svg]:size-3">{a.icon}</span>
            </div>
            <div className="min-w-0 flex-1 space-y-2 pt-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-body-sm text-fg-muted [&_b]:font-[inherit]"><span className="text-ui-sm text-fg">{a.who}</span> {a.action}</p>
                <time className="shrink-0 text-body-xs text-fg-subtle">{a.time}</time>
              </div>
              {a.note && <p className={cn("rounded-lg bg-subtle px-3 py-2 text-body-sm text-fg-muted ring-1 ring-inset ring-line")}>{a.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}
