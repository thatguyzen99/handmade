/**
 * The written half of the design system. The studio renders these on the site
 * and the prompt generator includes them verbatim, so the two never drift.
 * Edit this file to change the aesthetic's rules.
 */

import type { ThemeConfig } from "./config";
import { visualStyleMeta } from "./config";

export { systemName, systemId, siteUrl, repoUrl, author, upstream } from "./brand";

export const aesthetic =
  "Minimalism with soul: quiet, precise and tactile, and card-based. Every screen is a near-white cream canvas with content grouped into white cards; hairline strokes and generous whitespace do the rest, and color is reserved for intent (actions, status, focus) so it always means something. Depth comes from one crisp, small shadow rather than borders or heavy drop shadows. Typography does the heavy lifting: tight tracking, medium-weight labels and a clear size hierarchy.";

export const principles = [
  {
    title: "Neutral first, color with intent",
    body: "95% of any screen is neutral tokens (surface/canvas backgrounds, fg-* text, line-* strokes). Primary appears on the single most important action. Brand accent (ink in light, cream in dark; text-brand / bg-brand) is for links, focus, selection and accent badges. Status colors only communicate state, never decoration.",
  },
  {
    title: "Semantic tokens only",
    body: "Never use raw hex values or Tailwind's default palette. Use semantic tokens (bg-surface, text-fg-muted, ring-line). They flip automatically in dark mode.",
  },
  {
    title: "Cards on a canvas",
    body: "The page background is always bg-canvas (near-white cream #FCFBF8 in the Handmade default). All content lives in white cards: rounded-2xl bg-surface shadow-sm. Never put content directly on the canvas except page titles and section headings. Don't nest cards; divide a card's sections with full-bleed h-px bg-line dividers.",
  },
  {
    title: "One shadow, scaled",
    body: "Elevation is a single shadow scaled into a ladder: shadow-xs on resting inputs, shadow-sm on cards, shadow-md on floating layers (popovers, toasts), shadow-lg on dialogs. Buttons, badges and menus sit outside the ladder with their own crisp tokens: shadow-button, shadow-primary, shadow-inverse, shadow-danger, shadow-badge and shadow-menu, a fine ring and a tight drop in light mode, a solid 0.5px outline and a black drop in dark. Shadowed surfaces (cards, popovers, dialogs) get no border or ring: the shadow alone defines the edge, and a stroke on top of it reads as a muddy double edge. Rings are for controls (inputs, checkboxes) that carry no real shadow. Never invent new shadows.",
  },
  {
    title: "One radius, scaled",
    body: "Every corner derives from a single base radius. Buttons use their own tokens, rounded-button (medium) and rounded-button-sm (compact), which either follow the scale or are pills. Other controls use rounded-lg (base), compact controls rounded-md, small marks rounded-xs/sm, cards rounded-2xl, dialogs rounded-3xl. People (avatars) and toggles are always rounded-full.",
  },
  {
    title: "Higher is lighter in dark mode",
    body: "In dark mode elevation is shown with lightness, not shadow: the page is a near-black grey (never crushed #000), cards are one shade lighter, and the further above the page something sits, the lighter its surface. Always pick the surface token for the element's height (canvas → surface → raised → floating; subtle for recessed wells) instead of reusing surface everywhere, and never hard-code dark colours. Dark strokes are translucent white so they read the same on every level.",
  },
  {
    title: "Concentric corners",
    body: "When a rounded element sits inside another with a small gap (segmented triggers in their tray, menu items in a popover, content hugging a card's corner), the inner radius is the outer radius minus the gap so both curves share a centre. Put rounded-parent-{size} on the container and rounded-concentric-{n} on the child, where n is the container's padding in spacing steps (p-2 → rounded-concentric-2). Never give a nested element the same radius as its container.",
  },
  {
    title: "Type tokens, not font utilities",
    body: "Set type with the named styles (text-heading-4, text-ui-sm, text-body-sm, text-overline-xs) which bundle size, line-height, tracking and weight. Do not combine them with font-size, leading, tracking or font-weight utilities. Never set words or sentences in full uppercase unless the user asks for it.",
  },
  {
    title: "Numbers line up",
    body: "Any number that gets compared, scanned or updates in place uses tabular-nums so its digits share one width and columns, totals and timers don't jitter: tables, stat and revenue cards, prices, deltas, chart axes and tooltips, timestamps, durations and counters. Put it on the table or the container rather than every cell. Running text (\"3 new messages\") keeps proportional figures. Monospace text is already tabular.",
  },
  {
    title: "One spacing unit",
    body: "Every padding, margin, gap, offset and size is a whole multiple of the spacing unit (4px by default; the density setting changes the unit and scales the type with it, so a whole UI gets denser or airier together): use whole Tailwind steps only (1 = one unit, 2 = two …) and never half steps (1.5, 2.5, 3.5) or arbitrary pixel values. Inside components 2–4 (8–16px); between related elements 4–6 (16–24px); card padding 5–6 (20–24px); between sections 8–12 (32–48px). Control heights: 40 / 36 / 32 / 28. Only 1–2px hairlines (borders, rings, underlines) sit off the grid.",
  },
  {
    title: "Hover shifts, press squeezes, focus sharpens",
    body: "Hover changes color only, one step, and nothing moves or grows. Buttons squeeze slightly when pressed. Buttons and select triggers show focus-visible with a 2px outline at a 2px offset (outline-line-focus); other controls add a 2px offset halo using the shadow-focus, shadow-focus-primary and shadow-focus-danger tokens. Every interactive element has both.",
  },
  {
    title: "Icons are line, 20px, muted",
    body: "Use Lucide icons at size-5 inside medium fields and size-4 in compact ones. Buttons and select triggers always use size-4 at a 1.5px rendered stroke. Icons default to text-fg-subtle and darken to text-fg-muted on interaction. Fill an icon with currentColor only for media controls and ratings. Lucide has no brand logos, so use inline SVGs from Simple Icons for those.",
  },
];

export const colorRules = [
  "Surfaces by height: bg-canvas (page) → bg-surface (cards, sidebars) → bg-raised (things sitting on a card, e.g. the selected segmented tab) → bg-floating (popovers, menus, dialogs). Recessed wells inside a card (code blocks) use bg-subtle; the tray behind segmented tabs uses bg-tray. Table header rows use bg-table-head: a faint well in light mode, lighter than the card in dark mode. Selected tabs rise a level: bg-raised + the system shadow (shadow-sm), no ring. Selected tiles also add a 1px ring-[rgb(0_0_0/0.5)] border in light mode, and a white one in dark mode (dark:ring-[rgb(255_255_255/0.5)] dark:shadow-control). Never a heavy solid outline. Hover and highlighted states use bg-hover, a translucent tint that darkens in light mode and lightens in dark mode on any level. Exception: anything with a border (form fields, select triggers, tiles, outline buttons) never goes gray on hover; they stay white with their shadow and only the border darkens (hover:ring-line-strong). Focused or open fields get ring-line-focus + the focus shadow. Text fields (inputs, textareas) use bg-field + shadow-field + ring-field-line: white with a border in light mode; in dark mode a shade darker than the card, with an inner shadow and no border. Select triggers and outline buttons are controls, not text fields: white buttons and select triggers use bg-control + shadow-button, white in light mode and a shade lighter than the card in dark mode. Gray fills on fields mean disabled. In light mode the levels are all white and depth comes from shadow; in dark mode each level up is lighter.",
  "Primary text: text-fg. Secondary text and descriptions: text-fg-muted. Placeholders, meta and icons: text-fg-subtle. Disabled: text-fg-disabled.",
  "Borders and dividers: line (default) or line-strong (controls that need more contrast). line-focus only for focused inputs.",
  "Inverted surfaces (tooltips, neutral buttons): bg-inverse with text-fg-inverse.",
  "Primary tints: bg-primary-subtle for selected rows, primary-subtle-strong and primary-subtle-stronger for focus halos.",
  "Status: use {state}-subtle backgrounds with {state} icons/text for inline messages; solid {state} fills only for small high-signal marks (badges, dots).",
  "Text on primary uses text-primary-foreground (automatically black or white for contrast).",
  "Brand accent: text-brand, bg-brand and bg-brand-subtle for links, focus, selection and accent badges. Do not reuse bg-primary for those.",
  "The featured brand gradient is Sunrise (linear-gradient(90deg, #FFE7A3 0%, #FFCA05 50%, #FAAC18 100%), also --gradient-sunrise). Text on it is always ink (#0A0A0A), never white. Use it as a small accent, not a large background. Solar remains available.",
];


export function visualStyleGuide(config: ThemeConfig) {
  const current = visualStyleMeta[config.style ?? "handmade"];
  return `The system has three visual styles, chosen with \`data-style\` on \`<html>\` (\`handmade\` | \`glass\` | \`brutal\`) and stored on the theme as \`style\`. Handmade is the default. The current export uses **${current.label}**: ${current.hint}

- **Handmade** (\`data-style="handmade"\`): the default — ink and cream, soft radius, quiet shadows.
- **Glass** (\`data-style="glass"\`): translucent surfaces (rgba white or ink), \`backdrop-filter: blur() saturate()\`, thin light borders, soft glow shadows, and a Sunrise-tinted blurred gradient behind the page so the glass reads. Keep text tokens solid so contrast stays at AA. Provide an \`@supports\` fallback to opaque surfaces when \`backdrop-filter\` is missing.
- **Brutal** (\`data-style="brutal"\`): neubrutalism — 2–3px solid ink borders, hard offset shadows (\`4px 4px 0\` ink) that shift on press, little or no radius, flat yellow \`#FFCA05\` and orange \`#FAAC18\` fills on cream, heavier headings and snappy motion.

Import \`visual-styles.css\` (shipped by the registry) next to the theme stylesheet. Drive the look through semantic tokens (radius, border, shadow, surface, blur, heading weight, motion) and add component overrides only where a token cannot express it. Do not introduce purple. Each style must work in light and dark mode.`;
}

export const doAndDont = {
  do: [
    "Group related content in white Cards on the canvas (rounded-2xl, shadow-sm, no border) with a header row of icon-in-ring + title + description.",
    "Pair a label (text-ui-sm) with every input; put helper/error text below in text-body-xs.",
    "Use sentence case for all UI copy, including labels, badges, buttons and section eyebrows.",
    "Right-align primary actions in footers; neutral outline button for cancel, solid primary for confirm.",
    "Use dividers (h-px bg-line) to separate card sections instead of nested boxes.",
  ],
  dont: [
    "Never use full uppercase for words or sentences, by typing it or with the uppercase class or text-transform, unless the user asks for it. Acronyms, codes and initials (API, LAX, #FFFFFF) keep their normal form.",
    "Don't use more than one solid primary button per view.",
    "Don't use shadows larger than shadow-sm on in-flow content, or white backgrounds for the page itself.",
    "Don't mix arbitrary radii (rounded-[7px]) — use the scale.",
    "Don't use gradients, glows or saturated backgrounds for large areas.",
    "Don't use raw Tailwind colors (gray-500, blue-600) or hex values in components.",
  ],
};

/** Exact class recipes for the core components (mirrors src/components/ui). */
export const recipes: { name: string; notes?: string; code: string }[] = [
  {
    name: "Button",
    notes:
      "API: variant = primary | neutral | danger, mode = solid | outline | soft | ghost | raised, size = medium (h-9, h-11 on phones) | small (h-8) | xsmall (h-7) | xxsmall (h-6), flat = true for a button with no shadow or press squeeze. Built with cva + Radix Slot (asChild).",
    code: `base:    inline-flex items-center justify-center gap-1 whitespace-nowrap text-ui-sm outline-none
         [&_svg]:size-4 [&_svg]:[stroke-width:2.25] (a 1.5px rendered stroke)
         focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus
         transition-[color,background-color,box-shadow,filter,scale] duration-150 ease-tactile
         active:scale-[0.97] (icon-only active:scale-[0.94]); hover changes color only, nothing moves or grows
         disabled:opacity-60 (icon-only disabled:opacity-40) disabled:active:scale-100
medium:  h-9 max-md:h-11 rounded-button px-4      small: h-8 rounded-button-sm px-4      xsmall: h-7 rounded-button-sm px-2      xxsmall: h-6 rounded-button-sm px-2
leading icon: the icon side is tighter, has-[>svg:first-child]:pl-3
primary/solid:   bg-primary text-primary-foreground shadow-primary hover:bg-primary-hover
                 shadow-primary is a lit top line, a ring in its own fill and two tight drops (inset 0 1px rgb(255 255 255/.16), 0 0 0 1px fill, 0 1px 2px, 0 3px 6px -2px)
                 dark:disabled:bg-control dark:disabled:text-fg-disabled dark:disabled:opacity-100 dark:disabled:shadow-none
primary/outline and soft: bg-control text-primary shadow-button hover:bg-control-hover
primary/ghost:   bg-transparent text-primary hover:bg-primary-subtle
neutral/solid:   bg-inverse text-fg-inverse shadow-inverse hover:bg-inverse-hover, plus the same dark disabled classes as primary/solid
neutral/outline, soft and raised (the white button, on the grey page or a white card; never a grey fill):
                 bg-control text-fg shadow-button [&_svg]:text-fg-subtle (icon-only [&_svg]:text-fg-muted) hover:bg-control-hover
neutral/ghost:   bg-transparent text-fg-muted hover:bg-hover hover:text-fg
danger/solid (the final confirm inside a dialog): bg-danger text-white shadow-danger hover:brightness-95
danger/outline (the trigger that opens it): bg-control text-danger-fg shadow-button hover:bg-danger-subtle
danger/soft:     bg-danger-subtle text-danger-fg ring-[0.5px] ring-danger-line hover:bg-danger-line
danger/ghost:    bg-transparent text-danger hover:bg-danger-subtle
flat:            shadow-none active:scale-100; white buttons (primary and neutral outline and soft, danger outline, raised) add ring-1 ring-inset ring-line hover:ring-line-strong`,
  },
  {
    name: "Input",
    notes: "Wrapper div carries the styling; the <input> inside is transparent. Optional leading icon/trailing slot.",
    code: `wrapper: group flex h-9 max-md:h-11 w-full items-center gap-2 rounded-lg bg-field px-3 shadow-field ring-1 ring-inset ring-field-line transition
         hover:ring-line-strong (stays white with its shadow; only the border darkens)
         focus-within:shadow-focus focus-within:ring-line-focus
         [&_svg]:size-5 [&_svg]:text-fg-subtle
error:   ring-danger focus-within:shadow-focus-danger
input:   w-full bg-transparent text-body-sm text-fg outline-none placeholder:text-fg-subtle
label:   text-ui-sm text-fg   (optional hint suffix: text-body-sm text-fg-muted)
message: flex items-center gap-1 text-body-xs text-fg-muted [&_svg]:size-4`,
  },
  {
    name: "Select / Dropdown",
    notes: "Radix Select. The trigger is the white button, not a field. The menu opens from its trigger and is drawn with one crisp shadow.",
    code: `trigger: flex h-9 max-md:h-11 w-full items-center gap-2 rounded-lg bg-control px-3 text-body-sm text-fg shadow-button
         hover:bg-control-hover active:scale-[0.97] data-[state=open]:bg-control-hover
         focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-line-focus
         chevron: size-4 text-fg-subtle, turns over while open: group-data-[state=open]:rotate-180 duration-150 ease-tactile
menu (select, dropdown): rounded-parent-2xl bg-floating p-2 shadow-menu
         origin-(--radix-select-content-transform-origin) animate-menu-in data-[state=closed]:animate-menu-out
         (150ms in, 120ms out, from scale .97; reduced motion: motion-reduce:animate-menu-fade-in, fade only)
item:    flex items-center gap-2 rounded-concentric-2 p-2 text-body-sm text-fg-muted not-first:mt-1
         highlighted: bg-hover text-fg       chosen: bg-selected text-fg, no tick; a highlight stays a step below chosen
other floating layers (popover, combobox): rounded-parent-2xl bg-floating p-2 shadow-md
group label: px-2 py-1 text-overline-xs text-fg-subtle`,
  },
  {
    name: "Checkbox, Radio, Switch",
    code: `checkbox: size-4 rounded-xs bg-surface shadow-xs ring-1 ring-inset ring-line-strong
          checked: bg-primary ring-primary, white 1.6px check stroke
radio:    size-4 rounded-full (same states), checked: bg-primary with a size-2 white dot
switch:   track h-6 w-10 rounded-full bg-track p-1 → checked bg-switch-on (the primary, or a mid grey in dark mode when the primary is near-white, since the thumb is always white)
          thumb size-4 rounded-full bg-white shadow-sm, translate-x-4 when checked
all:      focus-visible:shadow-focus-primary; disabled: bg-track no ring/shadow`,
  },
  {
    name: "Accordion",
    notes: "Radix Accordion. Use type=\"multiple\" for settings panels, type=\"single\" collapsible for FAQs.",
    code: `item:    border-b border-line (none on the last item)
trigger: flex flex-1 items-center justify-between gap-2 py-4 text-ui-sm text-fg
         chevron ChevronDownIcon size-5 text-fg-subtle, rotates 180° when open
         row actions (e.g. Reset) sit beside the trigger, never inside it
content: pb-5, height animates open/closed (200ms ease-out-expo)`,
  },
  {
    name: "Tile group",
    notes: "Single-choice tiles (plans, layouts, swatches, options). Radix RadioGroup underneath, so arrow keys move the selection.",
    code: `group:   grid gap-2 (set columns per use)
tile:    flex flex-col items-center justify-center gap-2 rounded-parent-lg p-2 text-ui-xs text-fg-muted
         ring-1 ring-inset ring-line hover:ring-line-strong hover:text-fg (no gray fill)
selected: bg-raised text-fg shadow-sm ring-[rgb(0_0_0/0.5)] dark:ring-[rgb(255_255_255/0.5)] dark:shadow-control
inner content hugging the tile edge: rounded-concentric-2`,
  },
  {
    name: "Card",
    code: `page:    min-h-screen bg-canvas, cards laid out with gap-6 (24px)
card:    rounded-2xl bg-surface shadow-sm
header:  flex items-start gap-4 p-5
         icon: size-10 rounded-full ring-1 ring-inset ring-line text-fg-muted [&_svg]:size-5
         title: text-ui-md text-fg   description: text-body-sm text-fg-muted
divider: h-px bg-line (full-bleed between sections)
content: p-5        footer: flex items-center gap-3 px-5 py-4 (actions right-aligned)`,
  },
  {
    name: "Dialog",
    code: `overlay: fixed inset-0 bg-overlay backdrop-blur-[6px]
content: max-w-[440px] rounded-3xl bg-floating shadow-lg, enters with fade + 4px rise (160ms, ease-out-expo)
layout:  header (as Card header, title in text-ui-md) / body with border-t / footer with border-t, buttons right-aligned
close:   absolute top-4 right-4 size-6 rounded-md text-fg-muted hover:bg-hover`,
  },
  {
    name: "Tabs",
    code: `segmented: list rounded-parent-lg bg-tray p-1 gap-1; trigger h-7 flex-1 rounded-concentric-1 text-ui-sm text-fg-muted
           active: bg-raised text-fg shadow-sm
line:      list flex gap-6 border-b border-line; trigger h-12 text-ui-sm text-fg-muted
           active: text-fg with a 2px bg-primary bar on the bottom edge, icon turns text-primary`,
  },
  {
    name: "Badge & status",
    code: `badge:   inline-flex h-5 items-center gap-1 rounded-full px-2 text-ui-xs tabular-nums, in every size and at every radius
         tint (default): bg-{state}-line text-{state}-fg
         soft: bg-{state}-subtle text-{state}-fg shadow-badge (its edge is drawn from its own text color)
         neutral soft: bg-control text-fg-muted shadow-button (never a grey fill)
         solid: bg-{state} text-white
         outline: bg-transparent ring-1 ring-inset ring-{state}-line text-{state}
status pill (tables): h-6 rounded-full bg-control px-2 text-ui-xs text-fg-muted shadow-button + size-2 dot in bg-{state}`,
  },
  {
    name: "Alert, Tooltip, Avatar",
    code: `alert:   flex items-start gap-3 rounded-xl p-4 bg-{state}-subtle, Ri*Fill icon size-5 text-{state},
         title text-ui-sm text-fg, body text-body-sm text-fg-muted
tooltip: rounded-md bg-inverse px-2 py-1 text-body-xs text-fg-inverse shadow-md
avatar:  rounded-full, sizes 24/32/40/48/64; fallback initials on bg-{state}-line text-{state}-fg
         groups overlap -space-x-2 with ring-2 ring-line-inverse`,
  },
];

/** Recipes for the extended component set, widgets and page patterns (mirrors src/components/ui and src/components/widgets). */
export const extendedRecipes: { name: string; notes?: string; code: string }[] = [
  {
    name: "Dropdown menu & popover",
    notes: "Radix DropdownMenu / Popover. Menus are for actions; popovers hold small forms or details. Both open from their trigger.",
    code: `menu:     rounded-parent-2xl bg-floating p-2 shadow-menu min-w-48, origin-(--radix-dropdown-menu-content-transform-origin) animate-menu-in / animate-menu-out
item:     flex items-center gap-2 rounded-concentric-2 p-2 text-body-sm text-fg-muted [&_svg]:size-4 text-fg-subtle
          highlighted: bg-hover text-fg; danger item: text-danger-fg, highlighted bg-danger-subtle
          shortcut: ml-auto text-ui-xs text-fg-subtle; checkbox item: CheckIcon text-primary on the right; radio item chosen: bg-selected
label:    px-2 py-1 text-overline-xs text-fg-subtle     separator: -mx-2 my-2 h-px bg-line
popover:  w-72 rounded-parent-2xl bg-floating p-4 shadow-md (no border), same motion as menus`,
  },
  {
    name: "Command menu & combobox",
    notes: "cmdk. The command menu is a search field over a grouped, filtered list; the ⌘K palette puts it in a Dialog. Combobox = select-style trigger + Popover + Command.",
    code: `command:  flex flex-col rounded-parent-2xl bg-floating
input:    h-12 border-b border-line px-4, SearchIcon size-5 text-fg-subtle, text-body-sm placeholder:text-fg-subtle
list:     max-h-80 overflow-y-auto p-2; group heading px-2 py-1 text-overline-xs text-fg-subtle
item:     rounded-concentric-2 p-2 text-body-sm text-fg-muted; data-[selected=true]: bg-brand-subtle text-fg, icon text-brand
         Command.Root accepts inDialog, value, defaultValue, onValueChange, shouldFilter; Command.Item accepts onSelect, disabled. CommandDialog wraps the menu in a focus-trapped modal. The site palette is ⌘K.
empty:    py-8 text-center text-body-sm text-fg-muted
combobox trigger: the select trigger recipe with ChevronsUpDownIcon; chosen item bg-selected + CheckIcon text-primary`,
  },
  {
    name: "Toast",
    notes: "Sonner, unstyled and drawn from tokens. <Toaster /> once at the root, then toast(), toast.success(), toast.error().",
    code: `toast:    flex w-full items-start gap-3 rounded-2xl bg-floating p-4 shadow-md, bottom-right, gap 8px
icon:     size-5 in the state color (success, info, warning, danger); loading spins in text-fg-subtle
title:    text-ui-sm text-fg      description: text-body-xs text-fg-muted
action:   h-7 rounded-button-sm bg-primary px-2 text-ui-sm text-primary-foreground shadow-primary (one per toast)`,
  },
  {
    name: "Sheet & drawer",
    notes: "Radix Dialog as a panel. side = right | left (sheet) | bottom (drawer, with a grab handle). Inset from the viewport edge by 8px so its corners show.",
    code: `overlay:  fixed inset-0 bg-overlay backdrop-blur-[6px]
panel:    fixed inset-y-2 right-2 w-[calc(100%-1rem)] max-w-sm rounded-3xl bg-floating shadow-lg; slides 300ms ease-tactile, out 200ms
drawer:   inset-x-2 bottom-2 max-h-[85vh] rounded-3xl; handle mx-auto mt-3 h-1 w-10 rounded-full bg-track-strong
layout:   header p-5 (title text-ui-md, description text-body-sm text-fg-muted) / body border-t p-5 overflow-y-auto / footer border-t px-5 py-4 right-aligned
reduced motion: fade only`,
  },
  {
    name: "Table, sort & pagination",
    notes: "Tables sit full-bleed inside a card under a CardDivider. useTableSort() cycles a column asc → desc → off and sets aria-sort.",
    code: `table:    w-full text-left tabular-nums inside overflow-x-auto
head row: bg-table-head; th h-9 px-5 text-ui-xs text-fg-muted
body:     divide-y divide-line; row hover:bg-hover, selected bg-primary-subtle; td px-5 py-3 text-body-sm text-fg-muted (primary column text-ui-sm text-fg)
sort:     th button -mx-2 h-7 rounded-md px-2 text-ui-xs, ChevronsUpDown / ArrowUp / ArrowDown size-4 text-fg-subtle; active column text-fg
numbers:  right-aligned
pagination: h-8 min-w-8 rounded-button-sm text-ui-sm tabular-nums text-fg-muted hover:bg-hover; current page bg-control text-fg shadow-button
            Previous/Next with chevrons (labels hide on phones), ellipsis for gaps: 1 … 4 5 6 … 12`,
  },
  {
    name: "Breadcrumb & kbd",
    code: `breadcrumb: ol flex flex-wrap items-center gap-2 text-ui-sm text-fg-muted; links hover:text-fg; current page text-fg (aria-current)
            separator ChevronRightIcon size-4 text-fg-subtle; collapse the middle with an ellipsis
kbd:        inline-flex h-5 min-w-5 rounded-xs bg-surface px-1 text-ui-xs text-fg-subtle ring-1 ring-inset ring-line; KbdGroup gap-1`,
  },
  {
    name: "Progress, skeleton, empty state",
    code: `progress: h-2 (small h-1) rounded-full bg-track, fill rounded-full bg-primary or bg-{success|warning|danger}, width animates 300ms
ring:     SVG, track stroke-track, value stroke-primary round caps, value in the middle text-ui-xs tabular-nums
skeleton: rounded-md bg-track motion-safe:animate-pulse, shaped like the content it replaces (rounded-full for avatars)
empty:    centered flex-col gap-4 px-6 py-12; icon size-12 rounded-full bg-surface shadow-sm ring-1 ring-line text-fg-muted;
          title text-ui-md text-fg, one line text-body-sm text-fg-muted, then at most one primary + one outline action`,
  },
  {
    name: "Stepper",
    notes: "For multi-step flows (onboarding, checkout). Horizontal by default, vertical for side panels. Completed steps can be clicked to go back.",
    code: `marker:   size-6 rounded-full text-ui-xs tabular-nums
          done: bg-primary text-primary-foreground + CheckIcon; current: bg-surface text-primary ring-2 ring-inset ring-primary;
          upcoming: bg-surface text-fg-subtle ring-1 ring-inset ring-line-strong
connector: h-0.5 (vertical w-0.5) rounded-full, bg-primary once passed, else bg-track
label:    title text-ui-sm (upcoming text-fg-muted), description text-body-xs text-fg-subtle`,
  },
  {
    name: "Segmented control & toggle group",
    notes: "Segmented control (Radix ToggleGroup single, always has a value) switches a value; Tabs switch views. Toggle group = formatting / view options.",
    code: `segmented: tray rounded-parent-lg bg-tray p-1 gap-1; item h-7 (small h-6 text-ui-xs) flex-1 rounded-concentric-1 px-3 text-ui-sm text-fg-muted
           on: bg-raised text-fg shadow-sm
toggle:    h-8 min-w-8 rounded-button-sm px-2 text-fg-muted [&_svg]:size-4, ghost hover:bg-hover; on: bg-selected text-fg
           outline: bg-control shadow-button; on: bg-control-hover text-primary; press active:scale-[0.94]`,
  },
  {
    name: "Calendar & date picker",
    notes: "Calendar is keyboard-first (arrows by day/week, PageUp/PageDown by month), weeks start Monday, always six rows. Date picker = select-style trigger + Popover + Calendar.",
    code: `header:   month title text-ui-sm text-fg between two size-7 ghost chevron buttons
weekdays: h-7 text-ui-xs text-fg-subtle
day:      size-9 rounded-md text-body-sm text-fg hover:bg-hover active:scale-[0.94]; outside month text-fg-disabled
          today: text-primary + size-1 dot; chosen: bg-primary text-primary-foreground; range middle: bg-primary-subtle row band
          disabled: text-fg-disabled line-through; marked dates: size-1 dot bg-fg-subtle
trigger:  select trigger recipe with CalendarIcon, value in tabular figures; popover p-3`,
  },
  {
    name: "File upload & OTP",
    code: `dropzone: rounded-xl border border-dashed border-line-strong bg-subtle px-6 py-8 text-center; icon size-10 rounded-full bg-surface shadow-sm
          dragging: border-primary bg-primary-subtle, icon text-primary; "Click to upload" is a text-primary label for a sr-only file input
file row: rounded-xl bg-surface p-3 shadow-xs ring-1 ring-line; name text-ui-sm, size/percent text-body-xs tabular-nums, small progress; error ring-danger-line + text-danger-fg
otp slot: size-11 rounded-lg bg-field shadow-field ring-1 ring-inset ring-field-line text-ui-lg tabular-nums;
          active: ring-line-focus shadow-focus; error: ring-danger; groups of 3 split by a short h-0.5 w-3 bar`,
  },
  {
    name: "Charts",
    notes: "Recharts with token colors (var(--primary), var(--track-strong), var(--chart-1…5)) so charts follow the theme and dark mode. One accent series; others neutral.",
    code: `grid:     horizontal lines only, stroke var(--line)
axes:     no axis or tick lines; ticks fill var(--fg-subtle) at 12px
series:   primary line 2px (or bars radius 4 4 0 0, maxBarSize 20) with a faint primary-to-transparent area; comparison series var(--track-strong)
tooltip:  rounded-xl bg-floating px-3 py-2 shadow-md tabular-nums; label text-ui-xs text-fg-muted; rows size-2 dot + name + value
legend:   flex gap-4 text-ui-xs text-fg-muted with size-2 dots
sparkline: plain SVG, 1.5px stroke in the primary (danger when falling) over a 18%→0 fill of the same color, h-8`,
  },
  {
    name: "Widgets",
    notes: "Each widget is exactly one card on the canvas. Shipped in components/widgets.",
    code: `stat card:   p-5; label text-ui-sm text-fg-muted + icon in a size-8 ring; value text-heading-5; delta Badge success/danger + hint text-body-xs; sparkline right
chart card:  header (title, total text-heading-5, delta badge, chart-type toggle + range segmented) / h-56 chart / divider / legend row
activity:    timeline rows: avatar 32 + small icon badge, sentence text-body-sm (actor text-ui-sm text-fg), time text-body-xs text-fg-subtle, w-px bg-line rail
agenda:      week strip of 7 day buttons (chosen bg-primary), then events: w-1 h-10 category bar, time text-ui-sm, title, place, avatars
checklist:   progress header, rows with checkbox (done: text-fg-subtle line-through), delete on hover, add-task input at the bottom
weather:     sky-gradient header with text-white reading in text-heading-2, three facts, hourly strip (now in bg-subtle)
music:       gradient cover size-16 rounded-xl, title/artist, slider scrubber with tabular times, filled media icons, round size-12 primary play button
profile:     gradient cover h-24, avatar 64 overlapping with ring-4 ring-surface, availability badge, 3 stats split by divide-x, two actions
pricing:     one featured plan with ring-2 ring-primary and the only solid CTA; price text-heading-3 tabular; checked features
notifications: line tabs All / Mentions / Unread, rows with avatar, sentence, time, size-2 bg-primary unread dot, inline Accept/Decline`,
  },
  {
    name: "Page patterns",
    notes: "Whole screens built only from the pieces above. Page titles sit on the canvas; everything else is in cards.",
    code: `dashboard:   220px side-nav card (active item bg-selected) + header (title text-heading-5, search with ⌘K, one primary action) + 3 stat cards + table card + breakdown card
marketing:   centered soft primary badge eyebrow, text-heading-1 headline, text-body-lg lead, primary + raised CTAs, product preview card, 3-column feature cards with bg-primary-subtle icon circles
auth:        split card: gradient brand panel with quote / form with social buttons, "or" divider, segmented Password | Email code, OTP
onboarding:  card with stepper header, one question per step answered with tiles, footer Back (ghost) + Continue (primary)
settings:    section nav (active item bg-surface shadow-sm) + profile form card with footer + toggles card + danger-zone card
pricing:     centered title + billing segmented control, 3 plan cards (one featured), FAQ accordion in a card
checkout:    contact and payment cards (method tiles) + sticky order summary: line items, promo input, totals dl, full-width pay button
inbox:       340px list card (search, rows with unread dot, selected bg-primary-subtle) + detail card (toolbar, message, attachment well, reply box)
file manager: breadcrumb + view segmented + New menu, folder cards, list table or grid, storage card with a stacked usage bar, dropzone`,
  },
];
