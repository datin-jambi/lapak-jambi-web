"use client"

import { useState, useMemo } from "react"
import { news as allNews } from "@/dummy"
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
import { formatDate } from "@/utils/format"
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  ImageIcon,
} from "lucide-react"

const categoryFilters = [
  { value: "", label: "Semua Kategori" },
  { value: "Infrastruktur", label: "Infrastruktur" },
  { value: "Teknologi", label: "Teknologi" },
  { value: "Wisata", label: "Wisata" },
  { value: "Pemerintahan", label: "Pemerintahan" },
  { value: "Olahraga", label: "Olahraga" },
]

export default function NewsPage() {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let result = [...allNews]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((n) => n.title.toLowerCase().includes(q))
    }
    if (categoryFilter) result = result.filter((n) => n.category === categoryFilter)
    return result
  }, [search, categoryFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Berita"
        description="Kelola berita dan informasi"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Berita" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <Select value={categoryFilter} onValueChange={(v) => { if (v !== null) { setCategoryFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent>
            {categoryFilters.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="ml-auto">
          <Plus className="size-4" />
          Tambah Berita
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Gambar</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Judul</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Kategori</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Penulis</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Tanggal</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((n) => (
              <tr key={n.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                <td className="px-4 py-3">
                  <div className="size-10 rounded-lg bg-zinc-100 overflow-hidden">
                    <img src={n.image} alt={n.title} className="size-full object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-zinc-900 max-w-xs truncate">{n.title}</p>
                </td>
                <td className="px-4 py-3"><Badge variant="secondary">{n.category}</Badge></td>
                <td className="px-4 py-3 text-sm text-zinc-500">{n.authorName}</td>
                <td className="px-4 py-3 text-sm text-zinc-500">{formatDate(n.publishedAt)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={n.isFeatured ? "active" : "inactive"} />
                </td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="size-4" /> Lihat</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="size-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data berita</td>
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
