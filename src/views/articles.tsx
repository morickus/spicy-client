'use client';

import { useArticles } from '@/entities/article/model/useArticles';
import ArticleCard from '@/entities/article/ui/ArticleCard';
import SiderMobile from '@/features/sider/ui/SiderMobile';
import Pagination from '@/shared/ui/Pagination';
import { H1, H3 } from '@/shared/ui/Texts';
import styled from '@emotion/styled';
import { notFound } from 'next/navigation';
import React from 'react';

const Articles = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useArticles();

  if (error instanceof Error) return notFound();

  if (!data) return;

  return (
    <Root>
      <Title>All erotic stories</Title>
      <SiderMobileStyled />
      <Content>
        {data.pages[0].total === 0 && <H3>Such stories not found :(</H3>}
        {data.pages.map((page, pageIndex) => (
          <Page key={`page-${pageIndex}`}>
            {page.data &&
              page.data.map((article) => <ArticleCard key={article.id} data={article} />)}
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

const Title = styled(H1)`
  margin-bottom: 30px;
`;

const SiderMobileStyled = styled(SiderMobile)`
  margin-bottom: 50px;
`;

const Content = styled.div``;

const Page = styled.div`
  gap: 50px;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 50px;
  }
`;

export default Articles;
