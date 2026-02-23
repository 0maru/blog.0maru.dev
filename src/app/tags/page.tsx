import type {Metadata} from 'next';
import {Tag} from '@/components/Tag';
import {getAllTags} from '@/lib/posts';

export const metadata: Metadata = {
  title: 'タグ一覧',
  description: 'タグ一覧',
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className='py-8'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <h1 className='text-4xl font-bold text-white text-center mb-4'>タグ一覧</h1>
        <section className='flex flex-wrap gap-3 p-4'>
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </section>
      </div>
    </div>
  );
}
