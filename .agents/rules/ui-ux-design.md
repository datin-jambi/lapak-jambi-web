# Panduan Desain & UI/UX — Lapak Jambi Web

Dokumen ini adalah pedoman visual, gaya desain, dan pengalaman pengguna (*user experience*) untuk aplikasi web **Lapak Jambi**.

---

## 1. Filosofi Desain: "Marketplace Modern x Sentuhan Melayu Jambi"

Aplikasi ini menggabungkan dua nilai utama:
1. **Kemudahan Transaksi ala Traveloka & Tokopedia**:
   - Kemudahan mencari aset/layanan dengan *sticky search header*, filter chip instan, kalender ketersediaan interaktif, dan alur checkout multi-step yang transparan.
2. **Kewibawaan & Kehangatan Budaya Jambi**:
   - Memadukan ornamen visual Melayu Jambi seperti motif Songket dan Batik Jambi secara modern, elegan, dan subtle (tidak kuno atau berlebihan).

---

## 2. Palet Warna (Color Palette)

Palet warna telah diselaraskan dengan CSS Variables di [`src/app/globals.css`](file:///src/app/globals.css):

| Peran Warna | Hex / Nilai | Nama Karakter | Penggunaan |
| :--- | :--- | :--- | :--- |
| **Primary (Utama)** | `#2c1810` / Dark Walnut | Coklat Kayu Jambi | Navbar, header, tombol utama, teks judul penting |
| **Accent (Aksen)** | `#d97706` / Gold Amber | Emas Songket | Highlight harga, badge promo/rekomendasi, ikon aktif |
| **Secondary (Aksen 2)** | `#0f766e` / Forest Teal | Hijau Zamrud Batanghari | Status verifikasi sukses, ketersediaan jadwal hijau |
| **Background (Dasar)** | `#fdfbf7` / Warm Cream | Lembaran Kain Songket | Background utama aplikasi, memberikan kesan hangat & ramah |
| **Surface (Kartu/Panel)**| `#ffffff` / Pure White | Kartu Konten | Card produk, popup dialog, container form |
| **Border / Divider** | `#e7e0d8` / Muted Sand | Garis Pemisah | Border kartu, garis tabel, pemisah navigasi |

> [!TIP]
> Hindari warna neon murni (seperti merah `rgb(255,0,0)` atau hijau cerah murni). Gunakan varian ramah mata seperti Rose `#e11d48` untuk peringatan dan Emerald `#059669` untuk ketersediaan.

---

## 3. Tipografi & Skala Teks

- **Font Utama**: **Roboto** atau **Inter** (sans-serif modern yang sangat mudah dibaca).
- **Hierarki Teks**:
  - `Hero Title`: `text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight`
  - `Section Title`: `text-2xl sm:text-3xl font-bold text-gray-900`
  - `Card Title`: `text-lg font-semibold text-gray-800 line-clamp-2`
  - `Body / Paragraf`: `text-sm sm:text-base text-gray-600 leading-relaxed`
  - `Microcopy / Meta`: `text-xs text-gray-500 font-medium`

---

## 4. Pola Komponen Khas (Traveloka & Marketplace Inspiration)

### A. Hero Search Bar (Beranda)
- Desain tab atau pill filter cepat (Aset Gedung, Sarana Olahraga, Peralatan, Layanan Laboratorium).
- Input pencarian multifungsi: Kata kunci, Lokasi/Kabupaten-Kota, Rentang Tanggal sewa.
- Tombol "Cari Fasilitas" mencolok dengan warna Primary & ikon pencarian.

### B. Kartu Aset / Produk (Product Card)
- **Aspect Ratio Gambar**: `aspect-[4/3]` atau `aspect-[16/9]` dengan `object-cover` dan efek `group-hover:scale-105 transition-transform duration-300`.
- **Badge Kategori & OPD**: Tampil anggun di atas foto (misal: "Dispora Prov. Jambi").
- **Badge Status**: "Tersedia", "Slot Terbatas", atau "Perlu Konfirmasi".
- **Harga**: Format rupiah besar & jelas (misal: `Rp 500.000 / hari`).
- **Rating / Review / Badge Resmi**: Ikon centang resmi Pemprov Jambi.

### C. Kalender Ketersediaan (Availability Calendar)
- Penanda warna tanggal yang intuitif:
  - **Hijau**: Tersedia sepenuhnya (slot kosong).
  - **Kuning / Oranye**: Tersedia sebagian (beberapa slot jam telah dipesan).
  - **Merah / Muted**: Penuh / Tidak tersedia.
  - **Abu-abu Gelap**: Hari libur / Fasilitas tutup pemeliharaan.
- Drawer / popover slot jam untuk memilih sesi (pagi, siang, malam).

### D. Multi-Cart per OPD (Keranjang Terpisah)
- Header tiap seksi keranjang menampilkan nama OPD lengkap dengan logonya.
- Total biaya dihitung per OPD secara terpisah.
- Tombol "Checkout OPD Ini" terisolasi agar pengguna fokus menyelesaikan pesanan satu per satu.

---

## 5. Status Komponen (Component States)

Semua komponen interaktif **wajib** memiliki 4 status visual yang jelas:

1. **Default & Hover**: Transisi halus `transition-all duration-200 hover:shadow-md`.
2. **Loading Skeleton**: Gunakan efek shimmer (`animate-pulse`) dengan latar abu-abu hangat `#f3ede7`, bukan sekadar loading spinner kecil.
3. **Empty State**:
   - Ilustrasi atau ikon Lucide berukuran `w-16 h-16` dengan latar lingkaran warna lembut.
   - Judul ramah (contoh: *"Belum Ada Fasilitas di Kategori Ini"*).
   - Teks panduan yang menjelaskan apa yang harus dilakukan pengguna.
   - Tombol Call-to-Action (CTA) seperti *"Lihat Semua Aset"* atau *"Reset Filter"*.
4. **Error Alert**:
   - Box alert berlatar merah muda lembut dengan icon `AlertCircle`.
   - Menampilkan pesan yang manusiawi (bukan stacktrace mentah).
   - Tombol *"Coba Lagi"*.

---

## 6. Pengalaman Mobile (Mobile-First Experience)

1. **Floating Action Bar di Halaman Detail**:
   - Pada layar smartphone (< 768px), tombol "Pesan Sekarang" dan harga total menempel di bagian bawah layar (*bottom sticky bar*).
2. **Bottom Sheet / Drawer untuk Filter**:
   - Pada layar kecil, filter kategori dan rentang harga dibuka melalui modal drawer dari bawah, bukan sidebar yang memakan tempat.
3. **Touch Targets Ramah Jari**:
   - Semua tombol dan link minimal berukuran `44px x 44px` agar mudah ditekan di layar sentuh.
