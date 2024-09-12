'use client';

import { useContext, useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import styles from './productDetail.module.css';
import { useRouter } from 'next/navigation';

const ProductDetail = ({ params: { id } }) => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [localHeart, setLocalHeart] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = () => {
    fetch(`http://localhost:8090/products/detail/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLocalHeart(data.heart || 0);
        setIsFavorite(data.isFavoritedByUser);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  };

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const handleFavoriteClick = () => {
    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    setIsFavorite((prev) => !prev);
    setLocalHeart((prev) => (isFavorite ? prev - 1 : prev + 1));

    console.log(`찜 상태가 ${isFavorite ? '취소' : '추가'}되었습니다.`);
    console.log(`좋아요 수: ${localHeart + (isFavorite ? -1 : 1)}`);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.productGallery}>
        <div className={styles.mainImage}>
          {product.productImages && product.productImages.length > 0 && (
            <Image
              src={product.productImages[selectedImage].url}
              width={500}
              height={450}
              alt="상품 이미지"
            />
          )}
        </div>
        <div className={styles.thumbnailContainer}>
          {product.productImages &&
            product.productImages.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${index === selectedImage ? styles.active : ''}`}
                onClick={() => handleThumbnailClick(index)}>
                <Image
                  src={image.url}
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
          <span>가격 : </span>
          {product.price} <span>원</span>
        </div>
        <div className={styles.productFirstDetails}>
          <div className={styles.productContents}>
            <div className={styles.productHit}>
              <span>·</span>
              <span>조회수 : {product.hit}회</span>
            </div>
            <div className={styles.productHeart}>
              <span>·</span>
              <span>좋아요 : {localHeart}</span>
            </div>
            <div className={styles.productTime}>
              <span>·</span>
              <span>작성시간 : {new Date(product.created_time).toLocaleString()}</span>
            </div>
            <div className={styles.productCategory}>
              <span>·</span>
              <span>카테고리 : {product.category || '정보 없음'}</span>
            </div>
          </div>
          <div className={styles.productSecondDetails}></div>

          <h4 className={styles.productDescription}>
            <p>상품 설명</p>
            <span>{product.contents || '상세 설명이 없습니다.'}</span>
          </h4>
        </div>
        <div className={styles.buttonGroup}>
          <button
            className={`${styles.button} ${styles.favoriteButton}`}
            onClick={handleFavoriteClick}
            disabled={!user}>
            <span>
              {isFavorite ? (
                <Icon
                  shape={'round'}
                  size={'13px'}
                  color={'red'}>
                  favorite
                </Icon>
              ) : (
                <Icon
                  shape={'round'}
                  size={'13px'}>
                  favorite_border
                </Icon>
              )}{' '}
              찜{' '}
            </span>
            <span>{localHeart}</span>
          </button>
          <button onClick={() => router.push(`/chat/${id}`)} className={`${styles.button} ${styles.contactButton}`}>채팅하기</button>
          <button className={`${styles.button} ${styles.buyButton}`}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
