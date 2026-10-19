"use client"

import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

interface SearchBoxProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  onSearch?: () => void
  className?: string
}

export function SearchBox({
  placeholder = "Cari...",
  value,
  onChange,
  onSearch,
  className,
}: SearchBoxProps) {
  return (
    <div
      className={cn(
        "relative flex items-center",
        className
      )}
    >
      <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSearch) onSearch()
        }}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-border/50 bg-white/70 px-10 text-sm backdrop-blur-md placeholder:text-muted-foreground focus:border-ring focus:bg-white/90 focus:outline-none focus:ring-2 focus:ring-ring/20"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 flex size-4 items-center justify-center text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
