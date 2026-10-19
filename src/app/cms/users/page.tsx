"use client"

import { useState, useMemo } from "react"
import { users as allUsers } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { formatDate, getInitials } from "@/utils/format"
import {
  MoreHorizontal,
  Edit,
  UserX,
  Trash2,
  Plus,
  Search,
} from "lucide-react"

const roleFilters = [
  { value: "", label: "Semua Peran" },
  { value: "SuperAdmin", label: "Super Admin" },
  { value: "Admin", label: "Admin" },
  { value: "AdminOPD", label: "Admin OPD" },
  { value: "User", label: "Pengguna" },
]

const statusFilters = [
  { value: "", label: "Semua Status" },
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Tidak Aktif" },
  { value: "suspended", label: "Ditangguhkan" },
]

export default function UsersPage() {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let result = [...allUsers]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    }
    if (roleFilter) result = result.filter((u) => u.role === roleFilter)
    if (statusFilter) {
      if (statusFilter === "active") result = result.filter((u) => u.isActive)
      else if (statusFilter === "inactive") result = result.filter((u) => !u.isActive)
    }
    return result
  }, [search, roleFilter, statusFilter])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengguna"
        description="Kelola semua pengguna aplikasi"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Pengguna" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari pengguna..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <Select value={roleFilter} onValueChange={(v) => { if (v !== null) { setRoleFilter(v); setPage(1) } }}>
          <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
            <SelectValue placeholder="Semua Peran" />
          </SelectTrigger>
          <SelectContent>
            {roleFilters.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
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

        <Button className="ml-auto">
          <Plus className="size-4" />
          Tambah Pengguna
        </Button>
      </div>

      <div className="rounded-xl border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Pengguna</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Peran</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="h-10 px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Bergabung</th>
              <th className="h-10 px-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((user) => (
              <tr key={user.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-zinc-900">{user.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-zinc-500">{user.email}</td>
                <td className="px-4 py-3"><Badge variant="secondary">{user.role}</Badge></td>
                <td className="px-4 py-3">
                  <StatusBadge status={user.isActive ? "active" : "inactive"} type="user" />
                </td>
                <td className="px-4 py-3 text-sm text-zinc-500">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Edit className="size-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><UserX className="size-4" /> Nonaktifkan</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-zinc-500">Tidak ada data pengguna</td>
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
