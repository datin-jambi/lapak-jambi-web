"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import {
  MapPin,
  Star,
  Users,
  Maximize2,
  Calendar as CalendarIcon,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Phone,
  Mail,
  Building2,
  ShoppingCart,
  ArrowRight,
  Sparkles,
  Info,
  Clock,
  ShieldCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { PageHeader } from "@/components/common/PageHeader"
import { ProductCardItem } from "@/components/features/products/ProductCardItem"
import { ProductSkeleton } from "@/components/features/products/ProductSkeleton"
import { formatCurrency, formatPricingUnit } from "@/utils/format"
import { productsApi, availabilityApi, cartsApi } from "@/services/api"
import type { ProductDetail, ProductCard, ProductRate, AvailabilityDay } from "@/types/api"
import { getAssetBySlug, getRelatedAssets } from "@/services/asset.service"
import { adaptAssetToProductCard } from "@/lib/adapters"
import { toast } from "sonner"

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=1200&q=80"

export default function AssetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  // State
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedRate, setSelectedRate] = useState<ProductRate | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [relatedProducts, setRelatedProducts] = useState<ProductCard[]>([])
  const [availabilityDays, setAvailabilityDays] = useState<AvailabilityDay[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [isAddingCart, setIsAddingCart] = useState(false)

  // 1. Fetch Product Detail via Client-Side API
  useEffect(() => {
    async function fetchDetail() {
      if (!slug) return
      try {
        setLoading(true)
        const apiData = await productsApi.getProductBySlug(slug)
        if (apiData) {
          setProduct(apiData)
          if (apiData.rates && apiData.rates.length > 0) {
            setSelectedRate(apiData.rates[0])
          }
        }
      } catch (err) {
        console.warn("Detail API tidak ditemukan, menggunakan fallback dummy", err)
        // Fallback dummy
        const fallback = getAssetBySlug(slug)
        if (fallback) {
          const adapted: ProductDetail = {
            id: fallback.id,
            name: fallback.name,
            slug: fallback.slug,
            excerpt: fallback.shortDescription,
            description: fallback.description,
            coverUrl: fallback.images[0]?.url || null,
            coverFileId: null,
            address: `${fallback.location}, ${fallback.city}`,
            latitude: fallback.latitude,
            longitude: fallback.longitude,
            capacity: fallback.capacity,
            areaM2: fallback.area,
            pricingUnit: "DAY",
            availabilityType: "SLOT",
            fulfillmentType: "BOOKING",
            status: "PUBLISHED",
            publishedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            organization: {
              id: "opd-prov-jambi",
              code: "opd-prov-jambi",
              name: "Pemerintah Provinsi Jambi",
            },
            category: {
              id: fallback.categoryId,
              name: fallback.categoryName,
              slug: fallback.categoryId,
            },
            rates: [
              {
                id: "rate-standard",
                name: "Tarif Harian Standar (Perda)",
                unit: "DAY",
                price: fallback.price,
                minQty: 1,
                maxQty: 30,
                startTime: "08:00",
                endTime: "22:00",
                isActive: true,
              },
              {
                id: "rate-session-pagi",
                name: "Sesi Pagi (08:00 - 13:00)",
                unit: "SESSION",
                price: Math.round(fallback.price * 0.6),
                minQty: 1,
                maxQty: 1,
                startTime: "08:00",
                endTime: "13:00",
                isActive: true,
              },
            ],
            addons: [],
            requirements: [
              {
                id: "req-1",
                label: "Identitas Pemohon (KTP / NIK)",
                fieldType: "text",
                options: null,
                isRequired: true,
                sortOrder: 1,
              },
              {
                id: "req-2",
                label: "Surat Permohonan / Izin Kegiatan Resmi",
                fieldType: "file",
                options: null,
                isRequired: true,
                sortOrder: 2,
              },
            ],
            facilities: fallback.facilities.map((f) => ({
              id: f.id,
              name: f.name,
              icon: f.icon,
            })),
            images: fallback.images.map((img, i) => ({
              id: img.id,
              url: img.url,
              fileId: img.id,
              altText: img.alt,
              isPrimary: i === 0,
              sortOrder: i,
            })),
          }
          setProduct(adapted)
          setSelectedRate(adapted.rates[0])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [slug])

  // 2. Fetch Availability Calendar (Client-Side)
  useEffect(() => {
    async function fetchAvailability() {
      if (!product?.id) return
      try {
        const today = new Date()
        const from = today.toISOString().split("T")[0]
        const futureDate = new Date()
        futureDate.setDate(today.getDate() + 30)
        const to = futureDate.toISOString().split("T")[0]

        const avail = await availabilityApi.getAvailability(product.id, from, to)
        if (avail?.days) {
          setAvailabilityDays(avail.days)
        }
      } catch (err) {
        // Fallback mockup availability days for the next 7 days
        const mockDays: AvailabilityDay[] = Array.from({ length: 7 }).map((_, i) => {
          const d = new Date()
          d.setDate(d.getDate() + i)
          const dateStr = d.toISOString().split("T")[0]
          return {
            date: dateStr,
            weekday: d.getDay(),
            isOpen: i !== 2,
            openTime: "08:00",
            closeTime: "22:00",
            reason: i === 2 ? "Pemeliharaan rutin" : null,
          }
        })
        setAvailabilityDays(mockDays)
      }
    }

    if (product) {
      fetchAvailability()
    }
  }, [product])

  // 3. Fetch Related Products (Client-Side)
  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await productsApi.getProducts({ limit: 4 })
        if (res?.data && res.data.length > 0) {
          setRelatedProducts(res.data.filter((p) => p.slug !== slug).slice(0, 4))
        } else {
          const fallbackRelated = getRelatedAssets(product?.id || "").slice(0, 4)
          setRelatedProducts(fallbackRelated.map(adaptAssetToProductCard))
        }
      } catch {
        const fallbackRelated = getRelatedAssets(product?.id || "").slice(0, 4)
        setRelatedProducts(fallbackRelated.map(adaptAssetToProductCard))
      }
    }

    fetchRelated()
  }, [slug, product])

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (!product) return
    try {
      setIsAddingCart(true)
      // Check if user has cart for this OPD or call carts API
      if (product.organization?.code) {
        const cart = await cartsApi.getCartByOpd(product.organization.code)
        await cartsApi.addCartItem(cart.id, {
          productId: product.id,
          rateId: selectedRate?.id,
          qty: 1,
        })
        toast.success("Fasilitas berhasil ditambahkan ke keranjang OPD!")
      } else {
        toast.success("Fasilitas ditambahkan ke daftar pemesanan.")
      }
    } catch (err) {
      toast.info("Fitur keranjang siap digunakan setelah login akun warga.")
    } finally {
      setIsAddingCart(false)
    }
  }

  // Handle Booking Now
  const handleBookingNow = () => {
    if (!product) return
    const params = new URLSearchParams()
    params.set("productId", product.id)
    params.set("slug", product.slug)
    if (selectedRate?.id) params.set("rateId", selectedRate.id)
    if (selectedDate) params.set("date", selectedDate)
    router.push(`/booking?${params.toString()}`)
  }

  // Handle Share
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Tautan fasilitas berhasil disalin ke clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-[16/10] w-full rounded-2xl bg-muted animate-pulse" />
            <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-20 w-full rounded bg-muted animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-72 w-full rounded-2xl bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">
        <div className="size-16 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground">
          <Building2 className="size-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Fasilitas Tidak Ditemukan</h2>
        <p className="text-sm text-muted-foreground max-w-md">
          Fasilitas yang Anda cari mungkin sedang dalam pemeliharaan atau tidak aktif.
        </p>
        <Button render={<Link href="/aset" />} className="rounded-xl mt-2">
          Kembali ke Katalog Aset
        </Button>
      </div>
    )
  }

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.url)
      : [product.coverUrl || DEFAULT_COVER]

  const activePrice = selectedRate?.price ?? product.rates?.[0]?.price ?? 0
  const activeUnit = selectedRate?.unit ?? product.rates?.[0]?.unit ?? product.pricingUnit

  return (
    <div>
      {/* Header Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <PageHeader
          title={product.name}
          description={product.excerpt || `Fasilitas daerah binaan ${product.organization?.name || "Pemprov Jambi"}`}
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Katalog Aset", href: "/aset" },
            { label: product.category?.name || "Kategori", href: `/aset?category=${product.category?.slug}` },
            { label: product.name },
          ]}
        />
      </section>

      {/* Main Detail Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-8 lg:grid-cols-3 items-start">
          {/* Left Column: Gallery, Description, Facilities, Requirements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery Main Viewer */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
              <Image
                src={galleryImages[selectedImage] || DEFAULT_COVER}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  <Building2 className="size-3.5 text-gold" />
                  {product.organization?.name || "Pemerintah Provinsi Jambi"}
                </span>
                {product.category?.name && (
                  <Badge className="bg-gold text-white text-xs font-medium">
                    {product.category.name}
                  </Badge>
                )}
              </div>

              {/* Prev/Next arrows if multiple images */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((p) => (p === 0 ? galleryImages.length - 1 : p - 1))}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((p) => (p === galleryImages.length - 1 ? 0 : p + 1))}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-all"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
            </div>

            {/* Gallery Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                {galleryImages.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition-all",
                      i === selectedImage ? "border-gold ring-2 ring-gold/20" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Description Card */}
            <GlassCard className="p-6">
              <h3 className="mb-3 text-lg font-bold text-foreground">Deskripsi & Penggunaan Fasilitas</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {product.description || product.excerpt || "Tidak ada deskripsi detail untuk fasilitas ini."}
              </p>
            </GlassCard>

            {/* Tariffs List Card (Tarif Retribusi Resmi) */}
            {product.rates && product.rates.length > 0 && (
              <GlassCard className="p-6">
                <h3 className="mb-1.5 text-lg font-bold text-foreground">Pilihan Tarif Retribusi Resmi</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Berdasarkan Peraturan Daerah (Perda) Provinsi Jambi tentang Retribusi Daerah.
                </p>
                <div className="space-y-3">
                  {product.rates.map((rate) => (
                    <div
                      key={rate.id}
                      onClick={() => setSelectedRate(rate)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all",
                        selectedRate?.id === rate.id
                          ? "border-gold bg-gold/5 ring-1 ring-gold/30"
                          : "border-border/60 hover:bg-muted/30"
                      )}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{rate.name}</h4>
                          {selectedRate?.id === rate.id && (
                            <Badge variant="secondary" className="bg-gold text-white text-[10px]">
                              Dipilih
                            </Badge>
                          )}
                        </div>
                        {rate.startTime && rate.endTime && (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Clock className="size-3" /> Jam: {rate.startTime} - {rate.endTime}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-base font-bold text-primary dark:text-gold">
                          {formatCurrency(rate.price)}
                        </span>
                        <span className="text-xs text-muted-foreground block">
                          /{formatPricingUnit(rate.unit)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Facilities List */}
            {product.facilities && product.facilities.length > 0 && (
              <GlassCard className="p-6">
                <h3 className="mb-4 text-lg font-bold text-foreground">Fasilitas yang Tersedia</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {product.facilities.map((fac) => (
                    <div key={fac.id} className="flex items-center gap-2.5 rounded-xl bg-muted/40 px-3.5 py-3 border border-border/40">
                      <CheckCircle className="size-4 text-emerald-500 shrink-0" />
                      <span className="text-sm font-medium text-foreground">{fac.name}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Requirements / Syarat Sewa */}
            {product.requirements && product.requirements.length > 0 && (
              <GlassCard className="p-6">
                <h3 className="mb-2 text-lg font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-5 text-primary" />
                  Persyaratan & Berkas Pemesanan
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Dokumen wajib yang perlu disiapkan saat melakukan konfirmasi pesanan:
                </p>
                <ul className="space-y-2.5">
                  {product.requirements.map((req) => (
                    <li key={req.id} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <span className="size-1.5 rounded-full bg-gold mt-2 shrink-0" />
                      <span>
                        {req.label} {req.isRequired && <span className="text-red-500 font-bold">*</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Location & Map */}
            {product.address && (
              <GlassCard className="p-6">
                <h3 className="mb-3 text-lg font-bold text-foreground">Lokasi Fasilitas</h3>
                <div className="flex items-start gap-2 mb-4 text-sm text-muted-foreground">
                  <MapPin className="size-4 text-gold shrink-0 mt-0.5" />
                  <span>{product.address}</span>
                </div>
                <div className="h-44 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center text-sm text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 size-7 text-muted-foreground/50" />
                    <p className="font-medium text-foreground/80">Peta Lokasi Fasilitas</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.address}</p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Right Column: Sticky Booking & Availability Card (Traveloka Style) */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Booking Action Card */}
            <GlassCard className="p-6 border-border/60 shadow-lg">
              <div className="mb-4">
                <span className="text-xs text-muted-foreground block font-medium">Tarif Sewa Resmi</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-extrabold text-primary dark:text-gold">
                    {formatCurrency(activePrice)}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    /{formatPricingUnit(activeUnit)}
                  </span>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Specs Highlights */}
              <div className="space-y-2.5 mb-5 text-sm">
                {product.capacity && product.capacity > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Users className="size-4 text-gold" /> Daya Tampung:
                    </span>
                    <strong className="text-foreground">{product.capacity} Orang</strong>
                  </div>
                )}
                {product.areaM2 && product.areaM2 > 0 && (
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="size-4 text-gold" /> Luas Area:
                    </span>
                    <strong className="text-foreground">{product.areaM2.toLocaleString()} m²</strong>
                  </div>
                )}
              </div>

              {/* Real-Time Calendar Availability Preview (Traveloka anti double-booking) */}
              <div className="mb-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                  <span>Jadwal Ketersediaan (7 Hari ke Depan)</span>
                  <CalendarIcon className="size-3.5 text-primary" />
                </h4>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {availabilityDays.slice(0, 7).map((d) => {
                    const dayDate = new Date(d.date)
                    const dayName = dayDate.toLocaleDateString("id-ID", { weekday: "narrow" })
                    const dayNum = dayDate.getDate()
                    const isClosed = !d.isOpen

                    return (
                      <div
                        key={d.date}
                        className={cn(
                          "p-1.5 rounded-lg border text-xs flex flex-col items-center justify-center transition-all",
                          isClosed
                            ? "border-red-200 bg-red-50 text-red-700 dark:bg-red-950/40"
                            : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40"
                        )}
                        title={`${d.date}: ${d.isOpen ? "Tersedia" : d.reason || "Tutup / Penuh"}`}
                      >
                        <span className="text-[10px] text-muted-foreground">{dayName}</span>
                        <span className="font-bold text-xs">{dayNum}</span>
                        <span
                          className={cn(
                            "size-1.5 rounded-full mt-1",
                            isClosed ? "bg-red-500" : "bg-emerald-500"
                          )}
                        />
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" /> Tersedia
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-red-500" /> Tutup / Penuh
                  </span>
                </div>
              </div>

              {/* Date Input */}
              <div className="mb-5">
                <label className="text-xs font-semibold text-foreground block mb-1.5">
                  Tentukan Tanggal Pemakaian
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-border/60 bg-muted/20 px-3.5 py-2.5 text-xs text-foreground outline-none focus:border-gold"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <Button
                  onClick={handleBookingNow}
                  className="w-full rounded-xl bg-gold hover:bg-gold/90 text-white font-semibold py-5 shadow-lg"
                >
                  Pesan Fasilitas Sekarang <ArrowRight className="ml-1.5 size-4" />
                </Button>

                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingCart}
                  variant="outline"
                  className="w-full rounded-xl border-border/60 gap-2 py-5"
                >
                  <ShoppingCart className="size-4 text-primary" />
                  {isAddingCart ? "Menambahkan..." : "Tambah ke Keranjang OPD"}
                </Button>
              </div>

              <div className="mt-4 flex gap-2 pt-3 border-t border-border/40">
                <Button
                  onClick={() => {
                    setIsSaved(!isSaved)
                    toast.success(isSaved ? "Dihapus dari simpanan" : "Fasilitas disimpan!")
                  }}
                  variant="ghost"
                  size="sm"
                  className="flex-1 rounded-xl text-xs gap-1.5 text-muted-foreground"
                >
                  <Heart className={cn("size-3.5", isSaved && "fill-rose-500 text-rose-500")} />
                  {isSaved ? "Tersimpan" : "Simpan"}
                </Button>

                <Button
                  onClick={handleShare}
                  variant="ghost"
                  size="sm"
                  className="flex-1 rounded-xl text-xs gap-1.5 text-muted-foreground"
                >
                  <Share2 className="size-3.5" />
                  Bagikan
                </Button>
              </div>
            </GlassCard>

            {/* OPD Contact Info Card */}
            <GlassCard className="p-6 border-border/60">
              <h4 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <Building2 className="size-4 text-primary" />
                Instansi Pengelola
              </h4>
              <p className="font-semibold text-xs text-foreground mb-2">
                {product.organization?.name || "Pemerintah Provinsi Jambi"}
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-gold shrink-0" />
                  <span>(0741) 1234567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-gold shrink-0" />
                  <span>layanan.opd@jambiprov.go.id</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Related Assets Section */}
      {relatedProducts.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Fasilitas Daerah Lainnya"
              subtitle="Rekomendasi aset yang mungkin sesuai dengan kebutuhan kegiatan Anda"
              action={{ label: "Lihat Semua", href: "/aset" }}
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rProduct) => (
                <ProductCardItem key={rProduct.id} product={rProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
