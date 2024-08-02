'use client';

import { useArticle } from '@/entities/article/model/useArticle';
import Categories from '@/entities/article/ui/Categories';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import React, { FC } from 'react';

interface ArticleProps {
  slug: string;
}

const Article: FC<ArticleProps> = ({ slug }) => {
  const { data, error } = useArticle(slug);

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    image: [],
    headline: data.title,
    description: data.excerpt,
    datePublished: format(new Date(data.createdAt), 'MMMM dd, yyyy, hh:mm a', { locale: enUS }),
    dateModified: format(new Date(data.updatedAt), 'MMMM dd, yyyy, hh:mm a', { locale: enUS }),
    author: [
      {
        type: 'Organization',
        name: 'Spicy.pub',
        url: process.env.NEXT_PUBLIC_DOMAIN,
      },
    ],
    publisher: {
      type: 'Organization',
      name: 'Spicy.pub',
    },
  };

  return (
    <Root>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TitleBackStyled title={data.title} />
      <Content>
        {data.categories && <Categories categories={data.categories} articleSlug={slug} />}
        <Text>
          {data.content.map((obj, index) => (
            <Paragraph
              key={obj.id ?? `p-${index}`}
              dangerouslySetInnerHTML={{ __html: obj.data.text ?? '' }}
            />
          ))}
        </Text>
      </Content>
    </Root>
  );
};

const Root = styled.article`
  width: 100%;
  max-width: 680px;
`;

const Content = styled.div``;

const TitleBackStyled = styled(TitleBack)`
  margin-bottom: 30px;
`;

const Text = styled.div`
  margin-top: 15px;
`;

const Paragraph = styled.p`
  line-height: 28px;
  color: var(--grey-color);

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export default Article;
