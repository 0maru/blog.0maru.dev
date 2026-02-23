import {ArticleItem} from '@/components/ArticleItem';
import {getAllPosts} from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className='max-w-6xl mx-auto px-4 mt-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
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
  );
}
