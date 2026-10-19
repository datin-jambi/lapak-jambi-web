import type { Booking, BookingStatus } from '@/types';
import { bookings as dummyBookings, assets as dummyAssets } from '@/dummy';
import { generateId } from '@/utils/format';

export function getBookings(userId?: string): Booking[] {
  if (userId) {
    return dummyBookings.filter((b) => b.userId === userId);
  }
  return [...dummyBookings];
}

export function getBookingById(id: string): Booking | undefined {
  return dummyBookings.find((b) => b.id === id);
}

export function createBooking(data: {
  userId: string;
  assetId: string;
  bookingDate: string;
  timeSlot: { start: string; end: string; price: number };
  quantity: number;
  notes?: string;
}): Booking {
  const asset = dummyAssets.find((a) => a.id === data.assetId);
  const newBooking: Booking = {
    id: generateId(),
    userId: data.userId,
    assetId: data.assetId,
    assetName: asset?.name || '',
    assetImage: asset?.images[0]?.url || '',
    bookingDate: data.bookingDate,
    timeSlot: {
      id: generateId(),
      start: data.timeSlot.start,
      end: data.timeSlot.end,
      isAvailable: true,
      price: data.timeSlot.price,
    },
    quantity: data.quantity,
    totalPrice: data.timeSlot.price * data.quantity,
    status: 'pending',
    paymentStatus: 'unpaid',
    paymentMethod: '',
    notes: data.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  dummyBookings.push(newBooking);
  return newBooking;
}

export function cancelBooking(id: string): void {
  const booking = dummyBookings.find((b) => b.id === id);
  if (booking) {
    booking.status = 'cancelled' as BookingStatus;
    booking.paymentStatus = 'refunded';
    booking.updatedAt = new Date().toISOString();
  }
}

export function getUpcomingBookings(userId: string): Booking[] {
  const now = new Date().toISOString();
  return dummyBookings.filter(
    (b) => b.userId === userId && b.bookingDate >= now && b.status !== 'cancelled'
  );
}

export function getBookingHistory(userId: string): Booking[] {
  return dummyBookings.filter(
    (b) => b.userId === userId && (b.status === 'completed' || b.status === 'cancelled')
  );
}
