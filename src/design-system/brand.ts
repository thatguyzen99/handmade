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
/** Melvin's Melxels palette, sampled from his brand sheet. */
export const brandColors = {
  cream: "#F7F4EE",
  orange: "#FAAC18",
  yellow: "#FFCA05",
  purple: "#3D0066",
  navy: "#1A1A2E",
  /** Slightly different navy used as the start of the royal gradient. */
  navyDeep: "#1B1A2E",
  /** Light-mode primary (purple on cream). */
  primary: "#3D0066",
  /**
   * Dark-mode primary: a lighter, still-saturated purple derived from #3D0066.
   * 5.8:1 on navy (AA for text). White on it fails AA, so button labels use navy.
   */
  primaryDark: "#B17FEB",
} as const;

export const upstream = {
  name: "Cards",
  author: "Oliur",
  url: "https://github.com/oliur/cards",
  license: "MIT",
  credit: "Built on Cards by Oliur (MIT)",
} as const;
