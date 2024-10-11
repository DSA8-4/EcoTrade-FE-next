import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { formatPrice } from '@/utils/formatPrice';
import Image from 'next/image';
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
        console.log(data);
        setBuys(data);
      });
  }, []);

  const timeAgo = (createdTime) => {
    const now = new Date();
    const createdDate = new Date(createdTime);

    const diffMs = now - createdDate;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));

    if (diffMinutes < 1) {
      return '방금 전';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 30) {
      return `${diffDays}일 전`;
    } else {
      return `${diffMonths}달 전`;
    }
  };

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
                key={buy.productId}
                className={styles.transactionItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{buy.productTitle}</span>
                  <span className={styles.itemPrice}>{formatPrice(buy.price)}</span>
                </div>
                <Image
                  src={buy.productImage}
                  alt="productImage"
                  width={32}
                  height={32}
                />
                <span>{timeAgo(buy.purchaseDate)}</span>
              </div>
            ))
          : ''}
      </div>
    </section>
  );
};
export default Buy;
