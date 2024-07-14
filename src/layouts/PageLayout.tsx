import Header from '@/components/Header';
import Sider from '@/components/Sider';
import styles from '@/styles/PageLayout.module.scss';
import React, { FC, PropsWithChildren, ReactNode } from 'react';

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.body}>
        <Sider />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export const getPageLayout = function getLayout(page: ReactNode) {
  return <PageLayout>{page}</PageLayout>;
};