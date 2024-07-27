import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import React, { ReactNode } from 'react';
import QueryProvider from './_providers/query-provider';
import { RouteProvider } from './_providers/route-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    template: '%s | Spicy.pub – Erotic & Porn Stories for Adults',
    default: 'Spicy.pub – Erotic & Porn Stories for Adults',
  },
  description:
    'Spicy.pub – Exciting and Erotic & Porn Stories for Adults. Read the best erotic stories for free.',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || 'https://spicy.pub'),
  keywords: [
    'erotic stories',
    'porn stories',
    'hot content',
    'spicy stories',
    'sexual fantasies',
    'love stories',
    'free erotic stories',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Spicy.pub',
    url: process.env.NEXT_PUBLIC_DOMAIN,
    title: {
      template: '%s | Spicy.pub – Erotic Stories for Adults',
      default: 'Spicy.pub – Erotic Stories for Adults',
    },
    description: 'Read the best erotic stories on Spicy.pub. Free and exciting stories for adults.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      {process.env.APP_ENV == 'production' && <GoogleTagManager gtmId="GTM-K6JB9R7H" />}
      <body className={inter.className}>
        <NextTopLoader color="#6FFF2B" height={1} showSpinner={false} />
        <QueryProvider>
          <RouteProvider>{children}</RouteProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
