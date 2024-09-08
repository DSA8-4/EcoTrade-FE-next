'use client';

import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    member_id: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8090/members/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const userData = await response.json();
      login(userData); // Update the global state with user data
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('아이디 또는 비밀번호가 일치하지 않습니다');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>로그인</h2>
        <form
          onSubmit={handleSubmit}
          className={styles.form}>
          <input
            type="text"
            name="member_id"
            placeholder="아이디"
            required
            className={styles.input}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            autoComplete="off"
            required
            className={styles.input}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={styles.button}>
            로그인
          </button>
        </form>
        <div className={styles.registerLink}>
          <span>아이디가 없으십니까?</span>
          <Link href="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
