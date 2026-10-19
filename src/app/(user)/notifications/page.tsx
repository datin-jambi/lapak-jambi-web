"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { formatRelativeTime } from "@/utils/format"
import { notifications } from "@/dummy/notification"

const typeIcons: Record<string, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
}

const typeColors: Record<string, string> = {
  info: "bg-primary/5 text-primary",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-red-600",
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead
    return true
  })

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Notifikasi"
            description="Pantau informasi dan pemberitahuan terbaru tentang akun dan pemesanan Anda."
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Semua
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  filter === "unread" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                Belum Dibaca ({unreadCount})
              </button>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="rounded-xl">
                <CheckCheck className="mr-1.5 size-4" />
                Tandai Semua Dibaca
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <Bell className="mx-auto mb-4 size-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold mb-2">Tidak Ada Notifikasi</h3>
                <p className="text-sm text-muted-foreground">
                  {filter === "unread" ? "Semua notifikasi sudah dibaca." : "Belum ada notifikasi."}
                </p>
              </GlassCard>
            ) : (
              filteredNotifications.map((notif) => {
                const Icon = typeIcons[notif.type] || Info
                return (
                  <Link
                    key={notif.id}
                    href={notif.link}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border border-border/50 p-4 transition-all hover:shadow-sm",
                      !notif.isRead && "bg-primary/[0.02] border-primary/10"
                    )}
                  >
                    <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", typeColors[notif.type])}>
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={cn("text-sm", !notif.isRead && "font-semibold")}>{notif.title}</h4>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatRelativeTime(notif.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{notif.message}</p>
                    </div>
                    <ChevronRight className="mt-2 size-4 shrink-0 text-muted-foreground" />
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
