import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface SectionTitleProps {
  title: string
  subtitle?: string
  action?: { label: string; href: string }
  centered?: boolean
  className?: string
}

export function SectionTitle({
  title,
  subtitle,
  action,
  centered,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        centered && "text-center",
        className
      )}
    >
      <div className={cn("flex items-end gap-6", centered && "flex-col items-center")}>
        <div className={cn("space-y-3", centered && "text-center")}>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          {centered && (
            <div className="mx-auto h-1 w-12 rounded-full bg-gradient-to-r from-gold/60 to-gold/30" />
          )}
          {!centered && (
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-gold/60 to-gold/30" />
          )}
          {subtitle && (
            <p className="max-w-2xl text-base text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action && (
          <Button
            variant="outline"
            size="sm"
            render={<Link href={action.href} />}
            className="shrink-0"
          >
            {action.label}
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  )
}
