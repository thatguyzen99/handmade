/**
 * Who this studio belongs to. Rename the system, its id or its links here and
 * every page, prompt, skill and registry item follows.
 */

/** Display name of the design system. */
export const systemName = "Melxels";

/**
 * Short id used in URLs and file names: `/r/melxels.json`, `/skill/melxels.md`,
 * `.claude/skills/melxels/SKILL.md`. Lowercase letters and dashes only.
 */
export const systemId = "melxels";

/** Previous id, still served at `/r/zen.json` and `/skill/zen.md`. */
export const legacySystemIds = ["zen"] as const;

export const author = {
  name: "Melvin Z. Freeman",
  role: "Product, Web & Brand Designer",
  handle: "@yourdesignerzen",
  xUrl: "https://x.com/yourdesignerzen",
} as const;

/**
 * Public base URL of the deployed studio. There is no domain yet, so it comes from
 * NEXT_PUBLIC_SITE_URL and falls back to the local server.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/+$/, "");

/** Source repo, if one is published (NEXT_PUBLIC_REPO_URL). Empty hides repo links. */
export const repoUrl = (process.env.NEXT_PUBLIC_REPO_URL || "").replace(/\/+$/, "");

/** The open-source project this studio is built on. Keep this credit. */
/** Melvin's Melxels palette: black/cream primary, purple and warm accents. */
export const brandColors = {
  cream: "#F7F4EE",
  /** Light-mode page canvas: a near-white cream, so white cards still lift off the page. */
  canvasLight: "#FCFBF8",
  orange: "#FAAC18",
  yellow: "#FFCA05",
  /** Pale butter start of the Sunrise gradient (the app icon's outer stroke). */
  butter: "#FFE7A3",
  purple: "#3D0066",
  navy: "#1A1A2E",
  /** Slightly different navy used as the start of the royal gradient. */
  navyDeep: "#1B1A2E",
  ink: "#0A0A0A",
  canvasDark: "#111111",
  /** Light-mode primary: near-black ink. */
  primary: "#0A0A0A",
  /** Dark-mode primary: cream, so solid buttons stay on-brand and AA on a near-black canvas. */
  primaryDark: "#F7F4EE",
  /** Accent (links, focus, selection, badges, chart-1). */
  accent: "#3D0066",
  /** Dark-mode accent: lighter purple that meets AA as text on #111111. */
  accentDark: "#B17FEB",
} as const;

export const upstream = {
  name: "Cards",
  author: "Oliur",
  url: "https://github.com/oliur/cards",
  license: "MIT",
  credit: "Built on Cards by Oliur (MIT)",
} as const;
