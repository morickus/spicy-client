import { articlesControllerFindByCategory } from '@/shared/api/generated';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useArticlesByCategory = (slug: string) => {
  return useInfiniteQuery({
    queryKey: [`articles-by-category`, slug],
    queryFn: ({ pageParam }) => articlesControllerFindByCategory(slug, { page: pageParam }),
    initialPageParam: 1,
    enabled: !!slug,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
  });
};
