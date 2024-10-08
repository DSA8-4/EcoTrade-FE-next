import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation';
import styles from './history.module.css';

const productStatus = {
  TRADING: ['판매중', '#4caf50'],
  RESERVED: ['예약중', '#ff9800'],
  COMPLETED: ['판매완료', '#2196f3'],
};
const Sell = () => {
  const [sells, setSells] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8090/members/mypage/sales`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSells(data);
      });
  }, []);

  return (
    <section className={styles.transactionSection}>
      <h2 className={styles.h2}>
        <Icon
          size={'32x'}
          color={'#4caf50'}>
          sell
        </Icon>
        <p>판매 목록</p>
      </h2>
      <div className={styles.transactionList}>
        {sells.length > 0
          ? sells.map((sell) => (
              <div
                onClick={() => router.push(`/product/${sell.product_id}`)}
                key={sell.id}
                className={styles.transactionItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{sell.title}</span>
                  <span className={styles.itemPrice}>{formatPrice(sell.price)}</span>
                </div>
                <span
                  style={{ backgroundColor: productStatus[sell.status][1] }}
                  className={styles.itemStatus}>
                  {productStatus[sell.status][0]}
                </span>
              </div>
            ))
          : ''}
      </div>
    </section>
  );
};
export default Sell;
