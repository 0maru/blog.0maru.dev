import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.0maru.dev',
  trailingSlash: 'never',
  integrations: [
    mdx(),
    sitemap(),
    partytown(),
  ],
  outDir: './dist',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      langs: [],
      wrap: true,
    },
  },
});
