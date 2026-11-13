import * as React from "react";
import { MapPinIcon, MessageCircleIcon } from "lucide-react";
import { XBrandIcon } from "@/components/ui/brand-icons";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDivider } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { cn } from "@/lib/utils";
import { people, photos } from "@/lib/media";

/** Profile card: gradient cover, an avatar that overlaps it, name + role, availability, three stats, two actions. */
export function ProfileCard({ className }: { className?: string }) {
  return (
    <Card data-slot="profile-card" className={cn("overflow-hidden", className)}>
      <ImagePlaceholder gradient="golden-hour" src={photos.cover} alt="Accra skyline at golden hour" className="h-24" />
      <div className="-mt-10 space-y-4 px-5 pb-5">
        <div className="flex items-end justify-between gap-3">
          <Avatar size="64" color="blue" className="ring-4 ring-surface" src={people.melvin.src} alt={people.melvin.alt} objectPosition={people.melvin.objectPosition}>{people.melvin.initials}</Avatar>
          <Badge status="success" dot>Open to projects</Badge>
        </div>
        <div className="space-y-1">
          <div className="text-heading-6 text-fg">Melvin Z. Freeman</div>
          <div className="text-body-sm text-fg-muted">Product, Web & Brand Designer</div>
          <div className="flex items-center gap-3 pt-1 text-body-xs text-fg-subtle">
            <span className="inline-flex items-center gap-1"><MapPinIcon className="size-4" /> Accra, GH</span>
            <span className="inline-flex items-center gap-1"><XBrandIcon className="size-3" /> @yourdesignerzen</span>
          </div>
        </div>
      </div>
      <CardDivider />
      <dl className="grid grid-cols-3 divide-x divide-line text-center tabular-nums">
        {[
          { k: "Projects", v: "48" },
          { k: "Clients", v: "21" },
          { k: "Years", v: "7" },
        ].map((s) => (
          <div key={s.k} className="space-y-1 py-4">
            <dd className="text-ui-lg text-fg">{s.v}</dd>
            <dt className="text-body-xs text-fg-subtle">{s.k}</dt>
          </div>
        ))}
      </dl>
      <CardDivider />
      <div className="flex gap-3 p-4">
        <Button variant="neutral" mode="outline" size="small" className="flex-1"><MessageCircleIcon /> Message</Button>
        <Button size="small" className="flex-1">Hire Melvin</Button>
      </div>
    </Card>
  );
}
