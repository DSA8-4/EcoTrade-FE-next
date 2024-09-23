import Icon from '@/components/Icon';
import styles from './history.module.css';

const Buy = () => {
  return (
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
  );
};
export default Buy;
