"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Building2,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { CategoryIcon } from "@/components/common/CategoryIcon"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { ProductCardItem } from "@/components/features/products/ProductCardItem"
import { ProductGridSkeleton } from "@/components/features/products/ProductSkeleton"
import { categoriesApi, productsApi } from "@/services/api"
import type { CategoryPublic, ProductCard } from "@/types/api"
import { adaptAssetToProductCard } from "@/lib/adapters"
import { assets as dummyAssets } from "@/dummy/assets"
import { categories as dummyCategories } from "@/dummy/categories"

const ITEMS_PER_PAGE = 8

function AsetCatalogContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("q") || ""
  const initialCategory = searchParams.get("category") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [sortBy, setSortBy] = useState<string>("publishedAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(true)
  const [minPrice, setMinPrice] = useState<number | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")

  // API State
  const [categories, setCategories] = useState<CategoryPublic[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [products, setProducts] = useState<ProductCard[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [productsLoading, setProductsLoading] = useState(true)

  // 1. Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true)
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
        console.warn("Gagal memuat kategori API, menggunakan fallback", err)
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
    }
    fetchCategories()
  }, [])

  // 2. Fetch products whenever filters or page change
  useEffect(() => {
    async function fetchProducts() {
      try {
        setProductsLoading(true)
        const res = await productsApi.getProducts({
          page,
          limit: ITEMS_PER_PAGE,
          search: searchQuery || undefined,
          category: selectedCategory || undefined,
          minPrice: minPrice !== "" ? Number(minPrice) : undefined,
          maxPrice: maxPrice !== "" ? Number(maxPrice) : undefined,
          sortBy: sortBy as "publishedAt" | "name" | "price",
          sortOrder,
        })

        if (res && res.data && res.data.length > 0) {
          setProducts(res.data)
          setTotalItems(res.meta?.totalItems ?? res.data.length)
          setTotalPages(res.meta?.totalPages || 1)
        } else {
          // Fallback to local filtering of dummy data
          let filtered = dummyAssets.map(adaptAssetToProductCard)

          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.excerpt?.toLowerCase().includes(q) ||
                p.address?.toLowerCase().includes(q)
            )
          }

          if (selectedCategory) {
            filtered = filtered.filter((p) => {
              // Cocokkan slug atau nama kategori
              return (
                p.category.slug === selectedCategory ||
                p.category.name.toLowerCase().includes(selectedCategory.toLowerCase())
              )
            })
          }

          if (minPrice !== "") {
            filtered = filtered.filter((p) => p.startingPrice >= Number(minPrice))
          }
          if (maxPrice !== "") {
            filtered = filtered.filter((p) => p.startingPrice <= Number(maxPrice))
          }

          // Sorting
          if (sortBy === "price") {
            filtered.sort((a, b) => (sortOrder === "asc" ? a.startingPrice - b.startingPrice : b.startingPrice - a.startingPrice))
          } else if (sortBy === "name") {
            filtered.sort((a, b) => a.name.localeCompare(b.name))
          }

          setTotalItems(filtered.length)
          setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)))

          const startIdx = (page - 1) * ITEMS_PER_PAGE
          setProducts(filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE))
        }
      } catch (err) {
        console.warn("Gagal memuat produk dari API, menggunakan fallback", err)
        let filtered = dummyAssets.map(adaptAssetToProductCard)
        setTotalItems(filtered.length)
        setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)))
        setProducts(filtered.slice(0, ITEMS_PER_PAGE))
      } finally {
        setProductsLoading(false)
      }
    }

    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy, sortOrder, page, minPrice, maxPrice])

  // Synchronize with URL params if user changes them
  useEffect(() => {
    if (initialCategory && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory)
    }
    if (initialQuery && initialQuery !== searchQuery) {
      setSearchQuery(initialQuery)
    }
  }, [initialCategory, initialQuery])

  const clearFilters = () => {
    setSelectedCategory("")
    setSearchQuery("")
    setMinPrice("")
    setMaxPrice("")
    setPage(1)
    router.push("/aset")
  }

  const hasActiveFilters = Boolean(
    selectedCategory || searchQuery || minPrice !== "" || maxPrice !== ""
  )

  const handleSortChange = (val: string | null) => {
    if (!val) return
    if (val === "price-asc") {
      setSortBy("price")
      setSortOrder("asc")
    } else if (val === "price-desc") {
      setSortBy("price")
      setSortOrder("desc")
    } else if (val === "name") {
      setSortBy("name")
      setSortOrder("asc")
    } else {
      setSortBy("publishedAt")
      setSortOrder("desc")
    }
    setPage(1)
  }

  return (
    <div>
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-20 pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-r from-gold/25 to-gold/10 px-4 py-1 text-xs text-white backdrop-blur-md">
            <Sparkles className="size-3.5 text-gold" />
            Katalog Aset & Fasilitas Publik Daerah
          </div>
          <PageHeader
            title="Daftar Aset & Fasilitas Daerah"
            description="Temukan gedung serbaguna, sarana olahraga, laboratorium, dan fasilitas milik Pemerintah Provinsi Jambi dengan tarif retribusi resmi."
            breadcrumbs={[{ label: "Beranda", href: "/" }, { label: "Katalog Aset" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/85"
          />
        </div>
      </section>

      {/* Search & Sort Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-7 relative z-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-border/60 bg-white p-2.5 shadow-lg dark:bg-card">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              placeholder="Cari nama gedung, alamat, atau jenis fasilitas..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={`${sortBy}-${sortOrder}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="h-9 w-44 rounded-xl border-border/60 bg-muted/30 text-xs sm:flex">
                <SelectValue placeholder="Urutkan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="publishedAt-desc">Terbaru</SelectItem>
                <SelectItem value="name-asc">Nama A-Z</SelectItem>
                <SelectItem value="price-asc">Harga Terendah</SelectItem>
                <SelectItem value="price-desc">Harga Tertinggi</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-1.5 rounded-xl border-border/60 text-xs"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="size-3.5" />
              {showFilters ? "Tutup Filter" : "Filter"}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Filter */}
            {showFilters && (
              <aside className="w-full lg:w-72 shrink-0">
                <GlassCard className="p-5 border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <SlidersHorizontal className="size-4 text-primary" />
                      Filter Pencarian
                    </h3>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline"
                      >
                        <RotateCcw className="size-3" />
                        Reset
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Filter Kategori */}
                    <div>
                      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Kategori Fasilitas
                      </h4>
                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedCategory("")
                            setPage(1)
                          }}
                          className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors flex items-center justify-between ${
                            !selectedCategory
                              ? "bg-primary text-white shadow-sm"
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <span>Semua Kategori</span>
                        </button>

                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(cat.slug)
                              setPage(1)
                            }}
                            className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors flex items-center justify-between ${
                              selectedCategory === cat.slug
                                ? "bg-primary text-white font-semibold shadow-sm"
                                : "hover:bg-muted text-foreground"
                            }`}
                          >
                            <span className="truncate pr-2">{cat.name}</span>
                            <CategoryIcon
                              name={cat.icon}
                              slug={cat.slug}
                              className={`size-3.5 shrink-0 ${
                                selectedCategory === cat.slug ? "text-gold" : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Filter Kisaran Harga */}
                    <div>
                      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Tarif Retribusi (Rp)
                      </h4>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Min (Rp 0)"
                          value={minPrice}
                          onChange={(e) => {
                            setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
                            setPage(1)
                          }}
                          className="h-9 text-xs"
                        />
                        <Input
                          type="number"
                          placeholder="Maks (Rp)"
                          value={maxPrice}
                          onChange={(e) => {
                            setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
                            setPage(1)
                          }}
                          className="h-9 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </aside>
            )}

            {/* Product Grid Area */}
            <div className="flex-1 w-full">
              {/* Result Meta & Chips */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Menampilkan{" "}
                  <span className="font-semibold text-foreground">{products.length}</span> dari{" "}
                  <span className="font-semibold text-foreground">{totalItems}</span> fasilitas daerah
                </p>

                {hasActiveFilters && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Filter aktif:</span>
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 text-gold-foreground px-2.5 py-0.5 text-xs font-medium">
                        {categories.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
                        <button onClick={() => setSelectedCategory("")}>
                          <X className="size-3" />
                        </button>
                      </span>
                    )}
                    {searchQuery && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                        &quot;{searchQuery}&quot;
                        <button onClick={() => setSearchQuery("")}>
                          <X className="size-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Product Listing or Skeleton */}
              {productsLoading ? (
                <ProductGridSkeleton count={ITEMS_PER_PAGE} />
              ) : products.length === 0 ? (
                <GlassCard className="p-12 text-center border-dashed border-2">
                  <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
                    <Building2 className="size-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    Tidak Ada Fasilitas Ditemukan
                  </h3>
                  <p className="mb-6 text-sm text-muted-foreground max-w-md mx-auto">
                    Tidak ada aset atau layanan yang sesuai dengan kriteria pencarian Anda. Coba kurangi
                    filter atau cari dengan kata kunci lain.
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="rounded-xl gap-2">
                    <RotateCcw className="size-3.5" />
                    Hapus Semua Filter
                  </Button>
                </GlassCard>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCardItem key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="rounded-xl gap-1"
                  >
                    <ChevronLeft className="size-4" />
                    Sebelumnya
                  </Button>

                  <span className="px-4 text-xs font-medium text-muted-foreground">
                    Halaman {page} dari {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className="rounded-xl gap-1"
                  >
                    Berikutnya
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

export default function AssetsPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-3 text-sm text-muted-foreground">Memuat katalog aset...</p>
        </div>
      }
    >
      <AsetCatalogContent />
    </Suspense>
  )
}
