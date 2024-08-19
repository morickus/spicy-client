'use client';

import { useCategories } from '@/entities/category/model/useCategories';
import { CategoryList } from '@/entities/category/ui/CategoryList';
import Footer from '@/features/footer/ui/Footer';
import { TitleP3 } from '@/shared/ui/Texts';
import styled from '@emotion/styled';
import React from 'react';

const Sider = () => {
  const { data, error } = useCategories();

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return;

  return (
    <Root>
      <Title>Categories</Title>
      <CategoryList categories={data} />
      <Footer />
    </Root>
  );
};

const Root = styled.div`
  top: 85px;
  width: 220px;
  min-width: 200px;
  position: sticky;
  height: min-content;
  padding-right: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled(TitleP3)`
  margin-bottom: 15px;
`;

export default Sider;
