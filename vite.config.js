import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { cartographer } from "@replit/vite-plugin-cartographer"; // ✅ named import

const isReplitDev =
  process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined;

const plugins = [react(), runtimeErrorOverlay()];
if (isReplitDev) plugins.push(cartographer()); // ✅ use the named function

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve("client", "src"),
      "@shared": path.resolve("shared"),
      "@assets": path.resolve("attached_assets"),
    },
  },
  root: path.resolve("client"),
  build: {
    outDir: path.resolve("dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
