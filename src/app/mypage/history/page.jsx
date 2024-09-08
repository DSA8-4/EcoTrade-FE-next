import Icon from '@/components/icon';
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

      <section className={styles.transactionSection}>
        <h2>
          <Icon
            size={'32px'}
            color={'#4caf50'}>
            local_mall
          </Icon>
          구매 목록
        </h2>
        <div className={styles.transactionList}>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 A</span>
              <span className={styles.itemPrice}>₩20,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusOnSale}`}>판매중</span>
          </div>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 B</span>
              <span className={styles.itemPrice}>₩15,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusInProgress}`}>거래중</span>
          </div>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 C</span>
              <span className={styles.itemPrice}>₩30,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusCompleted}`}>거래완료</span>
          </div>
        </div>
      </section>

      <section className={styles.transactionSection}>
        <h2>
          <Icon
            size={'32x'}
            color={'#4caf50'}>
            sell
          </Icon>
          판매 목록
        </h2>
        <div className={styles.transactionList}>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 X</span>
              <span className={styles.itemPrice}>₩25,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusOnSale}`}>판매중</span>
          </div>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 Y</span>
              <span className={styles.itemPrice}>₩18,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusInProgress}`}>거래중</span>
          </div>
          <div className={styles.transactionItem}>
            <div className={styles.itemInfo}>
              <span className={styles.itemName}>상품 Z</span>
              <span className={styles.itemPrice}>₩40,000</span>
            </div>
            <span className={`${styles.itemStatus} ${styles.statusCompleted}`}>거래완료</span>
          </div>
        </div>
      </section>
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
