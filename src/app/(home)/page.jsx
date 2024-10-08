'use client';

import { useRouter } from 'next/navigation';
import styles from './home.module.css';

const Home = () => {
  const router = useRouter();

  return (
    <section className={styles.container}>
      <div className={styles.heroContent}>
        <p className={styles.subtitle}>중고 거래로 지구를 지켜요</p>
        <h1 className={styles.h1}>EcoTrade에 오신 것을 환영합니다</h1>
        <p className={styles.description}>
          EcoTrade는 중고 거래 플랫폼을 기술과 친환경 거래 인센티브 시스템을 제공합니다.
        </p>
        <div className={styles.ctaButtons}>
          <button
            onClick={() => router.push('/register')}
            className={`${styles.btn} ${styles.btnPrimary}`}>
            지금 시작하기
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => router.push('/ETDetail')}>
            자세히 보기
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
