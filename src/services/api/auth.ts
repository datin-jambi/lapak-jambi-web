/**
 * Auth API Service
 *
 * Menangani login, register, logout, refresh, dan profil user.
 * Mengikuti kontrak dari docs/api/core/auth.md
 */

import { api, setAccessToken, clearAccessToken } from '@/lib/api-client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthMeResponse,
} from '@/types/api';

/** Login — mendapat accessToken + set cookie refresh token */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>('/auth/login', data, { public: true });
  setAccessToken(res.data.accessToken);
  return res.data;
}

/** Register — akun warga baru */
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
  const res = await api.post<RegisterResponse>('/auth/register', data, { public: true });
  return res.data;
}

/** Logout — cabut token + hapus cookie */
export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } finally {
    clearAccessToken();
  }
}

/** Logout semua sesi */
export async function logoutAll(): Promise<number> {
  const res = await api.post<{ revokedSessions: number }>('/auth/logout-all');
  clearAccessToken();
  return res.data.revokedSessions;
}

/** Ambil profil user yang sedang login */
export async function getMe(): Promise<AuthMeResponse> {
  const res = await api.get<AuthMeResponse>('/auth/me');
  return res.data;
}
