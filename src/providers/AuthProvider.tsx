'use client';

import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import * as authService from '@/services/auth.service';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; name: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login(email, password);
      if (!loggedInUser) {
        throw new Error('Email atau password salah');
      }
      setUser(loggedInUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: {
    email: string;
    name: string;
    phone: string;
    password: string;
  }) => {
    setIsLoading(true);
    try {
      const newUser = await authService.register(data);
      setUser(newUser);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const hasRole = useCallback(
    (roles: UserRole[]) => authService.hasRole(user, roles),
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
