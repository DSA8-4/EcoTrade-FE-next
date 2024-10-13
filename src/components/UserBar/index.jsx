'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './UserBar.module.css';

const UserBar = () => {
  const { user, profileImage, logout } = useContext(AuthContext);
  const router = useRouter();
  const handleProductUpload = () => {
    if (user !== 'admin') router.push('/productUpload');
    else router.push('/admin/productUpload');
  };

  return (
    <div className={styles.user}>
      {user ? (
        <div className={styles.loggedIn}>
          <button
            onClick={handleProductUpload}
            type="button"
            className={styles.productUpload}>
            {user === 'admin' ? 'eco상품등록' : '상품등록'}
          </button>
          <div
            onClick={() => router.push('/mypage')}
            className={styles.profile}>
            <Image
              className={styles.profilePicture}
              width={30}
              height={30}
              // src={
              //   typeof window !== 'undefined' && sessionStorage.getItem('profileImage') === 'null'
              //     ? '/images/profile-icon.png'
              //     : sessionStorage.getItem('profileImage')
              // }
              src={
                profileImage
                  ? profileImage === 'null'
                    ? '/images/profile-icon.png'
                    : profileImage
                  : '/images/profile-icon.png'
              }
              alt="프로필"
              loading="eager"
            />
            <div className={styles.name}>{user}</div>
          </div>
          <div
            className={styles.logoutButton}
            onClick={logout}>
            로그아웃
          </div>
        </div>
      ) : (
        <div className={styles.logout}>
          <Link
            className={styles.login}
            href="/login">
            로그인
          </Link>
          <Link
            className={styles.register}
            href="/register">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserBar;
