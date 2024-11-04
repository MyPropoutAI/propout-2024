import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: "0.0.0.0",
    port: 5123,
    open: true,
    headers: {
      // Ensure correct MIME types during development
      "Content-Type": "application/javascript",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Ensure proper module chunks
        format: "es",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
      web3: "web3/dist/web3.min.js",
    },
  },
});
