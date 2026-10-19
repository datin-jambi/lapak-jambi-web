# Pipeline & Roadmap Pengerjaan Lapak Jambi Web

Dokumen ini memuat **tahapan pengerjaan (pipeline)**, status terkini, dan panduan transisi dari mockup/dummy menuju integrasi penuh dengan Seloko API.

---

## Ringkasan Progres & Status Pipeline

| Fase | Nama Fitur / Modul | Status | Fokus Utama |
| :---: | :--- | :---: | :--- |
| **0** | **Fondasi Proyek & API Client** | **SELESAI (Completed)** | `.env`, `api-client.ts`, `src/types/api.ts`, `services/api/*`, pembersihan CMS lama |
| **1** | **Autentikasi & Profil Pengguna** | **SIAP DIKERJAKAN (Next)** | Login warga, register publik, integrasi `AuthProvider`, profil akun |
| **2** | **Katalog Produk, Kategori & Pencarian** | **SIAP DIKERJAKAN** | Beranda, chip kategori, filter dinamis, search aset/layanan |
| **3** | **Detail Aset & Kalender Ketersediaan (Traveloka Style)** | **MENUNGGU (Queued)** | Detail produk, tarif retribusi, kalender jadwal booking, hold slot |
| **4** | **Keranjang Multi-OPD & Checkout Pesanan** | **MENUNGGU (Queued)** | Keranjang per OPD, penyesuaian tarif/qty, checkout quotation |
| **5** | **Pembayaran & Upload Bukti Transfer** | **MENUNGGU (Queued)** | Rincian transfer bank, upload bukti via ImageKit, status order |
| **6** | **E-Tiket & Verifikasi QR Code** | **MENUNGGU (Queued)** | Tiket pesanan lunas, QR code digital, portal verifikasi tiket |
| **7** | **Berita OPD & Statistik PAD Publik** | **MENUNGGU (Queued)** | Rilis berita OPD dan transparansi PAD retribusi daerah |
| **8** | **Polish Visual, Audit Responsif & Performance** | **MENUNGGU (Queued)** | Animasi mikro, penyesuaian mobile drawer, skeleton loader |

---

## Rincian Tiap Fase Pipeline

---

### Fase 0: Fondasi Proyek & API Client *(SELESAI)*
- [x] Konfigurasi `.env.local` & `.env.example` (API base URL, ImageKit, app code).
- [x] Pembuatan core API Client (`src/lib/api-client.ts`) dengan penanganan `X-App-Code`, JWT bearer, refresh cookie, dan error handling.
- [x] Penyelarasan TypeScript definitions (`src/types/api.ts`) dengan schema Seloko API.
- [x] Pembuatan service layer modular (`src/services/api/*.ts`).
- [x] Pembersihan route CMS internal lama (`src/app/cms`) karena sudah dipusatkan ke `seloko-web`.
- [x] Dokumentasi dasar Agen (`.agents/rules/project.md` dan `.agents/skills/seloko-api-reference`).

---

### Fase 1: Autentikasi & Profil Pengguna *(Sedang Dipersiapkan)*
> **Tujuan**: Menghubungkan alur otentikasi warga (publik) secara riil ke backend `seloko-api`.

- **Endpoint Terkait**:
  - `POST /api/auth/login` (login user publik)
  - `POST /api/auth/register` (registrasi warga baru)
  - `POST /api/auth/refresh` (auto-refresh access token via cookie)
  - `POST /api/auth/logout` (revokasi token)
  - `GET /api/auth/me` (data profil pengguna aktif)
- **File Target**:
  - `src/providers/AuthProvider.tsx` (ubah dari localStorage dummy menjadi `authApi`)
  - `src/app/(auth)/login/page.tsx`
  - `src/app/(auth)/register/page.tsx`
  - `src/app/(user)/profile/page.tsx`
- **Checklist Keberhasilan**:
  - [ ] Warga dapat register akun dengan form nama lengkap, email, password, no. telepon, dan NIK opsional.
  - [ ] Warga dapat login dan token JWT tersimpan dengan aman di memory / cookie.
  - [ ] Halaman profil membaca data asli dari `GET /api/auth/me`.
  - [ ] Auto-refresh token berfungsi transparan tanpa logout mendadak saat sesi masih valid.
  - [ ] Logout membersihkan state auth dan mengarahkan kembali ke beranda.

---

### Fase 2: Katalog Produk, Kategori & Pencarian (Marketplace Style)
> **Tujuan**: Memungkinkan masyarakat menelusuri katalog aset dan layanan milik Pemprov Jambi secara cepat dan intuitif.

- **Endpoint Terkait**:
  - `GET /api/lapak/categories/public`
  - `GET /api/lapak/products/public` (query: `search`, `category`, `organization`, `minPrice`, `maxPrice`, `sortBy`, `sortOrder`, `page`, `limit`)
  - `GET /api/lapak/organizations/:code` & `GET /api/lapak/organizations/:code/products`
- **File Target**:
  - `src/app/(public)/page.tsx` (Beranda: hero search bar, kategori pilihan, featured assets)
  - `src/app/(public)/aset/page.tsx` atau `src/app/(public)/layanan/page.tsx` (Katalog lengkap dengan filter sidebar)
  - `src/components/features/products/ProductCard.tsx`
  - `src/components/features/products/ProductFilters.tsx`
- **Checklist Keberhasilan**:
  - [ ] Kategori ditampilkan dinamis dari API.
  - [ ] Search bar utama di Hero Section mengarahkan ke halaman katalog dengan query parameter.
  - [ ] Filter harga (min/max), instansi OPD, dan kategori bekerja realtime / on submit.
  - [ ] Paginasi API (`meta.page`, `meta.totalPages`) berfungsi sempurna.
  - [ ] Skeleton loaders tampil anggun saat data sedang dimuat.

---

### Fase 3: Detail Aset & Kalender Ketersediaan (Traveloka Style)
> **Tujuan**: Menyediakan halaman detail fasilitas yang lengkap dengan foto galeri, spesifikasi, daftar tarif retribusi, dan kalender ketersediaan jadwal slot anti-bentrok.

- **Endpoint Terkait**:
  - `GET /api/lapak/products/public/:slug` (Detail produk lengkap dengan tarif, aset fisik, OPD)
  - `GET /api/lapak/availability/product/:productId/availability` (Status hari: AVAILABLE, PARTIAL, FULL, CLOSED)
  - `GET /api/lapak/reservations/product/:productId/slots` (Slot jam yang terisi pada tanggal tertentu)
  - `POST /api/lapak/reservations/product/:productId` (Hold slot sementara)
- **File Target**:
  - `src/app/(public)/aset/[slug]/page.tsx`
  - `src/components/features/booking/AvailabilityCalendar.tsx`
  - `src/components/features/booking/SlotPicker.tsx`
  - `src/components/features/products/RateSelector.tsx`
- **Checklist Keberhasilan**:
  - [ ] Tampilan galeri foto fasilitas (ImageKit / Unsplash CDN).
  - [ ] Pemilihan jenis tarif retribusi resmi (harian, per sesi, per jam, per m²).
  - [ ] Kalender ketersediaan menandai tanggal hijau (tersedia), kuning (parsial), merah (penuh), dan abu-abu (tutup).
  - [ ] Slot waktu anti double-booking terintegrasi.
  - [ ] Tombol "Pesan Sekarang" atau "Tambah ke Keranjang" aktif setelah tanggal/slot valid dipilih.

---

### Fase 4: Keranjang Multi-OPD & Checkout Pesanan
> **Tujuan**: Menerapkan model transaksi multi-keranjang (1 keranjang per instansi OPD) sesuai regulasi pengelolaan keuangan daerah.

- **Endpoint Terkait**:
  - `GET /api/lapak/carts` & `GET /api/lapak/carts/opd/:code`
  - `POST /api/lapak/carts/:id/items`
  - `PUT /api/lapak/carts/:id/items/:itemId` & `DELETE /api/lapak/carts/:id/items/:itemId`
  - `GET /api/lapak/orders/cart/:cartId/quote` (Hitung quotation sebelum checkout)
  - `POST /api/lapak/orders/cart/:cartId/checkout` (Buat pesanan resmi)
- **File Target**:
  - `src/app/(user)/cart/page.tsx` (Tampilan tab / accordion per OPD)
  - `src/app/(user)/booking/checkout/page.tsx`
  - `src/components/features/cart/CartDrawer.tsx` / `CartList.tsx`
  - `src/components/features/checkout/OrderSummary.tsx`
- **Checklist Keberhasilan**:
  - [ ] Item belanja terpisah otomatis sesuai instansi OPD pemilik aset.
  - [ ] User dapat melakukan checkout spesifik untuk 1 OPD tanpa terganggu item dari OPD lain.
  - [ ] Fitur "Request Quote" menampilkan kalkulasi rincian biaya resmi sebelum konfirmasi final.
  - [ ] Checkout berhasil mengembalikan Nomor Pesanan (Order Number) dan batas waktu pembayaran.

---

### Fase 5: Pembayaran & Upload Bukti Transfer
> **Tujuan**: Memfasilitasi pembayaran retribusi daerah via rekening kas daerah / virtual account dan konfirmasi bukti transfer.

- **Endpoint Terkait**:
  - `GET /api/lapak/orders/:id`
  - `GET /api/lapak/payments/order/:orderId`
  - `POST /api/storage/upload?module=lapak&subFolder=payments`
  - `POST /api/lapak/payments/:id/proof`
- **File Target**:
  - `src/app/(user)/my-bookings/[id]/page.tsx`
  - `src/app/(user)/my-bookings/[id]/payment/page.tsx`
  - `src/components/features/payments/PaymentProofUploader.tsx`
  - `src/components/features/payments/CountdownTimer.tsx`
- **Checklist Keberhasilan**:
  - [ ] Instruksi nomor rekening Bank Jambi / kas daerah ditampilkan jelas dengan fitur tombol "Salin".
  - [ ] Countdown batas waktu pembayaran (*expiry timer*) berjalan dinamis.
  - [ ] Upload gambar bukti transfer via endpoint ImageKit storage dengan preview.
  - [ ] Status pesanan diperbarui menjadi `WAITING_VERIFICATION` setelah bukti diunggah.

---

### Fase 6: E-Tiket & Verifikasi QR Code
> **Tujuan**: Menerbitkan bukti legalitas izin pemakaian fasilitas daerah berwujud e-tiket ber-QR Code untuk verifikasi oleh petugas di lokasi.

- **Endpoint Terkait**:
  - `GET /api/lapak/tickets/order/:orderId`
  - `GET /api/lapak/tickets/:id`
  - `GET /api/lapak/tickets/verify/:token` (Endpoint publik verifikasi QR tanpa data sensitif PII)
- **File Target**:
  - `src/app/(user)/my-bookings/[id]/ticket/page.tsx`
  - `src/app/(public)/tiket/verifikasi/[token]/page.tsx`
  - `src/components/features/tickets/TicketCard.tsx`
  - `src/components/features/tickets/QrCodeDisplay.tsx`
- **Checklist Keberhasilan**:
  - [ ] E-Tiket hanya dapat diakses untuk pesanan dengan status `PAID` / `VERIFIED`.
  - [ ] Tampilan e-tiket rapi dan ramah cetak (print-friendly) atau simpan PDF.
  - [ ] Halaman publik verifikasi tiket memvalidasi keaslian token QR tanpa membocorkan data pribadi (NIK/Telepon utuh) pemesan.

---

### Fase 7: Berita OPD & Transparansi Statistik PAD
> **Tujuan**: Menghadirkan portal informasi publik seputar kegiatan aset daerah dan dashboard transparansi retribusi PAD untuk masyarakat.

- **Endpoint Terkait**:
  - `GET /api/lapak/news/public/:code` & `GET /api/lapak/news/public/:code/:slug`
  - `GET /api/lapak/public-stats?year=2026`
- **File Target**:
  - `src/app/(public)/berita/page.tsx` & `src/app/(public)/berita/[slug]/page.tsx`
  - `src/app/(public)/transparansi/page.tsx` (atau komponen statistik di beranda)
  - `src/components/features/stats/PadStatsChart.tsx`
- **Checklist Keberhasilan**:
  - [ ] Daftar berita OPD dengan pagination, pencarian, dan artikel lengkap.
  - [ ] Visualisasi grafik atau kartu metrik PAD (target vs realisasi retribusi) yang mudah dipahami warga.
  - [ ] Aturan suppression data sensitif (kategori < 3 transaksi tidak menampilkan nominal spesifik) dipatuhi.

---

### Fase 8: Polish Visual, Audit Responsif & Performance
> **Tujuan**: Memastikan tampilan akhir berkelas dunia (*wow factor*), tanpa glitch, sangat cepat, dan nyaman diakses di smartphone warga.

- [ ] Audit performa Core Web Vitals (LCP, CLS, FID) pada gambar aset.
- [ ] Implementasi responsivitas mobile optimal (bottom navigation bar / floating action bar untuk checkout).
- [ ] Micro-interactions, hover animations, dan transisi halaman halus.
- [ ] Pemeriksaan accessibility (kontras warna teks terhadap nuansa Songket/Gold).
