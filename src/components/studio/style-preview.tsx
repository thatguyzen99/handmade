"use client";

import * as React from "react";
import { visualStyleMeta, type VisualStyle } from "@/design-system/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function StyleKit({ style, idPrefix }: { style: VisualStyle; idPrefix: string }) {
  const emailId = `${idPrefix}-email`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{visualStyleMeta[style].label}</CardTitle>
        <CardDescription>{visualStyleMeta[style].hint}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={emailId}>Email</Label>
          <Input id={emailId} type="email" placeholder="you@handmade.studio" autoComplete="off" />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="neutral" mode="outline">Cancel</Button>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  );
}

export function StylePreview({
  style,
  className,
  children,
}: {
  style: VisualStyle;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div data-style={style} data-slot="style-preview" className={cn("rounded-2xl p-6", className)}>
      {children ?? <StyleKit style={style} idPrefix={`preview-${style}`} />}
    </div>
  );
}
