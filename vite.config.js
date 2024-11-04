import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: "0.0.0.0", // Allow access from any IP address
    port: 5123, // Specify the port for the dev server
    open: true, // Automatically open the app in the browser
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5000", // Proxy API requests to this target
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite the path
    //   },
    // },
  },
  build: {
    outDir: "dist", // Output directory for build files
    sourcemap: true, // Generate source maps for easier debugging
    minify: "esbuild", // Use esbuild for minification
    chunkSizeWarningLimit: 1000,
  },
  resolve: {
    alias: {
      "@": "/src", // Alias for the src directory
      web3: "web3/dist/web3.min.js",
    },
  },
});
