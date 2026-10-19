# Standar Penulisan Kode (Coding Standards) — Lapak Jambi Web

Dokumen ini memuat standar penulisan kode, arsitektur modul, dan konvensi TypeScript untuk proyek **Lapak Jambi Web**.

---

## 1. Konvensi Next.js 16 App Router

### A. Prioritas Client-Side Fetching (Client-First Data Fetching)
- **PRIORITASKAN FETCHING DATA DI SISI CLIENT (`'use client'`)**:
  - Semua pemanggilan API backend (`productsApi`, `categoriesApi`, `authApi`, `cartsApi`, dll.) diprioritaskan dieksekusi di sisi client menggunakan React lifecycle (`useEffect`, `useState`, atau custom hooks).
  - Client component mengelola state loading (skeleton), success, empty state, dan error toast/alert secara mandiri dan interaktif.
- **Fungsi Next.js Utama: SEO, Metadata & Routing**:
  - Next.js difokuskan untuk optimasi SEO (`metadata` statis, `generateMetadata` untuk tag `title` & `description` pada halaman publik/detail), font optimization, image optimization, dan layout routing.
  - Server-side data fetching (`async Server Component`) **hanya digunakan seperlunya saja** ketika crawler SEO benar-benar membutuhkan data statis di awal. Selebihnya, seluruh pengalaman interaktif pengguna berada di Client Component.

### B. Route Grouping yang Tepat
- `(public)`: Halaman yang dapat diakses publik tanpa login (`/`, `/aset`, `/berita`, `/kontak`).
- `(auth)`: Halaman alur autentikasi publik (`/login`, `/register`).
- `(user)`: Halaman khusus pengguna yang telah login (`/booking`, `/my-bookings`, `/profile`, `/cart`).

---

## 2. TypeScript & Penanganan Tipe Data

### A. Tipe Data API
- Selalu gunakan interface dari [`src/types/api.ts`](file:///src/types/api.ts).
- Hindari tipe `any`. Jika tipe data benar-benar belum diketahui, gunakan `unknown` dan validasi dengan type guard.
- Tipe data lama di `src/types/index.ts` hanya untuk backward compatibility bertahap, semua fitur baru harus mengacu ke `src/types/api.ts`.

### B. Nilai Nullable & Optional Chaining
- Data dari API backend mungkin bernilai `null` atau `undefined` (contoh: foto galeri opsional, deskripsi fasilitas kosong, nomor telepon tidak terisi).
- Selalu gunakan *optional chaining* (`?.`) dan *nullish coalescing* (`??`):
  ```typescript
  const bannerImage = product.gallery?.[0]?.url ?? '/images/placeholders/default-asset.jpg';
  const priceDisplay = product.pricingRates?.[0]?.price ?? 0;
  ```

---

## 3. Komunikasi API & Service Layer

1. **Semua request HTTP harus melalui `src/lib/api-client.ts`**.
2. **Jangan pernah melakukan `fetch()` langsung** dengan hardcoded URL di dalam file komponen.
3. Struktur service layer harus terisolasi per domain di `src/services/api/`:
   - `auth.ts`: Autentikasi dan sesi user.
   - `products.ts`: Katalog aset dan pencarian.
   - `categories.ts`: Kategori fasilitas.
   - `availability.ts`: Kalender ketersediaan & jadwal slot.
   - `carts.ts`: Keranjang belanja multi-OPD.
   - `orders.ts`: Checkout dan riwayat pesanan.
   - `payments.ts`: Upload bukti transfer dan riwayat pembayaran.
   - `tickets.ts`: Tiket digital dan verifikasi QR.
   - `news.ts`: Rilis berita OPD.
   - `public-stats.ts`: Statistik PAD terbuka.
   - `storage.ts`: Upload gambar via ImageKit.

---

## 4. Penanganan Error (Error Handling)

1. Gunakan kelas `ApiError` yang diexport dari `@/lib/api-client`:
   ```typescript
   import { ApiError } from '@/lib/api-client';

   try {
     await ordersApi.checkout(cartId, payload);
   } catch (error) {
     if (error instanceof ApiError) {
       // Menampilkan pesan spesifik dari backend Zod validation atau business error
       toast.error(error.message);
     } else {
       toast.error('Terjadi kesalahan yang tidak terduga. Silakan coba kembali.');
     }
   }
   ```
2. Jangan biarkan error unhandled memicu halaman putih (white screen). Selalu bungkus komponen kritis dengan `ErrorBoundary` atau sediakan fallback UI.

---

## 5. Optimalisasi Gambar & Media

1. Gunakan komponen `next/image` dari Next.js untuk optimasi ukuran dan format WebP otomatis.
2. Domain remote image yang diizinkan telah dikonfigurasi di `next.config.ts` (termasuk `images.unsplash.com` dan `ik.imagekit.io`).
3. Selalu sediakan prop `alt` yang deskriptif untuk aksesibilitas dan SEO.
4. Gunakan `priority` untuk gambar banner di atas lipatan layar (*above the fold*).
