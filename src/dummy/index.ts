import { assets } from './assets';
import { users } from './users';
import { categories } from './categories';
import { facilities } from './facility';
import { bookings } from './booking';
import { news } from './news';
import { banners } from './banner';
import { gallery } from './gallery';
import { notifications } from './notification';
import { faq } from './faq';
import { testimonials } from './testimonials';

export {
  assets,
  users,
  categories,
  facilities,
  bookings,
  news,
  banners,
  gallery,
  notifications,
  faq,
  testimonials,
};

export function getAssetBySlug(slug: string) {
  return assets.find((asset) => asset.slug === slug) || null;
}

export function getAssetById(id: string) {
  return assets.find((asset) => asset.id === id) || null;
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id) || null;
}

export function getCategoryById(id: string) {
  return categories.find((cat) => cat.id === id) || null;
}

export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug) || null;
}

export function getBookingById(id: string) {
  return bookings.find((booking) => booking.id === id) || null;
}

export function getBookingsByUserId(userId: string) {
  return bookings.filter((booking) => booking.userId === userId);
}

export function getAssetsByCategory(categoryId: string) {
  return assets.filter((asset) => asset.categoryId === categoryId);
}

export function getAssetsByType(type: string) {
  return assets.filter((asset) => asset.type === type);
}

export function getNotificationsByUserId(userId: string) {
  return notifications.filter((n) => n.userId === userId);
}

export function getFeaturedAssets() {
  return assets.filter((asset) => asset.isFeatured);
}

export function getPopularAssets() {
  return assets.filter((asset) => asset.isPopular);
}

export function getFaqByCategory(category: string) {
  return faq.filter((item) => item.category === category);
}
