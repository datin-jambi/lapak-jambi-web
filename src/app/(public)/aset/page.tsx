"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, SlidersHorizontal, X, ChevronLeft, ChevronRight, Building2 } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { formatCurrency } from "@/utils/format"
import { assets, categories } from "@/dummy"
import type { AssetType } from "@/types"

const ITEMS_PER_PAGE = 8

const typeLabels: Record<string, string> = {
  building: "Gedung",
  hall: "Aula",
  sports: "Olahraga",
  tourism: "Wisata",
  ticket: "Tiket",
  rental: "Sewa",
  service: "Layanan",
}

export default function AssetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("popular")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000000])
  const [capacity, setCapacity] = useState<number>(0)

  const filteredAssets = useMemo(() => {
    let result = [...assets]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.shortDescription.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q)
      )
    }
    if (selectedCategory) {
      result = result.filter((a) => a.categoryId === selectedCategory)
    }
    if (selectedType) {
      result = result.filter((a) => a.type === selectedType)
    }
    result = result.filter((a) => a.price >= priceRange[0] && a.price <= priceRange[1])
    if (capacity > 0) {
      result = result.filter((a) => a.capacity >= capacity)
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => (a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1))
    }

    return result
  }, [searchQuery, selectedCategory, selectedType, sortBy, priceRange, capacity])

  const totalPages = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE)
  const paginatedAssets = filteredAssets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const clearFilters = () => {
    setSelectedCategory("")
    setSelectedType("")
    setPriceRange([0, 100000000])
    setCapacity(0)
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategory || selectedType || searchQuery || capacity > 0 || priceRange[0] > 0 || priceRange[1] < 100000000

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Aset Daerah"
            description="Temukan dan pesan berbagai aset daerah yang tersedia untuk masyarakat Provinsi Jambi."
            breadcrumbs={[{ label: "Aset" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white p-2 shadow-sm">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1) }}
              placeholder="Cari aset..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Select value={sortBy} onValueChange={(v) => { if (v) setSortBy(v) }}>
            <SelectTrigger className="hidden h-9 w-44 rounded-lg border-border/50 bg-white sm:flex">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Terpopuler</SelectItem>
              <SelectItem value="rating">Rating Tertinggi</SelectItem>
              <SelectItem value="price-asc">Harga Terendah</SelectItem>
              <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
              <SelectItem value="name">Nama A-Z</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="size-4" />
            Filter
          </Button>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {showFilters && (
              <div className="w-64 shrink-0">
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Filter</h3>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-xs text-primary hover:underline">
                        Reset
                      </button>
                    )}
                  </div>
                  <div className="space-y-5">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Kategori</h4>
                      <div className="space-y-1">
                        <button
                          onClick={() => { setSelectedCategory(""); setPage(1) }}
                          className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${!selectedCategory ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
                        >
                          Semua Kategori
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => { setSelectedCategory(cat.id); setPage(1) }}
                            className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${selectedCategory === cat.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Tipe</h4>
                      <div className="space-y-1">
                        <button
                          onClick={() => { setSelectedType(""); setPage(1) }}
                          className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${!selectedType ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
                        >
                          Semua Tipe
                        </button>
                        {Object.entries(typeLabels).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => { setSelectedType(key); setPage(1) }}
                            className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${selectedType === key ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Kapasitas Minimum</h4>
                      <Input
                        type="number"
                        value={capacity || ""}
                        onChange={(e) => { setCapacity(Number(e.target.value)); setPage(1) }}
                        placeholder="0"
                        className="h-9 text-sm"
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Menampilkan {paginatedAssets.length} dari {filteredAssets.length} aset
                </p>
                <Select value={sortBy} onValueChange={(v) => { if (v) setSortBy(v) }}>
                  <SelectTrigger className="h-9 w-44 rounded-lg border-border/50 bg-white sm:hidden">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Terpopuler</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="price-asc">Harga ↓</SelectItem>
                    <SelectItem value="price-desc">Harga ↑</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paginatedAssets.length === 0 ? (
                <GlassCard className="p-12 text-center">
                  <Building2 className="mx-auto mb-4 size-12 text-muted-foreground/40" />
                  <h3 className="mb-2 text-lg font-semibold">Tidak Ada Aset Ditemukan</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Coba ubah filter atau kata kunci pencarian Anda</p>
                  <Button variant="outline" onClick={clearFilters}>Hapus Filter</Button>
                </GlassCard>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {paginatedAssets.map((asset) => (
                    <Link key={asset.id} href={`/aset/${asset.slug}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-lg">
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
                            <span className="text-sm font-semibold text-primary">
                              {asset.price === 0 ? "Gratis" : formatCurrency(asset.price)}
                            </span>
                            <span className="text-xs text-muted-foreground">/ {asset.priceUnit}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-xl"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant={page === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                      className="rounded-xl min-w-9"
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-xl"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
