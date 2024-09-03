"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./UserBar.module.css";

const UserBar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("name");
    setLoggedInUser(user);
  }, []);

  return (
    <div className={styles.user}>
      {loggedInUser ? (
        <div className={styles.loggedIn}>
          <button
            onClick={() => router.push("/productUpload")}
            type="button"
            className={styles.productUpload}
          >
            상품등록
          </button>
          <div className={styles.profile}>
            <Image
              className="profilePicture"
              width={40}
              height={40}
              src={"/images/profile-icon.png"}
              alt="프로필"
              loading="eager"
            />
            <div className={styles.name}>{loggedInUser}</div>
          </div>
          <div
            className={styles.logoutButton}
            onClick={() => sessionStorage.clear()}
          >
            로그아웃
          </div>
        </div>
      ) : (
        <div className={styles.logout}>
          <Link className={styles.login} href="/login">
            로그인
          </Link>

          <Link className={styles.register} href="register">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};
export default UserBar;
