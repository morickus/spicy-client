import { articlesControllerFindOne } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesControllerFindOne(slug),
    enabled: !!slug,
  });
};
