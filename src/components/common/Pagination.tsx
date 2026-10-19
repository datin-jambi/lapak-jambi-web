"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages: (number | "...")[] = []
    const delta = 1

    const rangeStart = Math.max(2, currentPage - delta)
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta)

    pages.push(1)
    if (rangeStart > 2) pages.push("...")
    for (let i = rangeStart; i <= rangeEnd; i++) pages.push(i)
    if (rangeEnd < totalPages - 1) pages.push("...")
    if (totalPages > 1) pages.push(totalPages)

    return pages
  }

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft />
      </Button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="flex size-7 items-center justify-center text-xs text-muted-foreground">
            ...
          </span>
        ) : (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="xs"
            onClick={() => onPageChange(page)}
            className="min-w-7"
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="icon-sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Halaman selanjutnya"
      >
        <ChevronRight />
      </Button>
    </nav>
  )
}
