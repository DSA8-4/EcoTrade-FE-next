import NavBar from '@/components/NavBar';
import Search from '@/components/Search/page';
import UserBar from '@/components/UserBar';
import { AuthProvider } from '@/context/AuthContext';
import 'material-icons/iconfont/material-icons.css';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EcoTrade',
  description: 'Used product save environment',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <AuthProvider>
          <header className="header-content">
            <div className="logo">
              <Link href="/">
                <Image
                  src={'/images/ETIcon.png'}
                  alt="logo"
                  width={50}
                  height={40}
                />
              </Link>
            </div>
            <NavBar />
            <Search />
            <UserBar />
          </header>
          <main className="main-body">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};
export default RootLayout;
