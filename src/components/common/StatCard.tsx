import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: { value: number; isPositive: boolean }
  className?: string
  variant?: "default" | "primary" | "success" | "warning"
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary text-primary-foreground",
  success: "bg-emerald-50 dark:bg-emerald-950/30",
  warning: "bg-amber-50 dark:bg-amber-950/30",
}

const iconContainerStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400",
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  className,
  variant = "default",
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl p-4",
        variantStyles[variant],
        className
      )}
    >
      <CardContent className="flex items-start gap-4 p-0">
        {icon && (
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-lg",
              iconContainerStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight">{value}</span>
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  trend.isPositive ? "text-emerald-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
