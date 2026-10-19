"use client"

import { useState, useMemo } from "react"
import { Search, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { faq } from "@/dummy/faq"

const categories = ["Semua", ...Array.from(new Set(faq.map((f) => f.category)))]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [openItems, setOpenItems] = useState<string[]>([])

  const filteredFAQs = useMemo(() => {
    let result = [...faq].sort((a, b) => a.order - b.order)
    if (activeCategory !== "Semua") {
      result = result.filter((f) => f.category === activeCategory)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeCategory, searchQuery])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="FAQ"
            description="Temukan jawaban untuk pertanyaan yang sering diajukan tentang layanan Lapak Jambi."
            breadcrumbs={[{ label: "FAQ" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="-mt-6 relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 rounded-2xl border border-border/50 bg-white p-2 shadow-sm">
          <div className="flex flex-1 items-center gap-2 pl-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Button size="sm" className="rounded-xl">Cari</Button>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredFAQs.map((item) => (
              <GlassCard key={item.id} className="overflow-hidden p-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-muted/30"
                >
                  <span className="font-medium text-sm pr-4">{item.question}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform",
                      openItems.includes(item.id) && "rotate-180"
                    )}
                  />
                </button>
                {openItems.includes(item.id) && (
                  <div className="border-t border-border/50 px-5 py-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg font-medium">Tidak ada pertanyaan ditemukan</p>
              <p className="text-sm text-muted-foreground mt-1">Coba gunakan kata kunci yang berbeda</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
