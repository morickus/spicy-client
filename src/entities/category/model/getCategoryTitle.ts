'use server';

import { categoriesControllerFindAll } from '@/shared/api/generated';

const getCategoryTitle = async (slug: string): Promise<string> => {
  const categories = await categoriesControllerFindAll();
  return categories?.find((i) => i.slug === slug)?.name ?? 'Category';
};

export default getCategoryTitle;
