"use client";

import * as React from "react";
import {
  AlignCenterIcon, AlignLeftIcon, AlignRightIcon, ArchiveIcon, BoldIcon, CalendarDaysIcon, CircleCheckIcon, CopyIcon, CreditCardIcon, FileTextIcon, FolderIcon,
  FolderPlusIcon, Grid2X2Icon, HomeIcon, ItalicIcon, ListIcon, LogOutIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, SearchIcon, SettingsIcon,
  Share2Icon, SlidersHorizontalIcon, Trash2Icon, UnderlineIcon, UserIcon, UsersIcon,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge, type Status } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar, type DateRange } from "@/components/ui/calendar";
import { Card, CardDivider } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";
import { Dropzone, FileItem } from "@/components/ui/dropzone";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress, ProgressRing } from "@/components/ui/progress";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Sheet, SheetBody, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableSortButton, useTableSort } from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DocSection, Specimen } from "./section";

/** A fixed reference month so the prerendered page and the browser always agree. */
const NOV = (d: number) => new Date(2026, 10, d);

export function ExtendedComponents() {
  return (
    <DocSection
      id="more-components"
      title="More components"
      description="The extended set: menus, overlays, data display, feedback and form inputs, built with the same tokens, radius, spacing and motion as the core."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MenusSpecimen />
          <CommandSpecimen />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <OverlaysSpecimen />
          <NavigationSpecimen />
        </div>
        <TableSpecimen />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FeedbackSpecimen />
          <SkeletonSpecimen />
        </div>
        <StepperSpecimen />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TogglesSpecimen />
          <OtpSpecimen />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
          <CalendarSpecimen />
          <DatePickerSpecimen />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <UploadSpecimen />
          <EmptySpecimen />
        </div>
      </div>
    </DocSection>
  );
}

/* ---------- menus ---------- */

function MenusSpecimen() {
  const [showGrid, setShowGrid] = React.useState(true);
  const [density, setDensity] = React.useState("comfortable");
  return (
    <Specimen label="Dropdown menu & popover">
      <div className="flex flex-wrap items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="neutral" mode="outline" size="small"><UserIcon /> Account</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Melvin Z. Freeman</DropdownMenuLabel>
            <DropdownMenuItem shortcut="⌘P"><UserIcon /> Profile</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘B"><CreditCardIcon /> Billing</DropdownMenuItem>
            <DropdownMenuItem shortcut="⌘,"><SettingsIcon /> Settings</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger><UsersIcon /> Invite people</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>By email</DropdownMenuItem>
                <DropdownMenuItem>Copy invite link</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger"><LogOutIcon /> Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="neutral" mode="outline" size="small"><SlidersHorizontalIcon /> View</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            <DropdownMenuLabel>Display</DropdownMenuLabel>
            <DropdownMenuCheckboxItem checked={showGrid} onCheckedChange={(v) => setShowGrid(v === true)}>Show grid</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked disabled>Show labels</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Density</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="neutral" mode="ghost" size="small" iconOnly aria-label="More actions"><MoreHorizontalIcon /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><PencilIcon /> Rename</DropdownMenuItem>
            <DropdownMenuItem><CopyIcon /> Duplicate</DropdownMenuItem>
            <DropdownMenuItem><ArchiveIcon /> Archive</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger"><Trash2Icon /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="neutral" mode="outline" size="small"><Share2Icon /> Share</Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80 space-y-4">
            <div className="space-y-1">
              <div className="text-ui-sm text-fg">Share this file</div>
              <p className="text-body-xs text-fg-muted">Anyone with the link can view.</p>
            </div>
            <div className="flex gap-2">
              <Input size="small" readOnly defaultValue="melxels.app/f/brand-kit" aria-label="Share link" />
              <Button size="small" onClick={() => toast.success("Link copied")}>Copy</Button>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pop-edit" className="text-body-sm">Allow editing</Label>
              <Switch id="pop-edit" />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <MenuPreview />
        <div className="space-y-4 rounded-parent-2xl bg-floating p-4 shadow-md">
          <div className="space-y-1">
            <div className="text-ui-sm text-fg">Share this file</div>
            <p className="text-body-xs text-fg-muted">Anyone with the link can view.</p>
          </div>
          <Input size="small" readOnly defaultValue="melxels.app/f/brand-kit" aria-label="Share link preview" />
          <div className="flex items-center justify-between"><span className="text-body-sm text-fg">Allow editing</span><Switch aria-label="Allow editing preview" defaultChecked /></div>
        </div>
      </div>
      <p className="mt-6 text-body-xs text-fg-subtle">Menus open from their trigger with the crisp menu shadow; popovers use the floating layer’s shadow-md. Static previews above, live ones on the buttons.</p>
    </Specimen>
  );
}

/** The open menu drawn in place, so the specimen shows it without a click. Same classes as DropdownMenuContent. */
function MenuPreview() {
  const item = "flex items-center gap-2 rounded-concentric-2 p-2 text-body-sm text-fg-muted [&_svg]:size-4 [&_svg]:text-fg-subtle";
  return (
    <div aria-hidden className="rounded-parent-2xl bg-floating p-2 shadow-menu">
      <div className="px-2 py-1 text-overline-xs text-fg-subtle">Melvin Z. Freeman</div>
      <div className={`${item} bg-hover text-fg`}><UserIcon /> Profile <span className="ml-auto text-ui-xs text-fg-subtle">⌘P</span></div>
      <div className={item}><CreditCardIcon /> Billing <span className="ml-auto text-ui-xs text-fg-subtle">⌘B</span></div>
      <div className={item}><SettingsIcon /> Settings</div>
      <div className="-mx-2 my-2 h-px bg-line" />
      <div className={`${item} text-danger-fg [&_svg]:text-danger`}><LogOutIcon /> Sign out</div>
    </div>
  );
}

/* ---------- command + combobox ---------- */

const frameworks = [
  { value: "next", label: "Next.js", hint: "React" },
  { value: "remix", label: "React Router", hint: "React" },
  { value: "astro", label: "Astro", hint: "Islands" },
  { value: "nuxt", label: "Nuxt", hint: "Vue" },
  { value: "sveltekit", label: "SvelteKit", hint: "Svelte" },
  { value: "framer", label: "Framer", hint: "No-code" },
];

function CommandSpecimen() {
  const [open, setOpen] = React.useState(false);
  const items = (
    <>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => setOpen(false)}><FolderPlusIcon /> New project <CommandShortcut>⌘N</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => setOpen(false)}><CalendarDaysIcon /> Schedule a call</CommandItem>
          <CommandItem onSelect={() => setOpen(false)}><FileTextIcon /> Open brand guidelines</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem onSelect={() => setOpen(false)}><UserIcon /> Profile <CommandShortcut>⌘P</CommandShortcut></CommandItem>
          <CommandItem onSelect={() => setOpen(false)}><SettingsIcon /> Preferences <CommandShortcut>⌘,</CommandShortcut></CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  );
  return (
    <Specimen label="Command menu & combobox">
      <div className="space-y-5">
        <Command className="shadow-sm ring-1 ring-inset ring-line">{items}</Command>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-48 flex-1 space-y-2">
            <Label>Framework</Label>
            <Combobox options={frameworks} defaultValue="next" aria-label="Framework" searchPlaceholder="Search frameworks…" />
          </div>
          <Button variant="neutral" mode="outline" onClick={() => setOpen(true)}>
            <SearchIcon /> Open demo
          </Button>
        </div>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>{items}</CommandDialog>
    </Specimen>
  );
}

/* ---------- toast, sheet, drawer ---------- */

function OverlaysSpecimen() {
  return (
    <Specimen label="Toast, sheet & drawer">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="text-ui-xs text-fg-subtle">Toast</div>
          <div className="flex flex-wrap gap-3">
            <Button variant="neutral" mode="outline" size="small" onClick={() => toast("Draft saved", { description: "Your changes are stored on this device." })}>Default</Button>
            <Button variant="neutral" mode="outline" size="small" onClick={() => toast.success("Invoice sent", { description: "Wayfold will get it in a minute." })}>Success</Button>
            <Button variant="neutral" mode="outline" size="small" onClick={() => toast.error("Upload failed", { description: "The file is larger than 10MB." })}>Error</Button>
            <Button
              variant="neutral"
              mode="outline"
              size="small"
              onClick={() => toast("Project archived", { action: { label: "Undo", onClick: () => toast.success("Restored") } })}
            >
              With action
            </Button>
          </div>
        </div>
        <div aria-hidden className="flex items-start gap-3 rounded-2xl bg-floating p-4 shadow-md">
          <CircleCheckIcon className="size-5 shrink-0 text-success" />
          <div className="min-w-0 flex-1 space-y-1">
            <div className="text-ui-sm text-fg">Invoice sent</div>
            <div className="text-body-xs text-fg-muted">Wayfold will get it in a minute.</div>
          </div>
          <span className="inline-flex h-7 items-center rounded-button-sm bg-primary px-2 text-ui-sm text-primary-foreground shadow-primary">Undo</span>
        </div>
        <CardDivider />
        <div className="space-y-3">
          <div className="text-ui-xs text-fg-subtle">Sheet & drawer</div>
          <div className="flex flex-wrap gap-3">
            <Sheet>
              <SheetTrigger asChild><Button variant="neutral" mode="outline" size="small">Open sheet</Button></SheetTrigger>
              <SheetContent side="right">
                <SheetHeader title="Edit profile" description="Changes show on your public page." />
                <SheetBody className="space-y-5">
                  <div className="space-y-2"><Label htmlFor="sh-name">Name</Label><Input id="sh-name" defaultValue="Melvin Z. Freeman" /></div>
                  <div className="space-y-2"><Label htmlFor="sh-role">Role</Label><Input id="sh-role" defaultValue="Product, Web & Brand Designer" /></div>
                  <div className="space-y-2"><Label htmlFor="sh-x">X handle</Label><Input id="sh-x" defaultValue="@yourdesignerzen" /></div>
                  <div className="flex items-center justify-between"><Label htmlFor="sh-avail" className="text-body-sm">Open to projects</Label><Switch id="sh-avail" defaultChecked /></div>
                </SheetBody>
                <SheetFooter>
                  <SheetClose asChild><Button variant="neutral" mode="outline" size="small">Cancel</Button></SheetClose>
                  <SheetClose asChild><Button size="small" onClick={() => toast.success("Profile saved")}>Save</Button></SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
            <Sheet>
              <SheetTrigger asChild><Button variant="neutral" mode="outline" size="small">Open drawer</Button></SheetTrigger>
              <SheetContent side="bottom" className="mx-auto max-w-md">
                <SheetHeader title="Move to folder" description="Pick where this file should live." />
                <SheetBody className="space-y-1 p-2">
                  {["Brand kits", "Client work", "Portfolio", "Archive"].map((f) => (
                    <SheetClose key={f} asChild>
                      <button type="button" className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-body-sm text-fg-muted outline-none transition hover:bg-hover hover:text-fg focus-visible:shadow-focus [&_svg]:size-5 [&_svg]:text-fg-subtle">
                        <FolderIcon /> {f}
                      </button>
                    </SheetClose>
                  ))}
                </SheetBody>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- breadcrumb, pagination, kbd ---------- */

function NavigationSpecimen() {
  const [page, setPage] = React.useState(4);
  return (
    <Specimen label="Breadcrumb, pagination & kbd">
      <div className="space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#more-components"><HomeIcon /></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#more-components">Clients</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Wayfold rebrand</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CardDivider />
        <div className="space-y-3">
          <Pagination page={page} count={12} onPageChange={setPage} />
          <p className="text-body-xs text-fg-subtle tabular-nums">Showing {(page - 1) * 10 + 1}–{page * 10} of 120</p>
        </div>
        <CardDivider />
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-body-sm text-fg-muted">
          <span className="flex items-center gap-2">Search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></span>
          <span className="flex items-center gap-2">Save <KbdGroup><Kbd>⌘</Kbd><Kbd>S</Kbd></KbdGroup></span>
          <span className="flex items-center gap-2">Close <Kbd>Esc</Kbd></span>
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- table ---------- */

type Invoice = { id: string; client: string; initials: string; color: "blue" | "purple" | "orange" | "green" | "yellow"; amount: number; due: string; status: Status; label: string };
const invoices: Invoice[] = [
  { id: "INV-1042", client: "Wayfold", initials: "WF", color: "blue", amount: 4800, due: "2026-11-02", status: "success", label: "Paid" },
  { id: "INV-1043", client: "Jeety", initials: "JE", color: "purple", amount: 2350, due: "2026-11-18", status: "caution", label: "Pending" },
  { id: "INV-1044", client: "Greenvolt", initials: "GV", color: "green", amount: 7200, due: "2026-11-21", status: "info", label: "Sent" },
  { id: "INV-1045", client: "Telling", initials: "TE", color: "orange", amount: 1250, due: "2026-10-28", status: "danger", label: "Overdue" },
  { id: "INV-1046", client: "Aster House", initials: "AH", color: "yellow", amount: 3900, due: "2026-12-04", status: "neutral", label: "Draft" },
];
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function TableSpecimen() {
  const { rows, sortProps } = useTableSort<Invoice, "client" | "amount" | "due">(invoices, { key: "due", direction: "asc" });
  const [page, setPage] = React.useState(1);
  const col = (key: "client" | "amount" | "due", label: string, className?: string) => {
    const s = sortProps(key);
    return (
      <TableHead aria-sort={s["aria-sort"]} className={className}>
        <TableSortButton {...s.button}>{label}</TableSortButton>
      </TableHead>
    );
  };
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-3">
        <span className="text-ui-xs text-fg-muted">Table with sort & pagination</span>
        <Input size="xsmall" placeholder="Filter invoices…" leading={<SearchIcon />} wrapperClassName="w-48" aria-label="Filter invoices" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            {col("client", "Client")}
            {col("amount", "Amount", "text-right [&>button]:ml-auto [&>button]:flex")}
            {col("due", "Due")}
            <TableHead>Status</TableHead>
            <TableHead className="w-12"><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-body-xs">{r.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar size="24" color={r.color}>{r.initials}</Avatar>
                  <span className="text-ui-sm text-fg">{r.client}</span>
                </div>
              </TableCell>
              <TableCell className="text-right text-fg">{usd.format(r.amount)}</TableCell>
              <TableCell>{shortDate.format(new Date(`${r.due}T12:00:00`))}</TableCell>
              <TableCell><StatusBadge status={r.status}>{r.label}</StatusBadge></TableCell>
              <TableCell className="px-3">
                <Button variant="neutral" mode="ghost" size="xxsmall" iconOnly aria-label={`More for ${r.id}`}><MoreHorizontalIcon /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3">
        <span className="text-body-xs text-fg-subtle tabular-nums">5 of 48 invoices</span>
        <Pagination page={page} count={10} onPageChange={setPage} />
      </div>
    </Card>
  );
}

/* ---------- progress, skeleton ---------- */

function FeedbackSpecimen() {
  const [value, setValue] = React.useState([64]);
  return (
    <Specimen label="Progress">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="flex justify-between text-ui-xs"><span className="text-fg-muted">Uploading assets</span><span className="text-fg tabular-nums">{value[0]}%</span></div>
          <Progress value={value[0]} label="Uploading assets" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-ui-xs"><span className="text-fg-muted">Storage</span><span className="text-fg tabular-nums">92%</span></div>
          <Progress value={92} status="warning" size="small" label="Storage" />
        </div>
        <Slider value={value} onValueChange={setValue} max={100} step={1} aria-label="Progress value" />
        <div className="flex items-center gap-6">
          <ProgressRing value={value[0]} label="Project progress" />
          <ProgressRing value={100} status="success" label="Done" />
          <ProgressRing value={28} status="danger" size={40} label="Budget left" />
        </div>
      </div>
    </Specimen>
  );
}

function SkeletonSpecimen() {
  return (
    <Specimen label="Skeleton">
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- stepper ---------- */

const steps = [
  { title: "Brief", description: "Goals and audience" },
  { title: "Moodboard", description: "Direction and references" },
  { title: "Design", description: "Screens and system" },
  { title: "Handoff", description: "Files and docs" },
];

function StepperSpecimen() {
  const [current, setCurrent] = React.useState(2);
  return (
    <Specimen label="Stepper">
      <div className="flex flex-col gap-8">
        <div className="-m-2 overflow-x-auto p-2">
          <Stepper steps={steps} current={current} onStepClick={setCurrent} className="min-w-[560px]" />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <Stepper steps={steps.slice(0, 3)} current={1} orientation="vertical" />
          <div className="flex gap-3">
            <Button variant="neutral" mode="outline" size="small" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>Back</Button>
            <Button size="small" disabled={current === steps.length} onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))}>{current >= steps.length - 1 ? "Finish" : "Continue"}</Button>
          </div>
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- segmented control, toggle group ---------- */

function TogglesSpecimen() {
  const [view, setView] = React.useState("grid");
  return (
    <Specimen label="Segmented control & toggle group">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="text-ui-xs text-fg-subtle">Segmented control</div>
          <SegmentedControl value={view} onValueChange={setView} aria-label="View" className="w-full max-w-xs">
            <SegmentedControlItem value="grid" aria-label="Grid"><Grid2X2Icon /> Grid</SegmentedControlItem>
            <SegmentedControlItem value="list" aria-label="List"><ListIcon /> List</SegmentedControlItem>
          </SegmentedControl>
          <SegmentedControl defaultValue="month" size="small" aria-label="Range">
            {["Day", "Week", "Month", "Year"].map((r) => <SegmentedControlItem key={r} value={r.toLowerCase()}>{r}</SegmentedControlItem>)}
          </SegmentedControl>
        </div>
        <CardDivider />
        <div className="space-y-3">
          <div className="text-ui-xs text-fg-subtle">Toggle group</div>
          <div className="flex flex-wrap items-center gap-4">
            <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Text formatting">
              <ToggleGroupItem value="bold" aria-label="Bold"><BoldIcon /></ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="Italic"><ItalicIcon /></ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="Underline"><UnderlineIcon /></ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="left" variant="outline" aria-label="Alignment">
              <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="Align center"><AlignCenterIcon /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="Align right"><AlignRightIcon /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- OTP ---------- */

function OtpSpecimen() {
  const [code, setCode] = React.useState("4821");
  return (
    <Specimen label="OTP input">
      <div className="space-y-5">
        <div className="space-y-2">
          <Label>Verification code</Label>
          <InputOTP maxLength={6} value={code} onChange={setCode} onComplete={() => toast.success("Code verified")}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-body-xs text-fg-muted">Sent to m•••@melxels.com. <button type="button" className="text-brand underline-offset-4 hover:underline">Resend</button></p>
        </div>
        <div className="space-y-2">
          <Label>PIN <span className="text-fg-muted">(error)</span></Label>
          <InputOTP maxLength={4} defaultValue="19">
            <InputOTPGroup>
              {[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} hasError />)}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-body-xs text-danger-fg">That PIN didn’t match. 2 tries left.</p>
        </div>
      </div>
    </Specimen>
  );
}

/* ---------- calendar, date picker ---------- */

function CalendarSpecimen() {
  const [range, setRange] = React.useState<DateRange>({ from: NOV(16), to: NOV(20) });
  return (
    <Specimen label="Calendar">
      <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={NOV(1)} marked={[NOV(5), NOV(26)]} />
    </Specimen>
  );
}

function DatePickerSpecimen() {
  const [date, setDate] = React.useState<Date | undefined>(NOV(24));
  const [range, setRange] = React.useState<DateRange | undefined>({ from: NOV(9), to: NOV(13) });
  return (
    <Specimen label="Date picker">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Due date</Label>
          <DatePicker value={date} onChange={setDate} />
        </div>
        <div className="space-y-2">
          <Label>Trip dates</Label>
          <DateRangePicker value={range} onChange={setRange} />
        </div>
        <div className="space-y-2">
          <Label>Start date <span className="text-fg-muted">(weekdays only)</span></Label>
          <DatePicker defaultMonth={NOV(1)} disabled={(d) => d.getDay() === 0 || d.getDay() === 6} />
        </div>
      </div>
      <p className="mt-6 text-body-xs text-fg-subtle">The calendar is keyboard-first: arrows move by day and week, PageUp and PageDown by month.</p>
    </Specimen>
  );
}

/* ---------- upload, empty ---------- */

function UploadSpecimen() {
  const [files, setFiles] = React.useState([
    { name: "wayfold-logo.svg", size: "48 KB", progress: 100 },
    { name: "brand-guidelines.pdf", size: "4.2 MB", progress: 62 },
  ] as { name: string; size: string; progress?: number; error?: string }[]);
  const add = (list: File[]) =>
    setFiles((f) => [
      ...f,
      ...list.map((file) => ({
        name: file.name,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        error: file.size > 10 * 1024 * 1024 ? "Larger than 10MB" : undefined,
      })),
    ]);
  return (
    <Specimen label="File upload">
      <div className="space-y-3">
        <Dropzone onFiles={add} />
        {files.map((f, i) => (
          <FileItem key={`${f.name}-${i}`} {...f} onRemove={() => setFiles((all) => all.filter((_, j) => j !== i))} />
        ))}
        <FileItem name="hero-video.mov" size="88 MB" error="Larger than 10MB. Compress it or share a link." />
      </div>
    </Specimen>
  );
}

function EmptySpecimen() {
  return (
    <Specimen label="Empty state" bodyClassName="flex flex-1 flex-col justify-center p-0" className="flex flex-col">
      <EmptyState
        icon={<FolderIcon />}
        title="No projects yet"
        description="Projects keep briefs, files and invoices together. Start one, or import from Figma."
        action={
          <>
            <Button variant="neutral" mode="outline" size="small">Import</Button>
            <Button size="small"><PlusIcon /> New project</Button>
          </>
        }
      />
      <CardDivider />
      <EmptyState icon={<SearchIcon />} title="No results for “brand kit”" description="Try a shorter search or check the spelling." className="py-8" />
    </Specimen>
  );
}
