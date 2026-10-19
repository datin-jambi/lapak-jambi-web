/**
 * Keranjang API Service
 *
 * Satu keranjang per OPD per user.
 * Mengikuti kontrak dari docs/api/lapak/carts.md
 */

import { api } from '@/lib/api-client';
import type { Cart } from '@/types/api';

/** Semua keranjang milik user yang login */
export async function getCarts(): Promise<Cart[]> {
  const res = await api.get<Cart[]>('/lapak/carts');
  return res.data;
}

/** Ambil / buat keranjang OPD (idempoten) */
export async function getCartByOpd(opdCode: string): Promise<Cart> {
  const res = await api.get<Cart>(`/lapak/carts/opd/${opdCode}`);
  return res.data;
}

/** Detail satu keranjang */
export async function getCartById(cartId: string): Promise<Cart> {
  const res = await api.get<Cart>(`/lapak/carts/${cartId}`);
  return res.data;
}

/** Tambah produk ke keranjang */
export async function addCartItem(
  cartId: string,
  data: {
    productId: string;
    rateId?: string | null;
    reservationId?: string | null;
    qty?: number;
    startAt?: string | null;
    endAt?: string | null;
    note?: string | null;
  },
): Promise<Cart> {
  const res = await api.post<Cart>(`/lapak/carts/${cartId}/items`, data);
  return res.data;
}

/** Ubah qty / tarif / catatan item */
export async function updateCartItem(
  cartId: string,
  itemId: string,
  data: { qty?: number; rateId?: string; note?: string | null },
): Promise<Cart> {
  const res = await api.put<Cart>(`/lapak/carts/${cartId}/items/${itemId}`, data);
  return res.data;
}

/** Hapus satu item */
export async function removeCartItem(cartId: string, itemId: string): Promise<void> {
  await api.delete(`/lapak/carts/${cartId}/items/${itemId}`);
}

/** Kosongkan keranjang (keranjang tetap ada) */
export async function clearCart(cartId: string): Promise<void> {
  await api.post(`/lapak/carts/${cartId}/clear`);
}

/** Hapus keranjang beserta itemnya */
export async function deleteCart(cartId: string): Promise<void> {
  await api.delete(`/lapak/carts/${cartId}`);
}
