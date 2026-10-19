import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface InfoRowProps {
  label: string
  value: string | ReactNode
  className?: string
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border/50 py-3 last:border-0",
        className
      )}
    >
      <dt className="min-w-[140px] text-sm font-medium text-muted-foreground">
        {label}
      </dt>
      <dd className="flex-1 text-right text-sm font-medium text-foreground">
        {value}
      </dd>
    </div>
  )
}
