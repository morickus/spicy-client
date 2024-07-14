import Icon from '@/components/Icon';
import stylesMain from '@/styles/Main.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styles from './IconBack.module.scss';

interface IconBackProps {
  title: string
  onClick?(): void
}

const IconBack:FC<IconBackProps> = ({ title, onClick }) => {
  const router = useRouter();

  return (
    <div className={styles.root} onClick={onClick || router.back}>
      <div className={styles.icon}>
        <Icon name="arrow-right" fontSize={24} />
      </div>
      <h1 className={classNames(stylesMain.h3, styles.title)}>{title}</h1>
    </div>
  );
};

export default IconBack;