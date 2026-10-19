"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Save } from "lucide-react"

const roles = [
  { id: "superadmin", label: "Super Admin", color: "text-red-600" },
  { id: "admin", label: "Admin", color: "text-primary" },
  { id: "admin-opd", label: "Admin OPD", color: "text-emerald-600" },
  { id: "user", label: "Pengguna", color: "text-violet-600" },
  { id: "guest", label: "Tamu", color: "text-amber-600" },
]

const permissionGroups = [
  {
    group: "Aset",
    permissions: [
      { id: "aset.view", label: "Melihat Aset" },
      { id: "aset.create", label: "Menambah Aset" },
      { id: "aset.edit", label: "Mengedit Aset" },
      { id: "aset.delete", label: "Menghapus Aset" },
      { id: "aset.manage-facilities", label: "Mengelola Fasilitas" },
      { id: "aset.manage-schedule", label: "Mengelola Jadwal" },
    ],
  },
  {
    group: "Pemesanan",
    permissions: [
      { id: "booking.view", label: "Melihat Pemesanan" },
      { id: "booking.create", label: "Membuat Pemesanan" },
      { id: "booking.confirm", label: "Konfirmasi Pemesanan" },
      { id: "booking.cancel", label: "Membatalkan Pemesanan" },
    ],
  },
  {
    group: "Pengguna",
    permissions: [
      { id: "user.view", label: "Melihat Pengguna" },
      { id: "user.create", label: "Menambah Pengguna" },
      { id: "user.edit", label: "Mengedit Pengguna" },
      { id: "user.delete", label: "Menghapus Pengguna" },
      { id: "user.manage-roles", label: "Mengelola Peran" },
    ],
  },
  {
    group: "Konten",
    permissions: [
      { id: "news.view", label: "Melihat Berita" },
      { id: "news.manage", label: "Mengelola Berita" },
      { id: "gallery.view", label: "Melihat Galeri" },
      { id: "gallery.manage", label: "Mengelola Galeri" },
      { id: "faq.manage", label: "Mengelola FAQ" },
      { id: "banner.manage", label: "Mengelola Banner" },
    ],
  },
  {
    group: "Sistem",
    permissions: [
      { id: "settings.view", label: "Melihat Pengaturan" },
      { id: "settings.edit", label: "Mengubah Pengaturan" },
      { id: "reports.view", label: "Melihat Laporan" },
      { id: "reports.generate", label: "Membuat Laporan" },
      { id: "audit.view", label: "Melihat Audit Log" },
      { id: "notifications.manage", label: "Mengelola Notifikasi" },
    ],
  },
]

const defaultPermissions: Record<string, string[]> = {
  superadmin: permissionGroups.flatMap((g) => g.permissions.map((p) => p.id)),
  admin: permissionGroups.flatMap((g) => g.permissions.map((p) => p.id)),
  "admin-opd": [
    "aset.view", "aset.edit", "aset.manage-facilities", "aset.manage-schedule",
    "booking.view", "booking.create", "booking.confirm", "booking.cancel",
    "news.view", "gallery.view",
  ],
  user: ["aset.view", "booking.create", "booking.view"],
  guest: ["aset.view"],
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState(defaultPermissions)

  const togglePermission = (roleId: string, permissionId: string) => {
    setPermissions((prev) => {
      const current = prev[roleId] || []
      const updated = current.includes(permissionId)
        ? current.filter((p) => p !== permissionId)
        : [...current, permissionId]
      return { ...prev, [roleId]: updated }
    })
  }

  const hasPermission = (roleId: string, permissionId: string) => {
    return (permissions[roleId] || []).includes(permissionId)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Izin Akses (Permissions)"
        description="Atur izin akses untuk setiap peran pengguna"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Izin Akses" }]}
      />

      <div className="overflow-x-auto rounded-xl border bg-card">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b">
              <th className="sticky left-0 z-10 h-10 min-w-[200px] bg-card px-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Izin Akses
              </th>
              {roles.map((role) => (
                <th
                  key={role.id}
                  className={cn("h-10 px-4 text-center text-xs font-medium uppercase tracking-wider", role.color)}
                >
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissionGroups.map((group) => (
              <>
                <tr key={group.group} className="border-b bg-zinc-50/50">
                  <td className="sticky left-0 z-10 bg-zinc-50/50 px-4 py-2 text-xs font-semibold text-zinc-700">
                    {group.group}
                  </td>
                  {roles.map((role) => (
                    <td key={role.id} className="px-4 py-2" />
                  ))}
                </tr>
                {group.permissions.map((perm) => (
                  <tr key={perm.id} className="border-b last:border-0 hover:bg-zinc-50/50">
                    <td className="sticky left-0 z-10 bg-card px-4 py-3 text-sm text-zinc-700">
                      {perm.label}
                    </td>
                    {roles.map((role) => (
                      <td key={role.id} className="px-4 py-3 text-center">
                        <Switch
                          size="sm"
                          checked={hasPermission(role.id, perm.id)}
                          onCheckedChange={() => togglePermission(role.id, perm.id)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="size-4" />
          Simpan Izin Akses
        </Button>
      </div>
    </div>
  )
}
