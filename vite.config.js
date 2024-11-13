import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "My React Vite PWA",
        short_name: "React Vite PWA",
        description: "My awesome React Vite PWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png", // Add your 192x192 logo
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Add your 512x512 logo
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Location",
            short_name: "Location",
            url: "/location",
            icons: [
              {
                src: "location-icon.png",
                sizes: "192x192",
              },
            ],
          },
          {
            name: "Camera",
            short_name: "Camera",
            url: "/camera",
            icons: [
              {
                src: "camera-icon.png",
                sizes: "192x192",
              },
            ],
          },
        ],
        display: "standalone",
        scope: "/",
        start_url: "/",
        categories: ["lifestyle", "utilities"],
        lang: "en-US",
        orientation: "any",
        related_applications: [],
        prefer_related_applications: false,
        screenshots: [],
        iarc_rating_id: "",
        features: ["locationStorage", "cameraAccess"],
        share_target: {
          action: "/share",
          method: "GET",
          enctype: "application/x-www-form-urlencoded",
          params: {
            title: "title",
            text: "text",
            url: "url",
          },
        },
      },
      workbox: {
        globPatterns: ["**/*"],
        globDirectory: "dist",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: process.env.SW_DEV === "true",
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      web3: "web3/dist/web3.min.js",
    },
  },
  server: {
    proxy: {
      "/api/socket": {
        target: [
          "http://localhost:5173",
          "https://www.mypropout.com",
          "https://www.mypropout.com",
          "http://localhost:3000",
        ],
        ws: true,
      },
    },
  },
});
