import { useEffect } from 'react';
import Icon from '@/components/Icon';
import styles from './history.module.css';

const Sell = () => {
  useEffect(() => {
    fetch(`http://localhost:8090/members/mypage/sales/${sessionStorage.getItem('member_id')}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    }).then((response) => console.log(response));
  }, []);

  return (
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
  );
};
export default Sell;
