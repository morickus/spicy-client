import Icon from '@/components/Icon';
import stylesMain from '@/styles/Main.module.scss';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef } from 'react';
import styles from './IconBack.module.scss';

interface IconBackProps {
  title: string
  onClick?(): void
}

const IconBack:FC<IconBackProps> = ({ title, onClick }) => {
  const router = useRouter();
  const prevUrlRef = useRef('');

  useEffect(() => {
    prevUrlRef.current = document.referrer;
    console.log('document.referrer ',document.referrer);
  }, []);

  const handleBack = () => {
    const prevUrl = prevUrlRef.current;
    if (prevUrl && prevUrl.includes(window.location.host)) {
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