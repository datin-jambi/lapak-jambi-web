"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, XCircle, Eye, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/common/PageHeader"
import { GlassCard } from "@/components/common/GlassCard"
import { StatusBadge } from "@/components/common/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/utils/format"
import { bookings } from "@/dummy/booking"

const tabs = [
  { key: "upcoming", label: "Akan Datang" },
  { key: "history", label: "Riwayat" },
  { key: "cancelled", label: "Dibatalkan" },
] as const

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<string>("upcoming")

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "upcoming") return b.status === "confirmed" || b.status === "pending"
    if (activeTab === "history") return b.status === "completed"
    if (activeTab === "cancelled") return b.status === "cancelled"
    return true
  })

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Pemesanan Saya"
            description="Kelola dan pantau status pemesanan aset Anda."
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "rounded-xl px-5 py-2.5 text-sm font-medium transition-colors",
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <GlassCard className="p-12 text-center">
                <Calendar className="mx-auto mb-4 size-12 text-muted-foreground/40" />
                <h3 className="text-lg font-semibold mb-2">Tidak Ada Pemesanan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {activeTab === "upcoming"
                    ? "Anda belum memiliki pemesanan yang akan datang."
                    : activeTab === "history"
                    ? "Belum ada riwayat pemesanan."
                    : "Tidak ada pemesanan yang dibatalkan."}
                </p>
                <Button render={<Link href="/aset" />}>Jelajahi Aset</Button>
              </GlassCard>
            ) : (
              filteredBookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-40 w-full sm:h-auto sm:w-48 shrink-0">
                      <Image src={booking.assetImage} alt={booking.assetName} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{booking.assetName}</h3>
                          <p className="text-sm text-muted-foreground">ID: {booking.id}</p>
                        </div>
                        <StatusBadge status={booking.status} type="booking" />
                      </div>
                      <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 mt-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="size-4" />
                          {new Date(booking.bookingDate).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="size-4" />
                          {booking.timeSlot.start} - {booking.timeSlot.end} WIB
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">Total Pembayaran: </span>
                          <span className="font-semibold text-primary">{formatCurrency(booking.totalPrice)}</span>
                          <StatusBadge status={booking.paymentStatus} type="payment" className="ml-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="rounded-xl" render={<Link href={`/booking/${booking.id}`} />}>
                            <Eye className="mr-1 size-3.5" />
                            Detail
                          </Button>
                          {(booking.status === "pending" || booking.status === "confirmed") && (
                            <Button variant="outline" size="sm" className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10">
                              <XCircle className="mr-1 size-3.5" />
                              Batalkan
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
