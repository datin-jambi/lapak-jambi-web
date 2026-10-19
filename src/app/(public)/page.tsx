"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Search,
  ArrowRight,
  Star,
  MapPin,
  Building2,
  Dumbbell,
  Ticket,
  Landmark,
  Quote,
  Phone,
  Mail,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { CategoryIcon } from "@/components/common/CategoryIcon"
import { ProductCardItem } from "@/components/features/products/ProductCardItem"
import { ProductGridSkeleton } from "@/components/features/products/ProductSkeleton"
import { categoriesApi, productsApi } from "@/services/api"
import type { CategoryPublic, ProductCard } from "@/types/api"
import { adaptAssetToProductCard } from "@/lib/adapters"
import { banners } from "@/dummy/banner"
import { categories as dummyCategories } from "@/dummy/categories"
import { assets as dummyAssets } from "@/dummy/assets"
import { news as dummyNews } from "@/dummy/news"
import { gallery as dummyGallery } from "@/dummy/gallery"
import { testimonials } from "@/dummy/testimonials"
import { faq } from "@/dummy/faq"

const stats = [
  { label: "Total Aset Daerah", value: "24+" },
  { label: "Penyewa Terdaftar", value: "1.500+" },
  { label: "Transaksi Berhasil", value: "500+" },
  { label: "Kota & Kabupaten", value: "11" },
]

export default function HomePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [currentBanner, setCurrentBanner] = useState(0)
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  // API State
  const [categories, setCategories] = useState<CategoryPublic[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [products, setProducts] = useState<ProductCard[]>([])
  const [productsLoading, setProductsLoading] = useState(true)

  const latestNews = dummyNews.slice(0, 3)
  const galleryPreviews = dummyGallery.slice(0, 4)
  const faqItems = faq.slice(0, 5)

  // Fetch API categories and products
  useEffect(() => {
    async function loadData() {
      // 1. Load Categories
      try {
        setCategoriesLoading(true)
        const cats = await categoriesApi.getCategories()
        if (cats && cats.length > 0) {
          setCategories(cats)
        } else {
          // Fallback to dummy mapped
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
        setCategoriesLoading(false)
      }

      // 2. Load Products
      try {
        setProductsLoading(true)
        const prodRes = await productsApi.getProducts({
          limit: 4,
          sortBy: "publishedAt",
          sortOrder: "desc",
        })
        if (prodRes && prodRes.data && prodRes.data.length > 0) {
          setProducts(prodRes.data)
        } else {
          // Fallback to dummy assets mapped
          const featured = dummyAssets.filter((a) => a.isFeatured).slice(0, 4)
          setProducts(featured.map(adaptAssetToProductCard))
        }
      } catch (err) {
        console.warn("Gagal memuat produk dari API, menggunakan fallback", err)
        const featured = dummyAssets.filter((a) => a.isFeatured).slice(0, 4)
        setProducts(featured.map(adaptAssetToProductCard))
      } finally {
        setProductsLoading(false)
      }
    }

    loadData()
  }, [])

  // Auto banner carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) params.set("q", searchQuery.trim())
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
    router.push(`/aset?${params.toString()}`)
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative flex min-h-[600px] items-center overflow-hidden pattern-songket">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentBanner ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M60 15l15 25-15 25-15-25z'/%3E%3Cpath d='M60 55l15 25-15 25-15-25z'/%3E%3Cpath d='M20 35l15 25-15 25-5-25z'/%3E%3Cpath d='M100 35l15 25-15 25-5-25z'/%3E%3C/g%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M60 5l10 15-10 15-10-15z'/%3E%3Cpath d='M60 85l10 15-10 15-10-15z'/%3E%3Cpath d='M10 15l10 15-10 15-10-15z'/%3E%3Cpath d='M110 15l10 15-10 15-10-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "180px 180px",
              }}
            />
          </div>
        ))}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-r from-gold/25 to-gold/10 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <Sparkles className="size-4 text-gold" />
              Portal Retribusi & Sewa Aset Resmi Pemprov Jambi
            </div>

            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={cn(
                  "transition-all duration-500",
                  index === currentBanner
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none absolute translate-y-4 opacity-0"
                )}
              >
                <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {banner.title}
                </h1>
                <p className="mt-4 max-w-xl text-lg text-white/85 leading-relaxed">{banner.description}</p>
              </div>
            ))}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-xl bg-gold text-white hover:bg-gold/90 font-semibold shadow-lg hover:shadow-gold/25"
                render={<Link href="/aset" />}
              >
                Jelajahi Fasilitas <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                render={<Link href="/about" />}
              >
                Tentang Lapak Jambi
              </Button>
            </div>
          </div>

          {/* Banner indicators */}
          <div className="mt-12 flex items-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                aria-label={`Pindah ke banner ${index + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === currentBanner ? "w-8 bg-gold" : "w-2 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Search Section (Traveloka & Marketplace Search Bar) */}
      <section className="relative -mt-10 z-20 mx-auto max-w-4xl px-4 sm:px-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-white/40 bg-white/95 p-3 shadow-xl backdrop-blur-xl"
        >
          <div className="flex flex-1 items-center gap-3 pl-2">
            <Search className="size-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari gedung, stadion, alat berat, atau laboratorium..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val || "all")}>
              <SelectTrigger className="h-10 w-full sm:w-48 rounded-xl border-border/60 bg-muted/30">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button type="submit" size="sm" className="h-10 rounded-xl px-5 bg-primary hover:bg-primary/90 text-white font-medium">
              Cari
            </Button>
          </div>
        </form>
      </section>

      {/* Featured Services / Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Kategori Layanan & Aset"
            subtitle="Temukan fasilitas publik dan layanan retribusi resmi yang disediakan Pemerintah Provinsi Jambi"
            action={{ label: "Lihat Semua Aset", href: "/aset" }}
            centered
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoriesLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <GlassCard key={i} className="p-6 animate-pulse">
                    <div className="mb-4 size-12 rounded-xl bg-muted" />
                    <div className="h-4 w-3/4 rounded bg-muted mb-2" />
                    <div className="h-3 w-full rounded bg-muted" />
                  </GlassCard>
                ))
              : categories.slice(0, 8).map((cat) => (
                  <Link key={cat.id} href={`/aset?category=${cat.slug}`} className="group block h-full">
                    <GlassCard hover className="h-full p-6 transition-all duration-300 group-hover:border-gold/40">
                      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                        <CategoryIcon name={cat.icon} slug={cat.slug} className="size-6" />
                      </div>
                      <h3 className="mb-1.5 font-semibold text-foreground group-hover:text-gold transition-colors">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      )}
                      <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Telusuri Kategori <ArrowRight className="size-3" />
                      </span>
                    </GlassCard>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Popular Assets (Traveloka Style) */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Aset & Fasilitas Unggulan"
            subtitle="Fasilitas daerah yang paling sering dipesan oleh masyarakat dan instansi"
            action={{ label: "Lihat Semua Aset", href: "/aset" }}
          />

          <div className="mt-10">
            {productsLoading ? (
              <ProductGridSkeleton count={4} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCardItem key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Government Facilities Highlights */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Fasilitas Pemerintah Daerah"
            subtitle="Pengelolaan terpusat melalui Organisasi Perangkat Daerah (OPD) Provinsi Jambi"
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Building2,
                title: "Gedung & Serbaguna",
                desc: "Aula pertemuan, auditorium, dan ruang rapat untuk berbagai kegiatan masyarakat dan instansi.",
              },
              {
                icon: Dumbbell,
                title: "Sarana Olahraga",
                desc: "Stadion utama, GOR, dan kolam renang berstandar yang dapat disewa secara slot per sesi.",
              },
              {
                icon: Ticket,
                title: "Destinasi & Wisata",
                desc: "Kawasan cagar budaya, cagar alam, dan taman rekreasi binaan Pemerintah Provinsi Jambi.",
              },
              {
                icon: Landmark,
                title: "Layanan Laboratorium",
                desc: "Pengujian kualitas konstruksi, sampel air, dan kalibrasi alat teknis bersertifikasi.",
              },
            ].map((item, i) => (
              <GlassCard key={i} hover className="p-6 group">
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:shadow-md group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Berita & Pengumuman OPD"
            subtitle="Informasi terkini seputar pemanfaatan fasilitas dan kebijakan retribusi daerah"
            action={{ label: "Lihat Semua Berita", href: "/berita" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="group block h-full">
                <Card className="h-full overflow-hidden border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary text-[11px] font-semibold">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-base line-clamp-2 leading-snug group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3 pt-3 border-t border-border/40">
                      <Avatar className="size-7">
                        <AvatarImage src={item.authorAvatar} alt={item.authorName} />
                        <AvatarFallback>{item.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="text-xs text-muted-foreground">
                        <p className="font-medium text-foreground">{item.authorName}</p>
                        <p>{new Date(item.publishedAt).toLocaleDateString("id-ID")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Galeri Fasilitas Daerah"
            subtitle="Dokumentasi fisik fasilitas dan pemanfaatan aset milik Pemerintah Provinsi Jambi"
            action={{ label: "Lihat Galeri Lengkap", href: "/galeri" }}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryPreviews.map((item) => (
              <Link key={item.id} href="/galeri" className="group relative h-56 overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-white/80">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <section className="relative bg-gradient-to-r from-primary via-primary/95 to-primary py-16 overflow-hidden pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-extrabold text-gold drop-shadow-sm">{stat.value}</p>
                <p className="mt-2 text-sm text-white/90 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Aspirasi & Pengalaman Warga"
            subtitle="Pengalaman masyarakat yang telah memanfaatkan fasilitas publik daerah"
            centered
          />
          <div className="relative mt-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((test) => (
                <GlassCard key={test.id} className="p-6">
                  <Quote className="mb-3 size-8 text-gold/60" />
                  <p className="mb-4 text-sm text-muted-foreground leading-relaxed">&ldquo;{test.content}&rdquo;</p>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3.5",
                          i < test.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9">
                      <AvatarImage src={test.userAvatar} alt={test.userName} />
                      <AvatarFallback>{test.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{test.userName}</p>
                      <p className="text-xs text-muted-foreground">{test.userRole}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Pertanyaan yang Sering Diajukan"
            subtitle="Informasi penting mengenai alur pemesanan, verifikasi jadwal, dan pembayaran retribusi"
            centered
          />
          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-border/50 bg-card transition-colors hover:border-gold/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <span className="font-medium text-sm text-foreground">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground shrink-0 transition-transform duration-200",
                      openFaq === item.id && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === item.id && (
                  <div className="border-t border-border/50 px-4 py-3 bg-muted/20">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" className="rounded-xl" render={<Link href="/faq" />}>
              Lihat Seluruh FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23d4a843' stroke-opacity='0.15' stroke-width='0.8'%3E%3Cpath d='M50 10l30 40-30 40-30-40z'/%3E%3Cpath d='M50 20l20 30-20 30-20-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Siap Memanfaatkan Fasilitas Pemprov Jambi?
          </h2>
          <p className="mt-3 text-white/85 text-base max-w-xl mx-auto">
            Proses pemesanan mudah, tarif retribusi daerah transparan, dan jadwal terverifikasi anti bentrok.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white/10 px-5 py-3 backdrop-blur-md">
              <Phone className="size-5 text-gold" />
              <span className="text-sm text-white font-medium">(0741) 1234567</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white/10 px-5 py-3 backdrop-blur-md">
              <Mail className="size-5 text-gold" />
              <span className="text-sm text-white font-medium">bpkpd@jambiprov.go.id</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white/10 px-5 py-3 backdrop-blur-md">
              <MapPin className="size-5 text-gold" />
              <span className="text-sm text-white font-medium">Kota Jambi, Provinsi Jambi</span>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Button
              size="lg"
              className="rounded-xl bg-gold text-white hover:bg-gold/90 font-semibold shadow-lg hover:shadow-gold/25"
              render={<Link href="/aset" />}
            >
              Mulai Pesan Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/30 text-white hover:bg-white/10"
              render={<Link href="/register" />}
            >
              Daftar Akun Warga
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
