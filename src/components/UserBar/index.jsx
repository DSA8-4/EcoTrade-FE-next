"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserBar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    // This code will run only in the browser
    const user = sessionStorage.getItem("loggedInUser");
    setLoggedInUser(user);
  }, []);
  return (
    <div className="user">
      <button
        onClick={() => router.push("/productUpload")}
        type="button"
        className="chat-button"
      >
        상품등록
      </button>
      <div className="user-info">
        <Image
          className="profilePicture"
          width={40}
          height={40}
          src={"/images/profile-icon.png"}
          alt="프로필"
          loading="eager"
        />
        <div id="welcomeMessage">{loggedInUser}</div>
      </div>
      <di id="logoutButton" className="logout-link">
        로그아웃
      </di>
      <Link id="loginButton" className="login-link" href="/login">
        로그인
      </Link>

      <Link id="registerButton" className="register-link" href="register">
        회원가입
      </Link>
    </div>
  );
};
export default UserBar;
