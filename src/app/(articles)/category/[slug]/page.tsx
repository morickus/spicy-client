import {
  articlesControllerFindByCategory,
  categoriesControllerFindOne,
} from '@/shared/api/generated';
import ArticlesByCategory from '@/views/articles-by-category';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const category = await categoriesControllerFindOne(slug);
  const { name, metaDescription } = category;
  const previousOpenGraph = (await parent).openGraph || {};

  return {
    title: name,
    ...(metaDescription && { description: metaDescription }),
    openGraph: {
      ...previousOpenGraph,
      title: name,
      ...(metaDescription && { description: metaDescription }),
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

  const category = await categoriesControllerFindOne(slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesByCategory slug={slug} title={category.name || 'Category'} />
    </HydrationBoundary>
  );
};

export default ArticlesByCategoryPage;
