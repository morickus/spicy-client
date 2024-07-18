import IconBack from '@/components/IconBack';
import { getPageLayout } from '@/layouts/PageLayout';
import { articlesControllerFindOne } from '@/shared/api/generated';
import styles from '@/styles/Home.module.scss';
import stylesMain from '@/styles/Main.module.scss';
import { useQuery } from '@tanstack/react-query';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const ArticlePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, isLoading } = useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesControllerFindOne(slug as string),
    enabled: typeof slug === 'string',
  });

  if (!slug) return <div>Not found slug</div>;

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return <div>Empty</div>;

  return (
    <>
      <NextSeo
        title={`${data.title} | Spicy.Pub – Erotic & Porn Stories for Adults`}
        description={data.excerpt}
        canonical={`${process.env.NEXT_PUBLIC_API_DOMAIN}article/${slug}`}
        openGraph={{
          type: 'article',
          url: `${process.env.NEXT_PUBLIC_API_DOMAIN}article/${slug}`,
          article: {
            publishedTime: data.createdAt,
            modifiedTime: data.updatedAt,
            tags: data.categories.map(i => i.name)
          }
        }}
      />
      <article className={styles.root}>
        <IconBack title={data.title} />
        <div className={styles.content}>
          {data.categories && (
            <div className={stylesMain.categories}>
              {data.categories.map((i, index) => (
                <div key={`article-categories-${index}`}>
                  <Link href={`/category/${i.slug}`}>{i.name}</Link>
                </div>
              ))}
            </div>
          )}
          <div className={styles.text}>
            {data.content.map((obj, index) => (
              <p
                key={obj.id ?? `p-${index}`}
                dangerouslySetInnerHTML={{ __html: obj.data.text ?? '' }}
              />
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

ArticlePage.getLayout = getPageLayout;

export default ArticlePage;
