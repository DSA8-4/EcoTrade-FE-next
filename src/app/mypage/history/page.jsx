'use client';

import Buy from '@/components/History/buy';
import Sell from '@/components/History/sell';
import Icon from '@/components/Icon';
import Link from 'next/link';
import styles from './history.module.css';

const History = () => {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>
          <Icon>history</Icon>
          거래내역
        </h1>
      </header>
      <Buy />
      <Sell />
      <div className={styles.navigationButtons}>
        <Link
          href="/"
          className={styles.navButton}>
          메인으로
        </Link>
        <Link
          href="/mypage"
          className={styles.navButton}>
          마이페이지
        </Link>
      </div>
    </div>
  );
};

export default History;
