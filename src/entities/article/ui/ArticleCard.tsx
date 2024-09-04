import Categories from '@/entities/article/ui/Categories';
import { ArticleAllResponseDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { omitProps } from '@/shared/lib/emotion-omit-props';
import { H2, H3 } from '@/shared/ui/Texts';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { FC } from 'react';

type SizeType = 'default' | 'small';

interface IArticleCard {
  data: ArticleAllResponseDto;
  size?: SizeType;
}

const ArticleCard: FC<IArticleCard> = ({ data, size = 'default' }) => {
  const { slug, title, excerpt, categories } = data;

  if (!slug || !title || !excerpt) return;

  return (
    <div>
      <Content href={ROUTES.ARTICLES.BY_SLUG(slug)} size={size}>
        {size == 'small' ? <SmallTitle>{title}</SmallTitle> : <Title>{title}</Title>}
        <Text size={size} dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Content>
      {categories && <Categories categories={categories} articleSlug={slug} />}
    </div>
  );
};

const Title = styled(H2)`
  display: block;
  margin-bottom: 15px;
`;

const SmallTitle = styled(H3)`
  display: block;
  margin-bottom: 5px;
`;

const Text = styled('p', omitProps('size'))<{ size: SizeType }>`
  line-height: 28px;
  color: var(--grey-color);

  ${(p) =>
    p.size == 'small' &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    `}
`;

const Content = styled(Link, omitProps('size'))<{ size: SizeType }>`
  display: block;

  ${Title}, ${SmallTitle}, ${Text} {
    transition: color 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  &:hover {
    ${Title}, ${SmallTitle} {
      color: var(--acent-primary-color);
    }

    ${Text} {
      color: var(--white-color);
    }
  }

  &:not(:last-child) {
    margin-bottom: ${(p) => (p.size == 'small' ? '5px' : '15px')};
  }
`;

export default ArticleCard;
