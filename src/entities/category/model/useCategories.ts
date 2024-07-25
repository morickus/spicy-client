import { categoriesControllerFindAll } from '@/shared/api/generated';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoriesControllerFindAll,
  });
};
