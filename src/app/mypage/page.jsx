'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { firebaseConfig } from '@/utils/config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import Link from 'next/link';
import styles from './mypage.module.css';

const MyPage = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  // const [profileImage, setProfileImage] = useState('');
  const imageInput = useRef(null);
  const [myInfo, setMyInfo] = useState({
    name: '',
    email: '',
    member_id: '',
    eco_point: 0,
    profileImageUrl: null,
  });

  useEffect(() => {
    fetch(`http://localhost:8090/members/mypage`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMyInfo(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const profileChange = () => {
    fetch(`http://localhost:8090/members/${sessionStorage.getItem('member_id')}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    }).then((response) => console.log(response));
  };

  const profileImageChange = (url) => {
    fetch(`http://localhost:8090/members/profile/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const profileImageUpload = (fileItem) => {
    const storageRef = ref(storage, 'images/' + fileItem.name);
    const uploadTask = uploadBytesResumable(storageRef, fileItem);

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log('File available at', url);
          setMyInfo({ ...myInfo, profileImageUrl: url });
          profileImageChange(url);
        });
      },
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>내 정보</h1>
      <div
        onClick={() => imageInput.current.click()}
        className={styles.profileImageContainer}>
        <Image
          className={styles.profileImage}
          width={70}
          height={70}
          src={myInfo.profileImageUrl ? myInfo.profileImageUrl : '/images/profile-icon.png'}
          alt="프로필"
          loading="eager"
        />
        <div className={styles.profileImageEdit}>
          <Icon>camera_alt</Icon>
        </div>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          name="profile_img"
          onChange={(e) => profileImageUpload(e.target.files[0])}
          ref={imageInput}
        />
      </div>
      <div className={styles.infoBox}>
        <strong>Member ID: {myInfo && myInfo.member_id}</strong>
      </div>

      {/* <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Name: </strong>
          <input
            type="text"
            name="name"
            value={myInfo.name || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, name: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Email: </strong>
          <input
            type="email"
            name="email"
            value={myInfo.email || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, email: e.target.value })}
          />
        </div>
      </div> */}

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Name: </strong>
          <input
            type="text"
            name="name"
            value={myInfo.name || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, name: e.target.value })}
          />
        </div>
        <div className={styles.inlineContainer}>
          <strong>Email : </strong>
          <input
            type="email"
            name="email"
            value={myInfo.email || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, email: e.target.value })}
          />
        </div>
        <div className={styles.deleteAccountContainer}>
          <button
            onClick={profileChange}
            className={`${styles.button} ${styles.editProfileButton}`}>
            회원 정보 수정
          </button>
          <button className={`${styles.button} ${styles.cancelProfileButton}`}>취소</button>
        </div>
      </div>

      <div className={styles.infoBox}>
        <strong>Eco Point: {myInfo.eco_point}</strong>
      </div>

      <div className={styles.deleteAccountContainer}>
        <Link href="/mypage/history">
          <button className={`${styles.button} ${styles.transactionHistoryButton}`}>
            거래내역
          </button>
        </Link>
        <button className={`${styles.button} ${styles.deleteAccountButton}`}>회원탈퇴</button>
      </div>
    </div>
  );
};
export default MyPage;
