"use client";

import * as React from "react";
import { BellOffIcon, CheckCheckIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDivider } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { TabList, TabTrigger, Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Note = { id: number; who: string; initials: string; color: "blue" | "purple" | "orange" | "green" | "red"; text: React.ReactNode; time: string; unread: boolean; kind: "mention" | "system"; actions?: boolean };

const seed: Note[] = [
  { id: 1, who: "Ama Owusu", initials: "AO", color: "purple", text: <>mentioned you in <b>Wayfold / Home v4</b></>, time: "2m ago", unread: true, kind: "mention" },
  { id: 2, who: "Kojo Mensah", initials: "KM", color: "green", text: <>invited you to <b>Jeety Design</b></>, time: "1h ago", unread: true, kind: "mention", actions: true },
  { id: 3, who: "Billing", initials: "$", color: "orange", text: <>Invoice <b>INV-1045</b> is 16 days overdue</>, time: "3h ago", unread: true, kind: "system" },
  { id: 4, who: "Zen Studio", initials: "Z", color: "blue", text: <>Your registry export is ready</>, time: "Yesterday", unread: false, kind: "system" },
];

/** Notifications list: line tabs (All / Mentions / Unread), rows with avatar, sentence, time and an unread dot, inline accept/decline. */
export function NotificationsList({ className }: { className?: string }) {
  const [notes, setNotes] = React.useState(seed);
  const [tab, setTab] = React.useState("all");
  const unread = notes.filter((n) => n.unread).length;
  const shown = notes.filter((n) => (tab === "unread" ? n.unread : tab === "mentions" ? n.kind === "mention" : true));
  return (
    <Card data-slot="notifications-list" className={className}>
      <div className="flex items-center justify-between gap-2 px-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-ui-md text-fg">Notifications</span>
          {unread > 0 && <Badge status="primary" size="small">{unread}</Badge>}
        </div>
        <Button variant="neutral" mode="ghost" size="xsmall" disabled={!unread} onClick={() => setNotes((all) => all.map((n) => ({ ...n, unread: false })))}>
          <CheckCheckIcon /> Mark all read
        </Button>
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabList className="px-5">
          <TabTrigger value="all">All</TabTrigger>
          <TabTrigger value="mentions">Mentions</TabTrigger>
          <TabTrigger value="unread">Unread</TabTrigger>
        </TabList>
      </Tabs>
      {shown.length === 0 ? (
        <EmptyState icon={<BellOffIcon />} title="You’re all caught up" description="New mentions and updates will show here." className="py-10" />
      ) : (
        <ul className="divide-y divide-line">
          {shown.map((n) => (
            <li key={n.id} className={cn("relative flex gap-3 px-5 py-4 transition-colors hover:bg-hover", n.unread && "bg-primary-subtle/40")}>
              <Avatar size="32" color={n.color}>{n.initials}</Avatar>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-body-sm text-fg-muted [&_b]:font-[inherit] [&_b]:text-fg"><span className="text-ui-sm text-fg">{n.who}</span> {n.text}</p>
                <time className="block text-body-xs text-fg-subtle">{n.time}</time>
                {n.actions && n.unread && (
                  <div className="flex gap-2 pt-2">
                    <Button variant="neutral" mode="outline" size="xsmall" onClick={() => setNotes((all) => all.filter((x) => x.id !== n.id))}>Decline</Button>
                    <Button size="xsmall" onClick={() => setNotes((all) => all.map((x) => (x.id === n.id ? { ...x, unread: false, actions: false } : x)))}>Accept</Button>
                  </div>
                )}
              </div>
              {n.unread && <span aria-label="Unread" className="mt-2 size-2 shrink-0 rounded-full bg-primary" />}
            </li>
          ))}
        </ul>
      )}
      <CardDivider />
      <div className="px-5 py-3 text-center">
        <Button variant="link" size="xsmall">View all notifications</Button>
      </div>
    </Card>
  );
}
