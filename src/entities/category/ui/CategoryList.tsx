import { CategoryResponseDto } from '@/shared/api/generated';
import { omitProps } from '@/shared/lib/emotion-omit-props';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { FC } from 'react';

interface CategoryListProps {
  categories: CategoryResponseDto[];
}

export const CategoryList: FC<CategoryListProps> = ({ categories }) => {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  return (
    <Root>
      {categories.map((c) => {
        if (c.countArticles === 0) return;

        return (
          <Item key={`category-${c.slug}`} href={`/category/${c.slug}`} active={c.slug === slug}>
            <span>{c.name}</span>
            <span>{c.countArticles}</span>
          </Item>
        );
      })}
    </Root>
  );
};

const Root = styled.div`
  gap: 15px;
  display: flex;
  padding-bottom: 20px;
  flex-direction: column;
  border-bottom: 1px solid var(--grey-secondary-color);
`;

const Item = styled(Link, omitProps('active'))<{ active: boolean }>`
  display: flex;
  padding: 5px 10px;
  border-radius: 10px;
  align-content: center;
  justify-content: space-between;
  transition: background 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);

  &:hover {
    background: var(--dark-average-color);
  }

  ${(p) =>
    p.active &&
    css`
      background: var(--dark-average-color);
    `}

  span {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.03em;
  }

  span:last-child {
    text-align: right;
    color: var(--grey-secondary-color);
  }
`;
