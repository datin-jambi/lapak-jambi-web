/**
 * Katalog OPD API Service
 *
 * Profil OPD dan produk miliknya.
 * Mengikuti kontrak dari docs/api/lapak/catalog.md
 */

import { api, type PaginationMeta } from '@/lib/api-client';
import type { OpdProfile, ProductCard } from '@/types/api';

/** Profil OPD */
export async function getOpdProfile(code: string): Promise<OpdProfile> {
  const res = await api.get<OpdProfile>(`/lapak/organizations/${code}`, {
    public: true,
  });
  return res.data;
}

/** Produk milik OPD (katalog) */
export async function getOpdProducts(
  code: string,
  params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    sortBy?: 'publishedAt' | 'name' | 'price';
    sortOrder?: 'asc' | 'desc';
  },
): Promise<{ data: ProductCard[]; meta: PaginationMeta }> {
  const res = await api.get<ProductCard[]>(`/lapak/organizations/${code}/products`, {
    public: true,
    params: params as Record<string, string | number | undefined>,
  });
  return { data: res.data, meta: res.meta! };
}
