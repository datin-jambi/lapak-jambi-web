/**
 * Statistik Publik API Service
 *
 * Transparansi PAD tanpa login.
 * Mengikuti kontrak dari docs/api/lapak/public-stats.md
 */

import { api } from '@/lib/api-client';
import type { PublicStats } from '@/types/api';

/** Ringkasan penerimaan publik per kategori & bulan */
export async function getPublicStats(year?: number): Promise<PublicStats> {
  const res = await api.get<PublicStats>('/lapak/public-stats', {
    public: true,
    params: { year },
  });
  return res.data;
}
