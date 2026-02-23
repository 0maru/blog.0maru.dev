import type {Metadata} from 'next';
import {SITE_DESCRIPTION, SITE_TITLE} from '@/consts';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function AboutPage() {
  return (
    <div className='about-page'>
      <div className='about-content'>
        <h1>プロフィール</h1>
        <p className='mt-4'>名前: 0maru</p>
        <p className='mt-4'>
          普段は都内の企業でソフトウェアエンジニアをしています。
          <br />
          モバイルアプリからフロントエンド、バックエンドまで幅広く事業開発をしています。
          <br />
          得意なのはFlutterでのアプリ開発のはずです。
          <br />
          連絡はXのDMよりお願いします。
          <br />
          <br />
          Flutter / Vue / Nuxt.js / Python / Djnago / AWS
        </p>
        <ul>
          <li>
            <a href='https://x.com/0maru_dev' target='_blank' rel='noopener noreferrer'>
              X / Twitter
            </a>
          </li>
          <li>
            <a href='https://github.com/0maru' target='_blank' rel='noopener noreferrer'>
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <style>{`
        .about-page {
          background-color: #f9f8f7;
          min-height: 100vh;
        }
        .about-content {
          padding-top: 1rem;
          padding-left: 0.5rem;
          padding-right: 0.5rem;
          max-width: 760px;
          background-color: #ffffff;
          color: #333;
        }
        .about-content li {
          list-style: inherit;
        }
        .about-content a {
          color: #7cc7e8 !important;
        }
      `}</style>
    </div>
  );
}
