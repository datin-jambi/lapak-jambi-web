"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { faq as allFaq } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
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
  Search,
} from "lucide-react"

const faqCategories = [...new Set(allFaq.map((f) => f.category))]

export default function FAQPage() {
  const [search, setSearch] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editItem, setEditItem] = useState<(typeof allFaq)[0] | null>(null)

  const grouped = useMemo(() => {
    let filtered = [...allFaq]
    if (search) {
      const q = search.toLowerCase()
      filtered = filtered.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      )
    }
    const groups: Record<string, typeof filtered> = {}
    filtered.forEach((f) => {
      if (!groups[f.category]) groups[f.category] = []
      groups[f.category].push(f)
    })
    return groups
  }, [search])

  const openAdd = () => {
    setEditItem(null)
    setDialogOpen(true)
  }

  const openEdit = (item: (typeof allFaq)[0]) => {
    setEditItem(item)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="FAQ"
        description="Kelola pertanyaan yang sering diajukan"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "FAQ" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Cari FAQ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-400"
          />
        </div>

        <Button className="ml-auto" onClick={openAdd}>
          <Plus className="size-4" />
          Tambah FAQ
        </Button>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-semibold text-zinc-700 px-1">{category}</h3>
          <div className="rounded-xl border bg-card divide-y">
            {items.map((item) => (
              <div key={item.id} className="group flex items-start gap-2 px-4 py-1">
                <div className="mt-2.5 cursor-grab text-zinc-300 hover:text-zinc-500">
                  <GripVertical className="size-4" />
                </div>
                <Accordion className="flex-1">
                  <AccordionItem value={item.id}>
                    <AccordionTrigger className="text-sm font-medium text-zinc-900">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm text-zinc-600 flex-1">{item.answer}</p>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="text-xs text-zinc-400">{item.isPublished ? "Terbit" : "Draft"}</span>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
                              <MoreHorizontal className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openEdit(item)}><Edit className="size-4" /> Edit</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive"><Trash2 className="size-4" /> Hapus</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      ))}

      {Object.keys(grouped).length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
          <p className="text-sm">Tidak ada FAQ</p>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editItem ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select defaultValue={editItem?.category || ""}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  {faqCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pertanyaan</Label>
              <Input defaultValue={editItem?.question || ""} placeholder="Pertanyaan" />
            </div>
            <div className="space-y-2">
              <Label>Jawaban</Label>
              <Textarea defaultValue={editItem?.answer || ""} placeholder="Jawaban" rows={4} />
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked={editItem?.isPublished ?? true} />
              <Label>Dipublikasikan</Label>
            </div>
          </div>
          <DialogFooter showCloseButton>
            <Button>{editItem ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
