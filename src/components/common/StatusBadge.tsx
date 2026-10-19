import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
  type?: "booking" | "payment" | "asset" | "user"
  className?: string
}

const statusColorMap: Record<string, string> = {
  // Booking
  confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  cancelled: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  // Payment
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  unpaid: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  failed: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  refunded: "bg-primary/5 text-primary border-primary/20 dark:bg-primary/10 dark:text-primary/80 dark:border-primary/20",
  // Asset
  available: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  unavailable: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
  maintenance: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800",
  // User
  active: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800",
  inactive: "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800",
  suspended: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800",
}

const statusLabels: Record<string, string> = {
  confirmed: "Terkonfirmasi",
  pending: "Menunggu",
  cancelled: "Dibatalkan",
  completed: "Selesai",
  paid: "Lunas",
  unpaid: "Belum Bayar",
  failed: "Gagal",
  refunded: "Dikembalikan",
  available: "Tersedia",
  unavailable: "Tidak Tersedia",
  maintenance: "Pemeliharaan",
  active: "Aktif",
  inactive: "Tidak Aktif",
  suspended: "Ditangguhkan",
}

export function StatusBadge({
  status,
  type,
  className,
}: StatusBadgeProps) {
  const key = status.toLowerCase()
  const colorClass = statusColorMap[key] ?? "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/30 dark:text-slate-400 dark:border-slate-800"
  const label = statusLabels[key] ?? status

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        colorClass,
        className
      )}
    >
      {label}
    </Badge>
  )
}
