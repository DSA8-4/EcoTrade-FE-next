'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './ecoProductDetail.module.css';

const EcoProductDetail = ({ params }) => {
  const { id } = params;
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8090/EcoProduct/detail/${id}`);
        if (!response.ok) {
          throw new Error('상품 상세 정보를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        console.log('ecoProduct: ', data);
        setProduct(data);
      } catch (error) {
        console.error('상품 상세 정보를 가져오는 중 오류 발생:', error);
        alert('상품 상세 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleBuyClick = () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    const address = prompt('상품을 받을 주소를 입력해주세요');

    console.log(address);
    if (!address) return;
    fetch(`http://localhost:8090/EcoProduct/purchase/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      method: 'POST',
      body: address,
    }).then((response) => {
      console.log(response);
      if (response.status === 400) {
        alert('보유한 포인트가 부족합니다.');
        return;
      }
      alert('구매가 완료되었습니다.');
      router.
    });
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className={styles.productContainer}>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <>
          <div className={styles.productGallery}>
            <div className={styles.mainImage}>
              {product.imageUrls && product.imageUrls.length > 0 && (
                <Image
                  src={product.imageUrls[selectedImage]}
                  width={500}
                  height={450}
                  alt={product.title}
                />
              )}
            </div>
            <div className={styles.thumbnailContainer}>
              {product.imageUrls &&
                product.imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.thumbnail} ${
                      index === selectedImage ? styles.active : ''
                    }`}
                    onClick={() => handleThumbnailClick(index)}>
                    <Image
                      src={image}
                      width={100}
                      height={100}
                      alt={`상품 썸네일 ${index}`}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>상품명: {product.title}</h1>
            <div className={styles.productPrice}>
              <span>가격: </span>
              {product.price} <span>P</span>
            </div>
            <h4 className={styles.productDescription}>
              <p>상품 설명</p>
              <p>{product.content || '상세 설명이 없습니다.'}</p>
            </h4>
            <button
              className={styles.buyButton}
              onClick={handleBuyClick}>
              구매하기
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EcoProductDetail;
