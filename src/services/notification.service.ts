import type { Notification } from '@/types';
import { notifications as dummyNotifications } from '@/dummy';

export function getNotifications(userId: string): Notification[] {
  return dummyNotifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getUnreadNotifications(userId: string): Notification[] {
  return getNotifications(userId).filter((n) => !n.isRead);
}

export function markAsRead(id: string): void {
  const notification = dummyNotifications.find((n) => n.id === id);
  if (notification) {
    notification.isRead = true;
  }
}

export function markAllAsRead(userId: string): void {
  dummyNotifications
    .filter((n) => n.userId === userId && !n.isRead)
    .forEach((n) => {
      n.isRead = true;
    });
}

export function getUnreadCount(userId: string): number {
  return getUnreadNotifications(userId).length;
}
