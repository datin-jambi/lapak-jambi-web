# Workflow Integrasi API ke Frontend

Dokumen ini adalah **Standard Operating Procedure (SOP)** langkah-demi-langkah bagi Agen AI dan Developer ketika menghubungkan endpoint dari `seloko-api` ke halaman atau komponen di `lapak-jambi-web`.

---

## 5 Langkah Baku Integrasi Endpoint

```
  [1. Kontrak API] ──► [2. Type TS] ──► [3. Service Layer] ──► [4. UI & States] ──► [5. Verifikasi]
  Baca docs backend     src/types/api.ts  src/services/api/*    Loading/Empty/Error   Build & Runtime
```

---

### Langkah 1: Pelajari Kontrak Endpoint Backend
Sebelum menulis kode apa pun, cari dokumentasi resmi endpoint yang bersangkutan:
1. Periksa skill agent: `.agents/skills/seloko-api-reference/SKILL.md`.
2. Atau baca file markdown aslinya di folder backend:
   `../seloko-api/docs/api/lapak/<modul>.md` atau `../seloko-api/docs/api/core/<modul>.md`.
3. Catat:
   - **Method & Path** (misal: `GET /api/lapak/products/public`).
   - **Query Params** (tipe data, apakah boolean dikirim sebagai string `"true"` / `"false"`).
   - **Body Request** (skema validasi Zod backend).
   - **Bentuk Response** (apakah membungkus data dalam envelope `{ statusCode, code, data, meta }`).
   - **Keperluan Autentikasi** (apakah butuh Bearer token atau publik).

---

### Langkah 2: Verifikasi & Perbarui Type Definition
Buka [`src/types/api.ts`](file:///src/types/api.ts):
1. Pastikan interface untuk Request Body, Query Params, dan Data Response sudah tersedia.
2. Jika ada field baru atau perubahan schema dari backend, perbarui interface di `src/types/api.ts`.
3. Hindari penggunaan tipe `any`. Gunakan type unions atau enums yang ketat (misal: `OrderStatus`, `PaymentStatus`).

**Contoh:**
```typescript
// src/types/api.ts
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  organization?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'publishedAt' | 'name' | 'price';
  sortOrder?: 'asc' | 'desc';
}
```

---

### Langkah 3: Gunakan / Buat Service Function
Buka [`src/services/api/`](file:///src/services/api/):
1. Cek file modul terkait (misal: `products.ts`, `orders.ts`, `carts.ts`).
2. Gunakan fungsi `api.get`, `api.post`, `api.put`, `api.delete` dari [`src/lib/api-client.ts`](file:///src/lib/api-client.ts).
3. **PENTING**: Header `X-App-Code: lapak-jambi-web` dan `Authorization: Bearer <token>` sudah ditangani otomatis oleh `api-client.ts`. Anda tidak perlu menyuntikkannya secara manual kecuali kasus khusus.

**Contoh Service:**
```typescript
// src/services/api/products.ts
import { api, type ApiSuccessResponse, type PaginationMeta } from '@/lib/api-client';
import type { ProductCard, ProductQueryParams } from '@/types/api';

export async function getProducts(
  params?: ProductQueryParams
): Promise<ApiSuccessResponse<ProductCard[]>> {
  return api.get<ProductCard[]>('/lapak/products/public', {
    params: params as Record<string, string | number | boolean | undefined>,
  });
}
```

---

### Langkah 4: Hubungkan ke UI dengan Penanganan Status Lengkap
Ketika memanggil service di komponen React, **WAJIB** menangani 4 status:
1. **Loading State**: Tampilkan skeleton placeholder yang mirip bentuk kartu aslinya (bukan sekadar spinner polos berputar).
2. **Success State**: Render data secara interaktif dan estetis.
3. **Empty State**: Jika data array kosong (`data.length === 0`), tampilkan ilustrasi/icon ramah, pesan edukatif, dan tombol aksi (misal: "Reset Filter" atau "Cari Kategori Lain").
4. **Error State**: Tangkap `ApiError` dari `api-client.ts` dan tampilkan notifikasi atau badge error yang jelas bagi pengguna.

#### Pola Utama: Client Component Data Fetching (`'use client'`)
> **PRINSIP UTAMA**: Prioritaskan pemanggilan data API di sisi client menggunakan hook React (`useEffect`, `useState`). Next.js digunakan untuk routing, tata letak, dan tag SEO.

```tsx
'use client';

import { useState, useEffect } from 'react';
import { productsApi } from '@/services/api';
import type { ProductCard } from '@/types/api';
import { ProductCardItem } from '@/components/features/products/ProductCardItem';
import { ProductGridSkeleton } from '@/components/features/products/ProductSkeleton';
import { ApiError } from '@/lib/api-client';

export function ProductCatalogSection() {
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await productsApi.getProducts();
        setProducts(res.data);
      } catch (err) {
        if (err instanceof ApiError) setError(err.message);
        else setError('Gagal memuat produk.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <ProductGridSkeleton count={8} />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (products.length === 0) return <div>Tidak ada produk ditemukan.</div>;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCardItem key={p.id} product={p} />
      ))}
    </div>
  );
}
```

#### Pola Server Component (Hanya Digunakan Seperlunya untuk Metadata SEO):
Gunakan fungsi `generateMetadata()` pada halaman Server Component pembungkus untuk menyuntikkan tag `title` & `description` dinamis sebelum memuat Client Component interaktif di dalamnya:
```tsx
// src/app/(public)/aset/[slug]/page.tsx
import { Metadata } from 'next';
import { ProductDetailClient } from './ProductDetailClient';

// Server-side hanya untuk tag meta SEO jika dibutuhkan
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Detail Fasilitas ${slug} | Lapak Jambi`,
    description: 'Pesan fasilitas aset daerah Provinsi Jambi secara resmi dan terverifikasi.',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
```
```tsx
'use client';

import { useState, useEffect } from 'react';
import { cartsApi } from '@/services/api';
import type { Cart } from '@/types/api';
import { ApiError } from '@/lib/api-client';

export function CartSection() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCarts() {
      try {
        setLoading(true);
        const res = await cartsApi.getMyCarts();
        setCarts(res.data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Terjadi kendala saat memuat keranjang.');
        }
      } finally {
        setLoading(false);
      }
    }
    loadCarts();
  }, []);

  if (loading) return <CartSkeleton />;
  if (error) return <CartErrorAlert message={error} />;
  if (carts.length === 0) return <CartEmptyState />;

  return <CartList carts={carts} />;
}
```

---

### Langkah 5: Verifikasi & Audit Kualitas
1. **TypeScript Typecheck**: Pastikan tidak ada type error atau warning saat compile.
2. **Fallback Safety**: Pastikan jika backend mengembalikan array kosong atau nilai `null` pada gambar atau deskripsi, UI tidak crash (`optional chaining: product?.gallery?.[0]?.url`).
3. **Format Uang & Tanggal**: Selalu gunakan helper pemformatan standar lokal:
   - Format rupiah: `formatRupiah(number)` (`Rp 250.000`)
   - Format tanggal Indonesia: `formatDate(date)` (`19 Oktober 2026`).
