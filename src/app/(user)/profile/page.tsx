"use client"

import { useState } from "react"
import { Camera, Save, Lock, Eye, EyeOff } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"
import { getInitials } from "@/utils/format"

export default function ProfilePage() {
  const { user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  })
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [saved, setSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSaved(true)
    setTimeout(() => setPasswordSaved(false), 3000)
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Profil Saya"
            description="Kelola informasi akun dan pengaturan profil Anda."
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
          <GlassCard className="p-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <Avatar className="size-20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-xl">{user ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                <button className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <Camera className="size-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Bergabung sejak {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("id-ID") : "-"}</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="mb-6 text-lg font-semibold">Informasi Profil</h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" className="rounded-xl">
                  <Save className="mr-2 size-4" />
                  Simpan Perubahan
                </Button>
                {saved && <span className="text-sm text-emerald-600">Perubahan tersimpan!</span>}
              </div>
            </form>
          </GlassCard>

          <GlassCard className="p-8">
            <h3 className="mb-6 text-lg font-semibold">Ubah Password</h3>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    className="rounded-xl pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" className="rounded-xl">
                  <Lock className="mr-2 size-4" />
                  Ubah Password
                </Button>
                {passwordSaved && <span className="text-sm text-emerald-600">Password berhasil diubah!</span>}
              </div>
            </form>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
