# AGENTS.md — Panduan Utama Agen AI & Developer

> **Selamat Datang di Repositori `lapak-jambi-web`!**  
> Dokumen ini adalah **titik masuk utama (single source of truth)** bagi setiap sesi Agen AI atau Developer yang bekerja pada repositori ini. Baca file ini sebelum memulai pekerjaan apa pun untuk memahami arsitektur, arah pengembangan ("harus kemana"), dan cara eksekusi ("bagaimana caranya").

---

## 1. Identitas & Gambaran Proyek

### Apa itu Lapak Jambi Web?
**Lapak Jambi** (`lapak-jambi-web`) adalah aplikasi web portal publik resmi Pemerintah Provinsi Jambi yang memungkinkan masyarakat (warga, komunitas, organisasi, instansi swasta) untuk:
1. **Menemukan & Memesan Aset/Fasilitas Daerah**: Menyewa stadion, gedung serbaguna, laboratorium, alat berat, stand pameran, dan fasilitas OPD (*Organisasi Perangkat Daerah*) lainnya secara transparan dan mudah.
2. **Cek Ketersediaan Real-Time**: Kalender ketersediaan jadwal slot anti-*double booking* (mirip Traveloka).
3. **Pemesanan Multi-OPD**: Keranjang belanja terisolasi per OPD dengan alur checkout transparan (mirip Marketplace Tokopedia/Shopee).
4. **Pembayaran & Tiket Digital**: Upload bukti transfer pembayaran dan memperoleh e-tiket dengan QR Code terverifikasi.
5. **Transparansi PAD (Pendapatan Asli Daerah)**: Dashboard publik statistik capaian retribusi daerah secara terbuka tanpa login.
6. **Informasi & Berita OPD**: Pengumuman dan rilis berita resmi terkait fasilitas dan layanan daerah.

### Ekosistem Seloko
Proyek ini merupakan bagian dari ekosistem **Seloko**:
```
┌─────────────────────────────────────────────────────────────────────────┐
│                           EKOSISTEM SELOKO                              │
├─────────────────────────┬───────────────────────────────────────────────┤
│ seloko-api              │ Backend terpusat (NestJS + Prisma + Postgres) │
│ (../seloko-api)         │ API modul Core (Auth, User) & Lapak           │
├─────────────────────────┼───────────────────────────────────────────────┤
│ lapak-jambi-web         │ FRONTEND PUBLIK / WARGA (Repositori ini!)     │
│ (Next.js 16 App Router) │ Eksklusif untuk pengguna publik / masyarakat  │
├─────────────────────────┼───────────────────────────────────────────────┤
│ seloko-web              │ CMS ADMIN TERPUSAT (Bukan di repositori ini)  │
│ (../seloko-web)         │ Tempat admin OPD / Super Admin mengelola data │
└─────────────────────────┴───────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **TIDAK ADA CMS / PANEL ADMIN DI REPO INI!**  
> Semua fitur admin/CMS sudah dipusatkan di `seloko-web`. Jangan membuat halaman CMS/admin di repo `lapak-jambi-web`. Fokus 100% adalah pengalaman publik/warga.

---

## 2. Navigasi Cepat: "Harus Kemana?" (Where to Go)

Gunakan tabel navigasi di bawah ini untuk mengetahui direktori dan file yang relevan sesuai tugas yang ingin dikerjakan:

| Kebutuhan Anda | Ke Mana Harus Pergi? | Keterangan |
| :--- | :--- | :--- |
| **Peta Jalan / Pipeline Pengerjaan** | [`.agents/pipeline/ROADMAP.md`](file:///.agents/pipeline/ROADMAP.md) | Roadmap tahap demi tahap dari auth hingga rilis |
| **SOP Integrasi API** | [`.agents/workflows/api-integration-workflow.md`](file:///.agents/workflows/api-integration-workflow.md) | Alur baku menyambungkan endpoint ke UI |
| **Aturan Proyek & Konvensi** | [`.agents/rules/project.md`](file:///.agents/rules/project.md) | Aturan arsitektur, header, dan auth flow |
| **Panduan Standar Kode** | [`.agents/rules/coding-standards.md`](file:///.agents/rules/coding-standards.md) | Pola Next.js, TypeScript, state, dan error handling |
| **Panduan Desain & UI/UX** | [`.agents/rules/ui-ux-design.md`](file:///.agents/rules/ui-ux-design.md) | Estetika Traveloka/Marketplace, warna Melayu Jambi |
| **Referensi Lengkap Endpoint API** | [`.agents/skills/seloko-api-reference/SKILL.md`](file:///.agents/skills/seloko-api-reference/SKILL.md) | Skill referensi endpoint Seloko API |
| **Dokumentasi Asli Backend API** | `../seloko-api/docs/api/lapak/` | Kontrak resmi Zod, query, body, & response |
| **Core API Client** | [`src/lib/api-client.ts`](file:///src/lib/api-client.ts) | Fetch wrapper, JWT bearer, auto-refresh token |
| **Definisi Tipe Data API** | [`src/types/api.ts`](file:///src/types/api.ts) | Definisi interface TypeScript resmi sesuai API |
| **Service Layer API** | [`src/services/api/`](file:///src/services/api/) | Fungsi pemanggil endpoint backend (auth, products, dll) |
| **Halaman Publik (Beranda, Katalog, Berita)** | [`src/app/(public)/`](file:///src/app/(public)/) | Route publik: `/`, `/aset`, `/layanan`, `/berita` |
| **Halaman Autentikasi** | [`src/app/(auth)/`](file:///src/app/(auth)/) | Route login & register publik: `/login`, `/register` |
| **Halaman Khusus User Login** | [`src/app/(user)/`](file:///src/app/(user)/) | Route user: `/booking`, `/my-bookings`, `/profile` |
| **Variabel Lingkungan** | [`.env.local`](file:///.env.local) & [`.env.example`](file:///.env.example) | Konfigurasi URL backend & ImageKit |

---

## 3. Panduan Operasional: "Bagaimana Caranya?" (How to Work)

Setiap Agen AI yang menerima tugas baru di repositori ini **WAJIB** mengikuti alur kerja berikut:

```
  ┌─────────────────────────────────────────────────────────────┐
  │ 1. CEK PIPELINE & TAHAP AKTIF                               │
  │    Buka .agents/pipeline/ROADMAP.md untuk melihat status    │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ 2. VALIDASI KONTRAK API BACKEND                             │
  │    Baca ../seloko-api/docs/api/ atau SKILL seloko-reference │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ 3. PERIKSA / UPDATE TYPE & SERVICE LAYER                    │
  │    Pastikan src/types/api.ts & src/services/api/* sesuai    │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ 4. RANCANG / MODIFIKASI UI (TRAVELOKA + MARKETPLACE STYLE)   │
  │    Komponen modern, stateful (loading, empty, error), indah │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
  ┌──────────────────────────────▼──────────────────────────────┐
  │ 5. VERIFIKASI & TEST RUNTIME                                │
  │    Pastikan build lulus, responsif, dan tidak ada runtime error │
  └─────────────────────────────────────────────────────────────┘
```

### Prinsip Utama Pengembangan

1. **Gunakan Service Layer, Jangan Raw Fetch di Halaman**
   - Selalu panggil endpoint melalui `src/services/api/` (misal: `productsApi.getProducts(...)`).
   - Jangan menulis `fetch('http://...')` langsung di dalam komponen UI.
2. **Gunakan Kontrak Tipe dari `src/types/api.ts`**
   - Selalu gunakan interface dari `src/types/api.ts` untuk response/request API.
3. **Patuhi Keunikan Model Bisnis Lapak Jambi**:
   - **1 Keranjang per OPD**: Pengguna memiliki keranjang belanja terpisah untuk masing-masing instansi OPD.
   - **Anti Double-Booking**: Ketersediaan slot diverifikasi via `/api/lapak/availability/product/:id/availability`.
   - **Harga Snapshot**: Harga di keranjang hanyalah estimasi; harga final terkunci saat checkout di `Order`.
   - **Tiket Terbit Pasca Lunas**: E-Tiket dan QR Code hanya terbit setelah pembayaran berstatus `PAID` / `VERIFIED`.
4. **Desain Bernuansa Premium & Lokal**:
   - Nuansa warna: Dark Walnut Coklat Kayu Jambi + Gold / Emas Songket (telah didefinisikan di `globals.css`).
   - Desain interaktif: Filter chips, date picker, slot badges, card hover animations, modal konfirmasi.

---

## 4. Struktur Direktori Lengkap

```
lapak-jambi-web/
├── .agents/                        # Pusat Pengetahuan Agen AI
│   ├── pipeline/                   # Roadmap & Pelacakan Progres
│   │   └── ROADMAP.md              # Peta jalan tahap pengerjaan fitur
│   ├── rules/                      # Konvensi & Aturan Baku
│   │   ├── project.md              # Identitas proyek & arsitektur
│   │   ├── coding-standards.md     # Standar penulisan kode Next.js/TS
│   │   └── ui-ux-design.md         # Standar desain & estetika visual
│   ├── workflows/                  # Panduan Prosedural (SOP)
│   │   └── api-integration-workflow.md # Alur integrasi endpoint ke UI
│   └── skills/                     # Skill Agen Antigravity
│       └── seloko-api-reference/   # Referensi cepat endpoint Seloko
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (auth)/                 # Login & Register warga
│   │   ├── (public)/               # Beranda, Katalog, Berita, Stat PAD
│   │   ├── (user)/                 # My Bookings, Profile, Cart, Checkout
│   │   ├── globals.css             # Desain token, tema, motif songket
│   │   └── layout.tsx              # Root Layout
│   ├── components/                 # Komponen UI Reusable
│   │   ├── common/                 # Komponen umum (Navbar, Footer, Search)
│   │   ├── layout/                 # Komponen pembungkus halaman
│   │   └── ui/                     # Primitif shadcn / Tailwind UI
│   ├── hooks/                      # Custom React Hooks
│   ├── lib/                        # Utilitas Utama
│   │   ├── api-client.ts           # Central fetch client & token management
│   │   └── utils.ts                # Helper cn, currency, formatting
│   ├── providers/                  # Context Providers (Auth, Notification)
│   ├── services/
│   │   └── api/                    # Service layer per modul backend
│   └── types/
│       └── api.ts                  # TypeScript types kontrak Seloko API
├── .env.example                    # Template variabel lingkungan
├── .env.local                      # Variabel lingkungan lokal (aktif)
└── AGENTS.md                       # File panduan ini
```

---

## 5. Sumber Daya Referensi Penting

- **Backend Docs API**: `c:/Users/ASUS/Documents/BPKPD/Code/seloko/seloko-api/docs/api/`
  - `core/auth.md`: Spesifikasi registrasi, login, refresh token, profil user.
  - `lapak/products.md`: Spesifikasi produk aset, tarif retribusi, syarat sewa.
  - `lapak/availability.md`: Spesifikasi cek jadwal ketersediaan kalender.
  - `lapak/reservations.md`: Spesifikasi hold slot reservasi.
  - `lapak/carts.md`: Spesifikasi keranjang belanja per OPD.
  - `lapak/orders.md`: Spesifikasi quote & checkout pesanan.
  - `lapak/payments.md`: Spesifikasi upload bukti transfer manual.
  - `lapak/tickets.md`: Spesifikasi QR ticket & validasi.
  - `lapak/public-stats.md`: Spesifikasi data PAD publik terbuka.
  - `lapak/news.md`: Spesifikasi berita dan rilis OPD.
- **Skill AI**: `.agents/skills/seloko-api-reference/SKILL.md`
