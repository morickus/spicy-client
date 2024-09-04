import { articlesControllerFindAll } from '@/shared/api/generated';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useArticlesByCategory = (slug: string) => {
  return useInfiniteQuery({
    queryKey: [`articles`, { tags: [slug] }],
    queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam, tags: [slug] }),
    initialPageParam: 1,
    enabled: !!slug,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
};
