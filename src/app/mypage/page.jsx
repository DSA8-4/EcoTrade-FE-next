'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { AuthContext } from '@/context/AuthContext';
import { areas } from '@/utils/area';
import { firebaseConfig } from '@/utils/config';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './mypage.module.css';

const MyPage = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const { setUser, setProfileImage } = useContext(AuthContext);
  const imageInput = useRef(null);
  const router = useRouter();
  const [myInfo, setMyInfo] = useState({
    name: '',
    email: '',
    member_id: '',
    eco_point: 0,
    profileImageUrl: null,
    area: 'SEOUL',
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
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: myInfo.name,
        email: myInfo.email,
        profileImageUrl: myInfo.profileImageUrl,
        area: myInfo.area,
      }),
    }).then((response) => {
      alert('회원정보가 수정되었습니다.');
      setUser(myInfo.name);
      sessionStorage.setItem('name', myInfo.name);
      console.log(response);
    });
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
      .then((data) => {
        console.log(data);
        setProfileImage(url);
        sessionStorage.setItem('profileImage', url);
      });
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

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <label htmlFor="name">Name: </label>
          <input
            placeholer="name"
            type="text"
            name="name"
            value={myInfo.name || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, name: e.target.value })}
          />
        </div>
        <div className={styles.inlineContainer}>
          <label htmlFor="email">Email : </label>
          <input
            placeholer="email"
            type="email"
            name="email"
            value={myInfo.email || ''}
            className={styles.smallInputField}
            onChange={(e) => setMyInfo({ ...myInfo, email: e.target.value })}
          />
        </div>
        <div className={styles.inlineContainer}>
          <label htmlFor="area">지역 선택: </label>
          <select
            name="area"
            title="지역 선택"
            onChange={(e) => setMyInfo({ ...myInfo, area: e.target.value })}
            className={styles.select}
            value={myInfo.area}>
            {areas.map((area) => (
              <option
                key={area.value}
                value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.deleteAccountContainer}>
          <button
            onClick={profileChange}
            className={`${styles.button} ${styles.editProfileButton}`}>
            회원 정보 수정
          </button>
        </div>
      </div>

      <div className={styles.infoBox}>
        <strong>Eco Point: {myInfo.eco_point}</strong>
      </div>

      <div className={styles.deleteAccountContainer}>
        <button
          onClick={() => router.push('/mypage/history')}
          className={`${styles.button} ${styles.transactionHistoryButton}`}>
          거래내역
        </button>
        {/* <button className={`${styles.button} ${styles.deleteAccountButton}`}>회원탈퇴</button> */}
      </div>
    </div>
  );
};
export default MyPage;
