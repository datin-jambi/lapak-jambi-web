/**
 * Pembayaran API Service
 *
 * Upload bukti transfer manual.
 * Mengikuti kontrak dari docs/api/lapak/payments.md
 */

import { api } from '@/lib/api-client';
import type { Payment, UploadProofRequest } from '@/types/api';

/** Semua pembayaran pesanan sendiri */
export async function getPaymentsByOrder(orderId: string): Promise<Payment[]> {
  const res = await api.get<Payment[]>(`/lapak/payments/order/${orderId}`);
  return res.data;
}

/** Detail pembayaran */
export async function getPaymentById(paymentId: string): Promise<Payment> {
  const res = await api.get<Payment>(`/lapak/payments/${paymentId}`);
  return res.data;
}

/** Upload bukti transfer */
export async function uploadProof(paymentId: string, data: UploadProofRequest): Promise<Payment> {
  const res = await api.post<Payment>(`/lapak/payments/${paymentId}/proof`, data);
  return res.data;
}
