import type {MetadataRoute} from 'next';
import {SITE_URL} from '@/consts';
import {getAllPosts, getAllTags} from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.createdAt),
  }));

  const tagEntries = tags.map((tag) => ({
    url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
  }));

  return [
    {url: SITE_URL, lastModified: new Date()},
    {url: `${SITE_URL}/about`},
    {url: `${SITE_URL}/tags`},
    ...postEntries,
    ...tagEntries,
  ];
}
