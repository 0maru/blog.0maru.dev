import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const blog = defineCollection({
  loader: glob({pattern: '**/*.md', base: './src/contents/blog'}),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    createdAt: z.string(),
    pubDate: z.string(),
    tags: z.array(z.string()),
    status: z.string(),
  }),
});

export const collections = {blog};
