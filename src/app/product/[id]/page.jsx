'use client';

import { useContext, useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './productDetail.module.css';

const ProductDetail = ({ params: { id } }) => {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [localHeart, setLocalHeart] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [chatroomLoading, setChatRoomLoading] = useState(false);
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

  const handleChatRoom = () => {
    setChatRoomLoading(true);
    fetch(`http://localhost:8090/chat/rooms/createRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        memberId: sessionStorage.getItem('member_id'),
        productId: id,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        } else if (response.status === 404) {
          throw new Error('Product not found.');
        } else {
          throw new Error('Unexpected error occurred.');
        }
      })
      .then((chatRoom) => {
        setChatRoomLoading(false);
        if (chatRoom) {
          router.push(`/chat/${chatRoom.id}`);
        }
      })
      .catch((error) => {
        console.error('Error creating room:', error);
      });
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.productGallery}>
        <div className={styles.mainImage}>
          {product.imageUrls && product.imageUrls.length > 0 && (
            <Image
              src={product.imageUrls[selectedImage]}
              width={500}
              height={450}
              alt="상품 이미지"
            />
          )}
        </div>
        <div className={styles.thumbnailContainer}>
          {product.imageUrls &&
            product.imageUrls.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${index === selectedImage ? styles.active : ''}`}
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
              <span>작성시간 : {new Date(product.createdTime).toLocaleString()}</span>
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
              )}
              찜
            </span>
            <span>{localHeart}</span>
          </button>
          <button
            disabled={chatroomLoading}
            onClick={handleChatRoom}
            className={`${styles.button} ${styles.contactButton}`}>
            {chatroomLoading ? '채팅방 생성중' : '채팅하기'}
          </button>
          <button className={`${styles.button} ${styles.buyButton}`}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
