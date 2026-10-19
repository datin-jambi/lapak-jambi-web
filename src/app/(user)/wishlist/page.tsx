"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MapPin, Star, Trash2 } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/format"
import { assets } from "@/dummy/assets"

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(assets.filter((a) => a.isPopular).slice(0, 4))

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Wishlist"
            description="Aset yang Anda simpan untuk dipesan nanti."
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {wishlist.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <Heart className="mx-auto mb-4 size-12 text-muted-foreground/40" />
              <h3 className="text-lg font-semibold mb-2">Wishlist Kosong</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Anda belum menyimpan aset apapun. Jelajahi aset dan klik ikon hati untuk menyimpannya.
              </p>
              <Button render={<Link href="/aset" />}>Jelajahi Aset</Button>
            </GlassCard>
          ) : (
            <>
              <p className="mb-6 text-sm text-muted-foreground">
                {wishlist.length} aset tersimpan
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlist.map((asset) => (
                  <div key={asset.id} className="group relative">
                    <Link href={`/aset/${asset.slug}`}>
                      <Card className="overflow-hidden transition-all hover:shadow-lg">
                        <div className="relative h-44 overflow-hidden">
                          <Image
                            src={asset.images[0]?.url}
                            alt={asset.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          <div className="absolute bottom-2 left-2">
                            <StatusBadge status={asset.status} type="asset" />
                          </div>
                          <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
                            <Star className="size-3 fill-amber-400 text-amber-400" />
                            {asset.rating}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-1.5">{asset.categoryName}</Badge>
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
                    <button
                      onClick={() => removeFromWishlist(asset.id)}
                      className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-red-500 shadow-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
