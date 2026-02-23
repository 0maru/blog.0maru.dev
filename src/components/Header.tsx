import Link from 'next/link';

export function Header() {
  return (
    <header className='h-16 px-4 bg-header text-white tracking-widest'>
      <div className='flex justify-between items-center h-full max-w-6xl mx-auto'>
        <Link className='text-xl' href='/'>
          blog.0maru.dev
        </Link>
        <nav>
          <ul className='flex gap-2 md:gap-4'>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/tags'>Tags</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
