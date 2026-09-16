import { defineConfig } from 'astro/config';

// User site → served at root (https://samiimasmoudii.github.io), no base path.
export default defineConfig({
  site: 'https://samiimasmoudii.github.io',
  build: { inlineStylesheets: 'auto' },
});
