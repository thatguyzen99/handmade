/**
 * Who this studio belongs to. Rename the system, its id or its links here and
 * every page, prompt, skill and registry item follows.
 */

/** Display name of the design system. */
export const systemName = "Zen Studio";

/**
 * Short id used in URLs and file names: `/r/zen.json`, `/skill/zen.md`,
 * `.claude/skills/zen/SKILL.md`. Lowercase letters and dashes only.
 */
export const systemId = "zen";

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
export const upstream = {
  name: "Cards",
  author: "Oliur",
  url: "https://github.com/oliur/cards",
  license: "MIT",
  credit: "Built on Cards by Oliur (MIT)",
} as const;
