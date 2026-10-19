/**
 * Pesanan API Service
 *
 * Quote, checkout, riwayat pesanan.
 * Mengikuti kontrak dari docs/api/lapak/orders.md
 */

import { api, type PaginationMeta } from '@/lib/api-client';
import type { QuoteResponse, Order, CheckoutRequest, OrderStatus } from '@/types/api';

/** Hitung rincian harga (tanpa menyimpan) */
export async function getQuote(cartId: string): Promise<QuoteResponse> {
  const res = await api.get<QuoteResponse>(`/lapak/orders/cart/${cartId}/quote`);
  return res.data;
}

/** Checkout — buat pesanan + bekukan snapshot */
export async function checkout(cartId: string, data: CheckoutRequest): Promise<Order> {
  const res = await api.post<Order>(`/lapak/orders/cart/${cartId}/checkout`, data);
  return res.data;
}

/** Pesanan milik user yang login */
export async function getMyOrders(params?: {
  status?: OrderStatus;
  page?: number;
  limit?: number;
}): Promise<{ data: Order[]; meta: PaginationMeta }> {
  const res = await api.get<Order[]>('/lapak/orders/mine', {
    params: params as Record<string, string | number | undefined>,
  });
  return { data: res.data, meta: res.meta! };
}

/** Detail pesanan (milik sendiri) */
export async function getOrderById(orderId: string): Promise<Order> {
  const res = await api.get<Order>(`/lapak/orders/${orderId}`);
  return res.data;
}
