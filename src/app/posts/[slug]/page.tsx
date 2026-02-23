import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {SITE_DESCRIPTION} from '@/consts';
import {getAllPosts, getPostBySlug, renderMarkdown} from '@/lib/posts';

interface Props {
  params: Promise<{slug: string}>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({slug: post.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const post = getPostBySlug(slug);
  if (!post) return {title: 'Not Found'};
  return {
    title: post.title,
    description: SITE_DESCRIPTION,
  };
}

export default async function PostPage({params}: Props) {
  const {slug} = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const htmlContent = await renderMarkdown(post.content);

  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <article className='prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface prose-pre:border prose-pre:border-header'>
        <h1 className='text-4xl font-bold text-white mb-2'>{post.title}</h1>
        <div className='text-sm text-gray-400 mb-8'>{post.createdAt}</div>
        <div dangerouslySetInnerHTML={{__html: htmlContent}} />
      </article>
    </div>
  );
}
