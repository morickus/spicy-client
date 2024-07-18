import IconBack from '@/components/IconBack';
import { categoriesControllerFindAll } from '@/shared/api/generated';
import stylesMain from '@/styles/Main.module.scss';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';
import styles from './Sider.module.scss';

interface SiderProps {
  onClose?(): void;
}

const Sider: FC<SiderProps> = ({ onClose }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesControllerFindAll(),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (!data) return;

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <IconBack onClick={onClose} title="Categories" />
        <p className={classNames(stylesMain.h3, styles.title)}>Categories</p>
      </div>
      <div className={styles.categories}>
        {data.map((i, index) => {
          if (i.countArticles === 0) return;

          return (
            <Link
              key={`categories-${index}`}
              href={`/category/${i.slug}`}
              className={styles.categories__item}
            >
              <span>{i.name}</span>
              <span>{i.countArticles}</span>
            </Link>
          );
        })}
      </div>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Spicy</span>
        {/*<Link href="/">Privacy policy</Link>*/}
        <div>
          <span>For info: </span>
          <Link href="mailto:info@spicy.pub">info@spicy.pub</Link>
        </div>
        <div>
          <span>For authors: </span>
          <Link href="mailto:authors@spicy.pub">authors@spicy.pub</Link>
        </div>
        <div>
          <span>For ads: </span>
          <Link href="mailto:ads@spicy.pub">ads@spicy.pub</Link>
        </div>
      </footer>
    </div>
  );
};

export default Sider;
