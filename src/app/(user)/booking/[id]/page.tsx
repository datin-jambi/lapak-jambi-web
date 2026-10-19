"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  Building2,
  XCircle,
  CheckCircle2,
  Clock4,
  AlertCircle,
  FileText,
  ChevronRight,
  Copy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/common/StatusBadge"
import { GlassCard } from "@/components/common/GlassCard"
import { formatCurrency } from "@/utils/format"
import { bookings } from "@/dummy/booking"
import { assets } from "@/dummy/assets"
import { cn } from "@/lib/utils"

const timelineSteps = [
  { key: "pending", label: "Pemesanan Dibuat", icon: FileText },
  { key: "confirmed", label: "Dikonfirmasi", icon: CheckCircle2 },
  { key: "payment", label: "Pembayaran", icon: CreditCard },
  { key: "completed", label: "Selesai", icon: CheckCircle2 },
]

const statusOrder: Record<string, number> = {
  pending: 0,
  confirmed: 1,
  cancelled: -1,
  completed: 2,
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const booking = bookings.find((b) => b.id === params.id)
  const asset = assets.find((a) => a.id === booking?.assetId)

  if (!booking || !asset) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <AlertCircle className="mx-auto mb-4 size-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Pemesanan Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-6">Pemesanan dengan ID tersebut tidak ditemukan.</p>
        <Button onClick={() => router.push("/my-bookings")} className="rounded-xl">
          Kembali ke Daftar Pemesanan
        </Button>
      </div>
    )
  }

  const currentStepIndex = statusOrder[booking.status] ?? -1

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Kembali
      </button>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">Detail Pemesanan</h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <span>ID: {booking.id}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(booking.id)}
                  className="text-primary hover:text-primary/80"
                >
                  <Copy className="size-3.5" />
                </button>
              </div>
            </div>
            <StatusBadge status={booking.status} type="booking" />
          </div>

          {/* Timeline */}
          <GlassCard>
            <h3 className="font-semibold mb-4">Status Pemesanan</h3>
            <div className="space-y-0">
              {timelineSteps.map((step, i) => {
                const stepStatus = step.key === "payment" ? booking.paymentStatus : step.key
                const isActive = currentStepIndex >= i && booking.status !== "cancelled"
                const isCancelled = booking.status === "cancelled"

                return (
                  <div key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < timelineSteps.length - 1 && (
                      <div
                        className={cn(
                          "absolute left-[15px] top-8 w-0.5 h-full -translate-x-1/2",
                          isActive && !isCancelled ? "bg-primary" : "bg-muted-foreground/20"
                        )}
                      />
                    )}
                    <div
                      className={cn(
                        "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full",
                        isActive && !isCancelled
                          ? "bg-primary text-primary-foreground"
                          : isCancelled && i === 0
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <step.icon className="size-4" />
                    </div>
                    <div className="pt-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isActive && !isCancelled
                            ? "text-foreground"
                            : isCancelled && i === 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                        )}
                      >
                        {step.key === "payment"
                          ? booking.paymentStatus === "paid"
                            ? "Pembayaran Lunas"
                            : booking.paymentStatus === "refunded"
                            ? "Dana Dikembalikan"
                            : "Menunggu Pembayaran"
                          : step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {booking.status === "cancelled" && i === 0
                          ? `Dibatalkan pada ${new Date(booking.updatedAt).toLocaleDateString("id-ID")}`
                          : i <= currentStepIndex
                          ? `Selesai`
                          : "Belum tersedia"}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>

          {/* Asset Info */}
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="relative h-48 w-full sm:h-auto sm:w-56 shrink-0">
                  <Image
                    src={booking.assetImage}
                    alt={booking.assetName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-6">
                  <h3 className="text-lg font-semibold">{booking.assetName}</h3>
                  <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {asset.location}, {asset.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4" />
                      {asset.categoryName}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-fit rounded-xl"
                    render={<Link href={`/aset/${asset.slug}`} />}
                  >
                    Lihat Detail Aset
                    <ChevronRight className="ml-1 size-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <GlassCard>
            <h3 className="font-semibold mb-4">Jadwal Pemesanan</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tanggal</p>
                  <p className="font-medium">
                    {new Date(booking.bookingDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Waktu</p>
                  <p className="font-medium">
                    {booking.timeSlot.start} - {booking.timeSlot.end} WIB
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Notes */}
          {booking.notes && (
            <GlassCard>
              <h3 className="font-semibold mb-2">Catatan</h3>
              <p className="text-sm text-muted-foreground">{booking.notes}</p>
            </GlassCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Breakdown */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Rincian Harga</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {booking.assetName} x{booking.quantity}
                  </span>
                  <span>{formatCurrency(booking.totalPrice)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(booking.totalPrice)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Informasi Pembayaran</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <StatusBadge status={booking.paymentStatus} type="payment" />
                </div>
                {booking.paymentMethod && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Metode</span>
                    <span className="font-medium">{booking.paymentMethod}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tanggal Pemesanan</span>
                  <span>
                    {new Date(booking.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="space-y-3">
            {(booking.status === "pending" || booking.status === "confirmed") && (
              <Button variant="destructive" className="w-full rounded-xl">
                <XCircle className="mr-2 size-4" />
                Batalkan Pemesanan
              </Button>
            )}
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => router.push("/my-bookings")}
            >
              <ArrowLeft className="mr-2 size-4" />
              Kembali ke Daftar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
