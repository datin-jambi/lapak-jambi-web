"use client"

import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Save, Camera, UserCircle } from "lucide-react"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profil Saya"
        description="Kelola informasi profil akun Anda"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Profil" }]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Foto Profil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar size="lg">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi%20Hartono"
                  alt="Budi Hartono"
                />
                <AvatarFallback>BH</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 transition-colors">
                <Camera className="size-3.5" />
              </button>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-900">Budi Hartono</p>
              <p className="text-xs text-zinc-500">Super Admin</p>
            </div>
            <Button variant="outline" size="sm">Upload Foto Baru</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama Lengkap</Label>
                <Input defaultValue="Budi Hartono" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="admin@bpkpd.jambiprov.go.id" type="email" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nomor Telepon</Label>
                <Input defaultValue="081234567890" />
              </div>
              <div className="space-y-2">
                <Label>Jabatan</Label>
                <Input defaultValue="Kepala BPKPD" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Bidang / OPD</Label>
              <Input defaultValue="BPKPD Provinsi Jambi" />
            </div>

            <Separator />

            <CardTitle className="text-base">Ubah Password</CardTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Password Baru</Label>
                <Input type="password" placeholder="Password baru" />
              </div>
              <div className="space-y-2">
                <Label>Konfirmasi Password</Label>
                <Input type="password" placeholder="Konfirmasi password" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="size-4" />
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
