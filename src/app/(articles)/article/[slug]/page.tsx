import { articlesControllerFindOne } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import Article from '@/views/article';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const article = await articlesControllerFindOne(slug);
  const previousOpenGraph = (await parent).openGraph || {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      ...previousOpenGraph,
      title: article.title,
      description: article.excerpt,
      url: ROUTES.ARTICLES.BY_SLUG(slug),
    },
  };
}

const ArticlePage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesControllerFindOne(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Article slug={slug} />
    </HydrationBoundary>
  );
};

export default ArticlePage;
