import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: "0.0.0.0",
    port: 5173, // default Vite port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      web3: "web3/dist/web3.min.js",
    },
  },
});
