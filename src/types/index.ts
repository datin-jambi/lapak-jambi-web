export type UserRole = 'SuperAdmin' | 'Admin' | 'AdminOPD' | 'User' | 'Guest';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  opdId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AssetType = 'building' | 'hall' | 'sports' | 'tourism' | 'ticket' | 'rental' | 'service';
export type AssetStatus = 'available' | 'unavailable' | 'maintenance' | 'booked';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';

export interface AssetCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  assetCount: number;
}

export interface AssetImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface AssetFacility {
  id: string;
  name: string;
  icon: string;
}

export interface AssetSchedule {
  date: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  isAvailable: boolean;
  price: number;
}

export interface AssetReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  type: AssetType;
  categoryId: string;
  categoryName: string;
  images: AssetImage[];
  facilities: AssetFacility[];
  location: string;
  address: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  price: number;
  priceUnit: string;
  capacity: number;
  area: number;
  status: AssetStatus;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isPopular: boolean;
  schedules: AssetSchedule[];
  reviews: AssetReview[];
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  assetId: string;
  assetName: string;
  assetImage: string;
  bookingDate: string;
  timeSlot: TimeSlot;
  quantity: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  tags: string[];
  isFeatured: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  order: number;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  content: string;
  rating: number;
}

export interface DashboardStats {
  totalAssets: number;
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  pendingBookings: number;
  monthlyRevenue: number[];
  monthlyBookings: number[];
  popularAssets: { id: string; name: string; count: number }[];
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  createdAt: string;
}

export interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  generatedAt: string;
  url: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank_transfer' | 'e_wallet' | 'credit_card' | 'virtual_account';
  icon: string;
  isActive: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface SidebarMenuGroup {
  id: string;
  label: string;
  items: SidebarMenuItem[];
}

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  roles: UserRole[];
  children?: SidebarMenuItem[];
}
