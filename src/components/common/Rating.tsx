import { cn } from "@/lib/utils"
import { Star } from "lucide-react"

interface RatingProps {
  rating: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

const sizeMap = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
}

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export function Rating({
  rating,
  max = 5,
  size = "md",
  showValue,
  className,
}: RatingProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < Math.round(rating)
          return (
            <Star
              key={i}
              className={cn(
                sizeMap[size],
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-none text-muted-foreground/30"
              )}
            />
          )
        })}
      </div>
      {showValue && (
        <span className={cn("font-medium text-foreground", textSizeMap[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
