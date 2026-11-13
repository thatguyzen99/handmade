/**
 * Who this studio belongs to. Rename the system, its id or its links here and
 * every page, prompt, skill and registry item follows.
 */

/** Display name of the design system. */
export const systemName = "Handmade";

/**
 * Short id used in URLs and file names: `/r/handmade.json`, `/skill/handmade.md`,
 * `.claude/skills/handmade/SKILL.md`. Lowercase letters and dashes only.
 */
export const systemId = "handmade";

/** Previous ids, still served at `/r/melxels.json`, `/skill/melxels.md`, `/r/zen.json` and `/skill/zen.md`. */
export const legacySystemIds = ["melxels", "zen"] as const;

export const author = {
  name: "Melvin Z. Freeman",
  role: "Product, Web & Brand Designer",
  handle: "@yourdesignerzen",
  xUrl: "https://x.com/yourdesignerzen",
} as const;

/**
 * Public base URL of the deployed studio. The Vercel project and repo stay
 * named melxels; the live URL is still NEXT_PUBLIC_SITE_URL (https://handmadeui.vercel.app).
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/+$/, "");

/** Source repo, if one is published (NEXT_PUBLIC_REPO_URL). Empty hides repo links. */
export const repoUrl = (process.env.NEXT_PUBLIC_REPO_URL || "").replace(/\/+$/, "");

/** Handmade palette: ink/cream primary and accent, yellow and orange highlights, Sunrise as the featured gradient. */
export const brandColors = {
  cream: "#F7F4EE",
  /** Light-mode page canvas: a near-white cream, so white cards still lift off the page. */
  canvasLight: "#FCFBF8",
  orange: "#FAAC18",
  yellow: "#FFCA05",
  /** Pale butter start of the Sunrise gradient. */
  butter: "#FFE7A3",
  ink: "#0A0A0A",
  canvasDark: "#111111",
  /** Light-mode primary and accent: near-black ink. */
  primary: "#0A0A0A",
  /** Dark-mode primary and accent: cream, so solid buttons stay on-brand and AA on a near-black canvas. */
  primaryDark: "#F7F4EE",
  /** Accent (links, focus, selection, badges, chart-1): ink in light mode. */
  accent: "#0A0A0A",
  /** Dark-mode accent: cream, AA (and AAA) as text on #111111. */
  accentDark: "#F7F4EE",
} as const;

export const upstream = {
  name: "Cards",
  author: "Oliur",
  url: "https://github.com/oliur/cards",
  license: "MIT",
  credit: "Built on Cards by Oliur (MIT)",
} as const;
