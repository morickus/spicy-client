import { articlesControllerFindAll } from '@/shared/api/generated';
import Articles from '@/views/articles';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const queryClient = new QueryClient();

  let tags: string[] = [];
  if (searchParams?.tags) {
    tags = Array.isArray(searchParams.tags) ? searchParams.tags : [searchParams.tags];
  }

  await queryClient.prefetchInfiniteQuery({
    queryKey: [`articles`, { tags }],
    queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam, tags }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading articles...</div>}>
        <Articles />
      </Suspense>
    </HydrationBoundary>
  );
};

export default ArticlesPage;
