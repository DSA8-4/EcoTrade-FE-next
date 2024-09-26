import Footer from '@/components/Footer';
import UserBar from '@/components/UserBar';
import { AuthProvider } from '@/context/AuthContext';
import 'material-icons/iconfont/material-icons.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EcoTrade',
  description: 'Used product save environment',
};
const navItems = [
  { name: '상품목록', link: '/product' },
  { name: '채팅목록', link: '/chat' },
  { name: 'Eco포인트란?', link: '/EcoPoint' },
];

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <header className="header-content">
            <div className="logo">
              <Link href="/">Logo</Link>
            </div>
            <nav className="main-nav">
              <ul>
                {navItems.map(({ name, link }) => (
                  <li
                    key={name}
                    className="nav-item">
                    <Link href={link}>{name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="search">
              <input
                type="text"
                placeholder="상품명 검색"
              />
            </div>
            <UserBar />
          </header>

          <main className="main-body">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
