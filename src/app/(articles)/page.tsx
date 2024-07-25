import { articlesControllerFindAll } from '@/shared/api/generated';
import Articles from '@/views/articles';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const ArticlesPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Articles />
    </HydrationBoundary>
  );
};

export default ArticlesPage;
