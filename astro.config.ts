import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import {defineConfig} from 'astro/config';
import remarkLinkCard from 'remark-link-card';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.0maru.dev',
  trailingSlash: 'never',
  integrations: [mdx(), sitemap(), partytown(), tailwind()],
  outDir: './dist',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      langs: [],
      wrap: true,
    },
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          cache: true,
          shortenUrl: true,
        },
      ],
    ],
  },
});
