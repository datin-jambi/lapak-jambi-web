"use client"

import { useState } from "react"
import { banners } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  GripVertical,
  ImageIcon,
} from "lucide-react"

export default function BannerPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editBanner, setEditBanner] = useState<(typeof banners)[0] | null>(null)

  const openAdd = () => {
    setEditBanner(null)
    setDialogOpen(true)
  }

  const openEdit = (b: (typeof banners)[0]) => {
    setEditBanner(b)
    setDialogOpen(true)
  }

  const sortedBanners = [...banners].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banner"
        description="Kelola banner halaman utama"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Banner" }]}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{banners.length} banner</p>
        <Button onClick={openAdd}>
          <Plus className="size-4" />
          Tambah Banner
        </Button>
      </div>

      <div className="space-y-3">
        {sortedBanners.map((banner, index) => (
          <Card key={banner.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 cursor-grab text-zinc-300 hover:text-zinc-500">
                  <GripVertical className="size-4" />
                </div>
                <div className="size-20 rounded-lg bg-zinc-100 overflow-hidden shrink-0">
                  <img src={banner.image} alt={banner.title} className="size-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{banner.title}</p>
                      <p className="text-xs text-zinc-500">{banner.subtitle}</p>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{banner.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Switch defaultChecked={banner.isActive} />
                      <DropdownMenu>
                        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                          <MoreHorizontal className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(banner)}><Edit className="size-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-zinc-400 bg-zinc-100 rounded px-1.5 py-0.5">
                      Urutan: {banner.order}
                    </span>
                    <span className="text-[10px] text-zinc-400">
                      {banner.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editBanner ? "Edit Banner" : "Tambah Banner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input defaultValue={editBanner?.title || ""} placeholder="Judul banner" />
            </div>
            <div className="space-y-2">
              <Label>Subjudul</Label>
              <Input defaultValue={editBanner?.subtitle || ""} placeholder="Subjudul banner" />
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea defaultValue={editBanner?.description || ""} placeholder="Deskripsi banner" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Link</Label>
              <Input defaultValue={editBanner?.link || ""} placeholder="/assets" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input type="number" defaultValue={editBanner?.order || banners.length + 1} />
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <div className="flex items-center gap-2 h-8">
                  <Switch defaultChecked={editBanner?.isActive ?? true} />
                  <Label>Aktif</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Gambar</Label>
              <div className="flex items-center gap-3">
                <div className="size-16 rounded-lg bg-zinc-100 overflow-hidden">
                  {editBanner?.image ? (
                    <img src={editBanner.image} alt="" className="size-full object-cover" />
                  ) : (
                    <div className="flex size-full items-center justify-center"><ImageIcon className="size-5 text-zinc-300" /></div>
                  )}
                </div>
                <Button variant="outline" size="sm">Upload Gambar</Button>
              </div>
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>{editBanner ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
