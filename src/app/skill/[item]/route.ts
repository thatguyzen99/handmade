import { generateSkill } from "@/design-system/skill";
import { edgeCacheHeaders, resolveConfigItem } from "@/lib/edge-cache";

/** Serves `/skill/melxels.md` (default settings), `/skill/zen.md` (legacy alias) and `/skill/<encoded settings>.md` as a SKILL.md. */
export async function GET(request: Request, ctx: RouteContext<"/skill/[item]">) {
  const config = resolveConfigItem(request, (await ctx.params).item, ".md");
  if (config instanceof Response) return config;
  return new Response(generateSkill(config), {
    headers: { "Content-Type": "text/markdown; charset=utf-8", ...edgeCacheHeaders },
  });
}
