const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
const path = require("path");

module.exports = async () => {
  const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal").then(mod => mod.default);

  return defineConfig({
    plugins: [
      react(),
      runtimeErrorOverlay(),
    ],
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
};
