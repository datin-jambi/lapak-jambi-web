# Lapak Jambi Web — Project Rules

## Identitas Proyek

- **Nama:** Lapak Jambi
- **Deskripsi:** Platform digital Pemerintah Provinsi Jambi untuk masyarakat menemukan, memesan, dan membayar layanan fasilitas publik / aset daerah.
- **Audience:** PUBLIC (warga), bukan admin/CMS (CMS ada di `seloko-web`).
- **Referensi Desain:** Marketplace + Traveloka (cari-pesan-bayar).

## Tech Stack

| Layer         | Teknologi                          |
|---------------|------------------------------------|
| Framework     | Next.js 16 (App Router)            |
| Language      | TypeScript                         |
| Styling       | Tailwind CSS v4 + shadcn/ui        |
| Icons         | Lucide React                       |
| Font          | Roboto (Google Fonts)              |
| State         | React Context (AuthProvider)       |
| API Client    | Custom fetch wrapper (`lib/api-client.ts`) |

## Arsitektur

```
seloko-api (Backend) ─── lapak-jambi-web (Frontend Publik, ini)
                     └── seloko-web (CMS Terpusat, bukan ini)
```

## Konvensi API

### Header Wajib
- `X-App-Code: lapak-jambi-web` — dikirim otomatis oleh `api-client.ts`.
- `Authorization: Bearer <accessToken>` — untuk endpoint yang butuh login.
- `Content-Type: application/json` — untuk request ber-body (non-upload).

### Response Format (Lapak modules)
```json
{
  "statusCode": 200,
  "code": "SUCCESS",
  "message": "...",
  "data": [],
  "meta": { "page": 1, "limit": 20, "totalItems": 3, "totalPages": 1, "hasNextPage": false, "hasPreviousPage": false }
}
```

### Auth Flow
1. Login: `POST /api/auth/login` → `accessToken` (15 min) + `seloko_rt` cookie (7 hari).
2. Auto-refresh: `POST /api/auth/refresh` via cookie → token baru.
3. Register: `POST /api/auth/register` (khusus audience PUBLIC).
4. Profile: `GET /api/auth/me` → user info + roles + permissions.

### Endpoint Publik (tanpa login)
| Modul | Prefix | Keterangan |
|-------|--------|------------|
| Kategori | `/api/lapak/categories/public` | Daftar & detail kategori |
| Produk | `/api/lapak/products/public` | Katalog + detail produk |
| Katalog OPD | `/api/lapak/organizations/:code` | Profil OPD + produk |
| Ketersediaan | `/api/lapak/availability/product/:id/availability` | Kalender ketersediaan |
| Reservasi | `/api/lapak/reservations/product/:id/slots` | Cek slot terpakai |
| Tiket | `/api/lapak/tickets/verify/:token` | Verifikasi tiket QR |
| Statistik | `/api/lapak/public-stats` | Transparansi PAD |
| Berita | `/api/lapak/news/public/:code` | Berita OPD |

### Endpoint User (perlu login)
| Modul | Prefix | Keterangan |
|-------|--------|------------|
| Keranjang | `/api/lapak/carts` | CRUD keranjang (1 per OPD) |
| Pesanan | `/api/lapak/orders` | Quote, checkout, riwayat |
| Pembayaran | `/api/lapak/payments` | Upload bukti transfer |
| Tiket | `/api/lapak/tickets/order/:id` | Tiket pesanan sendiri |
| Storage | `/api/storage/upload` | Upload file via ImageKit |

## Aturan Pengembangan

### 1. Service Layer
- Semua API call harus melalui `src/lib/api-client.ts`.
- Endpoint-specific services di `src/services/api/`.
- Dummy data di `src/dummy/` boleh dipertahankan sementara sebagai fallback.

### 2. Type Definitions
- Tipe API ada di `src/types/api.ts` — ikuti kontrak dari docs/api.
- Tipe lama di `src/types/index.ts` dipertahankan untuk backward compat.

### 3. File & Folder Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── (public)/     # Halaman publik (tanpa login)
│   ├── (auth)/       # Halaman login/register
│   └── (user)/       # Halaman user (perlu login)
├── components/       # Reusable components
│   ├── common/       # Shared components
│   ├── layout/       # Layout components (Header, Footer, etc.)
│   └── ui/           # shadcn/ui components
├── dummy/            # Dummy data (fallback sementara)
├── hooks/            # Custom React hooks
├── lib/              # Core utilities (api-client, utils)
├── providers/        # React Context providers
├── services/         # API service functions
│   └── api/          # Backend API services
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

### 4. Halaman
- **TIDAK ADA CMS** di proyek ini. CMS sudah dipindah ke `seloko-web`.
- Fokus 100% pada halaman publik dan user.

### 5. Branding / Design
- Tema warna: Coklat gelap (primary) + Gold/Emas (accent) — nuansa Melayu Jambi.
- Pattern: Batik, Songket (sudah ada di `globals.css`).
- Referensi: Traveloka-like marketplace UX.
- Font: Roboto.

### 6. Environment Variables
- File `.env.local` (tidak masuk git).
- Referensi: `.env.example`.
- Prefix `NEXT_PUBLIC_` untuk variabel yang diakses di client.

### 7. Error Handling
- `ApiError` class di `api-client.ts` menangkap error dari backend.
- Status 401 → auto-refresh token.
- Status 400 (VALIDATION_ERROR) → tampilkan `details[].message` per field.
- Status lain → tampilkan `message` ke user.
