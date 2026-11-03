// @ts-check
import { defineConfig } from 'astro/config';

// SITE and BASE_PATH are set by the GitHub Pages workflow; local dev serves from /.
export default defineConfig({
  site: process.env.SITE ?? 'https://nityajain24.github.io',
  base: process.env.BASE_PATH ?? '/',
});
