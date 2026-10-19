"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  MapPin,
  Star,
  Users,
  Maximize2,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Phone,
  Mail,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { PageHeader } from "@/components/common/PageHeader"
import { formatCurrency } from "@/utils/format"
import { assets } from "@/dummy/assets"
import { getAssetBySlug, getRelatedAssets } from "@/services/asset.service"

const facilityIcons: Record<string, React.ElementType> = {
  ParkingCircle: MapPin,
  Wind: Building2,
  Toilet: Building2,
  Mosque: Building2,
  UtensilsCrossed: Building2,
  Wheelchair: Building2,
  Music: Building2,
  Projector: Building2,
  Stage: Building2,
  DoorOpen: Building2,
  Wifi: Building2,
  Camera: Building2,
  Elevator: Building2,
  SwimmingPool: Building2,
  Tennis: Building2,
}

export default function AssetDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const asset = getAssetBySlug(slug)
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string>("")

  if (!asset) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Building2 className="size-16 text-muted-foreground/40" />
        <h2 className="text-2xl font-semibold">Aset Tidak Ditemukan</h2>
        <p className="text-muted-foreground">Aset yang Anda cari tidak tersedia atau telah dihapus.</p>
        <Button render={<Link href="/aset" />}>Kembali ke Aset</Button>
      </div>
    )
  }

  const relatedAssets = getRelatedAssets(asset.id).slice(0, 4)

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <PageHeader
          title={asset.name}
          description={asset.shortDescription}
          breadcrumbs={[
            { label: "Aset", href: "/assets" },
            { label: asset.categoryName, href: `/assets?category=${asset.categoryId}` },
            { label: asset.name },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image
                src={asset.images[currentImage]?.url}
                alt={asset.images[currentImage]?.alt || asset.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <StatusBadge status={asset.status} type="asset" />
              </div>
              {asset.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p === 0 ? asset.images.length - 1 : p - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p === asset.images.length - 1 ? 0 : p + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
              <div className="absolute bottom-4 right-4 flex gap-1">
                {asset.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn("size-2 rounded-full transition-all", i === currentImage ? "bg-white w-6" : "bg-white/50")}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {asset.images.slice(0, 4).map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    "relative h-20 overflow-hidden rounded-xl border-2 transition-all",
                    i === currentImage ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" />
                </button>
              ))}
            </div>

            <GlassCard className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Deskripsi</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{asset.description}</p>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Fasilitas</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {asset.facilities.map((fac) => {
                  const FacIcon = facilityIcons[fac.icon] || Building2
                  return (
                    <div key={fac.id} className="flex items-center gap-2.5 rounded-xl bg-muted/50 px-3 py-2.5">
                      <FacIcon className="size-4 text-muted-foreground" />
                      <span className="text-sm">{fac.name}</span>
                    </div>
                  )
                })}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="mb-4 text-lg font-semibold">Lokasi</h3>
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{asset.address}</p>
                  <p className="text-sm text-muted-foreground">{asset.city}, {asset.province}</p>
                </div>
              </div>
              <div className="h-48 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
                <div className="text-center">
                  <MapPin className="mx-auto mb-2 size-8 text-muted-foreground/40" />
                  Peta Lokasi
                </div>
              </div>
            </GlassCard>

            {asset.reviews.length > 0 && (
              <GlassCard className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Ulasan</h3>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{asset.rating}</span>
                    <span className="text-sm text-muted-foreground">({asset.reviewCount} ulasan)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {asset.reviews.map((review) => (
                    <div key={review.id} className="flex gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={review.userAvatar} alt={review.userName} />
                        <AvatarFallback>{review.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{review.userName}</span>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn("size-3", i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")} />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {asset.price === 0 ? "Gratis" : formatCurrency(asset.price)}
                  </p>
                  <p className="text-sm text-muted-foreground">/ {asset.priceUnit}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{asset.rating}</span>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="size-4 text-muted-foreground" />
                  <span>Kapasitas: <strong>{asset.capacity} orang</strong></span>
                </div>
                {asset.area > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <Maximize2 className="size-4 text-muted-foreground" />
                    <span>Luas: <strong>{asset.area.toLocaleString()} m&sup2;</strong></span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4 text-muted-foreground" />
                  <span>{asset.city}, {asset.province}</span>
                </div>
              </div>
              <Separator className="mb-4" />
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-medium">Pilih Tanggal</h4>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full rounded-xl border border-border/50 bg-white px-4 py-2.5 text-sm outline-none focus:border-ring"
                />
              </div>
              <Button className="w-full rounded-xl" size="lg">
                Pesan Sekarang
              </Button>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                  <Heart className="mr-1.5 size-4" />
                  Simpan
                </Button>
                <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                  <Share2 className="mr-1.5 size-4" />
                  Bagikan
                </Button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <h4 className="mb-3 font-semibold">Informasi Kontak</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-sm">
                  <Phone className="size-4 text-muted-foreground" />
                  <span>(0741) 1234567</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm">
                  <Mail className="size-4 text-muted-foreground" />
                  <span>cs.lapakjambi@bpkpd.jambiprov.go.id</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {relatedAssets.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle title="Aset Terkait" subtitle="Aset lain yang mungkin Anda minati" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedAssets.map((rAsset) => (
                <Link key={rAsset.id} href={`/aset/${rAsset.slug}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-40 overflow-hidden">
                      <Image src={rAsset.images[0]?.url} alt={rAsset.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-1">{rAsset.categoryName}</Badge>
                      <h3 className="font-semibold line-clamp-1">{rAsset.name}</h3>
                      <p className="mt-2 text-sm font-semibold text-primary">{formatCurrency(rAsset.price)} <span className="text-xs text-muted-foreground font-normal">/ {rAsset.priceUnit}</span></p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
