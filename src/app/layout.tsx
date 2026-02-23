import type {Metadata} from 'next';
import Script from 'next/script';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {SITE_DESCRIPTION, SITE_TITLE, SITE_URL} from '@/consts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'ja_JP',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='ja'>
      <head>
        <Script
          id='gtm'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P2LKPC2K');`,
          }}
        />
      </head>
      <body className='bg-background'>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-P2LKPC2K'
            height='0'
            width='0'
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        <Header />
        <main className='min-h-dvh'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
