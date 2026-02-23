import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkLinkCard from 'remark-link-card';

export interface Post {
  slug: string;
  title: string;
  createdAt: string;
  pubDate: string;
  tags: string[];
  status: string;
  content: string;
  htmlContent?: string;
}

const POSTS_DIR = path.join(process.cwd(), 'src/contents/blog');

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

export function getAllPosts(): Post[] {
  const files = getAllMarkdownFiles(POSTS_DIR);
  const posts = files.map((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const {data, content} = matter(fileContent);
    return {
      slug: data.slug as string,
      title: data.title as string,
      createdAt: String(data.createdAt),
      pubDate: String(data.pubDate),
      tags: data.tags as string[],
      status: data.status as string,
      content,
    };
  });

  return posts
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return [...tags];
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkLinkCard, {cache: true, shortenUrl: true})
    .use(remarkHtml, {sanitize: false})
    .process(content);
  return result.toString();
}
