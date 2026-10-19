"use client"

import Link from "next/link"
import { assets, bookings, users } from "@/dummy"
import { PageHeader } from "@/components/common/PageHeader"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatCurrency, formatDate } from "@/utils/format"
import {
  Building2,
  CalendarCheck,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
} from "lucide-react"

const stats = [
  {
    label: "Total Aset",
    value: assets.length,
    change: "+12%",
    trend: "up",
    icon: Building2,
    color: "text-primary bg-primary/5",
  },
  {
    label: "Booking Aktif",
    value: bookings.filter((b) => b.status === "confirmed" || b.status === "pending").length,
    change: "+8%",
    trend: "up",
    icon: CalendarCheck,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Pendapatan",
    value: formatCurrency(bookings.reduce((sum, b) => sum + b.totalPrice, 0)),
    change: "+23%",
    trend: "up",
    icon: TrendingUp,
    color: "text-violet-600 bg-violet-50",
  },
  {
    label: "Pengguna",
    value: users.length,
    change: "+5%",
    trend: "up",
    icon: Users,
    color: "text-amber-600 bg-amber-50",
  },
]

const monthlyRevenue = [45, 52, 38, 65, 58, 72, 68, 85, 78, 92, 88, 105]
const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]

const recentTransactions = bookings.slice(0, 5).map((b) => ({
  id: b.id,
  asset: b.assetName,
  user: users.find((u) => u.id === b.userId)?.name || "-",
  amount: formatCurrency(b.totalPrice),
  status: b.paymentStatus,
  date: formatDate(b.createdAt),
}))

const popularAssets = assets
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 5)
  .map((a) => ({
    id: a.id,
    name: a.name,
    category: a.categoryName,
    bookingsCount: bookings.filter((b) => b.assetId === a.id).length,
    revenue: formatCurrency(bookings.filter((b) => b.assetId === a.id).reduce((s, b) => s + b.totalPrice, 0)),
  }))

export default function CmsDashboardPage() {
  const maxRevenue = Math.max(...monthlyRevenue)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan pengelolaan aset daerah Provinsi Jambi"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className={cn("flex size-10 items-center justify-center rounded-lg", stat.color)}>
                  <stat.icon className="size-5" />
                </div>
                <span className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                )}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="mt-0.5 text-xl font-semibold text-zinc-900">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ringkasan Pendapatan</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1.5 h-40">
              {monthlyRevenue.map((value, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <div
                    className="w-full rounded-t-sm bg-emerald-400 transition-all hover:opacity-80"
                    style={{ height: `${(value / maxRevenue) * 100}%` }}
                  />
                  <span className="text-[10px] text-zinc-400">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Aset Populer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularAssets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{asset.name}</p>
                    <p className="text-xs text-zinc-500">{asset.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900">{asset.bookingsCount} booking</p>
                    <p className="text-xs text-zinc-500">{asset.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaksi Terbaru</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/cms/transactions" />}>
                Lihat Semua <ArrowRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {recentTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{t.asset}</p>
                    <p className="text-xs text-zinc-500">{t.user} &middot; {t.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900">{t.amount}</p>
                    <StatusBadge status={t.status} type="payment" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Booking Terbaru</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/cms/bookings" />}>
                Lihat Semua <ArrowRight className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {bookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">{b.assetName}</p>
                    <p className="text-xs text-zinc-500">{formatDate(b.bookingDate)} &middot; {b.timeSlot.start} - {b.timeSlot.end}</p>
                  </div>
                  <StatusBadge status={b.status} type="booking" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
