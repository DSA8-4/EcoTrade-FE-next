'use client';

import Link from 'next/link';
import styles from './navBar.module.css';

const navItems = [
  { name: '상품목록', link: '/product' },
  { name: '채팅목록', link: '/chat' },
  { name: 'Eco포인트란?', link: '/EcoPoint' },
];

const NavBar = () => {
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
