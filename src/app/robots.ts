import { MetadataRoute } from 'next';
import * as process from 'node:process';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_API_DOMAIN}/sitemap.xml`,
  };
}
