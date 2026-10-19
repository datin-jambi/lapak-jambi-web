import type { User, UserRole } from '@/types';
import { users as dummyUsers } from '@/dummy';

const AUTH_KEY = 'lapakjambi_auth_user';

export function login(email: string, password: string): Promise<User | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = dummyUsers.find((u) => u.email === email) || null;
      if (user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      }
      resolve(user);
    }, 500);
  });
}

export function register(data: {
  email: string;
  name: string;
  phone: string;
  password: string;
}): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        phone: data.phone,
        avatar: '/images/avatars/default.jpg',
        role: 'User',
        isVerified: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as User;
  } catch {
    return null;
  }
}

export function hasRole(user: User | null, roles: UserRole[]): boolean {
  if (!user) return false;
  return roles.includes(user.role);
}
