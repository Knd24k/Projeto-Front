import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  nickname: string;
  email: string;
  password: string;
  favorites: number[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (nickname: string, email: string, password: string) => boolean;
  toggleFavorite: (gameId: number) => void;
  isFavorite: (gameId: number) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('loggedInUser');
    return stored ? (JSON.parse(stored) as User) : null;
  });

  const login = (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('loggedInUser', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const register = (nickname: string, email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email.trim().toLowerCase())) return false;
    const newUser: User = { nickname, email: email.trim().toLowerCase(), password, favorites: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    return true;
  };

  const toggleFavorite = (gameId: number) => {
    if (!user) return;
    let updatedFavorites = [...user.favorites];
    if (updatedFavorites.includes(gameId)) {
      updatedFavorites = updatedFavorites.filter(id => id !== gameId);
    } else {
      updatedFavorites.push(gameId);
    }
    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const isFavorite = (gameId: number) => {
    if (!user) return false;
    return user.favorites.includes(gameId);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, toggleFavorite, isFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};