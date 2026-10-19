/**
 * Berita API Service
 *
 * Berita OPD publik.
 * Mengikuti kontrak dari docs/api/lapak/news.md
 */

import { api, type PaginationMeta } from '@/lib/api-client';
import type { NewsArticle, NewsArticleCard } from '@/types/api';

export interface NewsFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: 'createdAt' | 'publishedAt' | 'title' | 'viewCount';
  sortOrder?: 'asc' | 'desc';
}

/** Daftar berita publik sebuah OPD */
export async function getNewsByOpd(
  opdCode: string,
  filters?: NewsFilters,
): Promise<{ data: NewsArticleCard[]; meta: PaginationMeta }> {
  const res = await api.get<NewsArticleCard[]>(`/lapak/news/public/${opdCode}`, {
    public: true,
    params: filters as Record<string, string | number | undefined>,
  });
  return { data: res.data, meta: res.meta! };
}

/** Detail berita publik */
export async function getNewsDetail(
  opdCode: string,
  slug: string,
): Promise<NewsArticle> {
  const res = await api.get<NewsArticle>(`/lapak/news/public/${opdCode}/${slug}`, {
    public: true,
  });
  return res.data;
}
