import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover }: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border/50 bg-white p-6 shadow-sm transition-all duration-300",
        "before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:rounded-t-xl before:bg-gradient-to-r before:from-gold/50 before:via-gold/70 before:to-gold/50 before:opacity-0 before:transition-all before:duration-300",
        hover && "hover:-translate-y-1 hover:shadow-lg hover:border-gold/30 hover:before:opacity-100",
        className
      )}
    >
      {children}
    </div>
  )
}
