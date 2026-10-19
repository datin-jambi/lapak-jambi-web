"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  url: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  className?: string
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    )
  }

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    )
  }

  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div
          className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-muted"
          onClick={() => setSelectedIndex(0)}
        >
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="size-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative size-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors",
                  selectedIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground/30"
                )}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="size-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handlePrev() }}
                className="absolute left-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleNext() }}
                className="absolute right-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <img
            src={images[selectedIndex].url}
            alt={images[selectedIndex].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
