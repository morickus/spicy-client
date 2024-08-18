import { CategoryResponseDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { FC } from 'react';

interface CategoriesProps {
  categories: CategoryResponseDto[];
  articleSlug: string;
}

const Categories: FC<CategoriesProps> = ({ categories, articleSlug }) => {
  return (
    <CategoriesWrapper>
      {categories.map((i) => (
        <CategoriesItem key={`article-${articleSlug}-categories-${i.slug}`}>
          <Link href={ROUTES.ARTICLES.BY_CATEGORY(i.slug)}>{i.name}</Link>
        </CategoriesItem>
      ))}
    </CategoriesWrapper>
  );
};

const CategoriesWrapper = styled.div`
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
`;

const CategoriesItem = styled.div`
  display: flex;
  align-items: center;

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: var(--grey-secondary-color);
    transition: color 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);

    &:hover {
      color: var(--acent-primary-color);
    }
  }

  &:not(:last-child):after {
    content: '• ';
    font-size: 14px;
    margin-left: 8px;
    color: var(--grey-secondary-color);
  }
`;

export default Categories;
