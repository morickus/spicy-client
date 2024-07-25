import { articlesControllerFindAll } from '@/shared/api/generated';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useArticles = () => {
  return useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
  });
};
