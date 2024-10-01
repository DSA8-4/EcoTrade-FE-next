'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ecoProduct.module.css';

const EcoProduct = () => {
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

  const handleProductClick = (id) => {
    router.push(`/ecoProduct/${id}`); // 상세 페이지로 이동
  };

  const handleEditClick = (id) => {
    // e.stopPropagation();
    // if (user) {
    router.push(`ecoProduct/Edit/${id}`);
    // } else {
    //   alert('수정하려면 로그인이 필요합니다.');
    //   router.push('/login');
    // }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('해당 상품을 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`http://localhost:8090/EcoProduct/delete/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('상품 삭제에 실패했습니다.');
        }
        alert('상품이 성공적으로 삭제되었습니다.');
        setEcoProducts(ecoProducts.filter((product) => product.ecoProductId !== id)); // 삭제 후 상태 업데이트
      } catch (error) {
        console.error('삭제 중 오류 발생:', error);
        alert(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>상품 목록</h1>
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
                    onClick={() => handleProductClick(product.ecoProductId)}
                    className={styles.image}
                    src={product.imageUrls[0]} // 이미지 URL
                    alt={product.title}
                    width={500}
                    height={450}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h2 className={styles.title}>{product.title}</h2>
                  <div className={styles.info}>
                    <p className={styles.price}>{product.price} P</p>
                  </div>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(product.ecoProductId)}>
                    수정하기
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(product.ecoProductId)}>
                    삭제하기
                  </button>
                  {/* <p className={styles.time}>{product.createdTime}</p> */}
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

export default EcoProduct;
