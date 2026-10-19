"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { categories, facilities } from "@/dummy"
import { cn } from "@/lib/utils"
import {
  Save,
  ArrowLeft,
  ImagePlus,
  X,
} from "lucide-react"

const assetTypes = [
  { value: "building", label: "Gedung" },
  { value: "hall", label: "Aula" },
  { value: "sports", label: "Olahraga" },
  { value: "tourism", label: "Wisata" },
  { value: "ticket", label: "Tiket" },
  { value: "rental", label: "Sewa" },
  { value: "service", label: "Layanan" },
]

const priceUnits = [
  { value: "per hari", label: "Per Hari" },
  { value: "per jam", label: "Per Jam" },
  { value: "per orang", label: "Per Orang" },
  { value: "per tahun", label: "Per Tahun" },
  { value: "gratis", label: "Gratis" },
]

export default function NewAssetPage() {
  const router = useRouter()
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const toggleFacility = (id: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  const addImagePlaceholder = () => {
    setUploadedImages((prev) => [
      ...prev,
      `https://picsum.photos/seed/upload-${Date.now()}/800/600`,
    ])
  }

  const removeImage = (url: string) => {
    setUploadedImages((prev) => prev.filter((u) => u !== url))
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tambah Aset Baru"
        description="Lengkapi informasi aset daerah untuk ditambahkan ke sistem"
        breadcrumbs={[
          { label: "Dashboard", href: "/cms" },
          { label: "Aset", href: "/cms/assets" },
          { label: "Tambah Baru" },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nama Aset</Label>
                  <Input placeholder="Masukkan nama aset" />
                </div>
                <div className="space-y-2">
                  <Label>Tipe Aset</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
                    <SelectContent>
                      {assetTypes.map((t) => (
                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Tersedia</SelectItem>
                      <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                      <SelectItem value="maintenance">Pemeliharaan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Singkat</Label>
                <Input placeholder="Deskripsi singkat aset" />
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Lengkap</Label>
                <Textarea placeholder="Deskripsi lengkap aset" rows={4} />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch />
                  <Label>Aset Unggulan</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch />
                  <Label>Aset Populer</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                {uploadedImages.map((url) => (
                  <div key={url} className="relative aspect-square rounded-lg bg-zinc-100 overflow-hidden group">
                    <img src={url} alt="" className="size-full object-cover" />
                    <button
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addImagePlaceholder}
                  className="aspect-square rounded-lg border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center gap-1 text-zinc-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors"
                >
                  <ImagePlus className="size-5" />
                  <span className="text-xs">Tambah</span>
                </button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lokasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Alamat</Label>
                <Input placeholder="Alamat lengkap" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Kota</Label>
                  <Input placeholder="Kota" />
                </div>
                <div className="space-y-2">
                  <Label>Provinsi</Label>
                  <Input placeholder="Provinsi" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input type="number" step="any" placeholder="-1.5899" />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input type="number" step="any" placeholder="103.6131" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fasilitas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {facilities.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => toggleFacility(f.id)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      selectedFacilities.includes(f.id)
                        ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
                    )}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Harga & Kapasitas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Harga</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Satuan Harga</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pilih satuan" /></SelectTrigger>
                  <SelectContent>
                    {priceUnits.map((u) => (
                      <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kapasitas</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Luas Area (m²)</Label>
                <Input type="number" placeholder="0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Jadwal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-700">{day}</span>
                  <div className="flex items-center gap-2">
                    <Input type="time" defaultValue="08:00" className="w-20 h-7 text-xs" />
                    <span className="text-xs text-zinc-400">-</span>
                    <Input type="time" defaultValue="17:00" className="w-20 h-7 text-xs" />
                    <Switch defaultChecked />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border bg-white p-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Kembali
        </Button>
        <Button>
          <Save className="size-4" />
          Simpan Aset
        </Button>
      </div>
    </div>
  )
}
