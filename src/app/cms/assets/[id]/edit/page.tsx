"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { assets as allAssets, categories, facilities } from "@/dummy"
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
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/utils/format"
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

export default function EditAssetPage() {
  const params = useParams()
  const router = useRouter()
  const id = typeof params.id === "string" ? params.id : ""

  const asset = allAssets.find((a) => a.id === id)

  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    asset?.facilities.map((f) => f.id) || []
  )
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    asset?.images.map((img) => img.url) || []
  )

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-zinc-500">Aset tidak ditemukan</p>
        <Button variant="outline" className="mt-4" onClick={() => router.push("/cms/assets")}>
          Kembali ke Aset
        </Button>
      </div>
    )
  }

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
        title={`Edit: ${asset.name}`}
        description="Ubah informasi aset daerah"
        breadcrumbs={[
          { label: "Dashboard", href: "/cms" },
          { label: "Aset", href: "/cms/assets" },
          { label: asset.name },
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
                  <Input defaultValue={asset.name} />
                </div>
                <div className="space-y-2">
                  <Label>Tipe Aset</Label>
                  <Select defaultValue={asset.type}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                  <Select defaultValue={asset.categoryId}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={asset.status}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
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
                <Input defaultValue={asset.shortDescription} />
              </div>

              <div className="space-y-2">
                <Label>Deskripsi Lengkap</Label>
                <Textarea defaultValue={asset.description} rows={4} />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={asset.isFeatured} />
                  <Label>Aset Unggulan</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={asset.isPopular} />
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
                <Input defaultValue={asset.address} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Kota</Label>
                  <Input defaultValue={asset.city} />
                </div>
                <div className="space-y-2">
                  <Label>Provinsi</Label>
                  <Input defaultValue={asset.province} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input type="number" step="any" defaultValue={asset.latitude} />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input type="number" step="any" defaultValue={asset.longitude} />
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
                <Input type="number" defaultValue={asset.price} />
              </div>
              <div className="space-y-2">
                <Label>Satuan Harga</Label>
                <Select defaultValue={asset.priceUnit}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {priceUnits.map((u) => (
                      <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Kapasitas</Label>
                <Input type="number" defaultValue={asset.capacity} />
              </div>
              <div className="space-y-2">
                <Label>Luas Area (m²)</Label>
                <Input type="number" defaultValue={asset.area} />
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
          Simpan Perubahan
        </Button>
      </div>
    </div>
  )
}
