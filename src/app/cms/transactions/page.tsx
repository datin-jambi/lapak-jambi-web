"use client"

import { useState, useMemo } from "react"
import { bookings, users } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/utils/format"
import {
  MoreHorizontal,
  Eye,
  Download,
  Search,
} from "lucide-react"

const paymentStatusFilters = [
  { value: "", label: "Semua Status" },
  { value: "paid", label: "Lunas" },
  { value: "unpaid", label: "Belum Bayar" },
  { value: "failed", label: "Gagal" },
  { value: "refunded", label: "Dikembalikan" },
]

export default function TransactionsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let result = bookings.filter((b) => b.paymentMethod !== "")
    if (statusFilter) {
      result = result.filter((b) => b.paymentStatus === statusFilter)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.assetName.toLowerCase().includes(q) ||
          b.paymentMethod.toLowerCase().includes(q)
      )
    }
    return result
  }, [search, statusFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transaksi"
        description="Riwayat transaksi pembayaran pemesanan aset"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Transaksi" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari transaksi..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <Select value={statusFilter} onValueChange={(v) => { if (v !== null) { setStatusFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            {paymentStatusFilters.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

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
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Booking</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pengguna</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Jumlah</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Metode</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tanggal</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((b) => {
              const user = users.find((u) => u.id === b.userId)
              return (
                <tr key={b.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                  <td className="px-4 py-3 text-sm font-mono text-zinc-500">TXN-{b.id}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{b.id}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{user?.name || "-"}</td>
                  <td className="px-4 py-3 text-sm font-medium text-zinc-900">{formatCurrency(b.totalPrice)}</td>
                  <td className="px-4 py-3 text-sm text-zinc-700">{b.paymentMethod || "-"}</td>
                  <td className="px-4 py-3"><StatusBadge status={b.paymentStatus} type="payment" /></td>
                  <td className="px-4 py-3 text-sm text-zinc-500">{formatDate(b.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Eye className="size-4" /> Detail</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              )
            })}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data transaksi</td>
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
