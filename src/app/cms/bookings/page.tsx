"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { bookings as allBookings, users } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/utils/format"
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react"

const tabs = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let result = [...allBookings]
    if (activeTab !== "all") {
      result = result.filter((b) => b.status === activeTab)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.assetName.toLowerCase().includes(q) ||
          users.find((u) => u.id === b.userId)?.name.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeTab, search])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pemesanan"
        description="Kelola semua pemesanan aset daerah"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Pemesanan" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); setPage(1) }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs ml-auto">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari pemesanan..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <Button variant="outline" size="sm">
          <Download className="size-4" />
          Export
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Aset</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pengguna</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tanggal</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Total</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pembayaran</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((b) => {
              const user = users.find((u) => u.id === b.userId)
              return (
                <tr key={b.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                  <td className="px-4 py-3 text-sm font-mono text-zinc-500">{b.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded bg-zinc-100 overflow-hidden shrink-0">
                        <img src={b.assetImage} alt="" className="size-full object-cover" />
                      </div>
                      <p className="text-sm font-medium text-zinc-900">{b.assetName}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{user?.name || "-"}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{formatDate(b.bookingDate)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-zinc-900">{formatCurrency(b.totalPrice)}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.status} type="booking" /></td>
                  <td className="px-4 py-3"><StatusBadge status={b.paymentStatus} type="payment" /></td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="size-4" /> Detail</DropdownMenuItem>
                        <DropdownMenuItem><CheckCircle className="size-4" /> Konfirmasi</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive"><XCircle className="size-4" /> Batalkan</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data pemesanan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="icon-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Button key={p} variant={page === p ? "default" : "ghost"} size="xs" onClick={() => setPage(p)} className="min-w-7">{p}</Button>
          ))}
          <Button variant="ghost" size="icon-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Button>
        </div>
      )}
    </div>
  )
}
