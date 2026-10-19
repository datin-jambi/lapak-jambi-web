export const APP_NAME = 'Lapak Jambi';
export const APP_DESCRIPTION = 'Platform Digital Pemerintah Provinsi Jambi untuk menemukan, memesan, dan membayar layanan fasilitas publik.';
export const APP_TAGLINE = 'Layanan Publik dalam Genggaman';

export const ROLES = {
  SUPER_ADMIN: 'SuperAdmin' as const,
  ADMIN: 'Admin' as const,
  ADMIN_OPD: 'AdminOPD' as const,
  USER: 'User' as const,
  GUEST: 'Guest' as const,
};

export const ASSET_TYPES = {
  BUILDING: 'building' as const,
  HALL: 'hall' as const,
  SPORTS: 'sports' as const,
  TOURISM: 'tourism' as const,
  TICKET: 'ticket' as const,
  RENTAL: 'rental' as const,
  SERVICE: 'service' as const,
};

export const BOOKING_STATUS = {
  PENDING: 'pending' as const,
  CONFIRMED: 'confirmed' as const,
  CANCELLED: 'cancelled' as const,
  COMPLETED: 'completed' as const,
  REFUNDED: 'refunded' as const,
};

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid' as const,
  PAID: 'paid' as const,
  REFUNDED: 'refunded' as const,
  FAILED: 'failed' as const,
};

export const RUPIAH_FORMATTER = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const DATE_FORMATTER = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'long',
});

export const routes = {
  home: '/',
  about: '/about',
  services: '/services',
  assets: '/assets',
  assetDetail: (slug: string) => `/assets/${slug}`,
  booking: '/booking',
  bookingDetail: (id: string) => `/booking/${id}`,
  myBookings: '/my-bookings',
  news: '/news',
  newsDetail: (slug: string) => `/news/${slug}`,
  gallery: '/gallery',
  faq: '/faq',
  contact: '/contact',
  login: '/login',
  register: '/register',
  profile: '/profile',
  notifications: '/notifications',
  search: '/search',
  wishlist: '/wishlist',
  notFound: '/404',
  cms: '/cms',
  cmsDashboard: '/cms',
  cmsAssets: '/cms/assets',
  cmsAssetNew: '/cms/assets/new',
  cmsAssetEdit: (id: string) => `/cms/assets/${id}/edit`,
  cmsCategories: '/cms/categories',
  cmsFacilities: '/cms/facilities',
  cmsBookings: '/cms/bookings',
  cmsTransactions: '/cms/transactions',
  cmsUsers: '/cms/users',
  cmsRoles: '/cms/roles',
  cmsPermissions: '/cms/permissions',
  cmsNews: '/cms/news',
  cmsGallery: '/cms/gallery',
  cmsFaq: '/cms/faq',
  cmsBanner: '/cms/banner',
  cmsReports: '/cms/reports',
  cmsSettings: '/cms/settings',
  cmsProfile: '/cms/profile',
  cmsAuditLog: '/cms/audit-log',
  cmsNotifications: '/cms/notifications',
} as const;
