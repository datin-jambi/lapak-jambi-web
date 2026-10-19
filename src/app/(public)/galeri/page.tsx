"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { gallery as galleryData } from "@/dummy/gallery"

const categories = ["Semua", ...Array.from(new Set(galleryData.map((g) => g.category)))]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("Semua")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems =
    activeCategory === "Semua"
      ? galleryData
      : galleryData.filter((g) => g.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
    }
  }

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Galeri"
            description="Dokumentasi kegiatan, fasilitas, dan momen penting Pemerintah Provinsi Jambi."
            breadcrumbs={[{ label: "Galeri" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative mb-4 w-full overflow-hidden rounded-xl break-inside-avoid"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100 text-left">
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-xs text-white/70">{item.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="size-5" />
          </button>
          <div className="max-h-[85vh] max-w-[90vw]">
            <Image
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              width={1200}
              height={800}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
            />
            <div className="mt-3 text-center text-white">
              <h3 className="text-lg font-semibold">{filteredItems[lightboxIndex].title}</h3>
              <p className="text-sm text-white/70">{filteredItems[lightboxIndex].description}</p>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {filteredItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={cn("size-2 rounded-full transition-all", i === lightboxIndex ? "bg-white w-6" : "bg-white/40")}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
