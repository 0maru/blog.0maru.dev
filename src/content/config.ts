import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    createdAt: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    status: z.string(),
  })
})
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
}
