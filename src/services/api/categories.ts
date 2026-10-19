/**
 * Kategori API Service
 *
 * Endpoint publik untuk kategori layanan.
 * Mengikuti kontrak dari docs/api/lapak/categories.md
 */

import { api } from '@/lib/api-client';
import type { CategoryPublic } from '@/types/api';

/** Daftar kategori aktif (publik, tanpa paginasi) */
export async function getCategories(search?: string): Promise<CategoryPublic[]> {
  const res = await api.get<CategoryPublic[]>('/lapak/categories/public', {
    public: true,
    params: { search },
  });
  return res.data;
}

/** Detail kategori via slug */
export async function getCategoryBySlug(slug: string): Promise<CategoryPublic> {
  const res = await api.get<CategoryPublic>(`/lapak/categories/public/${slug}`, {
    public: true,
  });
  return res.data;
}
