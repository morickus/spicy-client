import { articlesControllerFindAll } from '@/shared/api/generated';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

export const useArticles = () => {
  const searchParams = useSearchParams();
  const tags = searchParams.getAll('tags');

  return useInfiniteQuery({
    queryKey: ['articles', { tags }],
    queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam, tags }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.page + 1 : undefined),
  });
};
