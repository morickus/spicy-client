import ArticleCard from '@/components/ArticleCard';
import SiderMobile from '@/components/Sider/SiderMobile';
import { getPageLayout } from '@/layouts/PageLayout';
import { articlesControllerFindAll } from '@/shared/api/generated';
import styles from '@/styles/Home.module.scss';
import stylesMain from '@/styles/Main.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import React from 'react';

const HomePage = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['articles'],
      queryFn: ({ pageParam }) => articlesControllerFindAll({ page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.currentPage + 1 : undefined),
    });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return <div>Empty</div>;

  return (
    <div className={styles.root}>
      <p className={classNames(stylesMain.h1, styles.title)}>All erotic stories</p>
      <div className={styles.content}>
        <SiderMobile />
        <div>
          {data.pages.map((page, pageIndex) => (
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
  );
};

HomePage.getLayout = getPageLayout;

export default HomePage;
