'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import Image from 'next/image';
import styles from './products.module.css';

const Product = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8090/products/list')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
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
    <div className={styles.container}>
      <h1 className={styles.h1}>Product List</h1>
      <ul className={styles.productList}>
        {productList.map(({ productId, title, price, heart, imageUrls, createdTime }) => (
          <li
            className={styles.product}
            key={productId}>
            <Image
              className={styles.image}
              src={imageUrls[0]}
              alt="image"
              width={100}
              height={100}
            />
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.info}>
              <p className={styles.price}>{price}원</p>
              <p className={styles.heart}>{timeAgo(createdTime)}</p>
            </div>
            <div className={styles.like}>
              <p>{heart}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
