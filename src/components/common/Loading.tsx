import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  text?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
}

const textSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}

export function LoadingSpinner({
  text,
  className,
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16",
        className
      )}
    >
      <Loader2
        className={cn(
          "animate-spin text-muted-foreground",
          sizeMap[size]
        )}
      />
      {text && (
        <p className={cn("text-muted-foreground", textSizeMap[size])}>
          {text}
        </p>
      )}
    </div>
  )
}
