import getCategoryTitle from '@/entities/category/model/getCategoryTitle';
import { articlesControllerFindByCategory } from '@/shared/api/generated';
import ArticlesByCategory from '@/views/articles-by-category';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const title = await getCategoryTitle(slug);
  const previousOpenGraph = (await parent).openGraph || {};

  return {
    title,
    openGraph: {
      ...previousOpenGraph,
      title,
      url: './',
    },
  };
}

const ArticlesByCategoryPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['articles-by-category'],
    queryFn: ({ pageParam }) => articlesControllerFindByCategory(slug, { page: pageParam }),
    initialPageParam: 1,
  });

  const title = await getCategoryTitle(slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesByCategory slug={slug} title={title} />
    </HydrationBoundary>
  );
};

export default ArticlesByCategoryPage;
