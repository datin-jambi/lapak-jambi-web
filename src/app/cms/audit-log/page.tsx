"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/utils/format"
import {
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react"

const auditLogs = [
  { id: "log-001", userId: "a1b2c3d4", userName: "Budi Hartono", action: "login", entity: "Sistem", entityId: "-", details: "Login ke CMS", ipAddress: "192.168.1.100", createdAt: "2026-07-12T08:30:00.000Z" },
  { id: "log-002", userId: "a1b2c3d4", userName: "Budi Hartono", action: "create", entity: "Aset", entityId: "ast-gedung-pendopo", details: "Menambah aset baru: Pendopo", ipAddress: "192.168.1.100", createdAt: "2026-07-12T09:15:00.000Z" },
  { id: "log-003", userId: "b2c3d4e5", userName: "Siti Rahmawati", action: "update", entity: "Booking", entityId: "bok-003", details: "Mengkonfirmasi pemesanan", ipAddress: "192.168.1.101", createdAt: "2026-07-12T10:00:00.000Z" },
  { id: "log-004", userId: "c3d4e5f6", userName: "Agus Wijaya", action: "delete", entity: "Kategori", entityId: "cat-test", details: "Menghapus kategori uji coba", ipAddress: "192.168.1.102", createdAt: "2026-07-11T14:30:00.000Z" },
  { id: "log-005", userId: "a1b2c3d4", userName: "Budi Hartono", action: "update", entity: "Pengaturan", entityId: "general", details: "Mengubah pengaturan umum aplikasi", ipAddress: "192.168.1.100", createdAt: "2026-07-11T11:00:00.000Z" },
  { id: "log-006", userId: "b2c3d4e5", userName: "Siti Rahmawati", action: "create", entity: "User", entityId: "nurul.hasanah", details: "Menambah pengguna baru", ipAddress: "192.168.1.101", createdAt: "2026-07-10T09:45:00.000Z" },
  { id: "log-007", userId: "d4e5f6a7", userName: "Dwi Lestari", action: "update", entity: "Aset", entityId: "ast-gor-pattimura", details: "Mengupdate status aset", ipAddress: "192.168.1.103", createdAt: "2026-07-10T08:20:00.000Z" },
  { id: "log-008", userId: "a1b2c3d4", userName: "Budi Hartono", action: "export", entity: "Laporan", entityId: "rpt-001", details: "Mengunduh laporan pendapatan", ipAddress: "192.168.1.100", createdAt: "2026-07-09T16:00:00.000Z" },
  { id: "log-009", userId: "c3d4e5f6", userName: "Agus Wijaya", action: "login", entity: "Sistem", entityId: "-", details: "Login ke CMS - Gagal (password salah)", ipAddress: "192.168.1.102", createdAt: "2026-07-09T07:00:00.000Z" },
  { id: "log-010", userId: "a1b2c3d4", userName: "Budi Hartono", action: "create", entity: "Berita", entityId: "news-008", details: "Menambah berita baru", ipAddress: "192.168.1.100", createdAt: "2026-07-08T13:00:00.000Z" },
  { id: "log-011", userId: "e5f6a7b8", userName: "Eko Prasetyo", action: "update", entity: "Fasilitas", entityId: "fac-ac", details: "Mengupdate nama fasilitas", ipAddress: "192.168.1.104", createdAt: "2026-07-08T10:30:00.000Z" },
  { id: "log-012", userId: "b2c3d4e5", userName: "Siti Rahmawati", action: "cancel", entity: "Booking", entityId: "bok-005", details: "Membatalkan pemesanan", ipAddress: "192.168.1.101", createdAt: "2026-07-07T15:00:00.000Z" },
]

const actionColors: Record<string, string> = {
  login: "bg-primary/5 text-primary border-primary/20",
  create: "bg-emerald-50 text-emerald-700 border-emerald-200",
  update: "bg-amber-50 text-amber-700 border-amber-200",
  delete: "bg-red-50 text-red-700 border-red-200",
  cancel: "bg-red-50 text-red-700 border-red-200",
  export: "bg-violet-50 text-violet-700 border-violet-200",
}

const actionLabels: Record<string, string> = {
  login: "Login",
  create: "Tambah",
  update: "Ubah",
  delete: "Hapus",
  cancel: "Batal",
  export: "Ekspor",
}

export default function AuditLogPage() {
  const [search, setSearch] = useState("")

  const filtered = search
    ? auditLogs.filter(
        (log) =>
          log.userName.toLowerCase().includes(search.toLowerCase()) ||
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.entity.toLowerCase().includes(search.toLowerCase()) ||
          log.details.toLowerCase().includes(search.toLowerCase())
      )
    : auditLogs

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit Log"
        description="Riwayat aktivitas pengguna dalam sistem"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Audit Log" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari aktivitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <input
          type="date"
          className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
        />
        <span className="text-xs text-zinc-400">-</span>
        <input
          type="date"
          className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
        />

        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Waktu</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pengguna</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Entitas</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Detail</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">IP</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                <td className="px-4 py-3 text-sm text-zinc-500 whitespace-nowrap">{formatDateTime(log.createdAt)}</td>
                <td className="px-4 py-3 text-sm font-medium text-zinc-900">{log.userName}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-xs font-medium capitalize",
                      actionColors[log.action] || "bg-zinc-50 text-zinc-700"
                    )}
                  >
                    {actionLabels[log.action] || log.action}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-700">{log.entity}</td>
                <td className="px-4 py-3 text-sm text-zinc-500 max-w-xs truncate">{log.details}</td>
                <td className="px-4 py-3 text-right text-xs font-mono text-zinc-400">{log.ipAddress}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data audit log</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-zinc-400 text-center">
        Menampilkan {filtered.length} dari {auditLogs.length} entri
      </p>
    </div>
  )
}
