"use client";

import * as React from "react";
import {
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon, BellIcon, CalendarDaysIcon, FileTextIcon,
  FolderPlusIcon, MailIcon, SearchIcon, SettingsIcon, UserIcon,
} from "lucide-react";
import { people } from "@/lib/media";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { XBrandIcon, GithubIcon, GoogleIcon } from "@/components/ui/brand-icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription, CardDivider, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dropzone } from "@/components/ui/dropzone";
import { EmptyState } from "@/components/ui/empty-state";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { FieldMessage, Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress, ProgressRing } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetBody, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Sparkline } from "@/components/ui/sparkline";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tile, TileGroup } from "@/components/ui/tile-group";
import { toast } from "@/components/ui/toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SubHeading } from "@/components/studio/section";

const NOV = (d: number) => new Date(2026, 10, d);

function CommandDocsDemo() {
  const [open, setOpen] = React.useState(false);
  const items = (
    <>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => setOpen(false)}><FolderPlusIcon /> New project <CommandShortcut>⌘N</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => setOpen(false)}><CalendarDaysIcon /> Schedule a call</CommandItem>
          <CommandItem onSelect={() => setOpen(false)} disabled><FileTextIcon /> Archive (coming soon)</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => setOpen(false)}><UserIcon /> Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => setOpen(false)}><SettingsIcon /> Preferences</CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <SubHeading hint="A modal, opened from a button. The site also opens a richer palette with ⌘K.">Basic</SubHeading>
        <Button variant="neutral" mode="outline" onClick={() => setOpen(true)}>
          <SearchIcon /> Open command bar
          <KbdGroup className="ml-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>{items}</CommandDialog>
      </div>
      <div className="space-y-3">
        <SubHeading hint="No overlay — the menu lives in the page.">Inline</SubHeading>
        <Command>{items}</Command>
      </div>
    </div>
  );
}

const previews: Record<string, React.ComponentType> = {
  accordion: () => (
    <Accordion type="single" defaultValue="one" className="w-full">
      <AccordionItem value="one">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It follows the accordion pattern and keyboard support from Radix.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Can I use it in a form?</AccordionTrigger>
        <AccordionContent>Yes. Pair it with the same field tokens as the rest of the system.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  alert: () => (
    <Alert>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Your changes are saved on this device.</AlertDescription>
    </Alert>
  ),
  avatar: () => (
    <div className="flex items-center gap-3">
      <Avatar size="48" src={people.melvin.src} alt={people.melvin.alt} objectPosition={people.melvin.objectPosition}>
        {people.melvin.initials}
      </Avatar>
      <Avatar size="48">MF</Avatar>
    </div>
  ),
  badge: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge status="highlight" size="small">Most popular</Badge>
      <Badge status="success" size="small">Open</Badge>
    </div>
  ),
  "brand-icons": () => (
    <div className="flex items-center gap-3 text-fg [&_svg]:size-5">
      <XBrandIcon />
      <GithubIcon />
      <GoogleIcon />
    </div>
  ),
  breadcrumb: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="/docs/get-started">Docs</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  button: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Save</Button>
      <Button variant="neutral" mode="outline">Cancel</Button>
      <Button variant="danger" mode="outline">Delete</Button>
    </div>
  ),
  calendar: () => <Calendar mode="single" defaultMonth={NOV(13)} selected={NOV(13)} />,
  card: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Studio</CardTitle>
        <CardDescription>For designers shipping client work.</CardDescription>
      </CardHeader>
      <CardDivider />
      <div className="p-6 text-body-sm text-fg-muted">Unlimited projects, widgets and the registry export.</div>
    </Card>
  ),
  chart: () => <Sparkline points={[4, 8, 6, 12, 9, 14, 11, 16]} className="h-16 w-48" />,
  checkbox: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="docs-terms" defaultChecked />
      <Label htmlFor="docs-terms">Accept terms</Label>
    </div>
  ),
  combobox: () => (
    <div className="max-w-xs">
      <Combobox options={[{ value: "next", label: "Next.js" }, { value: "remix", label: "React Router" }, { value: "astro", label: "Astro" }]} defaultValue="next" aria-label="Framework" />
    </div>
  ),
  command: CommandDocsDemo,
  "date-picker": () => {
    const Demo = () => {
      const [date, setDate] = React.useState<Date | undefined>(NOV(13));
      return <DatePicker value={date} onChange={setDate} defaultMonth={NOV(13)} />;
    };
    return <Demo />;
  },
  dialog: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="neutral" mode="outline">Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader title="Confirm" description="This can’t be undone." />
        <DialogFooter>
          <DialogClose asChild><Button variant="neutral" mode="outline">Cancel</Button></DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  "dropdown-menu": () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="neutral" mode="outline">Open menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  dropzone: () => <Dropzone hint="PNG, JPG or PDF up to 10MB" />,
  "empty-state": () => <EmptyState title="No projects yet" description="Start a project to see it here." action={<Button size="small">New project</Button>} />,
  "image-placeholder": () => <ImagePlaceholder gradient="sunrise" className="aspect-video max-w-md rounded-xl" />,
  input: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="docs-email">Email</Label>
      <Input id="docs-email" placeholder="hello@example.com" leading={<MailIcon />} />
    </div>
  ),
  "input-otp": () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => <InputOTPSlot key={i} index={i} />)}
      </InputOTPGroup>
    </InputOTP>
  ),
  kbd: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
  label: () => (
    <div className="max-w-sm space-y-2">
      <Label htmlFor="docs-label-email">Email</Label>
      <Input id="docs-label-email" />
      <FieldMessage>We’ll only use this for the receipt.</FieldMessage>
    </div>
  ),
  pagination: () => {
    const Demo = () => {
      const [page, setPage] = React.useState(2);
      return <Pagination page={page} count={8} onPageChange={setPage} />;
    };
    return <Demo />;
  },
  popover: () => (
    <Popover>
      <PopoverTrigger asChild><Button variant="neutral" mode="outline">Open popover</Button></PopoverTrigger>
      <PopoverContent>A short note that sits next to the trigger.</PopoverContent>
    </Popover>
  ),
  progress: () => (
    <div className="flex max-w-sm items-center gap-4">
      <Progress value={72} label="Uploading invoice" className="flex-1" />
      <ProgressRing value={72} />
    </div>
  ),
  "radio-group": () => (
    <RadioGroup defaultValue="studio" className="gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="studio" id="docs-r-studio" />
        <Label htmlFor="docs-r-studio">Studio</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="team" id="docs-r-team" />
        <Label htmlFor="docs-r-team">Team</Label>
      </div>
    </RadioGroup>
  ),
  "segmented-control": () => (
    <SegmentedControl defaultValue="monthly">
      <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
      <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
    </SegmentedControl>
  ),
  select: () => (
    <Select defaultValue="studio">
      <SelectTrigger className="w-48"><SelectValue placeholder="Plan" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="studio">Studio</SelectItem>
        <SelectItem value="team">Team</SelectItem>
      </SelectContent>
    </Select>
  ),
  separator: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-body-sm text-fg-muted">Left</span>
      <Separator orientation="vertical" className="h-8" />
      <span className="text-body-sm text-fg-muted">Right</span>
    </div>
  ),
  sheet: () => (
    <Sheet>
      <SheetTrigger asChild><Button variant="neutral" mode="outline">Open sheet</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader title="Settings" />
        <SheetBody>
          <p className="text-body-sm text-fg-muted">A sliding panel for secondary views and forms.</p>
        </SheetBody>
      </SheetContent>
    </Sheet>
  ),
  skeleton: () => (
    <div className="space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  ),
  slider: () => <Slider defaultValue={[50]} max={100} step={1} className="max-w-sm" />,
  sparkline: () => <Sparkline points={[4, 8, 6, 12, 9, 14, 11, 16]} className="h-10 w-32" />,
  stepper: () => <Stepper steps={[{ title: "Details" }, { title: "Preview" }, { title: "Publish" }]} current={1} />,
  switch: () => (
    <div className="flex max-w-sm items-center justify-between gap-3">
      <Label htmlFor="docs-avail">Open to projects</Label>
      <Switch id="docs-avail" defaultChecked />
    </div>
  ),
  table: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Wayfold</TableCell>
          <TableCell className="text-right tabular-nums">$2,400</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jealy</TableCell>
          <TableCell className="text-right tabular-nums">$1,150</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  tabs: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-4 text-body-sm text-fg-muted">Account settings live here.</TabsContent>
      <TabsContent value="billing" className="pt-4 text-body-sm text-fg-muted">Billing settings live here.</TabsContent>
    </Tabs>
  ),
  textarea: () => <Textarea placeholder="A few words about you…" rows={4} className="max-w-md" />,
  "tile-group": () => (
    <TileGroup defaultValue="studio" className="max-w-md grid grid-cols-2 gap-3">
      <Tile value="studio">Studio</Tile>
      <Tile value="team">Team</Tile>
    </TileGroup>
  ),
  toast: () => <Button variant="neutral" mode="outline" onClick={() => toast("Draft saved", { description: "Your changes are stored on this device." })}>Show toast</Button>,
  "toggle-group": () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon /></ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon /></ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon /></ToggleGroupItem>
    </ToggleGroup>
  ),
  tooltip: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="neutral" mode="ghost" iconOnly aria-label="Notifications"><BellIcon /></Button>
      </TooltipTrigger>
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  ),
};

export function ComponentPreview({ slug }: { slug: string }) {
  const Preview = previews[slug];
  if (!Preview) return <p className="text-body-sm text-fg-muted">No preview for this component.</p>;
  return <Preview />;
}
