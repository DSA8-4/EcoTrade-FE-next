"use client";
import styles from "./mypage.module.css";
import Link from "next/link";
import { useEffect } from "react";

const MyPage = () => {
  useEffect(() => {
    fetch(`http://localhost:8090/members/mypage`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}></h1>

      <div className={styles.infoBox}>
        <Link href="/mypage/history">
          <button
            className={`${styles.button} ${styles.transactionHistoryButton}`}
          >
            거래내역
          </button>
        </Link>
      </div>

      <div className={styles.infoBox}>
        <strong>Member ID:</strong>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Name</strong>
          <input
            type="text"
            id="nameInput"
            className={styles.smallInputField}
          />
        </div>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Email</strong>
          <input
            type="email"
            id="emailInput"
            className={styles.smallInputField}
          />
        </div>
      </div>

      <div className={styles.infoBox} id="updatePassword">
        <strong>비밀번호 수정</strong>
        <div
          className={`${styles.inlineContainer} ${styles.passwordFieldContainer}`}
        >
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className={styles.smallInputField}
          />
        </div>
        <div
          className={`${styles.inlineContainer} ${styles.passwordFieldContainer}`}
        >
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={styles.smallInputField}
          />
        </div>
        <div className={styles.inlineContainer}>
          <label htmlFor="confirmNewPassword">새 비밀번호 확인</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            className={styles.smallInputField}
          />
        </div>
        <button className={styles.button} id={styles.updatePasswordButton}>
          비밀번호 수정
        </button>
      </div>

      <div className={styles.infoBox}>
        <button className={`${styles.button} ${styles.editProfileButton}`}>
          회원 정보 수정
        </button>
        <button className={`${styles.button} ${styles.saveProfileButton}`}>
          저장
        </button>
        <button className={`${styles.button} ${styles.cancelProfileButton}`}>
          취소
        </button>
      </div>

      <div className={styles.infoBox}>
        <strong>Eco Point:</strong> <span id="ecoPointInfo"></span>
      </div>

      <div className={styles.deleteAccountContainer}>
        <button className={`${styles.button} ${styles.deleteAccountButton}`}>
          회원탈퇴
        </button>
      </div>
    </div>
  );
};
export default MyPage;
