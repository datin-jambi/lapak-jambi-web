---
name: seloko-api-reference
description: >
  Referensi lengkap endpoint Seloko API yang relevan untuk lapak-jambi-web.
  Gunakan skill ini saat perlu menambah service layer baru, memperbaiki request/response,
  atau memvalidasi tipe data terhadap kontrak API.
---

# Seloko API Reference untuk Lapak Jambi Web

## Konvensi Dasar

- **Base URL:** `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3000/api`)
- **Header wajib:** `X-App-Code: lapak-jambi-web`
- **Primary key:** UUID v7 (string)
- **Waktu:** ISO 8601 UTC
- **Boolean di query:** string `"true"` / `"false"`
- **Boolean di body:** JSON `true` / `false`
- **Paginasi default:** `page=1`, `limit=20`, max 100

## Response Format

Modul Lapak menggunakan envelope ini:
```json
{
  "statusCode": 200,
  "code": "SUCCESS",
  "message": "...",
  "data": [],
  "meta": { "page": 1, "limit": 20, "totalItems": N, "totalPages": N, "hasNextPage": bool, "hasPreviousPage": bool }
}
```

Modul Core (auth, users) menggunakan:
```json
{
  "success": true,
  "message": "...",
  "data": {},
  "meta": { "page": 1, "limit": 20, "total": N, "totalPages": N, "hasNextPage": bool, "hasPreviousPage": bool }
}
```

Perhatikan: Core pakai `total`, Lapak pakai `totalItems`.

## Error Codes

| Status | Code | Kapan |
|--------|------|-------|
| 400 | VALIDATION_ERROR | Zod fail; `details[]` menyebut field & alasan |
| 400 | BAD_REQUEST | Aturan bisnis dilanggar |
| 401 | UNAUTHORIZED | Token expired / dicabut |
| 403 | FORBIDDEN | Izin kurang / X-App-Code mismatch |
| 404 | NOT_FOUND | Entitas tidak ada / soft-deleted |
| 409 | CONFLICT | Unique bentrok / relasi aktif |
| 429 | TOO_MANY_REQUESTS | Rate limit |

## Endpoint Publik (Tanpa Login)

### Kategori
- `GET /api/lapak/categories/public` → `CategoryPublic[]`
- `GET /api/lapak/categories/public/:slug` → `CategoryPublic`

### Produk
- `GET /api/lapak/products/public` → `ProductCard[]` + meta
  - Query: `page`, `limit` (max 50), `search`, `category` (slug), `organization` (code), `minPrice`, `maxPrice`, `sortBy` (publishedAt|name|price), `sortOrder`
- `GET /api/lapak/products/public/:slug` → `ProductDetail`

### Katalog OPD
- `GET /api/lapak/organizations/:code` → `OpdProfile`
- `GET /api/lapak/organizations/:code/products` → `ProductCard[]` + meta

### Ketersediaan
- `GET /api/lapak/availability/product/:productId/availability?from&to` → `AvailabilityResponse`
  - Max rentang: 92 hari

### Reservasi Slot
- `GET /api/lapak/reservations/product/:productId/slots?from&to` → busy slots
- `POST /api/lapak/reservations/product/:productId` → buat HOLD (15 menit default)
- `POST /api/lapak/reservations/:id/release` → lepas HOLD

### Tiket
- `GET /api/lapak/tickets/verify/:token` → `TicketVerification` (tanpa data pribadi)

### Statistik
- `GET /api/lapak/public-stats?year=2026` → `PublicStats`

### Berita
- `GET /api/lapak/news/public/:code` → berita OPD (paginated)
- `GET /api/lapak/news/public/:code/:slug` → detail berita

## Endpoint Auth

- `POST /api/auth/login` — body: `{ identity, password }`
- `POST /api/auth/refresh` — via cookie `seloko_rt`, tanpa body
- `POST /api/auth/logout` — butuh Bearer token
- `POST /api/auth/logout-all` — cabut semua sesi
- `GET /api/auth/me` — profil + roles + permissions
- `POST /api/auth/register` — body: `{ email, password, passwordConfirm, fullName, phoneNumber?, nik? }`

## Endpoint User (Login Required)

### Keranjang
- `GET /api/lapak/carts` → semua keranjang user
- `GET /api/lapak/carts/opd/:code` → ambil/buat keranjang OPD (idempoten)
- `POST /api/lapak/carts/:id/items` — body: `{ productId, rateId?, qty }`
- `PUT /api/lapak/carts/:id/items/:itemId` — ubah qty/tarif/note
- `DELETE /api/lapak/carts/:id/items/:itemId` — hapus item
- `POST /api/lapak/carts/:id/clear` — kosongkan
- `DELETE /api/lapak/carts/:id` — hapus keranjang

### Pesanan
- `GET /api/lapak/orders/cart/:cartId/quote` → `QuoteResponse` (tanpa simpan)
- `POST /api/lapak/orders/cart/:cartId/checkout` → `Order` (body: CheckoutRequest)
- `GET /api/lapak/orders/mine?status&page&limit` → pesanan user
- `GET /api/lapak/orders/:id` → detail pesanan

### Pembayaran
- `GET /api/lapak/payments/order/:orderId` → pembayaran pesanan
- `GET /api/lapak/payments/:id` → detail pembayaran
- `POST /api/lapak/payments/:id/proof` → upload bukti (body: UploadProofRequest)

### Tiket
- `GET /api/lapak/tickets/order/:orderId` → tiket pesanan
- `GET /api/lapak/tickets/:id` → detail tiket

### Storage
- `POST /api/storage/upload?module=lapak&subFolder=payments` — multipart/form-data, field: `file`

## Tips Implementasi

1. **Harga keranjang = informasi saja.** Harga final dibekukan saat checkout sebagai snapshot.
2. **Satu keranjang per OPD.** Produk OPD lain → keranjang terpisah.
3. **Reservasi anti double-booking** dijamin oleh database constraint (exclusion gist).
4. **PII termasking** di respons order/payment — NIK & telepon tidak pernah utuh.
5. **Tiket terbit saat LUNAS**, bukan saat checkout.
6. **Suppression statistik** — kategori < 3 pesanan → nominal disembunyikan.
