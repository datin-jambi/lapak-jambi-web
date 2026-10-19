'use client';

import { useContext } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import type { UserRole } from '@/types';

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    login: context.login,
    register: context.register,
    logout: context.logout,
    hasRole: (roles: UserRole[]) => {
      if (!context.user) return false;
      return roles.includes(context.user.role);
    },
  };
}
