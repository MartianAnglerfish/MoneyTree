// vite.config.js
const path = require("path");
const react = require("@vitejs/plugin-react");
const runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal");
const { cartographer } = require("@replit/vite-plugin-cartographer");

module.exports = {
  plugins: [
    react(),
    runtimeErrorOverlay(),
    cartographer(),
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
};
