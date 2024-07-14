import { ArticleAllResponseDto } from '@/shared/api/generated';
import stylesMain from '@/styles/Main.module.scss';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './ArticleCard.module.scss';

const ArticleCard: FC<ArticleAllResponseDto> = ({ slug, title, excerpt, categories }) => {
  if (!slug || !title || !excerpt) return;

  return (
    <div className={styles.root}>
      <Link href={`/article/${slug}`} className={styles.content}>
        <p className={classNames(stylesMain.h2, styles.title)}>{title}</p>
        <p className={styles.text}>{excerpt}</p>
      </Link>
      {categories && (
        <div className={stylesMain.categories}>
          {categories.map((i, index) => (
            <div key={`article-categories-${index}`}>
              <Link href={`/category/${i.slug}`}>{i.name}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
