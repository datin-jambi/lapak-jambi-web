"use client"

import { useState } from "react"
import { categories, assets } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  FolderTree,
} from "lucide-react"

const iconOptions = [
  "Building", "Building2", "Dumbbell", "Mountain", "Ticket",
  "Landmark", "Hands", "Tool", "Car", "Bus", "TreePine",
  "Palmtree", "UtensilsCrossed", "Music", "Camera",
]

export default function CategoriesPage() {
  const [editCategory, setEditCategory] = useState<(typeof categories)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openAdd = () => {
    setEditCategory(null)
    setDialogOpen(true)
  }

  const openEdit = (cat: (typeof categories)[0]) => {
    setEditCategory(cat)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kategori Aset"
        description="Kelola kategori aset daerah"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Kategori" }]}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{categories.length} kategori</p>
        <Button onClick={openAdd}>
          <Plus className="size-4" />
          Tambah Kategori
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => {
          const LucideIcon = (LucideIcons as unknown as Record<string, typeof LucideIcons.Folder>)[cat.icon] || LucideIcons.Folder
          return (
            <Card key={cat.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100">
                      <LucideIcon className="size-5 text-zinc-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">{cat.name}</p>
                      <p className="text-xs text-zinc-500">{cat.slug}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(cat)}><Edit className="size-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="mt-2 text-xs text-zinc-500 line-clamp-2">{cat.description}</p>
                <div className="mt-3 flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-zinc-500">{cat.assetCount} aset</span>
                  <div className="size-6 rounded bg-zinc-100 overflow-hidden">
                    <img src={cat.image} alt="" className="size-full object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editCategory ? "Edit Kategori" : "Tambah Kategori"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Nama Kategori</Label>
                <Input defaultValue={editCategory?.name || ""} placeholder="Nama kategori" />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input defaultValue={editCategory?.slug || ""} placeholder="nama-kategori" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Deskripsi</Label>
              <Textarea defaultValue={editCategory?.description || ""} placeholder="Deskripsi kategori" rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select defaultValue={editCategory?.icon || ""}>
                <SelectTrigger><SelectValue placeholder="Pilih icon" /></SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>{editCategory ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
