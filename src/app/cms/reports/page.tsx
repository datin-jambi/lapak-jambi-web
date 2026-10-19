"use client"

import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { formatDate } from "@/utils/format"
import {
  BarChart3,
  CalendarCheck,
  TrendingUp,
  Users,
  Download,
  FileText,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react"

const reportTypes = [
  {
    id: "revenue",
    label: "Laporan Pendapatan",
    description: "Ringkasan pendapatan dari pemesanan aset",
    icon: TrendingUp,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "bookings",
    label: "Laporan Pemesanan",
    description: "Detail pemesanan aset berdasarkan periode",
    icon: CalendarCheck,
    color: "text-primary bg-primary/5",
  },
  {
    id: "users",
    label: "Laporan Pengguna",
    description: "Data pengguna dan aktivitas mereka",
    icon: Users,
    color: "text-violet-600 bg-violet-50",
  },
  {
    id: "assets",
    label: "Laporan Aset",
    description: "Status dan utilisasi aset daerah",
    icon: BarChart3,
    color: "text-amber-600 bg-amber-50",
  },
]

const recentReports = [
  {
    id: "rpt-001",
    name: "Laporan Pendapatan Bulanan",
    type: "Pendapatan",
    period: "Juni 2026",
    generatedAt: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "rpt-002",
    name: "Laporan Pemesanan Q2 2026",
    type: "Pemesanan",
    period: "Q2 2026",
    generatedAt: "2026-07-01T09:00:00.000Z",
  },
  {
    id: "rpt-003",
    name: "Laporan Pengguna Aktif",
    type: "Pengguna",
    period: "Juni 2026",
    generatedAt: "2026-07-02T10:00:00.000Z",
  },
  {
    id: "rpt-004",
    name: "Laporan Utilisasi Aset",
    type: "Aset",
    period: "Semester 1 2026",
    generatedAt: "2026-07-05T11:00:00.000Z",
  },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState("revenue")

  return (
    <div className="space-y-6">
      <PageHeader
        title="Laporan"
        description="Hasilkan dan unduh laporan pengelolaan aset"
        breadcrumbs={[{ label: "Dashboard", href: "/cms" }, { label: "Laporan" }]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((r) => {
          const Icon = r.icon
          return (
            <Card
              key={r.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedType === r.id ? "ring-2 ring-emerald-400" : ""
              }`}
              onClick={() => setSelectedType(r.id)}
            >
              <CardContent className="p-4">
                <div className={cn("flex size-10 items-center justify-center rounded-lg", r.color)}>
                  <Icon className="size-5" />
                </div>
                <p className="mt-3 text-sm font-semibold text-zinc-900">{r.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{r.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate Laporan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Tipe Laporan</label>
              <Select value={selectedType} onValueChange={(v) => { if (v) setSelectedType(v) }}>
                <SelectTrigger className="h-9 w-44 rounded-lg border-zinc-200">
                  <SelectValue placeholder="Pilih Tipe Laporan" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Dari Tanggal</label>
              <input
                type="date"
                className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700">Sampai Tanggal</label>
              <input
                type="date"
                className="h-9 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-emerald-400"
              />
            </div>
            <Button>Generate Laporan</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Download Laporan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <FileText className="size-8 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900">Laporan {reportTypes.find((r) => r.id === selectedType)?.label}</p>
                  <p className="text-xs text-zinc-500">Periode: Pilih tanggal terlebih dahulu</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="size-4" />
                  Excel
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="size-4" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Laporan Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentReports.map((r) => (
                <div key={r.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="secondary" className="text-[10px]">{r.type}</Badge>
                      <span className="text-xs text-zinc-500">{r.period}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-zinc-500">{formatDate(r.generatedAt)}</p>
                    <Button variant="ghost" size="xs">
                      <Download className="size-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: (string | boolean | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
