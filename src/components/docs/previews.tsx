"use client";

import * as React from "react";
import {
  AlignLeftIcon, AlignCenterIcon, AlignRightIcon, BellIcon, CalendarDaysIcon, FileTextIcon,
  FolderPlusIcon, MailIcon, SearchIcon, SettingsIcon, UserIcon,
} from "lucide-react";
import { people, photos } from "@/lib/media";
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
import { EmptyState, ErrorState } from "@/components/ui/empty-state";
import { ActiveBar } from "@/components/ui/active-bar";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Composer } from "@/components/ui/composer";
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { FilterBuilder, type FilterField, type FilterRow } from "@/components/ui/filter-builder";
import { Highlights, HighlightsGrid } from "@/components/ui/highlights";
import { MultiStepForm, MultiStepFormStep } from "@/components/ui/multi-step-form";
import { Pill, Tag } from "@/components/ui/pill";
import { QuestionTool } from "@/components/ui/question-tool";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionHeader } from "@/components/ui/section-header";
import { Spinner } from "@/components/ui/spinner";
import { Statistic } from "@/components/ui/statistic";
import { VideoPlayer } from "@/components/ui/video-player";
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


function ActiveBarDemo() {
  const [active, setActive] = React.useState(0);
  const items = ["Dashboard", "Analytics", "Settings"];
  return (
    <nav className="relative w-56 rounded-xl bg-surface p-1 shadow-sm" style={{ "--item-height": "40px" } as React.CSSProperties}>
      <ActiveBar top={4 + active * 40} leftOffset={4} rightOffset={4} />
      {items.map((label, i) => (
        <button key={label} type="button" onClick={() => setActive(i)} className="relative z-10 flex h-10 w-full items-center rounded-md px-3 text-left text-ui-sm text-fg outline-none focus-visible:shadow-focus">
          {label}
        </button>
      ))}
    </nav>
  );
}

function FilterBuilderDemo() {
  const fields: FilterField[] = [
    { id: "status", label: "Status", type: "select", operators: [{ id: "is", label: "is" }, { id: "is-not", label: "is not" }], options: [{ id: "open", label: "Open" }, { id: "done", label: "Done" }] },
    { id: "name", label: "Name", type: "text", operators: [{ id: "contains", label: "contains" }, { id: "is", label: "is" }] },
  ];
  const [filters, setFilters] = React.useState<FilterRow[]>([{ id: "1", field: "status", operator: "is", value: "open" }]);
  return <FilterBuilder filters={filters} fields={fields} onChange={setFilters} />;
}

function PillDemo() {
  const [tags, setTags] = React.useState(["Design", "Draft", "Accra"]);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Pill key={t} tone={t === "Draft" ? "outline" : "highlight"} onRemove={() => setTags((xs) => xs.filter((x) => x !== t))}>{t}</Pill>
      ))}
      <Tag tone="success">Published</Tag>
    </div>
  );
}

const previews: Record<string, React.ComponentType> = {
  "active-bar": () => <ActiveBarDemo />,
  "audio-player": () => <AudioPlayer title="Harmattan Light" />,
  collapsible: () => (
    <Collapsible className="max-w-md rounded-xl bg-surface shadow-sm">
      <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">Extra fields for people who want more control.</CollapsibleContent>
    </Collapsible>
  ),
  composer: () => <Composer className="max-w-lg" attachments={<Pill onRemove={() => {}}>brief.pdf</Pill>} disclaimer="Handmade can make mistakes. Check important info." />,
  drawer: () => (
    <Drawer>
      <DrawerTrigger asChild><Button variant="neutral" mode="outline">Open drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader title="Filters" description="Narrow the list without leaving the page." />
        <DrawerBody>
          <p className="text-body-sm text-fg-muted">Drawer is the bottom sheet. Sheet stays for side panels.</p>
        </DrawerBody>
        <DrawerFooter>
          <Button size="small">Apply</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  "filter-builder": () => <FilterBuilderDemo />,
  highlights: () => (
    <HighlightsGrid columns={2} className="max-w-lg">
      <Highlights title="Revenue" bigValue="$24.8k" statistic={<Statistic value={2.1} type="percentage" trend="up" showTrend />} />
      <Highlights title="Visitors" bigValue="1,204" statistic={<Statistic value={3.4} type="percentage" trend="down" showTrend />} />
    </HighlightsGrid>
  ),
  "multi-step-form": () => (
    <MultiStepForm className="max-w-lg" steps={[{ title: "Account" }, { title: "Workspace" }]} onSubmit={() => {}}>
      <MultiStepFormStep>
        <Label htmlFor="ms-email">Email</Label>
        <Input id="ms-email" type="email" defaultValue="melvin@handmade.studio" />
      </MultiStepFormStep>
      <MultiStepFormStep>
        <Label htmlFor="ms-space">Workspace</Label>
        <Input id="ms-space" defaultValue="handmade" />
      </MultiStepFormStep>
    </MultiStepForm>
  ),
  "pill-tag": () => <PillDemo />,
  "question-tool": () => (
    <QuestionTool
      className="max-w-md"
      questions={[
        { id: "brand", title: "Which brand should this agent use?", type: "single", options: [{ id: "acme", label: "Acme", description: "Primary monitored brand" }, { id: "northwind", label: "Northwind" }] },
        { id: "notes", title: "Anything else to add?", type: "text" },
      ]}
    />
  ),
  "scroll-area": () => (
    <ScrollArea className="h-48 max-w-sm rounded-xl bg-surface p-4 shadow-sm" viewportLabel="Items">
      {Array.from({ length: 12 }, (_, i) => <p key={i} className="py-2 text-body-sm text-fg">Item {i + 1}: scrollable content</p>)}
    </ScrollArea>
  ),
  "section-header": () => (
    <SectionHeader title="Dashboard overview" subtitle="Your weekly summary" badge={<Badge>Beta</Badge>}>
      <Button size="small" variant="neutral" mode="outline">Export</Button>
    </SectionHeader>
  ),
  spinner: () => (
    <div className="flex items-center gap-4">
      <Spinner size={16} />
      <Spinner size={20} />
      <Spinner size={32} />
    </div>
  ),
  statistic: () => (
    <div className="flex flex-wrap items-end gap-8">
      <Statistic value={24.8} prefix="$" suffix="k" decimals={1} trend="up" showTrend />
      <Statistic value={3.4} type="percentage" trend="down" showTrend />
      <Statistic value={null} emptyText="No data" />
    </div>
  ),
  "video-player": () => <VideoPlayer poster={photos.album} title="Studio sessions" description="A short cut from the session." className="max-w-lg" />,

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
  "empty-state": () => (
    <div className="grid gap-6 sm:grid-cols-2">
      <EmptyState title="No invoices yet" description="Invoices appear here once you bill a customer." action={<Button size="small">New invoice</Button>} />
      <ErrorState description="Something went wrong loading these chats." action={<Button size="small" variant="neutral" mode="outline">Try again</Button>} />
    </div>
  ),
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
