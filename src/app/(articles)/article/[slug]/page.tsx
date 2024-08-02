import { articlesControllerFindOne } from '@/shared/api/generated';
import Article from '@/views/article';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  { params: { slug } }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const article = await articlesControllerFindOne(slug);
    const previousOpenGraph = (await parent).openGraph || {};

    return {
      title: article.title,
      description: article.excerpt,
      openGraph: {
        ...previousOpenGraph,
        title: article.title,
        description: article.excerpt,
        url: './',
      },
    };
  } catch (error) {
    notFound();
  }
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
