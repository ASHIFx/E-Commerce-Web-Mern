/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const AuthContext = createContext();

const normalizeUser = (userData) => {
  if (!userData) return null;

  if (userData.user) {
    return {
      ...userData.user,
      accessToken: userData.accessToken,
    };
  }

  return userData;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userInfo');

    try {
      return storedUser ? normalizeUser(JSON.parse(storedUser)) : null;
    } catch {
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = (userData) => {
    const normalizedUser = normalizeUser(userData);
    setUser(normalizedUser);

    if (normalizedUser) {
      localStorage.setItem('userInfo', JSON.stringify(normalizedUser));
      if (userData?.accessToken) {
        localStorage.setItem('accessToken', userData.accessToken);
      } else {
        localStorage.removeItem('accessToken');
      }
    } else {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};