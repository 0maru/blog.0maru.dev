import {defineCollection, z} from 'astro:content';
import {glob} from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.md',
  }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    image: z.string(),
    createdAt: z.string(),
    pubDate: z.string(),
    tags: z.array(z.string()),
    status: z.string(),
  }),
});

export const collections = {blog};
