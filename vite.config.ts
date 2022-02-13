import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";

// https://vitejs.dev/config/

const manifest: Partial<ManifestOptions> = {
  name: "SQL Play",
  short_name: "SQL Play",
  theme_color: "#fdd835",
  background_color: "#fdd835",
  display: "standalone",
  description: "Run SQL Queries anywhere, anytime",
  orientation: "any",
  scope: "/",
  start_url: "/",
  icons: [
    {
      src: "images/icons/icon-72x72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "images/icons/icon-96x96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "images/icons/icon-128x128.png",
      sizes: "128x128",
      type: "image/png",
    },
    {
      src: "images/icons/icon-144x144.png",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "images/icons/icon-152x152.png",
      sizes: "152x152",
      type: "image/png",
    },
    {
      src: "images/icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "images/icons/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "images/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  dir: "ltr",
  categories: ["education", "utilities"],

  id: "sql-play",
  lang: "en",
  publicPath: "/",
};

export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    VitePWA({
      manifest,
      workbox: {
        sourcemap: true,
      },
    }),
  ],
  server: {
    https: {
      cert: "./localhost.pem",
      key: "./localhost-key.pem",
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks
      },
    },
  },
});
