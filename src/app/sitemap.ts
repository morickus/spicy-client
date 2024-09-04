import { ArticleAllResponseDto, articlesControllerFindAll } from '@/shared/api/generated';
import { MetadataRoute } from 'next';
import * as process from 'node:process';

async function getAllArticles(): Promise<ArticleAllResponseDto[]> {
  let currentPage = 1;
  const allArticles = [];

  while (true) {
    try {
      const response = await articlesControllerFindAll({ page: currentPage });
      allArticles.push(...(response.data || []));

      if (!response.hasNext) {
        break;
      }

      currentPage++;
    } catch (error) {
      console.error(`Error when retrieving articles on the page ${currentPage}:`, error);
      break;
    }
  }

  return allArticles;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const articles = await getAllArticles();
    const URL = process.env.NEXT_PUBLIC_DOMAIN || 'https://spicy.pub';

    const articlesRoutes = articles.map(({ slug, updatedAt }) => ({
      url: `${URL}/article/${slug}`,
      lastModified: updatedAt,
    }));

    const routes = [''].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
    }));

    return [...routes, ...articlesRoutes];
  } catch (error) {
    console.error('Error creating sitemap:', error);
    return [];
  }
}

export const revalidate = 3600;
