import ArticleCard from '@/components/ArticleCard';
import IconBack from '@/components/IconBack';
import SiderMobile from '@/components/Sider/SiderMobile';
import { getPageLayout } from '@/layouts/PageLayout';
import {
  articlesControllerFindByCategory,
  categoriesControllerFindAll,
} from '@/shared/api/generated';
import styles from '@/styles/Home.module.scss';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesControllerFindAll(),
  });
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`articles`, slug],
      queryFn: ({ pageParam }) =>
        articlesControllerFindByCategory(slug as string, { page: pageParam }),
      initialPageParam: 1,
      enabled: typeof slug === 'string',
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
    });

  if (!slug) return <div>Not found category</div>;

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return <div>Empty</div>;

  const title = categories?.find((i) => i.slug === slug)?.name ?? 'Category';

  return (
    <>
      <NextSeo title={`${title} | Spicy.Pub – Erotic & Porn Stories for Adults`} />
      <div className={styles.root}>
        <IconBack title={title} />
        <div className={styles.content}>
          <SiderMobile />
          <div>
            {data?.pages.map((page, pageIndex) => (
              <div className={styles.section} key={`page-${pageIndex}`}>
                {page.data &&
                  page.data.map((article) => <ArticleCard key={article.id} {...article} />)}
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            {isFetchingNextPage ? (
              'Loading more...'
            ) : hasNextPage ? (
              <button onClick={() => fetchNextPage()}>Load More</button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

CategoryPage.getLayout = getPageLayout;

export default CategoryPage;
