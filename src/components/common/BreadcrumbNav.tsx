import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      <Link href="/" className="flex items-center gap-1 transition-colors hover:opacity-70">
        <Home className="size-3.5" />
        <span>Beranda</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="size-3.5 opacity-50" />
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:opacity-70">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
