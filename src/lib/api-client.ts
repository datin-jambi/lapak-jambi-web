/**
 * API Client untuk Seloko Backend
 *
 * Menangani:
 * - Base URL dari environment
 * - Header X-App-Code otomatis
 * - JWT access token (Authorization: Bearer)
 * - Refresh token otomatis (via cookie)
 * - Error handling seragam
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiSuccessResponse<T> {
  success?: boolean;
  statusCode?: number;
  code?: string;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total?: number;       // Core modules
  totalItems?: number;  // Lapak/Bapenda modules
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  timestamp?: string;
  details?: Array<{ path: string[]; message: string }>;
}

export class ApiError extends Error {
  statusCode: number;
  code: string;
  details?: Array<{ path: string[]; message: string }>;

  constructor(response: ApiErrorResponse) {
    super(response.message);
    this.name = 'ApiError';
    this.statusCode = response.statusCode;
    this.code = response.code;
    this.details = response.details;
  }
}

// ─── Constants ────────────────────────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
const APP_CODE = process.env.NEXT_PUBLIC_APP_CODE || 'lapak-jambi-web';

const AUTH_TOKEN_KEY = 'lapakjambi_access_token';

// ─── Token Management ────────────────────────────────────────────────────────

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// ─── Fetch Wrapper ───────────────────────────────────────────────────────────

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  /** Skip authentication header */
  public?: boolean;
}

async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'X-App-Code': APP_CODE,
      },
      credentials: 'include', // Send seloko_rt cookie
    });

    if (!res.ok) return null;

    const data = await res.json();
    const newToken = data.data?.accessToken;
    if (newToken) {
      setAccessToken(newToken);
      return newToken;
    }
    return null;
  } catch {
    return null;
  }
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<ApiSuccessResponse<T>> {
  const { body, params, public: isPublic, ...fetchOptions } = options;

  // Build URL with query params
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  // Build headers
  const headers: Record<string, string> = {
    'X-App-Code': APP_CODE,
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (!isPublic) {
    const token = getAccessToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  // Make request
  if (typeof window !== 'undefined') {
    console.log(`%c[API Client 🌐] ${fetchOptions.method || 'GET'} %c${url.toString()}`, 'color: #d97706; font-weight: bold', 'color: #0f766e');
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      ...fetchOptions,
      headers,
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
      credentials: 'include', // Always send cookies for refresh token
    });
  } catch (networkError) {
    if (typeof window !== 'undefined') {
      console.error(`[API Client ❌ Network Error] ${url.toString()}`, networkError);
    }
    throw networkError;
  }

  // Auto-refresh on 401
  if (res.status === 401 && !isPublic) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      res = await fetch(url.toString(), {
        ...fetchOptions,
        headers,
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
        credentials: 'include',
      });
    }
  }

  // Parse response
  const json = await res.json().catch(() => null);

  if (typeof window !== 'undefined') {
    if (res.ok) {
      console.log(`%c[API Client ✅ ${res.status}] %c${url.pathname}${url.search}`, 'color: #10b981; font-weight: bold', 'color: #64748b', json);
    } else {
      console.warn(`%c[API Client ⚠️ ${res.status}] %c${url.pathname}${url.search}`, 'color: #ef4444; font-weight: bold', 'color: #64748b', json);
    }
  }

  if (!res.ok) {
    throw new ApiError(
      json ?? {
        statusCode: res.status,
        code: 'UNKNOWN_ERROR',
        message: `Request failed with status ${res.status}`,
      },
    );
  }

  return json as ApiSuccessResponse<T>;
}

// ─── Convenience Methods ─────────────────────────────────────────────────────

export const api = {
  get<T>(endpoint: string, options?: RequestOptions) {
    return apiClient<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return apiClient<T>(endpoint, { ...options, method: 'POST', body });
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return apiClient<T>(endpoint, { ...options, method: 'PUT', body });
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return apiClient<T>(endpoint, { ...options, method: 'PATCH', body });
  },

  delete<T>(endpoint: string, options?: RequestOptions) {
    return apiClient<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
