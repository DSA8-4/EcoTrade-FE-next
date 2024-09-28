'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './adminProduct.module.css';

const AdminProductList = () => {
  const router = useRouter();
  const [ecoProducts, setEcoProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:8090/EcoProduct/list?searchText=${searchText}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`, // 인증 토큰 필요
            },
          },
        );

        if (!response.ok) {
          throw new Error('상품 목록을 가져오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log('Ecoproducts: ', data);
        setEcoProducts(data);
      } catch (error) {
        console.error('상품 목록을 가져오는 중 오류 발생:', error);
        alert('상품 목록을 가져오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>관리자 전용 상품 목록</h1>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="상품 검색..."
        className={styles.searchInput}
      />
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <ul className={styles.productList}>
          {ecoProducts.length > 0 ? (
            ecoProducts.map((product) => (
              <li
                key={product.ecoProductId}
                className={styles.product}>
                <div className={styles.imageContainer}>
                  <Image
                    className={styles.image}
                    src={product.imageUrls[0]} // 이미지 URL
                    alt={product.title}
                    width={250}
                    height={250}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.title}>{product.title}</h2>
                  <div className={styles.info}>
                    <p className={styles.price}>{product.price} 포인트</p>
                    <p className={styles.time}>{product.createdTime}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>등록된 상품이 없습니다.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminProductList;
