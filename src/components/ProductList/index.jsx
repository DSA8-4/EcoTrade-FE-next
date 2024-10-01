'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Icon from '../Icon';
import styles from './productList.module.css';

const ProductList = ({ initialProducts, searchParams }) => {
  const router = useRouter();

  const [fetching, setFetching] = useState(false);
  const [productList, setProductList] = useState([...initialProducts]);
  const [isLast, setIsLast] = useState(false);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('oldest');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchProducts = () => {
    fetch(
      `http://localhost:8090/products/list?searchText=${
        searchParams ? searchParams : ''
      }&page=${page}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductList(data);
        // setPage((page) => page + 1);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

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

  const handleEdit = (e, productId) => {
    e.stopPropagation();
    if (user) {
      router.push(`/product/Edit/${productId}`);
    } else {
      alert('수정하려면 로그인이 필요합니다.');
      router.push('/login');
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const sortProducts = (option) => {
    setSortOption(option);
    setIsDropdownOpen(false);
    const sortedList = [...initialProducts];
    switch (option) {
      case 'latest':
        sortedList.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
        break;
      case 'oldest':
        sortedList.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
        break;
      case 'mostViewed':
        sortedList.sort((a, b) => b.hit - a.hit);
        break;
      case 'lowPrice':
        sortedList.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    setProductList(sortedList);
  };

  const getSortOptionLabel = (option) => {
    switch (option) {
      case 'latest':
        return '최신순';
      case 'oldest':
        return '오래된순';
      case 'mostViewed':
        return '조회순';
      case 'lowPrice':
        return '낮은 가격순';
      default:
        return '';
    }
  };

  return (
    <>
      <div
        className={styles.filterContainer}
        ref={dropdownRef}>
        <div className={`${styles.dropdown}`}>
          <button
            className={styles.dropdownToggle}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Icon>subject</Icon>
            <span>{getSortOptionLabel(sortOption)}</span>
          </button>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => sortProducts('latest')}>최신순</li>
              <li onClick={() => sortProducts('oldest')}>오래된순</li>
              <li onClick={() => sortProducts('mostViewed')}>조회순</li>
              <li onClick={() => sortProducts('lowPrice')}>낮은 가격순</li>
            </ul>
          )}
        </div>
      </div>
      <ul className={styles.productList}>
        {productList.map(
          ({ productId, title, price, heart, hit, imageUrls, createdTime, seller }) => (
            <li
              onClick={() => router.push(`/product/${productId}`)}
              className={styles.product}
              key={productId}>
              <div className={styles.imageContainer}>
                <Image
                  className={styles.image}
                  src={imageUrls[0]}
                  alt={title}
                  width={500}
                  height={450}
                />
              </div>
              <div className={styles.productInfo}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.info}>
                  <p className={styles.price}>{price.toLocaleString()}원</p>
                  <p className={styles.time}>{timeAgo(createdTime)}</p>
                </div>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <Icon>favorite</Icon>
                    <p>{heart}</p>
                  </div>
                  <div className={styles.stat}>
                    <Icon>visibility</Icon>
                    <p>{hit}</p>
                  </div>
                </div>
              </div>
              {seller && seller === sessionStorage.getItem('name') && (
                <button onClick={(e) => handleEdit(e, productId)}>수정</button>
              )}
            </li>
          ),
        )}
      </ul>
      {fetching ? <div>Loading...</div> : <button className={styles.loadMore}>더보기</button>}
    </>
  );
};
export default ProductList;
