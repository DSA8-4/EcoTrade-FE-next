'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import styles from './productPurchaseHistory.module.css';

const ProductPurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await fetch('http://localhost:8090/EcoProduct/allHistory', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('구매 내역을 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log(data);
        setPurchaseHistory(data);
      } catch (error) {
        console.error('구매 내역을 가져오는 중 오류 발생:', error);
        alert('구매 내역을 가져오는 데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, []);

  const updateStatus = async (id, ecoPurchaseId, currentStatus) => {
    if (user !== 'admin') {
      alert('관리자만 상태를 변경할 수 있습니다.');
      return;
    }
    const newStatus = currentStatus === 'COMPLETED' ? 'RESERVED' : 'COMPLETED';
    try {
      console.log(id, ecoPurchaseId, currentStatus);
      const response = await fetch(`http://localhost:8090/EcoProduct/updateStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ecoProductStatus: newStatus,
          ecoPurchaseId,
        }),
      });

      if (!response.ok) {
        throw new Error('상태 업데이트에 실패했습니다.');
      }

      // 상태 업데이트 후 새로고침
      const updatedHistory = purchaseHistory.map((purchase) => {
        if (purchase.ecoProduct === id) {
          console.log(purchase, id, newStatus);
          return { ...purchase, status: newStatus };
        }
        return purchase;
      });
      // console.log(updatedHistory);
      setPurchaseHistory(updatedHistory);
      console.log(response);
      if (newStatus === 'COMPLETED') {
        alert('발송완료되었습니다.');
      } else {
        alert('구매신청으로 변경되었습니다.');
      }
    } catch (error) {
      console.error('상태 업데이트 중 오류 발생:', error);
      alert('상태 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = purchaseHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>구매 이력</h1>
      </div>
      {loading ? (
        <p>로딩 중...</p>
      ) : currentItems.length > 0 ? (
        <>
          <ul className={styles.purchaseList}>
            {currentItems.map((purchase) => (
              <li
                key={purchase.id}
                className={styles.purchaseItem}>
                <div className={styles.purchaseDate}>
                  {new Date(purchase.purchaseDate).toLocaleString()} 주문
                  {user === 'admin' && (
                    <span
                      className={styles.statusButton}
                      onClick={() =>
                        updateStatus(purchase.ecoProduct, purchase.id, purchase.status)
                      }>
                      {purchase.status === 'COMPLETED' ? '발송완료' : '구매신청'}
                    </span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={purchase.productImageUrl}
                      alt={`상품명: ${purchase.ecoProduct.title}`}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className={styles.productTitle}>
                    <p>{purchase.productTitle}</p>
                  </div>
                  <div className={styles.productDetails}>
                    <p>배송지: {purchase.address}</p>
                    <p>Ecopoint: {purchase.ecoPoint}P</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastItem >= purchaseHistory.length}>
              Next
            </button>
          </div>
        </>
      ) : (
        <p>구매 내역이 없습니다.</p>
      )}
    </div>
  );
};

export default ProductPurchaseHistory;
