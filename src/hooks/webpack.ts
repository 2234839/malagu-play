import { HookContext, FRONTEND_TARGET } from "@malagu/cli";
import { resolve } from "path";
const VueLoaderPlugin = require("vue-loader/lib/plugin");
export default (context: HookContext) => {
  console.log("++++++++++++++++++++++++++++");

  const c = context.configurations.find((config: any) => config.name === FRONTEND_TARGET);
  c.resolve.alias = { svelte: resolve("node_modules", "svelte") };
  c.resolve.extensions = Array.from(new Set([...c.resolve.extensions, ...[".mjs", ".js", ".svelte "]]));
  c.resolve.mainFields = ["svelte", "browser", "module", "main"];
  c.module.rules.push(
    {
      test: /\.(html|svelte)$/,
      exclude: /node_modules/,
      use: {
        loader: "svelte-loader",
      },
    },
    {
      test: /\.vue$/,
      loader: "vue-loader",
    },
  );
  c.plugins.push(new VueLoaderPlugin());
  console.log("[    c]", c);
  // throw new Error("");
};
