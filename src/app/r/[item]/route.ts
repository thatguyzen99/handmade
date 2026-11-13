import { registryFiles, registryItem } from "@/design-system/registry";
import { edgeCacheHeaders, resolveConfigItem } from "@/lib/edge-cache";

/** Serves `/r/melxels.json` (default settings), `/r/zen.json` (legacy alias) and `/r/<encoded settings>.json` to the shadcn CLI. */
export async function GET(request: Request, ctx: RouteContext<"/r/[item]">) {
  const config = resolveConfigItem(request, (await ctx.params).item, ".json");
  if (config instanceof Response) return config;
  return Response.json(registryItem(config, await registryFiles()), { headers: edgeCacheHeaders });
}
