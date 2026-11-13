"use client";

import * as React from "react";
import {
  ArchiveIcon, ArrowRightIcon, BellIcon, BriefcaseIcon, ChevronDownIcon, CircleUserRoundIcon, CloudIcon, CreditCardIcon,
  DollarSignIcon, DownloadIcon, FileImageIcon, FileTextIcon, FolderOpenIcon, FolderPlusIcon, Grid2X2Icon, HouseIcon, InboxIcon,
  KeyRoundIcon, LayersIcon, LayoutDashboardIcon, ListIcon, LockIcon, MailIcon, MoreHorizontalIcon, PaletteIcon, PaperclipIcon, PenToolIcon,
  ReplyIcon, SearchIcon, SendIcon, SettingsIcon, ShieldCheckIcon, SparklesIcon, StarIcon, TagIcon, Trash2Icon, UploadIcon, UsersIcon, WandSparklesIcon, ZapIcon,
} from "lucide-react";
import { AppleIcon, GoogleIcon } from "@/components/ui/brand-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDivider, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dropzone } from "@/components/ui/dropzone";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Mark } from "@/components/brand/logo";
import { systemName } from "@/design-system/brand";
import { people, photos } from "@/lib/media";
import { Input, Textarea } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Kbd } from "@/components/ui/kbd";
import { FieldMessage, Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/misc";
import { Progress } from "@/components/ui/progress";
import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stepper } from "@/components/ui/stepper";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SegmentedList, SegmentedTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Tile, TileGroup } from "@/components/ui/tile-group";
import { toast } from "@/components/ui/toast";
import { PricingCard, plans } from "@/components/widgets/pricing-card";
import { StatCard } from "@/components/widgets/stat-card";
import { cn } from "@/lib/utils";
import { stats } from "./widgets";

/** Each page pattern sits in a frame: a recessed piece of canvas with a hairline, so its cards read as one screen. */
function PatternFrame({ id, title, description, children, className }: { id: string; title: string; description: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-heading-6 text-fg">{title}</h3>
        <p className="text-body-sm text-fg-muted">{description}</p>
      </div>
      <div className={cn("rounded-3xl bg-canvas p-3 ring-1 ring-inset ring-line sm:p-6", className)}>{children}</div>
    </section>
  );
}

export function PagePatterns() {
  return (
    <div className="mt-12 space-y-12">
      <header className="max-w-2xl space-y-2">
        <h2 className="text-heading-5 text-fg">Page patterns</h2>
        <p className="text-body-md text-fg-muted">Whole screens composed from the components and widgets above. Copy the structure, swap the content.</p>
      </header>
      <DashboardPattern />
      <MarketingPattern />
      <AuthPattern />
      <OnboardingPattern />
      <SettingsPattern />
      <PricingPattern />
      <CheckoutPattern />
      <InboxPattern />
      <FileManagerPattern />
    </div>
  );
}

/* ---------- 1. Dashboard overview ---------- */

const navItems = [
  { icon: <LayoutDashboardIcon />, label: "Overview", active: true },
  { icon: <BriefcaseIcon />, label: "Projects", count: 9 },
  { icon: <UsersIcon />, label: "Clients" },
  { icon: <FileTextIcon />, label: "Invoices", count: 3 },
  { icon: <InboxIcon />, label: "Inbox", count: 12 },
  { icon: <SettingsIcon />, label: "Settings" },
];

function SideNav({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col gap-1 p-2", className)}>
      <div className="flex items-center gap-2 px-2 py-3">
        <Mark className="size-7" />
        <span className="text-ui-sm text-fg">{systemName}</span>
      </div>
      {navItems.map((n) => (
        <a
          key={n.label}
          href="#pattern-dashboard"
          aria-current={n.active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-ui-sm outline-none transition-colors focus-visible:shadow-focus [&_svg]:size-4",
            n.active ? "bg-selected text-fg [&_svg]:text-fg" : "text-fg-muted hover:bg-hover hover:text-fg [&_svg]:text-fg-subtle",
          )}
        >
          {n.icon}
          <span className="flex-1">{n.label}</span>
          {n.count !== undefined && <span className="text-ui-xs text-fg-subtle tabular-nums">{n.count}</span>}
        </a>
      ))}
      <div className="mt-auto space-y-2 rounded-xl bg-subtle p-3">
        <div className="flex justify-between text-ui-xs"><span className="text-fg-muted">Storage</span><span className="text-fg tabular-nums">7.4 / 10 GB</span></div>
        <Progress value={74} size="small" label="Storage used" />
      </div>
    </Card>
  );
}

const projects = [
  { name: "Wayfold rebrand", client: "Wayfold", progress: 82, status: "success" as const, label: "On track", due: "Nov 21" },
  { name: "Jeety onboarding", client: "Jeety", progress: 46, status: "caution" as const, label: "At risk", due: "Nov 28" },
  { name: "Print-on-demand storefront", client: "Telling", progress: 64, status: "success" as const, label: "On track", due: "Dec 05" },
  { name: "Greenvolt icon set", client: "Greenvolt", progress: 18, status: "neutral" as const, label: "Not started", due: "Dec 12" },
];

function DashboardPattern() {
  return (
    <PatternFrame id="pattern-dashboard" title="Dashboard overview" description="Side nav, page header, KPIs, a project table and a client breakdown.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <SideNav className="max-lg:hidden" />
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-heading-5 text-fg">Good afternoon, Melvin</h4>
              <p className="text-body-sm text-fg-muted">Friday, 13 November · 3 things need you today.</p>
            </div>
            <div className="flex items-center gap-2">
              <Input size="small" placeholder="Search" leading={<SearchIcon />} trailing={<Kbd>⌘K</Kbd>} wrapperClassName="w-56 max-sm:w-full" aria-label="Search" />
              <Button variant="neutral" mode="outline" size="small" iconOnly aria-label="Notifications"><BellIcon /></Button>
              <Button size="small"><FolderPlusIcon /> New project</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.slice(0, 3).map((s) => <StatCard key={s.label} {...s} hint="vs Oct" />)}
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Card className="min-w-0">
              <CardHeader title="Active projects" description="Sorted by due date." action={<Button variant="neutral" mode="ghost" size="xsmall">View all</Button>} />
              <CardDivider />
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Project</TableHead><TableHead>Progress</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Due</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell><div className="text-ui-sm text-fg">{p.name}</div><div className="text-body-xs text-fg-subtle">{p.client}</div></TableCell>
                      <TableCell className="min-w-32"><div className="flex items-center gap-3"><Progress value={p.progress} size="small" className="w-20" label={`${p.name} progress`} /><span className="text-body-xs">{p.progress}%</span></div></TableCell>
                      <TableCell className="whitespace-nowrap"><StatusBadge status={p.status}>{p.label}</StatusBadge></TableCell>
                      <TableCell className="text-right">{p.due}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Card>
              <CardHeader title="Income by client" description="Last 90 days" />
              <CardDivider />
              <CardContent className="grid grid-cols-1 gap-x-8 gap-y-4 tabular-nums sm:grid-cols-2">
                {[
                  { c: "Wayfold", v: 14.2, pct: 100 },
                  { c: "Telling", v: 9.6, pct: 68 },
                  { c: "Jeety", v: 6.1, pct: 43 },
                  { c: "Greenvolt", v: 3.4, pct: 24 },
                ].map((r) => (
                  <div key={r.c} className="space-y-2">
                    <div className="flex justify-between text-ui-sm"><span className="text-fg-muted">{r.c}</span><span className="text-fg">${r.v}k</span></div>
                    <div className="h-2 rounded-full bg-track"><div className="h-full rounded-full bg-primary" style={{ width: `${r.pct}%`, opacity: 0.4 + r.pct / 170 }} /></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PatternFrame>
  );
}

/* ---------- 2. Marketing hero + feature grid ---------- */

const features = [
  { icon: <PaletteIcon />, title: "Tune once", body: "Color, type, radius, density and shadow set every token at the same time." },
  { icon: <LayersIcon />, title: "60+ building blocks", body: "Components, widgets and full pages that share one set of rules." },
  { icon: <WandSparklesIcon />, title: "Hand it to AI", body: "Copy a prompt or install a skill so agents build in your system." },
  { icon: <ZapIcon />, title: "shadcn registry", body: "One command adds tokens and components to any Next.js project." },
  { icon: <ShieldCheckIcon />, title: "Accessible by default", body: "Radix primitives, focus halos and keyboard paths on every control." },
  { icon: <SparklesIcon />, title: "Dark mode that thinks", body: "Higher surfaces get lighter, strokes go translucent, nothing is hard-coded." },
];

function MarketingPattern() {
  return (
    <PatternFrame id="pattern-marketing" title="Marketing hero + feature grid" description="Eyebrow, display headline, two actions, a product preview and six features.">
      <div className="space-y-12 px-2 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Badge variant="soft" status="primary" className="mx-auto">New · Widgets and page patterns</Badge>
          <h4 className="text-heading-1 text-fg max-sm:text-heading-3">Design systems with a quiet kind of confidence.</h4>
          <p className="mx-auto max-w-xl text-body-lg text-fg-muted">{`${systemName} turns a few honest choices into a complete, card-based system you can ship, share and hand to any AI.`}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button>Start designing <ArrowRightIcon /></Button>
            <Button variant="neutral" mode="raised">See the components</Button>
          </div>
          <div className="flex items-center justify-center gap-3 text-body-sm text-fg-muted">
            <AvatarGroup>{[people.ama, people.kojo, people.lena, people.telling].map((p, i) => <Avatar key={p.initials} size="24" color={(["highlight", "green", "orange", "blue"] as const)[i]} src={p.src} alt={p.alt} objectPosition={p.objectPosition}>{p.initials}</Avatar>)}</AvatarGroup>
            Loved by 2,400 designers
          </div>
        </div>
        {/* A browser window, not a card: the stat cards inside sit on their own piece of canvas. */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-canvas shadow-sm ring-1 ring-inset ring-line">
          <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
            {[0, 1, 2].map((i) => <span key={i} className="size-3 rounded-full bg-track" />)}
            <span className="mx-auto rounded-md bg-subtle px-3 py-1 text-body-xs text-fg-subtle">handmade.app/dashboard</span>
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
            {stats.slice(0, 3).map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="space-y-3 p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-subtle text-brand [&_svg]:size-5">{f.icon}</span>
              <div className="text-ui-md text-fg">{f.title}</div>
              <p className="text-body-sm text-fg-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </PatternFrame>
  );
}

/* ---------- 3. Auth / sign-in ---------- */

function AuthPattern() {
  const [method, setMethod] = React.useState("password");
  return (
    <PatternFrame id="pattern-auth" title="Auth / sign-in" description="Split screen: brand panel and a form with password or email-code sign-in.">
      <Card className="grid grid-cols-1 overflow-hidden lg:grid-cols-2">
        <div className="relative min-h-64 max-lg:hidden">
          <ImagePlaceholder gradient="midnight" src={photos.hero} alt="Mosaïk tower in Accra" className="absolute inset-0" />
          <div className="relative flex h-full flex-col justify-between p-8 text-white">
            <div className="flex items-center gap-2 text-ui-md"><Mark variant="solid" className="size-7 text-white" /><span>{systemName}</span></div>
            <figure className="space-y-4">
              <blockquote className="text-heading-5">“It finally feels like my work, not a template. The system makes the calm decisions so I can make the bold ones.”</blockquote>
              <figcaption className="text-body-sm">Ama Owusu · Founder, Wayfold</figcaption>
            </figure>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-6 px-6 py-10">
          <div className="space-y-1">
            <h4 className="text-heading-5 text-fg">Welcome back</h4>
            <p className="text-body-sm text-fg-muted">Sign in to your studio.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="neutral" mode="outline"><GoogleIcon /> Google</Button>
            <Button variant="neutral" mode="outline"><AppleIcon /> Apple</Button>
          </div>
          <Divider label="or" />
          <Tabs value={method} onValueChange={setMethod}>
            <SegmentedList className="mb-5">
              <SegmentedTrigger value="password"><KeyRoundIcon /> Password</SegmentedTrigger>
              <SegmentedTrigger value="code"><MailIcon /> Email code</SegmentedTrigger>
            </SegmentedList>
            <TabsContent value="password" className="space-y-4">
              <div className="space-y-2"><Label htmlFor="au-email">Email</Label><Input id="au-email" type="email" placeholder="you@studio.com" leading={<MailIcon />} /></div>
              <div className="space-y-2">
                <div className="flex items-center justify-between"><Label htmlFor="au-pass">Password</Label><a href="#pattern-auth" className="text-ui-sm text-fg-muted underline decoration-line-strong underline-offset-4 hover:text-fg">Forgot?</a></div>
                <Input id="au-pass" type="password" placeholder="••••••••" leading={<LockIcon />} />
              </div>
              <div className="flex items-center gap-2"><Checkbox id="au-keep" defaultChecked /><Label htmlFor="au-keep" className="text-body-sm">Keep me signed in</Label></div>
              <Button className="w-full" onClick={() => toast.success("Signed in", { description: "Welcome back, Melvin." })}>Sign in</Button>
            </TabsContent>
            <TabsContent value="code" className="space-y-4">
              <p className="text-body-sm text-fg-muted">Enter the 6-digit code sent to <span className="text-fg">melvin@handmade.studio</span>.</p>
              <InputOTP maxLength={6} aria-label="Sign-in code">
                <InputOTPGroup>{[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}</InputOTPGroup>
              </InputOTP>
              <Button className="w-full">Verify and sign in</Button>
            </TabsContent>
          </Tabs>
          <p className="text-center text-body-sm text-fg-muted">New here? <a href="#pattern-onboarding" className="text-brand underline-offset-4 hover:underline">Create an account</a></p>
        </div>
      </Card>
    </PatternFrame>
  );
}

/* ---------- 4. Onboarding flow ---------- */

const onboardingSteps = [
  { title: "Your role" },
  { title: "Your style" },
  { title: "Your workspace" },
];

function OnboardingPattern() {
  const [step, setStep] = React.useState(0);
  return (
    <PatternFrame id="pattern-onboarding" title="Onboarding flow" description="Three short steps with a stepper, tiles to choose from and one clear action.">
      <Card className="mx-auto max-w-2xl">
        <div className="p-6"><Stepper steps={onboardingSteps} current={step} onStepClick={setStep} /></div>
        <CardDivider />
        <div className="space-y-6 p-6">
          {step === 0 && (
            <>
              <div className="space-y-1"><h4 className="text-heading-6 text-fg">What do you mostly design?</h4><p className="text-body-sm text-fg-muted">We’ll start you with the right patterns.</p></div>
              <TileGroup defaultValue="product" aria-label="Role" className="grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { v: "product", icon: <LayoutDashboardIcon />, t: "Product", d: "Apps and dashboards" },
                  { v: "web", icon: <HouseIcon />, t: "Web", d: "Sites and landing pages" },
                  { v: "brand", icon: <PenToolIcon />, t: "Brand", d: "Identity and guidelines" },
                ].map((o) => (
                  <Tile key={o.v} value={o.v} className="items-start gap-2 p-4 text-left [&_svg]:size-5">
                    {o.icon}
                    <span className="text-ui-sm">{o.t}</span>
                    <span className="text-body-xs text-fg-subtle">{o.d}</span>
                  </Tile>
                ))}
              </TileGroup>
            </>
          )}
          {step === 1 && (
            <>
              <div className="space-y-1"><h4 className="text-heading-6 text-fg">Pick a starting style</h4><p className="text-body-sm text-fg-muted">You can fine-tune everything later in the studio.</p></div>
              <TileGroup defaultValue="calm" aria-label="Style" className="grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { v: "calm", g: "first-light" as const, t: "Calm", src: photos.dawn, alt: "Alpine dawn" },
                  { v: "bold", g: "ember" as const, t: "Bold", src: photos.workspace, alt: "Studio workshop" },
                  { v: "fresh", g: "solar" as const, t: "Fresh", src: photos.mosaik, alt: "Mosaïk, Accra" },
                  { v: "night", g: "midnight" as const, t: "Night", src: photos.nightCity, alt: "City at night" },
                ].map((o) => (
                  <Tile key={o.v} value={o.v} className="gap-2 p-2">
                    <ImagePlaceholder gradient={o.g} src={o.src} alt={o.alt} className="h-16 w-full rounded-concentric-2" />
                    <span className="text-ui-sm">{o.t}</span>
                  </Tile>
                ))}
              </TileGroup>
            </>
          )}
          {step >= 2 && (
            <>
              <div className="space-y-1"><h4 className="text-heading-6 text-fg">Name your workspace</h4><p className="text-body-sm text-fg-muted">This shows up on shared links and invoices.</p></div>
              <div className="space-y-2"><Label htmlFor="ob-name">Workspace name</Label><Input id="ob-name" defaultValue={systemName} /></div>
              <div className="space-y-2"><Label htmlFor="ob-url">Workspace URL</Label><Input id="ob-url" defaultValue="handmade" leading={<span className="text-body-sm text-fg-subtle">handmade.app/</span>} /></div>
              <div className="flex items-center justify-between"><Label htmlFor="ob-invite" className="text-body-sm">Invite teammates after setup</Label><Switch id="ob-invite" /></div>
            </>
          )}
        </div>
        <CardDivider />
        <CardFooter className="justify-between">
          <Button variant="neutral" mode="ghost" size="small" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
          <div className="flex items-center gap-3">
            <span className="text-body-xs text-fg-subtle tabular-nums max-sm:hidden">Step {Math.min(step + 1, 3)} of 3</span>
            <Button size="small" onClick={() => (step >= 2 ? (toast.success("Workspace created"), setStep(0)) : setStep((s) => s + 1))}>{step >= 2 ? "Finish setup" : "Continue"} <ArrowRightIcon /></Button>
          </div>
        </CardFooter>
      </Card>
    </PatternFrame>
  );
}

/* ---------- 5. Settings page ---------- */

const settingsNav = [
  { icon: <CircleUserRoundIcon />, label: "Profile" },
  { icon: <LockIcon />, label: "Security" },
  { icon: <BellIcon />, label: "Notifications" },
  { icon: <CreditCardIcon />, label: "Billing" },
  { icon: <UsersIcon />, label: "Team" },
];

function SettingsPattern() {
  const [section, setSection] = React.useState("Profile");
  return (
    <PatternFrame id="pattern-settings" title="Settings page" description="Section nav, a form card with a footer, preference toggles and a danger zone.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
        <nav aria-label="Settings" className="flex gap-1 overflow-x-auto lg:flex-col">
          {settingsNav.map((n) => (
            <button
              key={n.label}
              type="button"
              onClick={() => setSection(n.label)}
              aria-current={section === n.label ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-left text-ui-sm outline-none transition-colors focus-visible:shadow-focus [&_svg]:size-4",
                section === n.label ? "bg-surface text-fg shadow-sm [&_svg]:text-brand" : "text-fg-muted hover:bg-hover hover:text-fg [&_svg]:text-fg-subtle",
              )}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <div className="min-w-0 space-y-6">
          <Card>
            <CardHeader title="Profile" description="How you appear to clients and collaborators." />
            <CardDivider />
            <CardContent className="space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar size="64" color="blue" src={people.melvin.src} alt={people.melvin.alt} objectPosition={people.melvin.objectPosition}>{people.melvin.initials}</Avatar>
                <div className="flex gap-2">
                  <Button variant="neutral" mode="outline" size="small"><UploadIcon /> Upload</Button>
                  <Button variant="neutral" mode="ghost" size="small">Remove</Button>
                </div>
                <span className="text-body-xs text-fg-subtle">Square, at least 400px.</span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="st-first">First name</Label><Input id="st-first" defaultValue="Melvin" /></div>
                <div className="space-y-2"><Label htmlFor="st-last">Last name</Label><Input id="st-last" defaultValue="Freeman" /></div>
                <div className="space-y-2"><Label htmlFor="st-email">Email</Label><Input id="st-email" type="email" defaultValue="melvin@handmade.studio" leading={<MailIcon />} /></div>
                <div className="space-y-2">
                  <Label>Time zone</Label>
                  <Select defaultValue="accra">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="accra">Africa/Accra (GMT+0)</SelectItem>
                      <SelectItem value="lagos">Africa/Lagos (GMT+1)</SelectItem>
                      <SelectItem value="london">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="ny">America/New_York (GMT−5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="st-bio">Bio</Label>
                <Textarea id="st-bio" defaultValue="Product, web and brand designer. Minimalism with soul." />
                <FieldMessage>Shown on your public profile. 160 characters max.</FieldMessage>
              </div>
            </CardContent>
            <CardDivider />
            <CardFooter className="justify-end">
              <Button variant="neutral" mode="outline" size="small">Cancel</Button>
              <Button size="small" onClick={() => toast.success("Settings saved")}>Save changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader title="Email me about" description="Pick what lands in your inbox." />
            <CardDivider />
            <CardContent className="space-y-4">
              {[
                { t: "New client messages", d: "Replies and new conversations.", on: true },
                { t: "Invoice activity", d: "When an invoice is viewed or paid.", on: true },
                { t: "Weekly summary", d: "Your studio in one email every Monday.", on: false },
              ].map((n) => (
                <div key={n.t} className="flex items-start justify-between gap-4">
                  <div><div className="text-ui-sm text-fg">{n.t}</div><div className="text-body-xs text-fg-muted">{n.d}</div></div>
                  <Switch defaultChecked={n.on} aria-label={n.t} />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Delete workspace" description="Removes all projects, files and invoices. This can’t be undone." action={<Button variant="danger" mode="outline" size="small"><Trash2Icon /> Delete</Button>} />
          </Card>
        </div>
      </div>
    </PatternFrame>
  );
}

/* ---------- 6. Pricing section ---------- */

function PricingPattern() {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("yearly");
  return (
    <PatternFrame id="pattern-pricing" title="Pricing page section" description="Billing switch, three plans with one featured, and an FAQ.">
      <div className="space-y-10 px-2 py-6 sm:px-4">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h4 className="text-heading-3 text-fg">Simple pricing, no surprises</h4>
          <p className="text-body-md text-fg-muted">Start free. Upgrade when your studio grows.</p>
          <SegmentedControl value={billing} onValueChange={(v) => setBilling(v as "monthly" | "yearly")} aria-label="Billing" className="mx-auto">
            <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
            <SegmentedControlItem value="yearly">Yearly <Badge status="success" size="small">−20%</Badge></SegmentedControlItem>
          </SegmentedControl>
        </div>
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
          {plans.map((p) => <PricingCard key={p.name} plan={p} billing={billing} />)}
        </div>
        <Card className="mx-auto max-w-2xl px-5">
          <Accordion type="single" collapsible defaultValue="q1">
            {[
              { v: "q1", q: "Can I switch plans later?", a: "Yes. Upgrades apply immediately and downgrades at the end of your billing period." },
              { v: "q2", q: "Do you offer refunds?", a: "If Handmade isn’t right for you, ask within 14 days for a full refund." },
              { v: "q3", q: "Can I use it for client work?", a: "Every plan includes a commercial license for anything you design with it." },
            ].map((f) => (
              <AccordionItem key={f.v} value={f.v}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent className="text-body-sm text-fg-muted">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </PatternFrame>
  );
}

/* ---------- 7. Checkout summary ---------- */

const lineItems = [
  { name: "Studio plan", note: "Yearly · 1 seat", price: 228, g: "solar" as const, src: photos.desk, alt: "Desk with wireframes" },
  { name: "Brand kit add-on", note: "Logo, type and color sheets", price: 49, g: "sunrise" as const, src: photos.coffee, alt: "Latte" },
];

function CheckoutPattern() {
  const subtotal = lineItems.reduce((s, i) => s + i.price, 0);
  const discount = 27.7;
  const tax = Math.round((subtotal - discount) * 0.125 * 100) / 100;
  const money = (v: number) => `$${v.toFixed(2)}`;
  return (
    <PatternFrame id="pattern-checkout" title="Checkout summary" description="Contact and payment on the left, an order summary with totals on the right.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Contact" />
            <CardDivider />
            <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="co-name">Full name</Label><Input id="co-name" defaultValue="Melvin Z. Freeman" /></div>
              <div className="space-y-2"><Label htmlFor="co-email">Email</Label><Input id="co-email" defaultValue="melvin@handmade.studio" /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Payment" description="All transactions are encrypted." />
            <CardDivider />
            <CardContent className="space-y-5">
              <TileGroup defaultValue="card" aria-label="Payment method" className="grid-cols-3 gap-3">
                {[
                  { v: "card", icon: <CreditCardIcon />, t: "Card" },
                  { v: "momo", icon: <DollarSignIcon />, t: "Mobile money" },
                  { v: "bank", icon: <ArchiveIcon />, t: "Bank" },
                ].map((m) => <Tile key={m.v} value={m.v} className="gap-2 p-3 [&_svg]:size-5">{m.icon}<span className="text-ui-xs">{m.t}</span></Tile>)}
              </TileGroup>
              <div className="space-y-2"><Label htmlFor="co-card">Card number</Label><Input id="co-card" placeholder="1234 1234 1234 1234" leading={<CreditCardIcon />} inputMode="numeric" /></div>
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2"><Label htmlFor="co-exp">Expiry</Label><Input id="co-exp" placeholder="MM / YY" /></div>
                <div className="space-y-2"><Label htmlFor="co-cvc">CVC</Label><Input id="co-cvc" placeholder="123" /></div>
              </div>
              <div className="flex items-center gap-2"><Checkbox id="co-save" defaultChecked /><Label htmlFor="co-save" className="text-body-sm">Save card for next time</Label></div>
            </CardContent>
          </Card>
        </div>
        <Card className="self-start tabular-nums lg:sticky lg:top-4">
          <CardHeader title="Order summary" />
          <CardDivider />
          <ul className="space-y-4 p-5">
            {lineItems.map((i) => (
              <li key={i.name} className="flex items-center gap-3">
                <ImagePlaceholder gradient={i.g} src={i.src} alt={i.alt} className="size-12 shrink-0 rounded-lg" />
                <div className="min-w-0 flex-1"><div className="text-ui-sm text-fg">{i.name}</div><div className="text-body-xs text-fg-subtle">{i.note}</div></div>
                <span className="text-ui-sm text-fg">{money(i.price)}</span>
              </li>
            ))}
          </ul>
          <CardDivider />
          <div className="flex gap-2 p-5">
            <Input size="small" defaultValue="MELX10" leading={<TagIcon />} aria-label="Promo code" />
            <Button variant="neutral" mode="outline" size="small">Apply</Button>
          </div>
          <CardDivider />
          <dl className="space-y-2 p-5 text-body-sm">
            <div className="flex justify-between"><dt className="text-fg-muted">Subtotal</dt><dd className="text-fg">{money(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-fg-muted">Discount (MELX10)</dt><dd className="text-success-fg">−{money(discount)}</dd></div>
            <div className="flex justify-between"><dt className="text-fg-muted">VAT 12.5%</dt><dd className="text-fg">{money(tax)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-ui-md"><dt className="text-fg">Total</dt><dd className="text-fg">{money(subtotal - discount + tax)}</dd></div>
          </dl>
          <div className="px-5 pb-5">
            <Button className="w-full" onClick={() => toast.success("Payment confirmed", { description: "A receipt is on its way." })}><LockIcon /> Pay {money(subtotal - discount + tax)}</Button>
            <p className="mt-3 text-center text-body-xs text-fg-subtle">You won’t be charged until you confirm.</p>
          </div>
        </Card>
      </div>
    </PatternFrame>
  );
}

/* ---------- 8. Inbox / list-detail ---------- */

const threads = [
  { id: 1, from: people.ama.name, initials: people.ama.initials, src: people.ama.src, alt: people.ama.alt, objectPosition: people.ama.objectPosition, color: "highlight" as const, subject: "Wayfold homepage, round 4", preview: "Love the new hero. Can we try the serif on the stats too?", time: "10:42", unread: true, starred: true },
  { id: 2, from: people.kojo.name, initials: people.kojo.initials, src: people.kojo.src, alt: people.kojo.alt, objectPosition: people.kojo.objectPosition, color: "green" as const, subject: "Jeety onboarding sign-off", preview: "All approved on our side. Sending the PO this afternoon.", time: "09:15", unread: true, starred: false },
  { id: 3, from: people.telling.name, initials: people.telling.initials, src: people.telling.src, alt: people.telling.alt, objectPosition: people.telling.objectPosition, color: "orange" as const, subject: "Print proofs are ready", preview: "The tote and poster proofs are in the shared folder.", time: "Yesterday", unread: false, starred: false },
  { id: 4, from: people.lena.name, initials: people.lena.initials, src: people.lena.src, alt: people.lena.alt, objectPosition: people.lena.objectPosition, color: "blue" as const, subject: "Icon grid question", preview: "Should the 20px set share the 24px keylines or have its own?", time: "Tue", unread: false, starred: true },
];

function InboxPattern() {
  const [active, setActive] = React.useState(1);
  const t = threads.find((x) => x.id === active)!;
  return (
    <PatternFrame id="pattern-inbox" title="Inbox / list-detail" description="A searchable list beside the open conversation; stacks on phones.">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        <Card className="min-w-0 overflow-hidden">
          <div className="flex items-center gap-2 p-4">
            <Input size="small" placeholder="Search mail" leading={<SearchIcon />} aria-label="Search mail" />
            <Button variant="neutral" mode="outline" size="small" iconOnly aria-label="Compose"><PenToolIcon /></Button>
          </div>
          <CardDivider />
          <ul role="listbox" aria-label="Conversations" className="divide-y divide-line">
            {threads.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={m.id === active}
                  onClick={() => setActive(m.id)}
                  className={cn("flex w-full gap-3 px-4 py-3 text-left outline-none transition-colors focus-visible:shadow-focus", m.id === active ? "bg-brand-subtle" : "hover:bg-hover")}
                >
                  <Avatar size="32" color={m.color} src={m.src} alt={m.alt} objectPosition={m.objectPosition}>{m.initials}</Avatar>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className={cn("truncate text-ui-sm", m.unread ? "text-fg" : "text-fg-muted")}>{m.from}</span>
                      <span className="shrink-0 text-body-xs text-fg-subtle tabular-nums">{m.time}</span>
                    </div>
                    <div className={cn("truncate text-body-sm", m.unread ? "text-fg" : "text-fg-muted")}>{m.subject}</div>
                    <div className="truncate text-body-xs text-fg-subtle">{m.preview}</div>
                  </div>
                  {m.unread && <span aria-label="Unread" className="mt-2 size-2 shrink-0 rounded-full bg-brand" />}
                </button>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between gap-2 px-5 py-3">
            <div className="flex gap-1">
              <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Archive"><ArchiveIcon /></Button>
              <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Delete"><Trash2Icon /></Button>
              <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Star"><StarIcon className={cn(t.starred && "fill-current text-caution!")} /></Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="More"><MoreHorizontalIcon /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><MailIcon /> Mark as unread</DropdownMenuItem>
                <DropdownMenuItem><TagIcon /> Add label</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="danger"><Trash2Icon /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDivider />
          <div className="flex-1 space-y-5 p-5">
            <div className="space-y-1">
              <h4 className="text-heading-6 text-fg">{t.subject}</h4>
              <div className="flex flex-wrap gap-2"><Badge size="small">Client</Badge><Badge size="small" status="highlight">Review</Badge></div>
            </div>
            <div className="flex items-start gap-3">
              <Avatar size="40" color={t.color} src={t.src} alt={t.alt} objectPosition={t.objectPosition}>{t.initials}</Avatar>
              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div><span className="text-ui-sm text-fg">{t.from}</span> <span className="text-body-xs text-fg-subtle">to me</span></div>
                  <span className="text-body-xs text-fg-subtle tabular-nums">{t.time}</span>
                </div>
                <div className="space-y-3 text-body-sm text-fg-muted">
                  <p>Hi Melvin,</p>
                  <p>{t.preview} The team loved how quiet the cards feel, and the highlight only showing up on the one action is exactly what we wanted.</p>
                  <p>Could you send the updated file before Monday?</p>
                </div>
                <div className="flex w-fit items-center gap-3 rounded-xl bg-subtle p-3 ring-1 ring-inset ring-line">
                  <FileImageIcon className="size-5 text-fg-subtle" />
                  <div><div className="text-ui-sm text-fg">home-v4-notes.png</div><div className="text-body-xs text-fg-subtle">1.2 MB</div></div>
                  <Button variant="neutral" mode="ghost" size="xsmall" iconOnly aria-label="Download"><DownloadIcon /></Button>
                </div>
              </div>
            </div>
          </div>
          <CardDivider />
          <div className="space-y-3 p-5">
            <Textarea placeholder={`Reply to ${t.from}…`} aria-label="Reply" />
            <div className="flex items-center justify-between">
              <Button variant="neutral" mode="ghost" size="small" iconOnly aria-label="Attach"><PaperclipIcon /></Button>
              <div className="flex gap-2">
                <Button variant="neutral" mode="outline" size="small"><ReplyIcon /> Reply all</Button>
                <Button size="small" onClick={() => toast.success("Reply sent")}><SendIcon /> Send</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </PatternFrame>
  );
}

/* ---------- 9. File manager ---------- */

const folders = [
  { name: "Brand kits", files: 24, size: "1.8 GB", g: "first-light" as const },
  { name: "Client work", files: 132, size: "3.2 GB", g: "coastal" as const },
  { name: "Portfolio", files: 48, size: "940 MB", g: "golden-hour" as const },
  { name: "Archive", files: 310, size: "1.4 GB", g: "mist" as const },
];
const files = [
  { name: "wayfold-guidelines.pdf", icon: <FileTextIcon />, owner: "You", modified: "Today, 10:12", size: "4.2 MB" },
  { name: "jeety-onboarding.fig", icon: <PenToolIcon />, owner: "Kojo Mensah", modified: "Yesterday", size: "18.6 MB" },
  { name: "telling-tote-proof.png", icon: <FileImageIcon />, owner: "Telling", modified: "Nov 10", size: "2.8 MB" },
  { name: "greenvolt-icons.svg", icon: <FileImageIcon />, owner: "Lena Park", modified: "Nov 08", size: "312 KB" },
];

function FileManagerPattern() {
  const [view, setView] = React.useState("list");
  return (
    <PatternFrame id="pattern-files" title="File manager" description="Breadcrumb and toolbar, folder cards, a file list or grid, storage and upload.">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_280px]">
        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="#pattern-files"><CloudIcon /> My drive</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Client work</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <SegmentedControl value={view} onValueChange={setView} size="small" aria-label="View">
                <SegmentedControlItem value="list" aria-label="List view"><ListIcon /></SegmentedControlItem>
                <SegmentedControlItem value="grid" aria-label="Grid view"><Grid2X2Icon /></SegmentedControlItem>
              </SegmentedControl>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button size="small"><UploadIcon /> New <ChevronDownIcon /></Button></DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem><UploadIcon /> Upload files</DropdownMenuItem>
                  <DropdownMenuItem><FolderPlusIcon /> New folder</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {folders.map((f) => (
              <Card key={f.name} className="group space-y-3 p-4 transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand-subtle text-brand [&_svg]:size-5">
                    <FolderOpenIcon />
                  </span>
                  <Button variant="neutral" mode="ghost" size="xxsmall" iconOnly aria-label={`More for ${f.name}`}><MoreHorizontalIcon /></Button>
                </div>
                <div>
                  <div className="truncate text-ui-sm text-fg">{f.name}</div>
                  <div className="text-body-xs text-fg-subtle tabular-nums">{f.files} files · {f.size}</div>
                </div>
              </Card>
            ))}
          </div>
          {view === "list" ? (
            <Card className="min-w-0">
              <Table>
                <TableHeader>
                  <TableRow><TableHead>Name</TableHead><TableHead className="max-sm:hidden">Owner</TableHead><TableHead className="max-md:hidden">Modified</TableHead><TableHead className="text-right">Size</TableHead></TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((f) => (
                    <TableRow key={f.name}>
                      <TableCell><div className="flex items-center gap-3 text-fg [&_svg]:size-4 [&_svg]:text-fg-subtle">{f.icon}<span className="truncate text-ui-sm">{f.name}</span></div></TableCell>
                      <TableCell className="max-sm:hidden">{f.owner}</TableCell>
                      <TableCell className="max-md:hidden">{f.modified}</TableCell>
                      <TableCell className="text-right">{f.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {files.map((f, i) => (
                <Card key={f.name} className="overflow-hidden">
                  <ImagePlaceholder gradient={(["soft-haze", "dawn-rose", "summer", "thin-cloud"] as const)[i]} src={[photos.desk, photos.cafe, photos.vinyl, photos.workspace][i]} alt="" className="h-24" />
                  <div className="space-y-1 p-3"><div className="truncate text-ui-sm text-fg">{f.name}</div><div className="text-body-xs text-fg-subtle">{f.size}</div></div>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <Card className="space-y-4 p-5 tabular-nums">
            <div className="flex items-baseline justify-between"><span className="text-ui-md text-fg">Storage</span><span className="text-body-xs text-fg-subtle">7.4 of 10 GB</span></div>
            <div className="flex h-2 gap-1 overflow-hidden rounded-full">
              <span className="bg-primary" style={{ width: "32%" }} />
              <span className="bg-chart-4" style={{ width: "22%" }} />
              <span className="bg-chart-2" style={{ width: "14%" }} />
              <span className="bg-track-strong" style={{ width: "6%" }} />
              <span className="flex-1 bg-track" />
            </div>
            <ul className="space-y-2 text-body-sm">
              {[
                { l: "Design files", v: "3.2 GB", c: "bg-primary" },
                { l: "Documents", v: "2.2 GB", c: "bg-chart-4" },
                { l: "Images", v: "1.4 GB", c: "bg-chart-2" },
                { l: "Other", v: "0.6 GB", c: "bg-track-strong" },
              ].map((r) => (
                <li key={r.l} className="flex items-center gap-2"><span className={cn("size-2 rounded-full", r.c)} /><span className="flex-1 text-fg-muted">{r.l}</span><span className="text-fg">{r.v}</span></li>
              ))}
            </ul>
            <Button variant="neutral" mode="outline" size="small" className="w-full">Upgrade storage</Button>
          </Card>
          <Card className="p-4">
            <Dropzone hint="Drop files to add them to Client work" />
          </Card>
        </div>
      </div>
    </PatternFrame>
  );
}
