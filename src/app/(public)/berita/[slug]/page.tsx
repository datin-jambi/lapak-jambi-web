"use client"

import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Calendar, User, Share2, Clock, Tag, ArrowLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/common/GlassCard"
import { PageHeader } from "@/components/common/PageHeader"
import { getNewsBySlug } from "@/services/news.service"
import { news as newsData } from "@/dummy/news"

export default function NewsDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const article = getNewsBySlug(slug)
  const relatedNews = newsData.filter((n) => n.slug !== slug).slice(0, 3)

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold">Berita Tidak Ditemukan</h2>
        <p className="text-muted-foreground">Berita yang Anda cari tidak tersedia.</p>
        <Button render={<Link href="/berita" />}>Kembali ke Berita</Button>
      </div>
    )
  }

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <PageHeader
          title={article.title}
          breadcrumbs={[
            { label: "Berita", href: "/berita" },
            { label: article.category, href: `/berita?category=${article.category}` },
            { label: article.title },
          ]}
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <article className="lg:col-span-2 space-y-8">
            <div className="relative h-[400px] overflow-hidden rounded-2xl">
              <Image src={article.image} alt={article.title} fill className="object-cover" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {new Date(article.publishedAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <div className="flex items-center gap-1.5">
                <User className="size-4" />
                {article.authorName}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {new Date(article.publishedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <Badge variant="secondary">{article.category}</Badge>
            </div>

            <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
              <p className="text-base font-medium text-foreground">{article.excerpt}</p>
              {article.content.split("\n").map((paragraph, i) => (
                paragraph.trim() && <p key={i} className="mt-4">{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 overflow-hidden rounded-full bg-muted">
                  <Image src={article.authorAvatar} alt={article.authorName} width={48} height={48} className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{article.authorName}</p>
                  <p className="text-sm text-muted-foreground">Penulis</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Share2 className="mr-1.5 size-4" />
                  Bagikan
                </Button>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" size="sm" render={<Link href="/berita" />}>
                <ArrowLeft className="mr-1.5 size-4" />
                Kembali
              </Button>
            </div>
          </article>

          <aside className="space-y-6">
            <GlassCard className="p-5">
              <h3 className="mb-4 font-semibold">Berita Terkait</h3>
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <Link key={item.id} href={`/berita/${item.slug}`} className="group flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h4>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {new Date(item.publishedAt).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-5">
              <h3 className="mb-3 font-semibold">Kategori</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(newsData.map((n) => n.category))).map((cat) => (
                  <Badge key={cat} variant="outline" className="rounded-full cursor-pointer hover:bg-muted" render={<Link href={`/news?category=${cat}`} />}>
                    {cat}
                  </Badge>
                ))}
              </div>
            </GlassCard>
          </aside>
        </div>
      </section>
    </div>
  )
}
