import AppLayout from '@/layouts/AppLayout';
import '@/styles/globals.css';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

type PageProps = {};

function App({ Component, pageProps }: AppProps<PageProps>) {
  // @ts-ignore
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <DefaultSeo
        title="Spicy – Erotic & Porn Stories for Adults"
        canonical={process.env.NEXT_PUBLIC_API_DOMAIN}
        description="Spicy – Exciting and Erotic & Porn Stories for Adults. Read the best erotic stories for free."
        additionalMetaTags={[
          {
            name: 'keywords',
            content:
              'erotic stories, porn stories, hot content, spicy stories, sexual fantasies, love stories, free erotic stories',
          },
        ]}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          siteName: 'Spicy',
          url: process.env.NEXT_PUBLIC_API_DOMAIN,
          title: 'Spicy.Pub – Erotic Stories for Adults',
          description:
            'Read the best erotic stories on Spicy.Pub. Free and exciting stories for adults.',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
    </>
  );
}

export default App;
