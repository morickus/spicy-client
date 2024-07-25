import Categories from '@/entities/article/ui/Categories';
import { ArticleAllResponseDto } from '@/shared/api/generated';
import { ROUTES } from '@/shared/constants/routes';
import { H2 } from '@/shared/ui/Texts';
import styled from '@emotion/styled';
import Link from 'next/link';
import React, { FC } from 'react';

const ArticleCard: FC<ArticleAllResponseDto> = ({ slug, title, excerpt, categories }) => {
  if (!slug || !title || !excerpt) return;

  return (
    <div>
      <Content href={ROUTES.ARTICLES.BY_SLUG(slug)}>
        <Title>{title}</Title>
        <Text dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Content>
      {categories && <Categories categories={categories} articleSlug={slug} />}
    </div>
  );
};

const Title = styled(H2)`
  display: block;
  margin-bottom: 15px;
`;

const Text = styled.p`
  line-height: 28px;
  color: var(--grey-color);
`;

const Content = styled(Link)`
  display: block;

  ${Title}, ${Text} {
    transition: color 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  }

  &:hover {
    ${Title} {
      color: var(--acent-primary-color);
    }

    ${Text} {
      color: var(--white-color);
    }
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export default ArticleCard;
