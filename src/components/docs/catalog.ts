/** Documentation catalog for existing Handmade UI components only. */
export type PropRow = { name: string; type: string; description: string };
export type PropGroup = { component: string; props: PropRow[] };

export type DocEntry = {
  slug: string;
  title: string;
  description: string;
  usage: string;
  props: PropGroup[];
};

export const getStartedHref = "/docs/get-started";

export const componentDocs: DocEntry[] = [
{
    slug: 'accordion',
    title: 'Accordion',
    description: 'A stacked set of expandable sections for short, related content.',
    usage: '<Accordion type="single" defaultValue="one" className="w-full">\n  <AccordionItem value="one">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>Yes. It follows the accordion pattern and keyboard support from Radix.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
    props: [
    { component: 'Accordion', props: [
        { name: 'type', type: '"single" | "multiple"', description: 'Whether one or many items can be open.' },
        { name: 'defaultValue', type: 'string | string[]', description: 'Uncontrolled open item(s).' },
        { name: 'value', type: 'string | string[]', description: 'Controlled open item(s).' },
      ] },
    { component: 'AccordionItem', props: [
        { name: 'value', type: 'string', description: 'Stable id for the item.' },
      ] },
    ],
  },
{
    slug: 'active-bar',
    title: 'Active Bar',
    description: 'The sliding highlight behind the active item in a vertical navigation list.',
    usage: '<nav className="relative" style={{ "--item-height": "40px" } as React.CSSProperties}>\n  <ActiveBar top={activeIndex * 40} />\n  <a className="relative z-10 flex h-10 items-center px-3">Dashboard</a>\n</nav>',
    props: [
    { component: 'ActiveBar', props: [
        { name: 'top', type: 'number', description: 'Vertical offset in pixels of the active item.' },
        { name: 'leftOffset', type: 'number', description: 'Inset from the left edge in pixels.' },
        { name: 'rightOffset', type: 'number', description: 'Inset from the right edge in pixels.' },
        { name: 'className', type: 'string', description: 'Additional classes, for example a z-index or custom transition.' },
      ] },
    ],
  },
{
    slug: 'alert',
    title: 'Alert',
    description: 'An inline message for status, warnings or supporting context.',
    usage: '<Alert>\n  <AlertTitle>Heads up</AlertTitle>\n  <AlertDescription>Your changes are saved on this device.</AlertDescription>\n</Alert>',
    props: [
    { component: 'Alert', props: [
        { name: 'className', type: 'string', description: 'Additional classes.' },
      ] },
    { component: 'AlertTitle', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    { component: 'AlertDescription', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    ],
  },
{
    slug: 'audio-player',
    title: 'Audio Player',
    description: 'Play an audio file in a single control bar, with play, skip, a timeline, speed and volume.',
    usage: '<AudioPlayer src="/audio/session.mp3" title="Harmattan Light" />',
    props: [
    { component: 'AudioPlayer', props: [
        { name: 'src', type: 'string', description: 'Audio file URL. Omit to preview the bar without a source.' },
        { name: 'title', type: 'string', description: 'Accessible name for the audio element.' },
      ] },
    ],
  },
{
    slug: 'avatar',
    title: 'Avatar',
    description: 'A photo, initials or fallback for a person, with optional group stacking.',
    usage: '<Avatar size="48" src="/images/melvin.jpg" alt="Melvin Z. Freeman">MF</Avatar>',
    props: [
    { component: 'Avatar', props: [
        { name: 'size', type: 'string | number', description: 'Pixel size of the avatar.' },
        { name: 'src', type: 'string', description: 'Image URL.' },
        { name: 'alt', type: 'string', description: 'Accessible name.' },
        { name: 'objectPosition', type: 'string', description: 'CSS object-position for the photo.' },
        { name: 'color', type: 'string', description: 'Fallback color token.' },
      ] },
    ],
  },
{
    slug: 'badge',
    title: 'Badge',
    description: 'A compact pill for status, counts or short labels.',
    usage: '<Badge status="highlight" size="small">Most popular</Badge>',
    props: [
    { component: 'Badge', props: [
        { name: 'status', type: 'primary | neutral | danger | highlight | success | warning', description: 'Tone of the badge.' },
        { name: 'variant', type: 'solid | tint | soft | outline | …', description: 'Fill style, including shadcn aliases.' },
        { name: 'size', type: 'small | medium', description: 'Badge size.' },
        { name: 'dot', type: 'boolean', description: 'Show a leading status dot.' },
      ] },
    ],
  },
{
    slug: 'bento-grid',
    title: 'Bento Grid',
    description: 'A mixed-span card grid with search. Non-matching cards fade out and the rest glide into place, with a rolling result count.',
    usage: '<BentoGrid items={items} />',
    props: [
    { component: 'BentoGrid', props: [
        { name: 'items', type: 'BentoItem[]', description: 'Cards to render. span can be default, wide, tall or hero.' },
        { name: 'query', type: 'string', description: 'Optional controlled search string.' },
        { name: 'onQueryChange', type: '(value: string) => void', description: 'Called when the search field changes.' },
      ] },
    ],
  },
{
    slug: 'brand-icons',
    title: 'Brand icons',
    description: 'Inline SVGs for brand logos Lucide does not ship, including X, GitHub, Google and Apple.',
    usage: '<Button variant="neutral" mode="outline"><XBrandIcon /> Follow along</Button>',
    props: [
    { component: 'XBrandIcon, GithubIcon, GoogleIcon, AppleIcon, GooglePlayIcon', props: [
        { name: 'className', type: 'string', description: 'Size and color via currentColor.' },
      ] },
    ],
  },
{
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'A path of links that shows where the current page sits in the hierarchy.',
    usage: '<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem><BreadcrumbPage>Docs</BreadcrumbPage></BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>',
    props: [
    { component: 'BreadcrumbLink', props: [
        { name: 'href', type: 'string', description: 'Destination.' },
      ] },
    { component: 'BreadcrumbPage', props: [
        { name: 'children', type: 'ReactNode', description: 'The current page label.' },
      ] },
    ],
  },
{
    slug: 'button',
    title: 'Button',
    description: 'The primary action control. Variants, modes and sizes all share one radius and motion scale.',
    usage: '<Button>Save</Button>\n<Button variant="neutral" mode="outline">Cancel</Button>\n<Button variant="danger" mode="outline">Delete</Button>',
    props: [
    { component: 'Button', props: [
        { name: 'variant', type: 'primary | neutral | danger | link', description: 'Color role. Also accepts shadcn aliases.' },
        { name: 'mode', type: 'solid | outline | soft | ghost | raised', description: 'Fill and elevation.' },
        { name: 'size', type: 'medium | small | xsmall | xxsmall', description: 'Height and padding.' },
        { name: 'iconOnly', type: 'boolean', description: 'Square icon button.' },
        { name: 'flat', type: 'boolean', description: 'No shadow and no press squeeze.' },
        { name: 'asChild', type: 'boolean', description: 'Render as a child element (Radix Slot).' },
        { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
      ] },
    ],
  },
{
    slug: 'calendar',
    title: 'Calendar',
    description: 'A month grid for picking a single date or a date range.',
    usage: '<Calendar mode="single" selected={date} onSelect={setDate} />',
    props: [
    { component: 'Calendar', props: [
        { name: 'mode', type: 'single | range', description: 'Selection mode.' },
        { name: 'selected', type: 'Date | DateRange', description: 'The selected date or range.' },
        { name: 'onSelect', type: 'fn', description: 'Called when the selection changes.' },
      ] },
    ],
  },
{
    slug: 'card',
    title: 'Card',
    description: 'The default grouping surface: rounded, white (or raised in dark mode), with a small shadow and no border.',
    usage: '<Card className="p-6">\n  <CardHeader>\n    <CardTitle>Studio</CardTitle>\n    <CardDescription>For designers shipping client work.</CardDescription>\n  </CardHeader>\n</Card>',
    props: [
    { component: 'Card', props: [
        { name: 'className', type: 'string', description: 'Layout classes. Do not add a border — the shadow is the edge.' },
      ] },
    { component: 'CardDivider', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    ],
  },
{
    slug: 'chart',
    title: 'Chart',
    description: 'Helpers for Recharts: shared colors, axis, grid, tooltip and legend that follow the theme tokens.',
    usage: '<LineChart data={data}>\n  <CartesianGrid {...chartGrid} />\n  <XAxis {...chartAxis} dataKey="name" />\n  <Line dataKey="value" stroke={chartColors[0]} />\n</LineChart>',
    props: [
    { component: 'chartColors', props: [
        { name: '—', type: 'string[]', description: 'Token-derived series colors.' },
      ] },
    { component: 'ChartTooltip / ChartLegend', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    ],
  },
{
    slug: 'checkbox',
    title: 'Checkbox',
    description: 'A binary choice, used in lists, forms and filters.',
    usage: '<div className="flex items-center gap-2">\n  <Checkbox id="terms" defaultChecked />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>',
    props: [
    { component: 'Checkbox', props: [
        { name: 'checked', type: 'boolean', description: 'Controlled state.' },
        { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled default.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the control.' },
      ] },
    ],
  },
{
    slug: 'checklist',
    title: 'Checklist',
    description: 'An onboarding card with a rolling counter, a Sunrise progress bar, and checkboxes that strike through as they complete.',
    usage: '<Checklist title="Set up your workspace" doneTitle="You are all set" items={items} />',
    props: [
    { component: 'Checklist', props: [
        { name: 'title', type: 'string', description: 'Heading shown while items remain.' },
        { name: 'doneTitle', type: 'string', description: 'Heading once every item is checked.' },
        { name: 'items', type: 'ChecklistItem[]', description: 'Rows with id, label and optional done state.' },
        { name: 'onChange', type: '(items: ChecklistItem[]) => void', description: 'Fires after a row is toggled.' },
      ] },
    ],
  },
{
    slug: 'collapsible',
    title: 'Collapsible',
    description: 'Show or hide a section of content, with a trigger and a smooth open state.',
    usage: '<Collapsible>\n  <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>\n  <CollapsibleContent className="px-3 pb-3">Extra fields live here.</CollapsibleContent>\n</Collapsible>',
    props: [
    { component: 'Collapsible', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Uncontrolled initial open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the open state changes.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the trigger.' },
      ] },
    { component: 'CollapsibleContent', props: [
        { name: 'forceMount', type: 'boolean', description: 'Keep the content mounted while closed.' },
      ] },
    ],
  },
{
    slug: 'combobox',
    title: 'Combobox',
    description: 'A searchable single-select: a select-style trigger with a command list in a popover.',
    usage: '<Combobox options={[{ value: "next", label: "Next.js" }]} defaultValue="next" aria-label="Framework" />',
    props: [
    { component: 'Combobox', props: [
        { name: 'options', type: '{ value, label, icon?, hint? }[]', description: 'The items to search.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selection changes.' },
        { name: 'placeholder', type: 'string', description: 'Trigger placeholder.' },
        { name: 'searchPlaceholder', type: 'string', description: 'Search field placeholder.' },
      ] },
    ],
  },
{
    slug: 'command',
    title: 'Command Bar',
    description: 'A command menu for quick actions and navigation. Built on cmdk, with a modal dialog variant and an inline form.',
    usage: '<Command>\n  <Command.Input placeholder="Type a command…" />\n  <Command.List>\n    <Command.Empty>No results.</Command.Empty>\n    <Command.Group heading="Suggestions">\n      <Command.Item onSelect={() => {}} disabled={false}>New project</Command.Item>\n    </Command.Group>\n  </Command.List>\n</Command>',
    props: [
    { component: 'Command.Root', props: [
        { name: 'inDialog', type: 'boolean', description: 'Drop the root’s radius, fill and ring when it sits in a dialog.' },
        { name: 'value', type: 'string', description: 'Controlled selected value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled selected value.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the highlighted value changes.' },
        { name: 'shouldFilter', type: 'boolean', description: 'Whether to filter items from the input. Defaults to true.' },
      ] },
    { component: 'Command.Item', props: [
        { name: 'onSelect', type: '(value: string) => void', description: 'Called when the item is chosen with Enter or a click.' },
        { name: 'value', type: 'string', description: 'The item’s searchable value.' },
        { name: 'disabled', type: 'boolean', description: 'Prevents selection.' },
      ] },
    { component: 'Command.Group', props: [
        { name: 'heading', type: 'string', description: 'Optional group label.' },
      ] },
    { component: 'Command.Input / List / Empty / Separator', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    { component: 'CommandDialog', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open change handler.' },
        { name: 'title', type: 'string', description: 'Accessible dialog title (visually hidden).' },
        { name: 'description', type: 'string', description: 'Accessible dialog description (visually hidden).' },
      ] },
    ],
  },
{
    slug: 'composer',
    title: 'Composer',
    description: 'A chat input card with attachments, a send or stop control, and activity chrome.',
    usage: '<Composer onSubmit={() => send()} onStop={() => stop()} attachments={<Pill onRemove={() => {}} >brief.pdf</Pill>} disclaimer="Handmade can make mistakes." />',
    props: [
    { component: 'Composer', props: [
        { name: 'activityState', type: 'idle | working | success | disabled', description: 'Visual chrome on the card.' },
        { name: 'sendState', type: 'idle | typing | streaming', description: 'Send or stop. Defaults from activityState when omitted.' },
        { name: 'sendDisabled', type: 'boolean', description: 'Blocks submitting a new message.' },
        { name: 'onSubmit', type: '() => void', description: 'Called when the user sends.' },
        { name: 'onStop', type: '() => void', description: 'Called when the user stops a stream.' },
        { name: 'attachments', type: 'ReactNode', description: 'Attachment strip above the editor.' },
        { name: 'disclaimer', type: 'ReactNode', description: 'Helper text below the card.' },
        { name: 'validationMessage', type: 'ReactNode', description: 'Validation copy beneath the card.' },
      ] },
    ],
  },
{
    slug: 'curved-gallery',
    title: 'Curved Gallery',
    description: 'A horizontal gallery that arches as it scrolls, with an optional shared-layout expand, plus a smoothed canvas draw pad.',
    usage: '<CurvedGallery items={items} />\n<DrawPad />',
    props: [
    { component: 'CurvedGallery', props: [
        { name: 'items', type: 'GalleryCard[]', description: 'Cards with title, image and optional avatar.' },
      ] },
    { component: 'DrawPad', props: [
        { name: 'className', type: 'string', description: 'Optional class on the pad wrapper.' },
      ] },
    ],
  },
{
    slug: 'date-picker',
    title: 'Date picker',
    description: 'A popover calendar for a single date, plus a range variant.',
    usage: '<DatePicker value={date} onChange={setDate} />\n<DateRangePicker value={range} onChange={setRange} />',
    props: [
    { component: 'DatePicker', props: [
        { name: 'value', type: 'Date', description: 'Selected date.' },
        { name: 'onChange', type: '(date) => void', description: 'Change handler.' },
      ] },
    { component: 'DateRangePicker', props: [
        { name: 'value', type: 'DateRange', description: 'Selected range.' },
        { name: 'onChange', type: '(range) => void', description: 'Change handler.' },
      ] },
    ],
  },
{
    slug: 'dialog',
    title: 'Dialog',
    description: 'A modal overlay with a focus trap, for short tasks that need the rest of the page to wait.',
    usage: '<Dialog>\n  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader title="Confirm" description="This can’t be undone." />\n    <DialogFooter>\n      <DialogClose asChild><Button variant="neutral" mode="outline">Cancel</Button></DialogClose>\n      <Button>Confirm</Button>\n    </DialogFooter>\n  </DialogContent>\n</Dialog>',
    props: [
    { component: 'Dialog', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open change handler.' },
      ] },
    { component: 'DialogContent', props: [
        { name: 'showClose', type: 'boolean', description: 'Show the top-right close button. Defaults to true.' },
      ] },
    ],
  },
{
    slug: 'donut-chart',
    title: 'Donut Chart',
    description: 'An expenses ring with badges sitting on the stroke. Hover a segment to thicken and lengthen it; the centre rolls to the amount like an odometer.',
    usage: '<DonutChart />\n<DonutChart data={[{ id: "food", label: "Food", value: 816, color: "#E07A14" }]} />',
    props: [
    { component: 'DonutChart', props: [
        { name: 'data', type: 'DonutSlice[]', description: 'Slices with id, label, value, color and optional icon. Defaults to a seven-category expenses set.' },
        { name: 'title', type: 'string', description: 'Card heading. Defaults to Expenses.' },
        { name: 'restLabel', type: 'string', description: 'Centre top label when nothing is selected. Defaults to This month.' },
        { name: 'unitLabel', type: 'string', description: 'Centre bottom label. Defaults to spent.' },
        { name: 'label', type: 'string', description: 'Accessible name for the chart. Defaults to the title.' },
      ] },
    ],
  },
{
    slug: 'drawer',
    title: 'Drawer',
    description: 'A bottom or side panel that slides over the page, distinct from Sheet, with a grab handle on the bottom and top placements.',
    usage: '<Drawer>\n  <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader title="Filters" />\n    <DrawerBody>…</DrawerBody>\n  </DrawerContent>\n</Drawer>',
    props: [
    { component: 'Drawer', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
        { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the open state changes.' },
        { name: 'defaultOpen', type: 'boolean', description: 'Uncontrolled initial open state.' },
      ] },
    { component: 'DrawerContent', props: [
        { name: 'placement', type: 'bottom | top | left | right', description: 'Edge the drawer appears from. Defaults to bottom.' },
        { name: 'width', type: 'number', description: 'Width in pixels for left or right placements.' },
        { name: 'showClose', type: 'boolean', description: 'Show a close button on side placements.' },
        { name: 'withOverlay', type: 'boolean', description: 'Whether to render the backdrop. Defaults to true.' },
      ] },
    ],
  },
{
    slug: 'dropdown-menu',
    title: 'Dropdown menu',
    description: 'A contextual menu of actions, checkboxes or nested submenus.',
    usage: '<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="neutral" mode="outline">Open</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem>Edit</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Delete</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>',
    props: [
    { component: 'DropdownMenu', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
      ] },
    { component: 'DropdownMenuItem', props: [
        { name: 'disabled', type: 'boolean', description: 'Prevents selection.' },
        { name: 'onSelect', type: 'fn', description: 'Called when the item is chosen.' },
      ] },
    ],
  },
{
    slug: 'dropzone',
    title: 'Dropzone',
    description: 'A file drop area with a click-to-upload label and an optional file list.',
    usage: '<Dropzone onFiles={setFiles} hint="PNG, JPG or PDF up to 10MB" />',
    props: [
    { component: 'Dropzone', props: [
        { name: 'onFiles', type: '(files: File[]) => void', description: 'Called with the dropped or chosen files.' },
        { name: 'accept', type: 'string', description: 'The input accept string.' },
        { name: 'multiple', type: 'boolean', description: 'Allow more than one file. Defaults to true.' },
        { name: 'hint', type: 'ReactNode', description: 'Helper text under the label.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the drop area.' },
      ] },
    ],
  },
{
    slug: 'empty-state',
    title: 'Empty & Error States',
    description: 'One shape for "there is nothing here" and "we couldn\'t load this", so a failed fetch is never mistaken for an empty list.',
    usage: '<EmptyState title="No invoices yet" description="Invoices appear here once you bill a customer." action={<Button size="small">New invoice</Button>} />\n\n<ErrorState description="Something went wrong loading these chats." action={<Button size="small" variant="neutral" mode="outline">Try again</Button>} />',
    props: [
    { component: 'EmptyState', props: [
        { name: 'title', type: 'ReactNode', description: 'Optional heading. Omit on small surfaces where the description is enough.' },
        { name: 'description', type: 'ReactNode', description: 'Supporting sentence.' },
        { name: 'icon', type: 'ReactNode', description: 'Optional icon in a ring above the copy.' },
        { name: 'action', type: 'ReactNode', description: 'Optional action, such as a create button.' },
        { name: 'size', type: 'page | section | inline', description: 'How much space the state reserves. Defaults to section.' },
      ] },
    { component: 'ErrorState', props: [
        { name: 'title', type: 'ReactNode', description: 'Always shown. Falls back to "We couldn\'t load this".' },
        { name: 'description', type: 'ReactNode', description: 'What went wrong, in one sentence.' },
        { name: 'action', type: 'ReactNode', description: 'A retry control, when retrying is useful.' },
        { name: 'size', type: 'page | section | inline', description: 'How much space the state reserves. Defaults to section.' },
      ] },
    ],
  },
{
    slug: 'filter-builder',
    title: 'Filter Builder',
    description: 'A set of field, operator and value rows for building a structured filter.',
    usage: '<FilterBuilder filters={filters} fields={fields} onChange={setFilters} />',
    props: [
    { component: 'FilterBuilder', props: [
        { name: 'filters', type: 'FilterRow[]', description: 'The current rows.' },
        { name: 'fields', type: 'FilterField[]', description: 'Available fields, each with operators and an optional type.' },
        { name: 'onChange', type: '(filters: FilterRow[]) => void', description: 'Called when a row changes or is removed.' },
        { name: 'onAdd', type: '() => void', description: 'Optional add handler. Defaults to appending an empty row.' },
        { name: 'onRemove', type: '(id: string) => void', description: 'Optional remove handler.' },
      ] },
    ],
  },
{
    slug: 'highlights',
    title: 'Highlights',
    description: 'A compact metric tile with a title, a large value, and an optional statistic underneath.',
    usage: '<HighlightsGrid columns={3}>\n  <Highlights title="Revenue" bigValue="$24.8k" statistic={<Statistic value={2.1} type="percentage" trend="up" showTrend />} />\n</HighlightsGrid>',
    props: [
    { component: 'Highlights', props: [
        { name: 'title', type: 'ReactNode', description: 'Label of the highlights box.' },
        { name: 'bigValue', type: 'ReactNode', description: 'The primary value, shown prominently.' },
        { name: 'endIcon', type: 'ReactNode', description: 'Optional icon at the trailing edge of the title row.' },
        { name: 'statistic', type: 'ReactNode', description: 'Content under the big value, usually a Statistic.' },
        { name: 'isLoading', type: 'boolean', description: 'Replaces the value with a skeleton.' },
      ] },
    { component: 'HighlightsGrid', props: [
        { name: 'columns', type: 'number', description: 'Number of columns in the grid.' },
        { name: 'isLoading', type: 'boolean', description: 'Renders a skeleton tile in every column.' },
      ] },
    ],
  },
{
    slug: 'image-placeholder',
    title: 'Image placeholder',
    description: 'A photograph when one is available, or a brand/sky gradient when one is not. Never a grey box.',
    usage: '<ImagePlaceholder gradient="sunrise" className="aspect-video rounded-xl" />',
    props: [
    { component: 'ImagePlaceholder', props: [
        { name: 'src', type: 'string', description: 'Optional photo URL.' },
        { name: 'gradient', type: 'GradientId', description: 'Fallback brand or sky gradient.' },
        { name: 'alt', type: 'string', description: 'Accessible name when a photo is shown.' },
      ] },
    ],
  },
{
    slug: 'input',
    title: 'Input',
    description: 'A text field with an optional leading icon and error state.',
    usage: '<Input placeholder="hello@example.com" leading={<MailIcon />} />',
    props: [
    { component: 'Input', props: [
        { name: 'leading', type: 'ReactNode', description: 'Icon or mark on the left.' },
        { name: 'hasError', type: 'boolean', description: 'Error tone and ring.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the field.' },
      ] },
    ],
  },
{
    slug: 'input-otp',
    title: 'Input OTP',
    description: 'A one-time code field, grouped into slots.',
    usage: '<InputOTP maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    {/* … */}\n  </InputOTPGroup>\n</InputOTP>',
    props: [
    { component: 'InputOTP', props: [
        { name: 'maxLength', type: 'number', description: 'Number of characters.' },
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Change handler.' },
      ] },
    ],
  },
{
    slug: 'kbd',
    title: 'Kbd',
    description: 'A key cap for shortcuts. Group keys of one shortcut with KbdGroup.',
    usage: '<KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup>',
    props: [
    { component: 'Kbd', props: [
        { name: 'children', type: 'ReactNode', description: 'The key label.' },
      ] },
    { component: 'KbdGroup', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    ],
  },
{
    slug: 'label',
    title: 'Label',
    description: 'The accessible label for a field, with optional hint and message slots.',
    usage: '<div className="space-y-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" />\n  <FieldMessage>We’ll only use this for the receipt.</FieldMessage>\n</div>',
    props: [
    { component: 'Label', props: [
        { name: 'htmlFor', type: 'string', description: 'The associated control id.' },
      ] },
    { component: 'LabelHint / FieldMessage', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    ],
  },
{
    slug: 'mega-menu',
    title: 'Mega Menu',
    description: 'A navigation bar whose dropdown stays open between tabs and animates its size to fit the next panel.',
    usage: '<MegaMenu tabs={[{ id: "product", label: "Product", panel: <MegaMenuSimpleList items={items} /> }]} />',
    props: [
    { component: 'MegaMenu', props: [
        { name: 'tabs', type: 'MegaMenuTab[]', description: 'Tabs with id, label and panel content.' },
        { name: 'label', type: 'string', description: 'Accessible name for the menubar.' },
      ] },
    ],
  },
{
    slug: 'multi-step-form',
    title: 'Multi-step Form',
    description: 'A stepped form built on the Stepper, with back, next and submit actions.',
    usage: '<MultiStepForm steps={[{ title: "Account" }, { title: "Workspace" }]} onSubmit={save}>\n  <MultiStepFormStep>…</MultiStepFormStep>\n  <MultiStepFormStep>…</MultiStepFormStep>\n</MultiStepForm>',
    props: [
    { component: 'MultiStepForm', props: [
        { name: 'steps', type: 'Step[]', description: 'Labels (and optional descriptions) passed to the Stepper.' },
        { name: 'current', type: 'number', description: 'Controlled zero-based step index.' },
        { name: 'defaultCurrent', type: 'number', description: 'Uncontrolled initial step.' },
        { name: 'onCurrentChange', type: '(index: number) => void', description: 'Called when the step changes.' },
        { name: 'onSubmit', type: '() => void', description: 'Called when the last step is submitted.' },
      ] },
    ],
  },
{
    slug: 'pagination',
    title: 'Pagination',
    description: 'Page controls for long lists and tables.',
    usage: '<Pagination page={1} count={8} onPageChange={setPage} />',
    props: [
    { component: 'Pagination', props: [
        { name: 'page', type: 'number', description: 'Current page, 1-indexed.' },
        { name: 'pageCount', type: 'number', description: 'Total pages.' },
        { name: 'onPageChange', type: '(page: number) => void', description: 'Called when the page changes.' },
      ] },
    ],
  },
{
    slug: 'pill-tag',
    title: 'Pill / Tag',
    description: 'A compact, removable label for status, categories or attachments.',
    usage: '<Pill tone="highlight" onRemove={() => {}} >Design</Pill>\n<Tag tone="outline" onRemove={() => {}} >Draft</Tag>',
    props: [
    { component: 'Pill', props: [
        { name: 'tone', type: 'neutral | highlight | success | warning | danger | info | outline', description: 'Color of the pill.' },
        { name: 'size', type: 'small | medium | large', description: 'Height and type size.' },
        { name: 'onRemove', type: '() => void', description: 'Shows a remove button when provided.' },
        { name: 'removeLabel', type: 'string', description: 'Accessible name for the remove button.' },
      ] },
    { component: 'Tag', props: [
        { name: '—', type: '—', description: 'Same props as Pill, with slightly squarer corners.' },
      ] },
    ],
  },
{
    slug: 'popover',
    title: 'Popover',
    description: 'A floating panel anchored to a trigger, for short contextual UI.',
    usage: '<Popover>\n  <PopoverTrigger asChild><Button variant="neutral" mode="outline">Open</Button></PopoverTrigger>\n  <PopoverContent>A short note.</PopoverContent>\n</Popover>',
    props: [
    { component: 'Popover', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
      ] },
    { component: 'PopoverContent', props: [
        { name: 'align', type: 'start | center | end', description: 'Alignment on the trigger.' },
        { name: 'sideOffset', type: 'number', description: 'Distance from the trigger.' },
      ] },
    ],
  },
{
    slug: 'progress',
    title: 'Progress',
    description: 'A linear bar or a ring for determinate progress.',
    usage: '<Progress value={72} label="Uploading invoice" />\n<ProgressRing value={72} />',
    props: [
    { component: 'Progress', props: [
        { name: 'value', type: 'number', description: '0–100.' },
        { name: 'size', type: 'small | medium', description: 'Bar thickness.' },
        { name: 'label', type: 'string', description: 'Accessible name.' },
      ] },
    { component: 'ProgressRing', props: [
        { name: 'value', type: 'number', description: '0–100.' },
      ] },
    ],
  },
{
    slug: 'progress-popover',
    title: 'Progress Popover',
    description: 'A publishing popover with yellow step fills, a live log and a rolling percent. At 100% it dismisses and the trigger becomes a live pill.',
    usage: 'const run = useProgressRun()\n<ProgressPopover run={run} title="Handmade" />',
    props: [
    { component: 'ProgressPopover', props: [
        { name: 'run', type: 'ProgressRun', description: 'State from useProgressRun, including start and reset.' },
        { name: 'title', type: 'string', description: 'Name shown in the pill and popover.' },
      ] },
    { component: 'useProgressRun', props: [
        { name: 'duration', type: 'number', description: 'Length of a full run, in milliseconds. Default 8000.' },
        { name: 'steps', type: 'ProgressStep[]', description: 'Step labels. Defaults to Build, Sign, Notarize, Upload.' },
      ] },
    ],
  },
{
    slug: 'question-tool',
    title: 'Question Tool',
    description: 'An AI-style question card with single choice, multiple choice or free-text answers.',
    usage: '<QuestionTool questions={[{ id: "brand", title: "Which brand?", type: "single", options: [{ id: "acme", label: "Acme" }] }]} onSubmitAnswer={console.log} />',
    props: [
    { component: 'QuestionTool', props: [
        { name: 'questions', type: 'QuestionConfig[]', description: 'Prompt list. Each item is single, multi, or text.' },
        { name: 'questionIndex', type: 'number', description: '1-based index when the host owns navigation.' },
        { name: 'allowSkip', type: 'boolean', description: 'Shows the skip action. Defaults to true.' },
        { name: 'onSubmitAnswer', type: '(answer: QuestionAnswer) => void', description: 'Called with the current answer.' },
        { name: 'onSubmitAnswers', type: '(answers: Record<string, QuestionAnswer>) => void', description: 'Called with every answer on the last question.' },
      ] },
    ],
  },
{
    slug: 'radio-group',
    title: 'Radio group',
    description: 'A set of mutually exclusive choices.',
    usage: '<RadioGroup defaultValue="studio">\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="studio" id="r-studio" />\n    <Label htmlFor="r-studio">Studio</Label>\n  </div>\n</RadioGroup>',
    props: [
    { component: 'RadioGroup', props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
      ] },
    { component: 'RadioGroupItem', props: [
        { name: 'value', type: 'string', description: 'The item’s value.' },
        { name: 'disabled', type: 'boolean', description: 'Disables this item.' },
      ] },
    ],
  },
{
    slug: 'scroll-area',
    title: 'Scroll Area',
    description: 'A scroll container with a thin custom scrollbar that matches the surface.',
    usage: '<ScrollArea className="h-48" viewportLabel="Items">\n  {items.map((item) => <p key={item}>{item}</p>)}\n</ScrollArea>',
    props: [
    { component: 'ScrollArea', props: [
        { name: 'orientation', type: 'vertical | horizontal | both', description: 'Which scrollbars to render. Defaults to vertical.' },
        { name: 'viewportLabel', type: 'string', description: 'Accessible name. Also makes the viewport focusable so keyboard users can scroll it.' },
      ] },
    ],
  },
{
    slug: 'section-header',
    title: 'Section Header',
    description: 'A title, subtitle and actions row for a page section.',
    usage: '<SectionHeader title="Dashboard" subtitle="Your weekly summary" badge={<Badge>Beta</Badge>}>\n  <Button size="small">Export</Button>\n</SectionHeader>',
    props: [
    { component: 'SectionHeader', props: [
        { name: 'title', type: 'ReactNode', description: 'Section title.' },
        { name: 'subtitle', type: 'ReactNode', description: 'Supporting text below the title.' },
        { name: 'badge', type: 'ReactNode', description: 'Content shown next to the title.' },
        { name: 'isTitleLoading', type: 'boolean', description: 'Replaces the title with a skeleton.' },
        { name: 'isSubtitleLoading', type: 'boolean', description: 'Replaces the subtitle with a skeleton.' },
      ] },
    ],
  },
{
    slug: 'segmented-control',
    title: 'Segmented control',
    description: 'A compact choice of two or more exclusive options, sitting in a recessed tray.',
    usage: '<SegmentedControl defaultValue="monthly">\n  <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>\n  <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>\n</SegmentedControl>',
    props: [
    { component: 'SegmentedControl', props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
      ] },
    ],
  },
{
    slug: 'select',
    title: 'Select',
    description: 'A standard select menu for choosing one option from a list.',
    usage: '<Select defaultValue="studio">\n  <SelectTrigger className="w-48"><SelectValue placeholder="Plan" /></SelectTrigger>\n  <SelectContent>\n    <SelectItem value="studio">Studio</SelectItem>\n    <SelectItem value="team">Team</SelectItem>\n  </SelectContent>\n</Select>',
    props: [
    { component: 'Select', props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
      ] },
    { component: 'SelectItem', props: [
        { name: 'value', type: 'string', description: 'The item’s value.' },
        { name: 'disabled', type: 'boolean', description: 'Disables this item.' },
      ] },
    ],
  },
{
    slug: 'separator',
    title: 'Separator',
    description: 'A hairline divider between sections, horizontally or vertically.',
    usage: '<Separator />\n<Separator orientation="vertical" className="h-8" />',
    props: [
    { component: 'Separator', props: [
        { name: 'orientation', type: 'horizontal | vertical', description: 'Axis of the rule. Defaults to horizontal.' },
      ] },
    ],
  },
{
    slug: 'sheet',
    title: 'Sheet',
    description: 'A sliding overlay, typically from the right, for secondary views and forms.',
    usage: '<Sheet>\n  <SheetTrigger asChild><Button variant="neutral" mode="outline">Open</Button></SheetTrigger>\n  <SheetContent>\n    <SheetHeader title="Settings" />\n    <SheetBody>…</SheetBody>\n  </SheetContent>\n</Sheet>',
    props: [
    { component: 'Sheet', props: [
        { name: 'open', type: 'boolean', description: 'Controlled open state.' },
      ] },
    { component: 'SheetContent', props: [
        { name: 'side', type: 'top | right | bottom | left', description: 'Edge the sheet enters from.' },
      ] },
    ],
  },
{
    slug: 'skeleton',
    title: 'Skeleton',
    description: 'A pulsing placeholder that stands in for content that has not loaded yet.',
    usage: '<Skeleton className="h-5 w-40" />',
    props: [
    { component: 'Skeleton', props: [
        { name: 'className', type: 'string', description: 'Width, height and radius.' },
      ] },
    ],
  },
{
    slug: 'slider',
    title: 'Slider',
    description: 'A range control for a numeric value.',
    usage: '<Slider defaultValue={[50]} max={100} step={1} />',
    props: [
    { component: 'Slider', props: [
        { name: 'value', type: 'number[]', description: 'Controlled value(s).' },
        { name: 'defaultValue', type: 'number[]', description: 'Uncontrolled default.' },
        { name: 'min / max / step', type: 'number', description: 'Range and increment.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the control.' },
      ] },
    ],
  },
{
    slug: 'sparkline',
    title: 'Sparkline',
    description: 'A tiny line chart for a trend inside a stat or table cell.',
    usage: '<Sparkline points={[4, 8, 6, 12, 9, 14]} className="h-10 w-24" />',
    props: [
    { component: 'Sparkline', props: [
        { name: 'data', type: 'number[]', description: 'The series.' },
        { name: 'className', type: 'string', description: 'Size of the graphic.' },
      ] },
    ],
  },
{
    slug: 'speed-dial',
    title: 'Speed Dial',
    description: 'A round action button. Menu items spring up, and the chosen icon travels into the button with a shared layout animation.',
    usage: '<SpeedDial items={[{ id: "write", label: "Write", icon: <PenIcon /> }]} />',
    props: [
    { component: 'SpeedDial', props: [
        { name: 'items', type: 'SpeedDialItem[]', description: 'Actions with id, label and icon.' },
        { name: 'label', type: 'string', description: 'Accessible name for the trigger when nothing is selected.' },
        { name: 'onSelect', type: '(item: SpeedDialItem) => void', description: 'Called when an item is chosen.' },
      ] },
    ],
  },
{
    slug: 'spinner',
    title: 'Spinner',
    description: 'A compact loading indicator, for buttons, inline status and pending views.',
    usage: '<Spinner size={20} label="Loading projects" />',
    props: [
    { component: 'Spinner', props: [
        { name: 'size', type: 'number', description: 'Size of the spinner in pixels. Defaults to 20.' },
        { name: 'label', type: 'string', description: 'Accessible name. Defaults to "Loading".' },
      ] },
    ],
  },
{
    slug: 'statistic',
    title: 'Statistic',
    description: 'A formatted number with an optional prefix, suffix and trend.',
    usage: '<Statistic value={24.8} prefix="$" suffix="k" trend="up" showTrend decimals={1} />',
    props: [
    { component: 'Statistic', props: [
        { name: 'value', type: 'number | null', description: 'The numerical value. Null shows emptyText.' },
        { name: 'type', type: 'number | percentage', description: 'Formatting mode.' },
        { name: 'trend', type: 'up | down | neutral', description: 'Visual trend indicator.' },
        { name: 'showTrend', type: 'boolean', description: 'Whether to show the trend icon.' },
        { name: 'decimals', type: 'number', description: 'Fraction digits to display.' },
        { name: 'prefix', type: 'string', description: 'Text before the value.' },
        { name: 'suffix', type: 'string', description: 'Text after the value.' },
        { name: 'emptyText', type: 'string', description: 'Shown when value is null or undefined.' },
      ] },
    ],
  },
{
    slug: 'stepper',
    title: 'Stepper',
    description: 'A short sequence of steps, with a current step and a trail of completed ones.',
    usage: '<Stepper steps={[{ title: "Details" }, { title: "Preview" }, { title: "Publish" }]} current={1} />',
    props: [
    { component: 'Stepper', props: [
        { name: 'steps', type: 'string[]', description: 'Step labels.' },
        { name: 'current', type: 'number', description: 'The active index, 0-based.' },
      ] },
    ],
  },
{
    slug: 'switch',
    title: 'Switch',
    description: 'A labeled on/off control for a setting.',
    usage: '<div className="flex items-center justify-between gap-3">\n  <Label htmlFor="avail">Open to projects</Label>\n  <Switch id="avail" defaultChecked />\n</div>',
    props: [
    { component: 'Switch', props: [
        { name: 'checked', type: 'boolean', description: 'Controlled state.' },
        { name: 'defaultChecked', type: 'boolean', description: 'Uncontrolled default.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the control.' },
      ] },
    ],
  },
{
    slug: 'table',
    title: 'Table',
    description: 'A data table with optional sortable headers and tabular numerals.',
    usage: '<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Client</TableHead>\n      <TableHead className="text-right">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>…</TableBody>\n</Table>',
    props: [
    { component: 'Table', props: [
        { name: "—", type: "—", description: "No additional props beyond the native element." },
      ] },
    { component: 'TableSortButton / useTableSort', props: [
        { name: 'key', type: 'string', description: 'Column to sort by.' },
      ] },
    ],
  },
{
    slug: 'tabs',
    title: 'Tabs',
    description: 'A set of views in the same space, with a underline or segmented trigger row.',
    usage: '<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="billing">Billing</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">…</TabsContent>\n</Tabs>',
    props: [
    { component: 'Tabs', props: [
        { name: 'value', type: 'string', description: 'Controlled tab.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
        { name: 'onValueChange', type: '(value: string) => void', description: 'Change handler.' },
      ] },
    ],
  },
{
    slug: 'textarea',
    title: 'Textarea',
    description: 'A multi-line text field for longer copy.',
    usage: '<Textarea placeholder="A few words about you…" rows={4} />',
    props: [
    { component: 'Textarea', props: [
        { name: 'rows', type: 'number', description: 'Visible lines.' },
        { name: 'hasError', type: 'boolean', description: 'Error tone and ring.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the field.' },
      ] },
    ],
  },
{
    slug: 'tile-group',
    title: 'Tile group',
    description: 'A set of selectable tiles, for plans, templates or similar choices.',
    usage: '<TileGroup defaultValue="studio">\n  <Tile value="studio">Studio</Tile>\n  <Tile value="team">Team</Tile>\n</TileGroup>',
    props: [
    { component: 'TileGroup', props: [
        { name: 'value', type: 'string', description: 'Controlled value.' },
        { name: 'defaultValue', type: 'string', description: 'Uncontrolled default.' },
      ] },
    { component: 'Tile', props: [
        { name: 'value', type: 'string', description: 'The tile’s value.' },
        { name: 'disabled', type: 'boolean', description: 'Disables this tile.' },
      ] },
    ],
  },
{
    slug: 'toast',
    title: 'Toast',
    description: 'A short, fleeting message. Built on Sonner, themed to Handmade tokens.',
    usage: '<Button onClick={() => toast("Draft saved")}>Notify</Button>',
    props: [
    { component: 'toast', props: [
        { name: 'message', type: 'string', description: 'The title.' },
        { name: 'description', type: 'string', description: 'Optional supporting copy.' },
        { name: 'action', type: '{ label, onClick }', description: 'Optional action.' },
      ] },
    { component: 'Toaster', props: [
        { name: '—', type: '—', description: 'Mount once near the root of the app.' },
      ] },
    ],
  },
{
    slug: 'toggle-group',
    title: 'Toggle group',
    description: 'A cluster of toggles for one or many selected options, such as text alignment.',
    usage: '<ToggleGroup type="single" defaultValue="left">\n  <ToggleGroupItem value="left" aria-label="Align left"><AlignLeftIcon /></ToggleGroupItem>\n</ToggleGroup>',
    props: [
    { component: 'ToggleGroup', props: [
        { name: 'type', type: 'single | multiple', description: 'Selection mode.' },
        { name: 'value', type: 'string | string[]', description: 'Controlled value.' },
      ] },
    { component: 'Toggle / ToggleGroupItem', props: [
        { name: 'pressed', type: 'boolean', description: 'Controlled pressed state for a single Toggle.' },
      ] },
    ],
  },
{
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'A short label that appears on hover or focus, for icon-only controls and extra context.',
    usage: '<Tooltip>\n  <TooltipTrigger asChild><Button variant="neutral" mode="ghost" iconOnly aria-label="Settings"><SettingsIcon /></Button></TooltipTrigger>\n  <TooltipContent>Settings</TooltipContent>\n</Tooltip>',
    props: [
    { component: 'TooltipProvider', props: [
        { name: 'delayDuration', type: 'number', description: 'Delay before the tooltip opens.' },
      ] },
    { component: 'TooltipContent', props: [
        { name: 'side', type: 'top | right | bottom | left', description: 'Preferred side.' },
      ] },
    ],
  },
{
    slug: 'video-player',
    title: 'Video Player',
    description: 'Play a video with a poster, title, description and a compact control bar.',
    usage: '<VideoPlayer src="/video/studio.mp4" poster="/images/album.jpg" title="Studio sessions" description="A short cut from the session." />',
    props: [
    { component: 'VideoPlayer', props: [
        { name: 'src', type: 'string', description: 'Video file URL.' },
        { name: 'poster', type: 'string', description: 'Poster image shown before playback.' },
        { name: 'title', type: 'string', description: 'Title under the frame.' },
        { name: 'description', type: 'string', description: 'Supporting line under the title.' },
      ] },
    ],
  }

];

export const stylesHref = "/docs/styles";

export const docsNav = [
  { slug: "get-started", title: "Get started", href: getStartedHref },
  { slug: "styles", title: "Styles", href: stylesHref },
  ...componentDocs.map((c) => ({ slug: c.slug, title: c.title, href: `/docs/${c.slug}` })),
];

export function getComponentDoc(slug: string) {
  return componentDocs.find((c) => c.slug === slug);
}

export const componentSlugs = componentDocs.map((c) => c.slug);
