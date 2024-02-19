import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { "@": path.resolve(__dirname, "./src") },
      { find: "web3", replacement: "web3/dist/web3.min.js" },
    ],
  },
});
