'use client';

import { useArticle } from '@/entities/article/model/useArticle';
import ArticleCard from '@/entities/article/ui/ArticleCard';
import Categories from '@/entities/article/ui/Categories';
import {
  ArticleAllResponseDto,
  articlesControllerFindAll,
  articlesControllerGetRandomArticles,
} from '@/shared/api/generated';
import { H2 } from '@/shared/ui/Texts';
import TitleBack from '@/shared/ui/TitleBack';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
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

  const tags = data.categories.map((c) => c.slug);
  const { data: similarStories } = useQuery({
    queryKey: ['articles', { tags }],
    queryFn: () => articlesControllerFindAll({ limit: 5, tags }),
  });

  const { data: otherStories } = useQuery({
    queryKey: ['articles-random', 5],
    queryFn: () => articlesControllerGetRandomArticles({ count: 5 }),
  });

  const filterStories = (data: ArticleAllResponseDto[], limit: number) => {
    return data.filter((item) => item.id !== 1).slice(0, limit);
  };

  const similar = similarStories?.data ? filterStories(similarStories.data, 4) : [];
  const other = otherStories ? filterStories(otherStories, 4) : [];

  const useSimilar = similar.length == 4;
  const stories = useSimilar ? similar : other;

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
      {(!!similar.length || !!other.length) && (
        <Selection>
          {useSimilar ? <H2>Similar</H2> : <H2>Other stories</H2>}
          <div>
            {stories.map((article) => (
              <ArticleCard key={article.id} data={article} size="small" />
            ))}
          </div>
        </Selection>
      )}
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

const Selection = styled.div`
  margin-top: 45px;

  & > div {
    margin-top: 20px;

    display: grid;
    grid-gap: 30px;
  }
`;

export default Article;
