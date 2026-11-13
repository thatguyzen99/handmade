# Zen Studio

**A design system studio by [Melvin Z. Freeman](https://x.com/yourdesignerzen)** (Product, Web & Brand Designer, [@yourdesignerzen](https://x.com/yourdesignerzen)). Tune color, neutrals, fonts, radius, density and shadows live, then take the result anywhere: as shadcn/ui components, as an AI prompt, or as an agent skill.

> Built on Cards by Oliur (MIT). See [Credits](#license--credits).

Zen Studio is a systematic design language ("minimalism with soul") built on **shadcn/ui** conventions (Radix primitives, cva, `cn()`, `data-slot`) with its own semantic token layer (`bg-surface` / `text-fg` / `ring-line` colors, `text-ui-sm`-style type). The site, the registry, the copyable prompt and the agent skill all read from `src/design-system/`, so they can't drift apart.

Defaults: Zen cobalt `#2F3CF4` (dark `#7C86FF`), warm stone neutrals, Familjen Grotesk for UI and headings, JetBrains Mono, 10px radius and quiet shadows.

## What's inside

- **Core components:** accordion, alert, avatar, badge, brand icons, button, card, checkbox, dialog, image placeholder, input, label, radio group, select, separator, slider, switch, tabs, textarea, tile group, tooltip and more.
- **Extended components:** dropdown menu, popover, command palette, combobox, toast (Sonner), sheet and drawer, sortable table, pagination, breadcrumb, progress and progress ring, skeleton, empty state, kbd, stepper, segmented control, toggle and toggle group, calendar, date and date-range picker, input OTP, dropzone, chart helpers and sparkline.
- **Widgets** (`src/components/widgets`): KPI stat card with sparkline, chart card, activity feed, agenda, checklist, weather, music player, profile, pricing and notifications.
- **Page patterns:** dashboard, marketing hero + features, auth, onboarding, settings, pricing section, checkout, inbox list-detail and file manager.

## Installation

The links below use the default settings (`zen`) and `https://YOUR-DOMAIN` as the deployed site URL. The studio gives you links with your own settings encoded in them.

### Option 1: Install the components (shadcn/ui projects)

You need a project that uses Tailwind CSS v4 and has shadcn/ui set up with Radix:

```bash
npx shadcn@latest add https://YOUR-DOMAIN/r/zen.json
```

This installs the tokens (added to your global CSS), the components in `components/ui/`, the widgets, the `lib/utils` and `lib/gradients` helpers, and the dependencies (`class-variance-authority`, `clsx`, `lucide-react`, `radix-ui`, `tailwind-merge`, `sonner`, `cmdk`, `input-otp`, `recharts`). Then paste the font `<link>` tags the CLI prints (also in the **Copy prompt** dialog) into your document `<head>`.

### Option 2: Paste the AI prompt

Copy the prompt from the studio into any AI builder, chat or rules file (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`). It describes tokens, type, principles, do's and don'ts, and recipes for every component, widget and pattern.

### Option 3: Add it as an agent skill

```bash
mkdir -p .claude/skills/zen && curl -fsSL https://YOUR-DOMAIN/skill/zen.md -o .claude/skills/zen/SKILL.md
```

[`skills/zen/SKILL.md`](skills/zen/SKILL.md) is generated from `src/design-system/` by `pnpm skill`. Don't edit it by hand: it's regenerated on `dev` and `build`, and `pnpm lint` fails if the committed copy is stale.

## Running the studio locally

Requires Node 20+ and pnpm 9.

```bash
pnpm install
pnpm dev       # http://localhost:3000
pnpm lint      # eslint, plus the 4px spacing-grid and token checks
pnpm build     # production build (regenerates theme.css and the skill first)
pnpm start -p 3100
```

### Configuration

| Variable | Default | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3100` | Base URL used in registry, skill and prompt links. Set it to your domain before deploying. |
| `NEXT_PUBLIC_REPO_URL` | empty | Public repo link shown in credits (hidden when empty). |

The name, author and upstream credit live in one place: `src/design-system/brand.ts`.

## Where things live

| File | What it is |
| --- | --- |
| `src/design-system/brand.ts` | Name, id (`zen`), author, site/repo URLs, upstream credit. |
| `src/design-system/guidelines.ts` | The aesthetic: principles, color rules, do/don't, component, widget and pattern recipes. |
| `src/design-system/config.ts` | Defaults, fonts, presets, share-link encoding. |
| `src/design-system/tokens.ts` / `theme.ts` | CSS variables and the Tailwind v4 `@theme` (written to `src/app/theme.css`). |
| `src/design-system/prompt.ts` / `skill.ts` / `registry.ts` | The prompt, the skill and the shadcn registry item at `/r/<settings>.json`. |
| `src/components/ui/*` | The component library. |
| `src/components/widgets/*` | Widgets built from the library. |
| `src/components/studio/*` | The website: customizer, showcases, widgets, patterns. |

## Deploying

A standard Next.js app, so it runs on Vercel or any Node host. Set `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_REPO_URL`), then deploy. No analytics are included; add your own tag in `src/app/layout.tsx` if you want one. `/r/*` and `/skill/*` are pure functions of the URL and send CDN-friendly `Cache-Control` headers.

## License & credits

[MIT](LICENSE). **Built on Cards by Oliur (MIT)**: [github.com/oliur/cards](https://github.com/oliur/cards). Also builds on shadcn/ui, Radix UI, the Tailwind CSS palette, Lucide, Simple Icons, Sonner, cmdk, input-otp, Recharts and the Familjen Grotesk and JetBrains Mono fonts. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Not affiliated with shadcn or Oliur.
