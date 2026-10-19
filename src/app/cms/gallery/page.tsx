"use client"

import { useState, useMemo } from "react"
import { gallery as allGallery } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/utils/format"
import {
  Plus,
  Trash2,
  Download,
  ImageIcon,
  Check,
  X,
} from "lucide-react"

const categoryTabs = [
  { value: "all", label: "Semua" },
  { value: "Kegiatan", label: "Kegiatan" },
  { value: "Fasilitas", label: "Fasilitas" },
  { value: "Acara", label: "Acara" },
  { value: "Wisata", label: "Wisata" },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    if (activeTab === "all") return allGallery
    return allGallery.filter((g) => g.category === activeTab)
  }, [activeTab])

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) {
      setSelected([])
    } else {
      setSelected(filtered.map((g) => g.id))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Galeri"
        description="Kelola galeri gambar dan foto"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Galeri" }]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-zinc-100 p-1">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); setSelected([]) }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {selected.length > 0 && (
            <>
              <span className="text-xs text-zinc-500">{selected.length} dipilih</span>
              <Button variant="outline" size="sm">
                <Download className="size-4" />
                Unduh
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="size-4" />
                Hapus
              </Button>
            </>
          )}
          <Button>
            <Plus className="size-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleSelectAll}
          className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
        >
          {selected.length === filtered.length && filtered.length > 0 ? (
            <X className="size-3" />
          ) : (
            <Check className="size-3" />
          )}
          {selected.length === filtered.length && filtered.length > 0 ? "Batal" : "Pilih Semua"}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
          <ImageIcon className="size-12 mb-3 text-zinc-300" />
          <p className="text-sm">Belum ada galeri</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                selected.includes(item.id) ? "border-emerald-500" : "border-transparent"
              }`}
            >
              <img src={item.image} alt={item.title} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleSelect(item.id)}
                  className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
                    selected.includes(item.id)
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "bg-white/80 border-white text-zinc-600"
                  }`}
                >
                  {selected.includes(item.id) && <Check className="size-3" />}
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs font-medium text-white truncate">{item.title}</p>
                <p className="text-[10px] text-white/70">{formatDate(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
