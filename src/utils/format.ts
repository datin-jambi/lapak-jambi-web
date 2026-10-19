export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
  }).format(new Date(date));
}

export function formatDateTime(date: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(date));
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) return 'baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;
  if (diffWeeks < 4) return `${diffWeeks} minggu yang lalu`;
  if (diffMonths < 12) return `${diffMonths} bulan yang lalu`;
  return formatDate(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: 'bg-green-500',
    unavailable: 'bg-red-500',
    maintenance: 'bg-yellow-500',
    booked: 'bg-amber-600',
    pending: 'bg-yellow-500',
    confirmed: 'bg-green-500',
    cancelled: 'bg-red-500',
    completed: 'bg-amber-600',
    refunded: 'bg-purple-500',
    paid: 'bg-green-500',
    unpaid: 'bg-red-500',
    failed: 'bg-red-500',
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
  };
  return colors[status] || 'bg-gray-500';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Tersedia',
    unavailable: 'Tidak Tersedia',
    maintenance: 'Pemeliharaan',
    booked: 'Dipesan',
    pending: 'Menunggu',
    confirmed: 'Dikonfirmasi',
    cancelled: 'Dibatalkan',
    completed: 'Selesai',
    refunded: 'Dikembalikan',
    paid: 'Dibayar',
    unpaid: 'Belum Dibayar',
    failed: 'Gagal',
    active: 'Aktif',
    inactive: 'Nonaktif',
  };
  return labels[status] || status;
}

export function formatPricingUnit(unit?: string | null): string {
  if (!unit) return 'hari';
  const unitMap: Record<string, string> = {
    SESSION: 'sesi',
    HOUR: 'jam',
    DAY: 'hari',
    NIGHT: 'malam',
    MONTH: 'bulan',
    YEAR: 'tahun',
    PERSON: 'orang',
    UNIT: 'unit',
    M2: 'm²',
    TEST: 'uji/sampel',
    TRIP: 'trip',
  };
  return unitMap[unit.toUpperCase()] || unit.toLowerCase();
}

