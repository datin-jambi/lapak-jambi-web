"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { news as newsData } from "@/dummy/news"

const ITEMS_PER_PAGE = 6

const categories = ["Semua", ...Array.from(new Set(newsData.map((n) => n.category)))]

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [page, setPage] = useState(1)

  const filteredNews = useMemo(() => {
    let result = [...newsData]
    if (activeCategory !== "Semua") {
      result = result.filter((n) => n.category === activeCategory)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      )
    }
    return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  }, [activeCategory, searchQuery])

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE)
  const paginatedNews = filteredNews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Berita"
            description="Informasi terkini seputar layanan publik, pemerintahan, dan kegiatan di Provinsi Jambi."
            breadcrumbs={[{ label: "Berita" }]}
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
              placeholder="Cari berita..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button size="sm" className="rounded-xl">Cari</Button>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1) }}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {paginatedNews.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium">Tidak ada berita ditemukan</p>
              <p className="text-sm text-muted-foreground mt-1">Coba gunakan kata kunci yang berbeda</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedNews.map((item) => (
                <Link key={item.id} href={`/berita/${item.slug}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-foreground backdrop-blur-sm">{item.category}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {new Date(item.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="size-3" />
                          {item.authorName}
                        </span>
                      </div>
                      <h3 className="font-semibold line-clamp-2 leading-snug mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="rounded-xl">
                <ChevronLeft className="size-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button key={p} variant={page === p ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="rounded-xl min-w-9">
                  {p}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="rounded-xl">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
