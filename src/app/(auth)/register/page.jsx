'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

const areas = [
  { value: 'SEOUL', label: '서울특별시' },
  { value: 'BUSAN', label: '부산광역시' },
  { value: 'DAEJEON', label: '대전광역시' },
  { value: 'DAEGU', label: '대구광역시' },
  { value: 'INCHEON', label: '인천광역시' },
  { value: 'GWANGJU', label: '광주광역시' },
  { value: 'ULSAN', label: '울산광역시' },
  { value: 'SEJONG', label: '세종특별자치시' },
  { value: 'GYENGGI_DO', label: '경기도' },
  { value: 'CHUNGCHEONGBUK_DO', label: '강원도' },
  { value: 'CHUNGCHEONGNAM_DO', label: '충청북도' },
  { value: 'JEOLLABUK_DO', label: '전라북도' },
  { value: 'JEOLLANAM_DO', label: '전라남도' },
  { value: 'GYEONGSANBUK_DO', label: '경상북도' },
  { value: 'GYEONGSANNAM_DO', label: '경상남도' },
  { value: 'JEJU', label: '제주도' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    member_id: '',
    password: '',
    name: '',
    email: '',
    area: 'SEOUL',
  });

  const [checkedPW, setCheckedPW] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      alert(data.message || '회원가입 완료!');
      router.replace('/');
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
          <select
            name="area"
            onChange={handleChange}
            className={styles.select}>
            {areas.map((area) => (
              <option
                key={area.value}
                value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
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
