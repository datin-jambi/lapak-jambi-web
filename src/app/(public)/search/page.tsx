"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, Building2, ChevronLeft, ChevronRight } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/utils/format"
import { assets, categories, news as newsData, gallery as galleryData } from "@/dummy"

const ITEMS_PER_PAGE = 6

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState<"all" | "assets" | "news" | "gallery">("all")
  const [page, setPage] = useState(1)

  const results = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return { assets: [], news: [], gallery: [] }

    const matchedAssets = assets.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.categoryName.toLowerCase().includes(q)
    )

    const matchedNews = newsData.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    )

    const matchedGallery = galleryData.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
    )

    return { assets: matchedAssets, news: matchedNews, gallery: matchedGallery }
  }, [searchQuery])

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault()
    setSearchQuery(query)
    setPage(1)
  }

  const totalResults =
    (activeTab === "all" || activeTab === "assets" ? results.assets.length : 0) +
    (activeTab === "all" || activeTab === "news" ? results.news.length : 0) +
    (activeTab === "all" || activeTab === "gallery" ? results.gallery.length : 0)

  const tabs = [
    { key: "all" as const, label: "Semua", count: results.assets.length + results.news.length + results.gallery.length },
    { key: "assets" as const, label: "Aset", count: results.assets.length },
    { key: "news" as const, label: "Berita", count: results.news.length },
    { key: "gallery" as const, label: "Galeri", count: results.gallery.length },
  ]

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Pencarian"
            description="Cari aset, berita, dan galeri di platform Lapak Jambi."
            breadcrumbs={[{ label: "Pencarian" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="-mt-6 relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSearch} className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white p-2 shadow-sm">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari aset, berita, atau galeri..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="sm" className="rounded-xl">Cari</Button>
        </form>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {!searchQuery ? (
            <GlassCard className="p-16 text-center">
              <Search className="mx-auto mb-4 size-16 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">Cari Sesuatu</h3>
              <p className="text-muted-foreground">Masukkan kata kunci untuk mencari aset, berita, atau galeri</p>
            </GlassCard>
          ) : totalResults === 0 ? (
            <GlassCard className="p-16 text-center">
              <Building2 className="mx-auto mb-4 size-16 text-muted-foreground/30" />
              <h3 className="text-xl font-semibold mb-2">Hasil Tidak Ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;. Coba gunakan kata kunci yang berbeda.
              </p>
              <Button variant="outline" onClick={() => { setQuery(""); setSearchQuery("") }}>
                Hapus Pencarian
              </Button>
            </GlassCard>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => { setActiveTab(tab.key); setPage(1) }}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              <div className="space-y-8">
                {(activeTab === "all" || activeTab === "assets") && results.assets.length > 0 && (
                  <div>
                    {activeTab === "all" && <h3 className="mb-4 text-lg font-semibold">Aset</h3>}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.assets.slice(0, activeTab === "all" ? 3 : undefined).map((asset) => (
                        <Link key={asset.id} href={`/aset/${asset.slug}`}>
                          <Card className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative h-36 overflow-hidden">
                              <Image src={asset.images[0]?.url} alt={asset.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                              <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium">
                                <Star className="size-3 fill-amber-400 text-amber-400" />
                                {asset.rating}
                              </div>
                            </div>
                            <CardContent className="p-3.5">
                              <Badge variant="secondary" className="mb-1">{asset.categoryName}</Badge>
                              <h4 className="font-semibold text-sm line-clamp-1">{asset.name}</h4>
                              <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="size-3" />{asset.city}
                              </p>
                              <p className="mt-2 text-sm font-semibold text-primary">{formatCurrency(asset.price)} <span className="text-xs text-muted-foreground font-normal">/ {asset.priceUnit}</span></p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {activeTab === "all" && results.assets.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("assets")}>Lihat Semua Aset</Button>
                      </div>
                    )}
                  </div>
                )}

                {(activeTab === "all" || activeTab === "news") && results.news.length > 0 && (
                  <div>
                    {activeTab === "all" && <h3 className="mb-4 text-lg font-semibold">Berita</h3>}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.news.slice(0, activeTab === "all" ? 3 : undefined).map((item) => (
                        <Link key={item.id} href={`/berita/${item.slug}`}>
                          <Card className="group overflow-hidden transition-all hover:shadow-lg">
                            <div className="relative h-36 overflow-hidden">
                              <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                            </div>
                            <CardContent className="p-3.5">
                              <Badge variant="secondary" className="mb-1">{item.category}</Badge>
                              <h4 className="font-semibold text-sm line-clamp-2">{item.title}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{new Date(item.publishedAt).toLocaleDateString("id-ID")}</p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {activeTab === "all" && results.news.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("news")}>Lihat Semua Berita</Button>
                      </div>
                    )}
                  </div>
                )}

                {(activeTab === "all" || activeTab === "gallery") && results.gallery.length > 0 && (
                  <div>
                    {activeTab === "all" && <h3 className="mb-4 text-lg font-semibold">Galeri</h3>}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {results.gallery.slice(0, activeTab === "all" ? 3 : undefined).map((item) => (
                        <Link key={item.id} href="/galeri" className="group relative h-40 overflow-hidden rounded-xl">
                          <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                            <h4 className="text-sm font-semibold">{item.title}</h4>
                            <p className="text-xs text-white/70">{item.category}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {activeTab === "all" && results.gallery.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => setActiveTab("gallery")}>Lihat Semua Galeri</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center"><p className="text-muted-foreground">Memuat pencarian...</p></div>}>
      <SearchContent />
    </Suspense>
  )
}
