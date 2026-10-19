/**
 * Tiket API Service
 *
 * Verifikasi QR dan tiket user.
 * Mengikuti kontrak dari docs/api/lapak/tickets.md
 */

import { api } from '@/lib/api-client';
import type { TicketVerification, Ticket } from '@/types/api';

/** Verifikasi tiket via token QR atau kode pendek (publik, tanpa login) */
export async function verifyTicket(token: string): Promise<TicketVerification> {
  const res = await api.get<TicketVerification>(`/lapak/tickets/verify/${token}`, {
    public: true,
  });
  return res.data;
}

/** Tiket milik pesanan sendiri */
export async function getTicketsByOrder(orderId: string): Promise<Ticket[]> {
  const res = await api.get<Ticket[]>(`/lapak/tickets/order/${orderId}`);
  return res.data;
}

/** Detail tiket */
export async function getTicketById(ticketId: string): Promise<Ticket> {
  const res = await api.get<Ticket>(`/lapak/tickets/${ticketId}`);
  return res.data;
}
