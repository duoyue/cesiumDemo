import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import fs from "fs";

const CesiumCopyPath = resolve("public/Cesium");
const isCesiumAssetsCopied = fs.existsSync(CesiumCopyPath);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["defaults", "ie >= 11", "chrome 52"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      modernPolyfills: ["es.array.flat-map", "es.global-this"],
    }),
    isCesiumAssetsCopied
      ? null
      : copy({
          copyOnce: true,
          verbose: true,
          hook: "buildStart",
          targets: [
            {
              src: "node_modules/cesium/Build/Cesium/*/",
              dest: CesiumCopyPath,
            },
          ],
        }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5005,
  },
});
