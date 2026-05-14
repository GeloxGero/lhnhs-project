// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  srcDir: "./src/client",
  output: "server",
  integrations: [react()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8787",
          changeOrigin: true,
          cookieDomainRewrite: "localhost",
        },
      },
    },
  },
});
