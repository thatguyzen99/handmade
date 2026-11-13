"use client";

import * as React from "react";
import { BriefcaseIcon, ClockIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { ActivityFeed } from "@/components/widgets/activity-feed";
import { AgendaWidget } from "@/components/widgets/agenda-widget";
import { ChartCard } from "@/components/widgets/chart-card";
import { ChecklistWidget } from "@/components/widgets/checklist-widget";
import { MusicPlayer } from "@/components/widgets/music-player";
import { NotificationsList } from "@/components/widgets/notifications-list";
import { PricingWidget } from "@/components/widgets/pricing-card";
import { ProfileCard } from "@/components/widgets/profile-card";
import { StatCard } from "@/components/widgets/stat-card";
import { WeatherCard } from "@/components/widgets/weather-card";
import { DocSection } from "./section";

export const stats = [
  { label: "Revenue", value: "$48.3k", delta: "+12.4%", up: true, icon: <DollarSignIcon />, points: [12, 14, 13, 17, 16, 19, 22, 21, 25, 27] },
  { label: "Active clients", value: "21", delta: "+3", up: true, icon: <UsersIcon />, points: [14, 15, 15, 16, 18, 17, 19, 20, 20, 21] },
  { label: "Open projects", value: "9", delta: "+2", up: true, icon: <BriefcaseIcon />, points: [5, 6, 6, 7, 6, 8, 7, 8, 9, 9] },
  { label: "Avg. turnaround", value: "4.2d", delta: "+0.6d", up: false, icon: <ClockIcon />, points: [3.1, 3.4, 3.2, 3.6, 3.5, 3.9, 3.8, 4.0, 4.1, 4.2] },
];

export function Widgets() {
  return (
    <DocSection
      id="widgets"
      title="Widgets"
      description="Self-contained cards that drop into dashboards and home screens. Each is one card on the canvas, uses only semantic tokens, and works in both modes and on phones."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
          <ChartCard />
          <NotificationsList />
        </div>
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          <AgendaWidget />
          <WeatherCard />
          <ProfileCard />
          <ChecklistWidget />
          <MusicPlayer />
          <ActivityFeed />
          <PricingWidget />
        </div>
      </div>
    </DocSection>
  );
}
