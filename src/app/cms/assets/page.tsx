"use client"

import { useState } from "react"
import Link from "next/link"
import { assets as allAssets, categories } from "@/dummy"
import { DataTable } from "@/components/common/DataTable"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { formatCurrency } from "@/utils/format"
import { cn } from "@/lib/utils"
import {
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ImageIcon,
} from "lucide-react"

const assetTypes = [
  { value: "", label: "Semua Tipe" },
  { value: "building", label: "Gedung" },
  { value: "hall", label: "Aula" },
  { value: "sports", label: "Olahraga" },
  { value: "tourism", label: "Wisata" },
  { value: "ticket", label: "Tiket" },
  { value: "rental", label: "Sewa" },
  { value: "service", label: "Layanan" },
]

const statusFilters = [
  { value: "", label: "Semua Status" },
  { value: "available", label: "Tersedia" },
  { value: "unavailable", label: "Tidak Tersedia" },
  { value: "maintenance", label: "Pemeliharaan" },
]

export default function AssetsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = allAssets.filter((a) => {
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter && a.categoryId !== categoryFilter) return false
    if (typeFilter && a.type !== typeFilter) return false
    if (statusFilter && a.status !== statusFilter) return false
    return true
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kelola Aset"
        description="Kelola semua aset daerah Provinsi Jambi"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Aset" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <input
            type="text"
            placeholder="Cari aset..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 pl-9 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
          />
          <svg className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>

        <Select value={categoryFilter} onValueChange={(v) => { if (v !== null) { setCategoryFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Semua Kategori</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(v) => { if (v !== null) { setTypeFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Pilih Tipe" />
          </SelectTrigger>
          <SelectContent>
            {assetTypes.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => { if (v !== null) { setStatusFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent>
            {statusFilters.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="ml-auto" render={<Link href="/cms/assets/new" />}>
          <Plus className="size-4" />
          Tambah Aset
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Gambar</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Nama</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tipe</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Kategori</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Harga</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((asset) => (
              <tr key={asset.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                <td className="px-4 py-3">
                  <div className="size-10 rounded-lg bg-zinc-100 overflow-hidden">
                    {asset.images[0] ? (
                      <img src={asset.images[0].url} alt={asset.name} className="size-full object-cover" />
                    ) : (
                      <div className="flex size-full items-center justify-center"><ImageIcon className="size-4 text-zinc-400" /></div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-zinc-900">{asset.name}</p>
                  <p className="text-xs text-zinc-500">{asset.location}</p>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-700 capitalize">{asset.type}</td>
                <td className="px-4 py-3"><Badge variant="secondary">{asset.categoryName}</Badge></td>
                <td className="px-4 py-3 text-sm font-medium text-zinc-900">{asset.price === 0 ? "Gratis" : formatCurrency(asset.price)}</td>
                <td className="px-4 py-3"><StatusBadge status={asset.status} type="asset" /></td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem render={<Link href={`/cms/assets/${asset.id}/edit`} />}>
                        <Eye className="size-4" /> Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href={`/cms/assets/${asset.id}/edit`} />}>
                        <Edit className="size-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data aset</td>
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
