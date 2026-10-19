/**
 * Ketersediaan & Reservasi API Service
 *
 * Mengikuti kontrak dari docs/api/lapak/availability.md dan reservations.md
 */

import { api } from '@/lib/api-client';
import type { AvailabilityResponse, Reservation, ReservationSlot } from '@/types/api';

// ─── Ketersediaan ─────────────────────────────────────────────────────────────

/** Cek ketersediaan harian produk (publik, max 92 hari) */
export async function getAvailability(
  productId: string,
  from: string,
  to: string,
): Promise<AvailabilityResponse> {
  const res = await api.get<AvailabilityResponse>(
    `/lapak/availability/product/${productId}/availability`,
    { public: true, params: { from, to } },
  );
  return res.data;
}

// ─── Reservasi ────────────────────────────────────────────────────────────────

/** Cek slot yang sudah terpakai (publik) */
export async function getBusySlots(
  productId: string,
  from: string,
  to: string,
): Promise<{ productId: string; from: string; to: string; capacity: number; busy: ReservationSlot[]; remaining: number }> {
  const res = await api.get<{ productId: string; from: string; to: string; capacity: number; busy: ReservationSlot[]; remaining: number }>(
    `/lapak/reservations/product/${productId}/slots`,
    { public: true, params: { from, to } },
  );
  return res.data;
}

/** Pegang slot sementara (HOLD) — publik tapi sebaiknya user sudah login */
export async function holdSlot(
  productId: string,
  data: { startAt: string; endAt: string; qty?: number; holdSeconds?: number },
): Promise<Reservation> {
  const res = await api.post<Reservation>(
    `/lapak/reservations/product/${productId}`,
    data,
    { public: true },
  );
  return res.data;
}

/** Lepas HOLD */
export async function releaseSlot(reservationId: string): Promise<void> {
  await api.post(`/lapak/reservations/${reservationId}/release`, undefined, {
    public: true,
  });
}
