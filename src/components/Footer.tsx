import {IMAGE_CDN_URL} from '@/consts';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='w-full h-40 pt-8 flex flex-col justify-start items-center bg-header'>
      <p className='flex items-center gap-2 text-sm text-white tracking-widest'>
        &copy; {year} 0maru.
      </p>
      <div className='flex mt-4 gap-4'>
        <a
          href='https://twitter.com/0maru_dev'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='x'
          className='grid place-content-center'>
          <img src={`${IMAGE_CDN_URL}/logo/x-logo-white.svg`} className='h-4 w-4' alt='X' />
        </a>
        <a
          href='https://github.com/0maru'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub'
          className='grid place-content-center'>
          <img
            src={`${IMAGE_CDN_URL}/logo/github-mark-white.svg`}
            className='h-5 w-5'
            alt='GitHub'
          />
        </a>
      </div>
    </footer>
  );
}
