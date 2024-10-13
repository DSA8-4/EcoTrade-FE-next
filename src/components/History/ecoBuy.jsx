import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';
import styles from './history.module.css';

const productStatus = {
  RESERVED: ['처리중', '#ff9800'],
  COMPLETED: ['처리완료', '#2196f3'],
};

const EcoBuy = () => {
  const [ecoBuys, setEcoBuys] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8090/EcoProduct/history/${sessionStorage.getItem('member_id')}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEcoBuys(data);
      });
  }, []);

  return (
    <section className={styles.transactionSection}>
      <h2 className={styles.h2}>
        <Icon
          size={'32x'}
          color={'#4caf50'}>
          star_border
        </Icon>
        <p>Eco 상품 구매내역</p>
      </h2>
      <div className={styles.transactionList}>
        {ecoBuys.length > 0
          ? ecoBuys.map((ecobuy, idx) => (
              <div
                onClick={() => router.push(`/ecoProduct/${ecobuy.id}`)}
                key={idx}
                className={styles.transactionItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{ecobuy.title}</span>
                </div>
                <Image
                  src={ecobuy.imageUrl}
                  alt="product"
                  width={32}
                  height={32}
                />
                <span
                  style={{ backgroundColor: productStatus[ecobuy.status][1] }}
                  className={styles.itemStatus}>
                  {productStatus[ecobuy.status][0]}
                </span>
              </div>
            ))
          : ''}
      </div>
    </section>
  );
};
export default EcoBuy;
