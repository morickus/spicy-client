'use client';

import { useArticlesByCategory } from '@/entities/article/model/useArticlesByCategory';
import ArticleCard from '@/entities/article/ui/ArticleCard';
import SiderMobile from '@/features/sider/ui/SiderMobile';
import Pagination from '@/shared/ui/Pagination';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import { notFound } from 'next/navigation';
import React, { FC } from 'react';

interface ArticlesByCategoryProps {
  slug: string;
  title: string;
}

const ArticlesByCategory: FC<ArticlesByCategoryProps> = ({ slug, title }) => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useArticlesByCategory(slug);

  if (error instanceof Error) return notFound();

  if (!data) return;

  return (
    <Root>
      <TitleBackStyled title={title} />
      <SiderMobileStyled />
      <Content>
        {data.pages.map((page, pageIndex) => (
          <Page key={`page-${pageIndex}`}>
            {page.data && page.data.map((article) => <ArticleCard key={article.id} {...article} />)}
          </Page>
        ))}
      </Content>
      <Pagination
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  max-width: 680px;
`;

const Content = styled.div``;

const TitleBackStyled = styled(TitleBack)`
  margin-bottom: 30px;
`;

const SiderMobileStyled = styled(SiderMobile)`
  margin-bottom: 50px;
`;

const Page = styled.div`
  gap: 50px;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

export default ArticlesByCategory;
