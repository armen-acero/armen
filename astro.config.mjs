// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Sitemap is a single hand-maintained file at public/sitemap.xml.
// When you add or remove a page, update that file's <url> list.
export default defineConfig({
  site: 'https://armenandonian.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
