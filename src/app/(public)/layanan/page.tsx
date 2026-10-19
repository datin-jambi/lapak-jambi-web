"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Sparkles, Building2 } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { CategoryIcon } from "@/components/common/CategoryIcon"
import { Button } from "@/components/ui/button"
import { categoriesApi } from "@/services/api"
import type { CategoryPublic } from "@/types/api"
import { categories as dummyCategories } from "@/dummy/categories"

export default function ServicesPage() {
  const [categories, setCategories] = useState<CategoryPublic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        const cats = await categoriesApi.getCategories()
        if (cats && cats.length > 0) {
          setCategories(cats)
        } else {
          setCategories(
            dummyCategories.map((c) => ({
              id: c.id,
              name: c.name,
              slug: c.slug,
              description: c.description,
              icon: c.icon,
            }))
          )
        }
      } catch (err) {
        console.warn("Gagal memuat kategori dari API, menggunakan fallback", err)
        setCategories(
          dummyCategories.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            icon: c.icon,
          }))
        )
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return (
    <div>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-r from-gold/25 to-gold/10 px-4 py-1 text-xs text-white backdrop-blur-md">
            <Sparkles className="size-3.5 text-gold" />
            Layanan Retribusi & Sewa Fasilitas Terpadu
          </div>
          <PageHeader
            title="Layanan & Kategori Aset Daerah"
            description="Jelajahi berbagai klasifikasi aset dan layanan publik resmi yang tersedia untuk masyarakat melalui portal Lapak Jambi."
            breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Layanan" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/85"
          />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Kategori Layanan Resmi"
            subtitle="Temukan fasilitas daerah yang sesuai dengan kebutuhan acara, usaha, atau kegiatan Anda"
            centered
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <GlassCard key={i} className="p-6 animate-pulse">
                    <div className="mb-4 size-14 rounded-2xl bg-muted" />
                    <div className="h-5 w-3/4 rounded bg-muted mb-2" />
                    <div className="h-4 w-full rounded bg-muted mb-4" />
                    <div className="h-4 w-1/3 rounded bg-muted" />
                  </GlassCard>
                ))
              : categories.map((cat) => (
                  <Link key={cat.id} href={`/aset?category=${cat.slug}`} className="group block h-full">
                    <GlassCard hover className="h-full p-6 transition-all duration-300 group-hover:border-gold/40 flex flex-col justify-between">
                      <div>
                        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                          <CategoryIcon name={cat.icon} slug={cat.slug} className="size-7" />
                        </div>
                        <h3 className="mb-1.5 text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                          {cat.name}
                        </h3>
                        {cat.description && (
                          <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {cat.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary group-hover:text-gold">
                          Lihat Fasilitas
                        </span>
                        <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1 group-hover:text-gold" />
                      </div>
                    </GlassCard>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Why Use Lapak Jambi */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionTitle
                title="Mengapa Menggunakan Lapak Jambi?"
                subtitle="Nikmati transparansi, kepastian jadwal, dan kemudahan retribusi resmi daerah"
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Kalender ketersediaan jadwal terverifikasi real-time (anti double-booking)",
                  "Tarif retribusi resmi berdasarkan Peraturan Daerah (Perda) Pemprov Jambi",
                  "Satu alur checkout transparan per Organisasi Perangkat Daerah (OPD)",
                  "Pembayaran via transfer bank kas daerah / virtual account resmi",
                  "E-Tiket digital ber-QR Code untuk akses masuk fasilitas di lokasi",
                  "Dashboard publik capaian PAD retribusi daerah yang terbuka untuk warga",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <GlassCard className="p-8 border-border/60">
              <h3 className="mb-4 text-lg font-bold text-foreground">Alur Pemesanan 4 Langkah</h3>
              <ol className="space-y-4">
                {[
                  { step: "01", title: "Cari & Pilih Fasilitas", desc: "Telusuri gedung serbaguna, sarana olahraga, atau alat yang Anda butuhkan." },
                  { step: "02", title: "Cek Kalender Jadwal", desc: "Pilih tanggal dan slot jam sewa yang berstatus hijau (tersedia)." },
                  { step: "03", title: "Checkout & Bayar", desc: "Kirim pesanan dan unggah bukti transfer ke rekening kas daerah." },
                  { step: "04", title: "Dapatkan E-Tiket QR", desc: "Unduh e-tiket resmi yang diterbitkan pasca verifikasi lunas." },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button className="mt-6 w-full rounded-xl bg-gold hover:bg-gold/90 text-white font-medium" render={<Link href="/aset" />}>
                Mulai Cari Fasilitas
              </Button>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            title="Siap Menggunakan Fasilitas Pemprov Jambi?"
            subtitle="Daftar akun warga dan manfaatkan aset daerah untuk kelancaran kegiatan Anda"
            centered
          />
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" className="rounded-xl bg-primary hover:bg-primary/90 text-white" render={<Link href="/aset" />}>
              Lihat Semua Aset
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-border/60" render={<Link href="/kontak" />}>
              Hubungi BPKPD
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
