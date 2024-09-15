'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './UserBar.module.css';

const UserBar = () => {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className={styles.user}>
      {user ? (
        <div className={styles.loggedIn}>
          <button
            onClick={() => router.push('/productUpload')}
            type="button"
            className={styles.productUpload}>
            상품등록
          </button>
          <div className={styles.profile}>
            <Image
              onClick={() => router.push('mypage')}
              className="profilePicture"
              width={25}
              height={25}
              src={'/images/profile-icon.png'}
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
