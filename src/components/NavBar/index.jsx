'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './navBar.module.css';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: '상품목록', link: '/product' },
    { name: user !== 'admin' ? '채팅목록' : '구입요청', link: '/chat' },
    { name: 'EcoShop', link: '/ecoProduct' },
    { name: 'Eco포인트란?', link: '/EcoPoint' },
  ];

  return (
    <nav className={styles.mainNav}>
      <ul>
        {navItems.map(({ name, link }) => (
          <li key={name}>
            <Link href={link}>{name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
