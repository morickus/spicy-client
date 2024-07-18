import Icon from '@/components/Icon';
import { useRoute } from '@/context/RouteContext';
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
  const { previousUrl } = useRoute();

  const handleBack = () => {
    if (previousUrl && previousUrl !== window.location.pathname) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className={styles.root} onClick={onClick || handleBack}>
      <div className={styles.icon}>
        <Icon name="arrow-right" fontSize={24} />
      </div>
      <h1 className={classNames(stylesMain.h3, styles.title)}>{title}</h1>
    </div>
  );
};

export default IconBack;