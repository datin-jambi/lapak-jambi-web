"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Building2,
  Dumbbell,
  Mountain,
  Ticket,
  Landmark,
  Handshake,
  Wrench,
  Quote,
  CheckCircle,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { SearchBox } from "@/components/common/SearchBox"
import { StatusBadge } from "@/components/common/StatusBadge"
import { formatCurrency } from "@/utils/format"
import { banners } from "@/dummy/banner"
import { categories } from "@/dummy/categories"
import { assets } from "@/dummy/assets"
import { news } from "@/dummy/news"
import { gallery } from "@/dummy/gallery"
import { testimonials } from "@/dummy/testimonials"
import { faq } from "@/dummy/faq"

const iconMap: Record<string, React.ElementType> = {
  Building: Building2,
  Building2,
  Dumbbell,
  Mountain,
  Ticket,
  Landmark,
  Handshake,
  Wrench,
  Star,
}

function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Building2
  return <Icon className={className} />
}

const stats = [
  { label: "Total Aset", value: "20+" },
  { label: "Penyewa Terdaftar", value: "1.500+" },
  { label: "Transaksi Berhasil", value: "500+" },
  { label: "Kota/Kabupaten", value: "11" },
]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentBanner, setCurrentBanner] = useState(0)
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const featuredAssets = assets.filter((a) => a.isFeatured).slice(0, 4)
  const latestNews = news.slice(0, 3)
  const galleryPreviews = gallery.slice(0, 4)
  const faqItems = faq.slice(0, 5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-transparent" />
            <div className="absolute inset-0 opacity-[0.35]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.06'%3E%3Cpath d='M60 15l15 25-15 25-15-25z'/%3E%3Cpath d='M60 55l15 25-15 25-15-25z'/%3E%3Cpath d='M20 35l15 25-15 25-5-25z'/%3E%3Cpath d='M100 35l15 25-15 25-5-25z'/%3E%3C/g%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M60 5l10 15-10 15-10-15z'/%3E%3Cpath d='M60 85l10 15-10 15-10-15z'/%3E%3Cpath d='M10 15l10 15-10 15-10-15z'/%3E%3Cpath d='M110 15l10 15-10 15-10-15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
          </div>
        ))}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gradient-to-r from-gold/25 to-gold/10 px-4 py-1.5 text-sm text-white backdrop-blur-md">
              <Building2 className="size-4 text-gold" />
              Platform Resmi Pemerintah Provinsi Jambi
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
                <p className="mt-4 max-w-xl text-lg text-white/80">{banner.description}</p>
              </div>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 font-semibold shadow-lg" render={<Link href="/aset" />}>
                Jelajahi Aset <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
                render={<Link href="/about" />}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          {/* Banner indicators */}
          <div className="mt-12 flex items-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === currentBanner ? "w-8 bg-white" : "w-2 bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="relative -mt-10 z-20 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/80 p-3 shadow-lg backdrop-blur-xl">
          <div className="flex flex-1 items-center gap-3 pl-2">
            <Search className="size-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aset, fasilitas, atau layanan..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Select>
            <SelectTrigger className="hidden h-9 w-44 rounded-lg border-border/50 bg-white/50 sm:flex">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Semua Kategori</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" className="rounded-xl" render={<Link href={`/search?q=${encodeURIComponent(searchQuery)}`} />}>
            Cari
          </Button>
        </div>
      </section>

      {/* Featured Services / Categories */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Layanan & Kategori Aset"
            subtitle="Temukan berbagai aset dan layanan publik yang tersedia untuk Anda"
            action={{ label: "Lihat Semua", href: "/services" }}
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat) => (
              <Link key={cat.id} href={`/assets?category=${cat.slug}`}>
                  <GlassCard hover className="p-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                      <CategoryIcon name={cat.icon} className="size-6" />
                    </div>
                    <h3 className="mb-1.5 font-semibold text-foreground">{cat.name}</h3>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{cat.description}</p>
                    <span className="text-sm font-medium text-primary">{cat.assetCount} Aset</span>
                  </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Assets */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Aset Populer"
            subtitle="Aset yang paling banyak diminati oleh masyarakat"
            action={{ label: "Lihat Semua Aset", href: "/assets" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredAssets.map((asset) => (
              <Link key={asset.id} href={`/aset/${asset.slug}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={asset.images[0]?.url}
                      alt={asset.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <StatusBadge status={asset.status} type="asset" />
                    </div>
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                      <Star className="size-3 fill-amber-400 text-amber-400" />
                      {asset.rating}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{asset.categoryName}</p>
                    <h3 className="font-semibold line-clamp-1">{asset.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      {asset.city}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">{formatCurrency(asset.price)}</span>
                      <span className="text-xs text-muted-foreground">/ {asset.priceUnit}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Government Facilities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Fasilitas Pemerintah"
            subtitle="Berbagai fasilitas dan layanan yang disediakan oleh Pemerintah Provinsi Jambi"
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: "Gedung Serbaguna", desc: "Aula pertemuan, gedung serbaguna, dan ruang rapat untuk berbagai kegiatan masyarakat" },
              { icon: Dumbbell, title: "Fasilitas Olahraga", desc: "Stadion, GOR, dan kolam renang publik yang dapat digunakan oleh masyarakat umum" },
              { icon: Ticket, title: "Wisata & Rekreasi", desc: "Destinasi wisata unggulan seperti Candi Muaro Jambi, Danau Sipin, dan Air Terjun Telun Berasap" },
              { icon: Landmark, title: "Layanan Publik", desc: "Pusat layanan terpadu untuk mengurus perizinan dan administrasi pemerintahan" },
            ].map((item, i) => (
              <GlassCard key={i} hover className="p-6">
                <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-all duration-300 group-hover:shadow-md group-hover:from-gold group-hover:to-gold/80 group-hover:text-white">
                  <item.icon className="size-6" />
                </div>
                <h3 className="mb-1.5 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Berita Terbaru"
            subtitle="Informasi terkini seputar layanan publik dan pemerintahan Provinsi Jambi"
            action={{ label: "Lihat Semua Berita", href: "/news" }}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestNews.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`}>
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">{item.category}</Badge>
                    <h3 className="font-semibold line-clamp-2 leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    <div className="mt-4 flex items-center gap-3">
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
            title="Galeri Kegiatan"
            subtitle="Dokumentasi kegiatan dan fasilitas Pemerintah Provinsi Jambi"
            action={{ label: "Lihat Galeri", href: "/galeri" }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <section className="relative bg-gradient-to-r from-primary via-primary/80 to-primary py-16 overflow-hidden pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-gold">{stat.value}</p>
                <p className="mt-2 text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Testimoni" subtitle="Apa kata masyarakat tentang layanan Lapak Jambi" centered />
          <div className="relative mt-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((test) => (
                <GlassCard key={test.id} className="p-6">
                  <Quote className="mb-3 size-8 text-primary/30" />
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
          <SectionTitle title="Pertanyaan Umum" subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan" centered />
          <div className="mt-10 space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-xl border border-border/50 bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <span className="font-medium text-sm">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 text-muted-foreground shrink-0 transition-transform",
                      openFaq === item.id && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === item.id && (
                  <div className="border-t border-border/50 px-4 py-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" render={<Link href="/faq" />}>
              Lihat Semua FAQ
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary" />
        <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23d4a843' stroke-opacity='0.15' stroke-width='0.8'%3E%3Cpath d='M50 10l30 40-30 40-30-40z'/%3E%3Cpath d='M50 20l20 30-20 30-20-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }} />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Siap Menggunakan Layanan Lapak Jambi?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <Phone className="size-5 text-gold" />
              <span className="text-sm text-white">(0741) 1234567</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <Mail className="size-5 text-gold" />
              <span className="text-sm text-white">cs.lapakjambi@bpkpd.jambiprov.go.id</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gold/20 bg-white/10 px-5 py-3 backdrop-blur-md">
              <MapPin className="size-5 text-gold" />
              <span className="text-sm text-white">Kantor BPKPD Provinsi Jambi</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
              <Button size="lg" className="rounded-xl bg-gold text-white hover:bg-gold/90 font-semibold shadow-lg" render={<Link href="/kontak" />}>
                Hubungi Kami
              </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-white/30 text-white hover:bg-white/10"
              render={<Link href="/register" />}
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
