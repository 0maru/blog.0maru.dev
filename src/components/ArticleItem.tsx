import Link from 'next/link';

interface ArticleItemProps {
  title: string;
  createdAt: string;
  url: string;
  tags: string[];
}

export function ArticleItem({title, createdAt, url, tags}: ArticleItemProps) {
  const formattedDate = createdAt.slice(0, 10);

  return (
    <article className='group relative bg-header rounded-lg p-6 transition-all h-full flex flex-col border-t-2 border-accent hover:shadow-lg hover:shadow-accent/20'>
      <Link href={url} className='absolute inset-0 z-0 rounded-lg' />
      <div className='mb-3'>
        <span className='text-gray-400 text-sm'>{formattedDate}</span>
      </div>
      <div className='grow'>
        <h2 className='text-xl font-bold text-white group-hover:text-accent transition-colors mb-4'>
          {title}
        </h2>
      </div>
      <div className='flex flex-wrap gap-2 mt-auto relative z-10'>
        {tags.map((tag) => (
          <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className='inline-block'>
            <span className='inline-block px-3 py-1 text-sm text-white bg-surface hover:bg-surface-hover rounded-full transition-colors'>
              #{tag}
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
