"use client"

import { useState } from "react"
import { facilities } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Wrench,
} from "lucide-react"

const iconOptions = [
  "ParkingCircle", "Wind", "Toilet", "Mosque", "UtensilsCrossed",
  "Wheelchair", "Music", "Projector", "Stage", "DoorOpen",
  "Wifi", "Camera", "Elevator", "SwimmingPool", "Tennis",
]

export default function FacilitiesPage() {
  const [editFacility, setEditFacility] = useState<(typeof facilities)[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const openAdd = () => {
    setEditFacility(null)
    setDialogOpen(true)
  }

  const openEdit = (f: (typeof facilities)[0]) => {
    setEditFacility(f)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fasilitas"
        description="Kelola fasilitas aset daerah"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Fasilitas" }]}
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">{facilities.length} fasilitas</p>
        <Button onClick={openAdd}>
          <Plus className="size-4" />
          Tambah Fasilitas
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {facilities.map((f) => {
          const LucideIcon = (LucideIcons as unknown as Record<string, typeof LucideIcons.Circle>)[f.icon] || LucideIcons.Circle
          return (
            <Card key={f.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100">
                      <LucideIcon className="size-4 text-zinc-600" />
                    </div>
                    <p className="text-sm font-medium text-zinc-900">{f.name}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
                      <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEdit(f)}><Edit className="size-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editFacility ? "Edit Fasilitas" : "Tambah Fasilitas"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Fasilitas</Label>
              <Input defaultValue={editFacility?.name || ""} placeholder="Nama fasilitas" />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select defaultValue={editFacility?.icon || ""}>
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
            <Button>{editFacility ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
