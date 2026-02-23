import type {Metadata} from 'next';
import {ArticleItem} from '@/components/ArticleItem';
import {getAllTags, getPostsByTag} from '@/lib/posts';

interface Props {
  params: Promise<{tag: string}>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({tag: encodeURIComponent(tag)}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {tag} = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `${decodedTag}の記事一覧`,
    description: `${decodedTag}の記事一覧`,
  };
}

export default async function TagPage({params}: Props) {
  const {tag} = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  return (
    <div className='max-w-(--breakpoint-md) mx-auto py-8 px-4 sm:px-6'>
      <h1 className='text-2xl text-white font-bold mb-8'>{decodedTag}のタグが付いた記事</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='md:col-span-2'>
          <div className='space-y-2'>
            {posts.map((post) => (
              <ArticleItem
                key={post.slug}
                title={post.title}
                createdAt={post.createdAt}
                url={`/posts/${post.slug}`}
                tags={post.tags}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
