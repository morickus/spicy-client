import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>Spicy</Link>
      </div>
    </header>
  );
};

export default Header;