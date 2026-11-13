import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { type ThemeConfig, fontStylesheets } from "./config";
import { systemId, systemName, upstream } from "./brand";
import { tailwindTheme } from "./theme";
import { primaryRamp, semanticTokens, staticTokens } from "./tokens";

/** Component files shipped by the registry. The color picker is studio-only, so it stays out. */
export const uiFiles = [
  // core (from Cards)
  "accordion", "alert", "avatar", "badge", "brand-icons", "button", "card", "checkbox", "dialog", "image-placeholder",
  "input", "label", "misc", "radio", "radio-group", "select", "separator", "slider", "switch", "tabs", "textarea", "tile-group", "tooltip",
  // extended (Handmade)
  "active-bar", "audio-player", "breadcrumb", "calendar", "chart", "collapsible", "combobox", "command", "composer", "date-picker", "drawer", "dropdown-menu", "dropzone", "empty-state", "filter-builder", "highlights", "input-otp", "kbd",
  "multi-step-form", "pagination", "pill", "popover", "progress", "question-tool", "scroll-area", "section-header", "segmented-control", "sheet", "skeleton", "sparkline", "spinner", "statistic", "stepper", "table", "toast", "toggle-group", "video-player",
];
/** Ready-made widgets, installed by the shadcn CLI into your components folder. */
export const widgetFiles = [
  "activity-feed", "agenda-widget", "chart-card", "checklist-widget", "music-player", "notifications-list", "pricing-card", "profile-card", "stat-card", "weather-card",
];
export const libFiles = ["utils", "gradients", "media"];
export const dependencies = ["class-variance-authority", "clsx", "cmdk", "input-otp", "lucide-react", "radix-ui", "recharts", "sonner", "tailwind-merge"];

type CssTree = { [selector: string]: string | CssTree };

/** Parses the small, well-formed subset of CSS in theme.ts into the nested object the registry format expects. */
function parseCss(source: string): CssTree {
  const text = source.replace(/\/\*[\s\S]*?\*\//g, "");
  let i = 0;
  const parseBlock = (): CssTree => {
    const tree: CssTree = {};
    let buffer = "";
    while (i < text.length) {
      const char = text[i++];
      if (char === "{") {
        const selector = buffer.trim().replace(/\s+/g, " ");
        tree[selector] = parseBlock();
        buffer = "";
      } else if (char === "}") {
        return tree;
      } else if (char === ";") {
        const colon = buffer.indexOf(":");
        if (colon > 0) tree[buffer.slice(0, colon).trim()] = buffer.slice(colon + 1).trim();
        buffer = "";
      } else {
        buffer += char;
      }
    }
    return tree;
  };
  return parseBlock();
}

export function registryItem(config: ThemeConfig, files: { path: string; type: string; content: string; target?: string }[]) {
  // shadcn projects already declare the dark variant.
  const { "@theme inline": themeBlock, ...rules } = parseCss(tailwindTheme.replace(/@custom-variant[^;]*;/, ""));
  // Wildcard resets are dropped: an existing project keeps its Tailwind palette and only gains tokens.
  const theme = Object.fromEntries(
    Object.entries(themeBlock as Record<string, string>)
      .filter(([key]) => !key.includes("*") && key !== "--color-transparent" && key !== "--color-current")
      .map(([key, value]) => [key.replace(/^--/, ""), value]),
  );
  // A CSS @import can't follow Tailwind's, so fonts are loaded with links in the document head.
  const fontLinks = fontStylesheets(config).map((href) => `<link rel="stylesheet" href="${href}" />`).join("\n");
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: systemId,
    // Only theme items may overwrite the color variables shadcn init created.
    type: "registry:theme",
    title: systemName,
    description: `The ${systemName} design system: tokens, type, elevation, components and widgets for a shadcn/ui project. ${upstream.credit}.`,
    dependencies,
    cssVars: {
      theme,
      light: { ...staticTokens(config), ...semanticTokens(config, "light") },
      dark: { ...primaryRamp(config.primaryDark), ...semanticTokens(config, "dark") },
    },
    css: rules,
    docs: `${systemName} is installed. Add these font links to your document head:\n\n${fontLinks}\n`,
    files,
  };
}

/** Source files only change on deploy, so read them once per server process. */
let filesPromise: ReturnType<typeof readRegistryFiles> | undefined;
export function registryFiles() {
  filesPromise ??= readRegistryFiles().catch((error) => {
    filesPromise = undefined;
    throw error;
  });
  return filesPromise;
}

async function readRegistryFiles() {
  const read = (path: string) => readFile(join(process.cwd(), "src", path), "utf8");
  return Promise.all([
    ...uiFiles.map(async (name) => ({ path: `ui/${name}.tsx`, type: "registry:ui", content: await read(`components/ui/${name}.tsx`) })),
    ...widgetFiles.map(async (name) => ({
      path: `widgets/${name}.tsx`,
      type: "registry:component",
      target: `components/widgets/${name}.tsx`,
      content: await read(`components/widgets/${name}.tsx`),
    })),
    ...libFiles.map(async (name) => ({ path: `lib/${name}.ts`, type: "registry:lib", content: await read(`lib/${name}.ts`) })),
  ]);
}
