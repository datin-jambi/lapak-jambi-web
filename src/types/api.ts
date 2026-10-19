/**
 * Type definitions yang diselaraskan dengan Seloko API
 *
 * Mengikuti kontrak dari docs/api/ di seloko-api.
 * Tipe lama di types/index.ts dipertahankan untuk backward-compat
 * sampai semua halaman bermigrasi ke API.
 */

// ─── Enums ────────────────────────────────────────────────────────────────────

/** Tipe pricing dari API */
export type PricingUnit =
  | 'SESSION' | 'HOUR' | 'DAY' | 'NIGHT' | 'MONTH'
  | 'YEAR' | 'PERSON' | 'UNIT' | 'M2' | 'TEST' | 'TRIP';

/** Tipe ketersediaan dari API */
export type AvailabilityType =
  | 'SLOT' | 'DATE_RANGE' | 'CONTRACT' | 'STOCK' | 'SCHEDULE';

/** Tipe pemenuhan / fulfillment dari API */
export type FulfillmentType =
  | 'TICKET_QR' | 'BOOKING' | 'CONTRACT' | 'SCHEDULE'
  | 'RESULT' | 'DOCUMENT_SKRD';

/** Status konten (produk, berita, dll.) */
export type ContentStatus =
  | 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'PUBLISHED';

/** Status pesanan */
export type OrderStatus =
  | 'DRAFT' | 'MENUNGGU_VERIFIKASI' | 'MENUNGGU_PEMBAYARAN'
  | 'MENUNGGU_KONFIRMASI' | 'LUNAS' | 'AKTIF' | 'SELESAI'
  | 'DITOLAK' | 'DIBATALKAN' | 'KEDALUWARSA' | 'REFUND';

/** Status pembayaran */
export type PaymentApiStatus =
  | 'MENUNGGU_BUKTI' | 'MENUNGGU_KONFIRMASI' | 'LUNAS'
  | 'DITOLAK' | 'KEDALUWARSA';

/** Status reservasi */
export type ReservationStatus = 'HOLD' | 'CONFIRMED' | 'RELEASED';

/** Status tiket */
export type TicketStatus = 'AKTIF' | 'DIGUNAKAN' | 'KEDALUWARSA' | 'DIBATALKAN';

/** Jenis tiket */
export type TicketKind =
  | 'TICKET' | 'BOOKING' | 'CONTRACT' | 'RESULT' | 'SCHEDULE' | 'HANDOVER';

/** Account type */
export type AccountType = 'INTERNAL' | 'PUBLIC';

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  identity: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  fullName: string;
  phoneNumber?: string;
  nik?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  accountType: AccountType;
  emailVerifiedAt: string | null;
  roleName: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string | null;
  fullName: string;
  avatarUrl: string | null;
  avatarFileId: string | null;
  accountType: AccountType;
  isSuperAdmin: boolean;
}

export interface AuthMeResponse {
  id: string;
  nip: string | null;
  email: string;
  username: string | null;
  fullName: string;
  avatarUrl: string | null;
  avatarFileId: string | null;
  phoneNumber: string | null;
  accountType: AccountType;
  isSuperAdmin: boolean;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  roles: string[];
  permissions: string[];
}

// ─── Kategori ─────────────────────────────────────────────────────────────────

/** Kategori publik (5 field saja) */
export interface CategoryPublic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

// ─── Produk / Aset ────────────────────────────────────────────────────────────

/** Kartu produk di listing publik */
export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  excerpt: string | null;
  coverUrl: string | null;
  address: string | null;
  pricingUnit: PricingUnit;
  startingPrice: number;
  organization: { code: string; name: string };
  category: { name: string; slug: string };
}

/** Rate tarif */
export interface ProductRate {
  id: string;
  name: string;
  unit: PricingUnit;
  price: number;
  minQty: number | null;
  maxQty: number | null;
  startTime: string | null;
  endTime: string | null;
  isActive: boolean;
}

/** Addon produk */
export interface ProductAddon {
  id: string;
  name: string;
  unit: PricingUnit;
  price: number;
  isActive: boolean;
}

/** Persyaratan produk */
export interface ProductRequirement {
  id: string;
  label: string;
  fieldType: string;
  options: string[] | null;
  isRequired: boolean;
  sortOrder: number;
}

/** Fasilitas produk */
export interface ProductFacility {
  id: string;
  name: string;
  icon: string | null;
}

/** Gambar produk */
export interface ProductImage {
  id: string;
  url: string;
  fileId: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
}

/** Detail produk lengkap (halaman detail) */
export interface ProductDetail {
  id: string;
  name: string;
  slug: string;
  excerpt: string | null;
  description: string;
  coverUrl: string | null;
  coverFileId: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  capacity: number | null;
  areaM2: number | null;
  pricingUnit: PricingUnit;
  availabilityType: AvailabilityType;
  fulfillmentType: FulfillmentType;
  status: ContentStatus;
  publishedAt: string | null;
  organization: { id: string; code: string; name: string };
  category: { id: string; name: string; slug: string };
  rates: ProductRate[];
  addons: ProductAddon[];
  requirements: ProductRequirement[];
  facilities: ProductFacility[];
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

// ─── Katalog OPD ──────────────────────────────────────────────────────────────

export interface OpdProfile {
  code: string;
  name: string;
  shortName: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logoUrl: string | null;
  productCount: number;
}

// ─── Ketersediaan ─────────────────────────────────────────────────────────────

export interface AvailabilityDay {
  date: string;
  weekday: number;
  isOpen: boolean;
  openTime: string | null;
  closeTime: string | null;
  reason: string | null;
}

export interface AvailabilityResponse {
  productId: string;
  from: string;
  to: string;
  days: AvailabilityDay[];
}

// ─── Reservasi ────────────────────────────────────────────────────────────────

export interface ReservationSlot {
  startAt: string;
  endAt: string;
  qty: number;
  status: ReservationStatus;
}

export interface Reservation {
  id: string;
  productId: string;
  startAt: string;
  endAt: string;
  qty: number;
  status: ReservationStatus;
  expiresAt: string;
  userId: string | null;
  createdAt: string;
}

// ─── Keranjang ────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  rateId: string | null;
  rateName: string | null;
  reservationId: string | null;
  qty: number;
  startAt: string | null;
  endAt: string | null;
  note: string | null;
  unitPrice: number;
  lineTotal: number;
}

export interface Cart {
  id: string;
  organization: { code: string; name: string };
  items: CartItem[];
  itemCount: number;
  subtotal: number;
}

// ─── Pesanan ──────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: string;
  productName: string;
  rateName: string;
  unit: PricingUnit;
  price: number;
  qty: number;
  lineTotal: number;
  startAt: string | null;
  endAt: string | null;
  note: string | null;
}

export interface OrderApplicant {
  name: string;
  nik: string | null;      // Masked: 1234********3456
  phone: string;            // Masked: 0812****7890
  npwp: string | null;
  email: string | null;
  institution: string | null;
  address: string | null;
}

export interface Order {
  id: string;
  code: string;             // LJK-YYMMDD-XXXXX
  status: OrderStatus;
  organization: { code: string; name: string };
  items: OrderItem[];
  subtotal: number;
  total: number;
  purpose: string;
  expiresAt: string;
  createdAt: string;
  applicant: OrderApplicant;
}

export interface QuoteLine {
  cartItemId: string;
  productId: string;
  productName: string;
  rateId: string;
  rateName: string;
  unit: PricingUnit;
  price: number;
  qty: number;
  lineTotal: number;
  startAt: string | null;
  endAt: string | null;
  warning: string | null;
}

export interface QuoteResponse {
  organization: { code: string; name: string };
  lines: QuoteLine[];
  subtotal: number;
  total: number;
  ready: boolean;
  warnings: string[];
}

export interface CheckoutRequest {
  applicant: {
    name: string;
    nik?: string | null;
    npwp?: string | null;
    phone: string;
    email?: string | null;
    institution?: string | null;
    address?: string | null;
  };
  purpose: string;
  dueHours?: number;
}

// ─── Pembayaran ───────────────────────────────────────────────────────────────

export interface Payment {
  id: string;
  orderId: string;
  orderCode: string;
  method: string;
  status: PaymentApiStatus;
  amount: number;
  organization: { code: string; name: string };
  bank: {
    name: string;
    account: string;
    holder: string;
  };
  proofUrl: string | null;
  proofFileId: string | null;
  senderName: string | null;
  senderBank: string | null;
  note: string | null;
  rejectReason: string | null;
  paidAt: string | null;
  confirmedAt: string | null;
  expiresAt: string;
  createdAt: string;
}

export interface UploadProofRequest {
  proofUrl: string;
  proofFileId: string;
  senderName: string;
  senderBank: string;
  amount: number;
  paidAt: string;
  note?: string;
}

// ─── Tiket ────────────────────────────────────────────────────────────────────

export interface TicketVerification {
  code: string;
  kind: TicketKind;
  productName: string;
  rateName: string;
  organizationName: string;
  status: TicketStatus;
  validFrom: string | null;
  validUntil: string | null;
  usedAt: string | null;
  usable: boolean;
  reason: string | null;
}

export interface Ticket {
  id: string;
  code: string;
  token: string;
  kind: TicketKind;
  productName: string;
  rateName: string;
  status: TicketStatus;
  validFrom: string | null;
  validUntil: string | null;
  usedAt: string | null;
  orderId: string;
}

// ─── Berita ───────────────────────────────────────────────────────────────────

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  thumbnailUrl: string | null;
  thumbnailFileId: string | null;
  category: { id: string; name: string; slug: string } | null;
  organization: { code: string; name: string };
  seoTitle: string | null;
  seoDescription: string | null;
  viewCount: number;
  status: ContentStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticleCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailUrl: string | null;
  category: { name: string; slug: string } | null;
  publishedAt: string | null;
  viewCount: number;
}

// ─── Statistik Publik ─────────────────────────────────────────────────────────

export interface PublicStatsCategory {
  slug: string;
  name: string;
  realized: number | null;
  orderCount: number;
  suppressed: boolean;
}

export interface PublicStatsMonth {
  month: string;
  label: string;
  realized: number;
  orderCount: number;
  suppressed: boolean;
}

export interface PublicStats {
  year: number;
  total: { realized: number; orderCount: number; suppressed: boolean };
  byCategory: PublicStatsCategory[];
  byMonth: PublicStatsMonth[];
  disclosure: { minOrders: number; note: string };
  generatedAt: string;
}

// ─── Storage ──────────────────────────────────────────────────────────────────

export interface UploadedFile {
  fileId: string;
  url: string;
  name: string;
  size: number;
  filePath: string;
  thumbnailUrl: string | null;
}
