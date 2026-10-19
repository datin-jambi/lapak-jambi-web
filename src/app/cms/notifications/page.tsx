"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { notifications as allNotifications } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { formatRelativeTime } from "@/utils/format"
import {
  Bell,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Settings,
  CheckCheck,
} from "lucide-react"

const typeIcons: Record<string, typeof Info> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
}

const typeColors: Record<string, string> = {
  info: "text-primary bg-primary/5",
  success: "text-emerald-600 bg-emerald-50",
  warning: "text-amber-600 bg-amber-50",
  error: "text-red-600 bg-red-50",
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filtered = useMemo(() => {
    if (filter === "unread") return allNotifications.filter((n) => !n.isRead)
    return allNotifications
  }, [filter])

  const unreadCount = allNotifications.filter((n) => !n.isRead).length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifikasi"
        description="Pusat notifikasi dan pemberitahuan CMS"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Notifikasi" }]}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "all" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Semua ({allNotifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === "unread" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            Belum Dibaca ({unreadCount})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="size-4" />
            Tandai Semua Dibaca
          </Button>
          <Button variant="outline" size="sm" render={<Link href="/cms/settings" />}>
            <Settings className="size-4" />
            Pengaturan
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card divide-y">
        {filtered.map((n) => {
          const Icon = typeIcons[n.type] || Info
          return (
            <div
              key={n.id}
              className={`flex items-start gap-4 px-4 py-4 transition-colors hover:bg-zinc-50/50 ${
                !n.isRead ? "bg-primary/5" : ""
              }`}
            >
              <div className={cn("flex size-9 items-center justify-center rounded-full shrink-0", typeColors[n.type])}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-900">{n.title}</p>
                  <span className="text-xs text-zinc-400 whitespace-nowrap">{formatRelativeTime(n.createdAt)}</span>
                </div>
                <p className="mt-0.5 text-sm text-zinc-600">{n.message}</p>
                {n.link && (
                  <Link href={n.link} className="mt-1 inline-block text-xs font-medium text-emerald-600 hover:text-emerald-700">
                    Lihat Detail &rarr;
                  </Link>
                )}
              </div>
              {!n.isRead && (
                <span className="mt-2 size-2 rounded-full bg-emerald-500 shrink-0" />
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
            <Bell className="size-10 mb-3 text-zinc-300" />
            <p className="text-sm">Tidak ada notifikasi</p>
          </div>
        )}
      </div>
    </div>
  )
}

function cn(...inputs: (string | boolean | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
