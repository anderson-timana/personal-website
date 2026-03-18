// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
import playformCompress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://andersontimana.me',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap(), playformCompress()],
  vite: {
    plugins: [tailwindcss()]
  },
  build: {
    inlineStylesheets: 'always',
  },
});