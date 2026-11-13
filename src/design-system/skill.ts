import type { ThemeConfig } from "./config";
import { systemId, systemName } from "./brand";
import { generatePrompt } from "./prompt";

/** The prompt as an Agent Skill: a SKILL.md an agent loads whenever it works on UI. */
export function generateSkill(config: ThemeConfig) {
  const description = `Applies the ${systemName} design system (colors, type, radius, spacing, shadows and component rules) to any UI work. Use whenever creating, editing or reviewing UI, components, pages or styles in this project.`;
  return `---\nname: ${systemId}\ndescription: ${description}\n---\n\n${generatePrompt(config)}`;
}
