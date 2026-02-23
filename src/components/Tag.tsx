import Link from 'next/link';

interface TagProps {
  tag: string;
}

export function Tag({tag}: TagProps) {
  return (
    <li className='list-none'>
      <Link
        href={`/tags/${tag}`}
        className='inline-flex items-center bg-gray-800 px-4 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-700 border border-gray-700 text-gray-100 no-underline'>
        <span className='text-blue-400 font-semibold mr-2'>#</span>
        {tag}
      </Link>
    </li>
  );
}
