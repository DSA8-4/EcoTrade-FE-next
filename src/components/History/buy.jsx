import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { useRouter } from 'next/navigation';
import styles from './history.module.css';

const Buy = () => {
  const [buys, setBuys] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8090/members/mypage/purchases`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setBuys(data);
      });
  }, []);

  return (
    <section className={styles.transactionSection}>
      <h2 className={styles.h2}>
        <Icon
          size={'32px'}
          color={'#4caf50'}>
          local_mall
        </Icon>
        <p>구매 목록</p>
      </h2>
      <div className={styles.transactionList}>
        {buys.length > 0
          ? buys.map((buy) => (
              <div
                onClick={() => router.push(`/product/${buy.product_id}`)}
                key={buy.id}
                className={styles.transactionItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{buy.title}</span>
                  {/* <span className={styles.itemPrice}>{formatPrice(buy.price)}</span> */}
                </div>
                <span
                  // style={{ backgroundColor: productStatus[sell.status][1] }}
                  className={styles.itemStatus}>
                  {/* {productStatus[sell.status][0]} */}
                </span>
              </div>
            ))
          : ''}
      </div>
    </section>
  );
};
export default Buy;
