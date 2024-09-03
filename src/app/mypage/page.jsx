import Link from "next/link";
import styles from "./mypage.module.css";

const MyPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1} id="welcomeMessage"></h1>

      <div className={styles.infoBox}>
        <Link href="/mypage/history" id="transactionHistoryButton">
          <button
            className={`${styles.button} ${styles.transactionHistoryButton}`}
          >
            거래내역
          </button>
        </Link>
      </div>

      <div className={styles.infoBox}>
        <strong>Member ID:</strong> <span id="member_id"></span>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.inlineContainer}>
          <strong>Name</strong>
          <span id="nameDisplay"></span>
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
          <span id="emailDisplay"></span>
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
