'use client';

import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem('name');
    const pi = sessionStorage.getItem('profileImage');
    if (storedUser) {
      setUser(storedUser);
      setProfileImage(pi);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.name);
    sessionStorage.setItem('name', userData.name);
    sessionStorage.setItem('member_id', userData.member_id);
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('profileImage', userData.profileImage);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, profileImage, setUser, setProfileImage, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
