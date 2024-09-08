'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './productDetail.module.css';

const ProductDetail = ({ params: { id } }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    console.log(id);
    fetch(`http://localhost:8090/products/detail/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, [id]);

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <Image
          src="/images/EcoPoint.png"
          width={40}
          height={40}
          alt="상품 이미지"
        />
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{}</h1>
        <div className={styles.productPrice}>
          15,000 <span>원</span>
        </div>
        <div className={styles.productFirstDetails}>
          <div className={styles.productContents}>
            <div className={styles.productStatus}>
              <span>·</span>
              <span>상품 상태 :</span>
            </div>

            <div className={styles.productSize}>
              <span>·</span>
              <span>사이즈 :</span>
            </div>
            <div className={styles.productTime}>
              <span>·</span>
              <span>작성시간 :</span>
            </div>
            <div className={styles.productLocation}>
              <span>·</span>
              <span>거래지역 :</span>
            </div>
            <div className={styles.productCategory}>
              <span>·</span>
              <span>카테고리 :</span>
            </div>
          </div>
          <div className={styles.productSecondDetails}></div>

          <p className={styles.productDescription}>
            상품에 대한 상세 설명 공간입니다. 여기서 추가적인 상품 정보를 입력할 수 있습니다. 예를
            들어, 크기, 색상, 사용 여부 등의 정보가 포함될 수 있습니다.
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <button className={`${styles.button} ${styles.favoriteButton}`}>
            <span>❤ 찜</span>
            <span>1</span>
          </button>
          <button className={`${styles.button} ${styles.contactButton}`}>채팅하기</button>
          <button className={`${styles.button} ${styles.buyButton}`}>바로구매</button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
