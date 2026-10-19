/**
 * Produk / Aset API Service
 *
 * Endpoint publik untuk produk dan detail produk.
 * Mengikuti kontrak dari docs/api/lapak/products.md
 */

import { api, type ApiSuccessResponse, type PaginationMeta } from '@/lib/api-client';
import type { ProductCard, ProductDetail } from '@/types/api';

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;     // slug kategori
  organization?: string; // kode OPD
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'publishedAt' | 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedProducts {
  data: ProductCard[];
  meta: PaginationMeta;
}

/** Daftar produk publik (katalog) */
export async function getProducts(filters?: ProductFilters): Promise<PaginatedProducts> {
  const res = await api.get<ProductCard[]>('/lapak/products/public', {
    public: true,
    params: filters as Record<string, string | number | undefined>,
  });
  return {
    data: res.data,
    meta: res.meta!,
  };
}

/** Detail produk via slug (publik) */
export async function getProductBySlug(slug: string): Promise<ProductDetail> {
  const res = await api.get<ProductDetail>(`/lapak/products/public/${slug}`, {
    public: true,
  });
  return res.data;
}
