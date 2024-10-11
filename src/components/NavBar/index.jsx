'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './navBar.module.css';

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const navItems = [
    { name: '상품목록', link: '/product' },
    {
      name: user === 'admin' ? 'Eco상품구매내역' : '채팅목록',
      link: user === 'admin' ? '/admin/productPurchaseHistroy' : '/chat',
    },
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
