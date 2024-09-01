import Link from "next/link";
import styles from "./mypage.module.css";

const MyPage = () => {
  return (
    <div className={styles.container}>
      <h1 className="h1" id="welcomeMessage"></h1>

      <div className="info-box">
        <Link href="/mypage/history" id="transactionHistoryButton">
          <button className="button">거래내역</button>
        </Link>
      </div>

      <div className="info-box">
        <strong>Member ID:</strong> <span id="member_id"></span>
      </div>

      <div className="info-box">
        <strong>Name:</strong>
        <span id="nameDisplay"></span>
        <div id="nameInputContainer">
          <input type="text" id="nameInput" />
        </div>
      </div>

      <div className="info-box">
        <strong>Birth Date:</strong>
        <span id="birthDisplay"></span>
        <div id="birthInputContainer">
          <input type="date" id="birthInput" />
        </div>
      </div>

      <div className="info-box">
        <strong>Email:</strong>
        <span id="emailDisplay"></span>
        <div id="emailInputContainer">
          <input type="email" id="emailInput" />
        </div>
      </div>

      <div className="info-box" id="updatePassword">
        <strong>비밀번호 수정:</strong>
        <div>
          <label htmlFor="currentPassword">현재 비밀번호:</label>
          <input type="password" id="currentPassword" name="currentPassword" />
        </div>
        <div>
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input type="password" id="newPassword" name="newPassword" />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">새 비밀번호 확인:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
          />
        </div>
        <button className="button" id="updatePasswordButton">
          비밀번호 수정
        </button>
      </div>

      <div className="info-box">
        <button className="button" id="editProfileButton">
          회원 정보 수정
        </button>
        <button className="button" id="saveProfileButton">
          저장
        </button>
        <button className="button" id="cancelProfileButton">
          취소
        </button>
      </div>

      <div className="info-box">
        <strong>Eco Point:</strong> <span id="ecoPointInfo"></span>
      </div>

      <div className="delete-account-container">
        <button className="button" id="deleteAccountButton">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};
export default MyPage;
