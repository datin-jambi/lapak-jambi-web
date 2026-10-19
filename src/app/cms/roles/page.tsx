"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Shield,
  Users,
  KeyRound,
  Settings,
  Building2,
} from "lucide-react"

const rolesData = [
  {
    id: "role-superadmin",
    name: "Super Admin",
    description: "Akses penuh ke seluruh sistem",
    userCount: 1,
    permissionCount: 48,
    icon: Shield,
    color: "text-red-600 bg-red-50",
  },
  {
    id: "role-admin",
    name: "Admin",
    description: "Mengelola konten dan pengguna",
    userCount: 2,
    permissionCount: 36,
    icon: Settings,
    color: "text-primary bg-primary/5",
  },
  {
    id: "role-admin-opd",
    name: "Admin OPD",
    description: "Mengelola aset OPD masing-masing",
    userCount: 3,
    permissionCount: 24,
    icon: Building2,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "role-user",
    name: "Pengguna",
    description: "Membuat pemesanan aset",
    userCount: 8,
    permissionCount: 12,
    icon: Users,
    color: "text-violet-600 bg-violet-50",
  },
  {
    id: "role-guest",
    name: "Tamu",
    description: "Melihat informasi publik",
    userCount: 0,
    permissionCount: 4,
    icon: KeyRound,
    color: "text-amber-600 bg-amber-50",
  },
]

export default function RolesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editRole, setEditRole] = useState<(typeof rolesData)[0] | null>(null)

  const openAdd = () => {
    setEditRole(null)
    setDialogOpen(true)
  }

  const openEdit = (role: (typeof rolesData)[0]) => {
    setEditRole(role)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Peran (Roles)"
        description="Kelola peran dan hak akses pengguna"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Peran" }]}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{rolesData.length} peran</p>
        <Button onClick={openAdd}>
          <Plus className="size-4" />
          Tambah Peran
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rolesData.map((role) => {
          const Icon = role.icon
          return (
            <Card key={role.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("flex size-10 items-center justify-center rounded-lg", role.color)}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{role.name}</p>
                      <p className="text-xs text-zinc-500">{role.description}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(role)}><Edit className="size-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t pt-4">
                  <div>
                    <p className="text-lg font-semibold text-zinc-900">{role.userCount}</p>
                    <p className="text-xs text-zinc-500">Pengguna</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-zinc-900">{role.permissionCount}</p>
                    <p className="text-xs text-zinc-500">Izin Akses</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editRole ? "Edit Peran" : "Tambah Peran"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Peran</Label>
              <Input defaultValue={editRole?.name || ""} placeholder="Nama peran" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea defaultValue={editRole?.description || ""} placeholder="Deskripsi peran" rows={3} />
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>{editRole ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function cn(...inputs: (string | boolean | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
