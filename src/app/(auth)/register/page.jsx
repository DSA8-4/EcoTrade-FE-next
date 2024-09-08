'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../auth.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    member_id: '',
    password: '',
    name: '',
    email: '',
  });

  const [checkedPW, setCheckedPW] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const handlePWChange = (e) => setCheckedPW(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (checkedPW !== formData.password) {
      alert('비밀번호가 다릅니다.');
      return;
    }
    try {
      const response = await fetch('http://localhost:8090/members/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(data.message || 'Form submitted successfully!');
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('로그인 문제 발생');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>회원가입</h2>
        <form
          onSubmit={handleSubmit}
          className={styles.form}>
          <input
            type="text"
            name="member_id"
            placeholder="아이디"
            required
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            required
            autoComplete="off"
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="password"
            name="password-check"
            placeholder="비밀번호 확인"
            required
            autoComplete="off"
            onChange={handlePWChange}
            className={styles.input}
          />
          <input
            type="text"
            name="name"
            placeholder="닉네임"
            required
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="email"
            placeholder="이메일"
            required
            onChange={handleChange}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}>
            완료
          </button>
        </form>
        <div className={styles.registerLink}>
          <span>이미 아이디가 있으십니까?</span>
          <Link href="/login">로그인</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
