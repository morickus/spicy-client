import Header from '@/components/Header';
import Icon from '@/components/Icon';
import Sider from '@/components/Sider';
import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './Sider.module.scss';

const SiderMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.button} onClick={() => setOpen(true)}>
        <p>Categories</p>
        <Icon name="arrow-right" fontSize={24} />
      </div>
      <div className={classNames(styles['sider-mobile'], styles[`sider-mobile_${open && 'open'}`])}>
        <Header />
        <Sider onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default SiderMobile;