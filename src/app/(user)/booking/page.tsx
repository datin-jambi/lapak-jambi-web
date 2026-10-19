"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  CalendarDays,
  Clock,
  CreditCard,
  CheckCircle2,
  MapPin,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/utils/format"
import { assets } from "@/dummy/assets"
import type { Asset, TimeSlot } from "@/types"

const steps = [
  { id: 1, label: "Pilih Aset", icon: Building2 },
  { id: 2, label: "Pilih Tanggal", icon: CalendarDays },
  { id: 3, label: "Pilih Waktu", icon: Clock },
  { id: 4, label: "Ringkasan", icon: CheckCircle2 },
  { id: 5, label: "Pembayaran", icon: CreditCard },
]

const paymentMethods = [
  { id: "bjb", name: "Bank Jambi", type: "bank_transfer", icon: "/images/bank-jambi.png" },
  { id: "mandiri", name: "Mandiri", type: "bank_transfer", icon: "/images/mandiri.png" },
  { id: "bni", name: "BNI", type: "bank_transfer", icon: "/images/bni.png" },
  { id: "btn", name: "BTN", type: "bank_transfer", icon: "/images/btn.png" },
  { id: "gopay", name: "GoPay", type: "e_wallet", icon: "/images/gopay.png" },
  { id: "ovo", name: "OVO", type: "e_wallet", icon: "/images/ovo.png" },
]

const dummyTimeSlots: TimeSlot[] = [
  { id: "ts-morning", start: "08:00", end: "12:00", isAvailable: true, price: 0 },
  { id: "ts-afternoon", start: "13:00", end: "17:00", isAvailable: true, price: 0 },
  { id: "ts-full", start: "08:00", end: "17:00", isAvailable: true, price: 0 },
]

export default function NewBookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingId, setBookingId] = useState("")

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  function getMinDate() {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  function getMaxDate() {
    const max = new Date()
    max.setFullYear(max.getFullYear() + 1)
    return max.toISOString().split("T")[0]
  }

  function canGoNext(): boolean {
    switch (step) {
      case 1: return !!selectedAsset
      case 2: return !!selectedDate
      case 3: return !!selectedTimeSlot
      case 4: return true
      case 5: return !!selectedPayment
      default: return false
    }
  }

  function handleNext() {
    if (step === 5 && selectedPayment) {
      setBookingId(`LJ-${Date.now().toString(36).toUpperCase()}`)
      setBookingComplete(true)
      return
    }
    if (canGoNext()) setStep((s) => Math.min(s + 1, 6))
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1)
  }

  function getTotalPrice(): number {
    if (!selectedAsset) return 0
    if (selectedAsset.priceUnit === "per orang" || selectedAsset.priceUnit === "per jam") {
      return selectedAsset.price * quantity
    }
    return selectedAsset.price
  }

  if (bookingComplete) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <Card className="text-center">
          <CardContent className="py-16">
            <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pemesanan Berhasil!</h1>
            <p className="text-muted-foreground mb-6">
              Pemesanan Anda telah berhasil dibuat dan sedang diproses.
            </p>
            <div className="mx-auto mb-8 inline-block rounded-lg bg-muted px-6 py-3">
              <p className="text-sm text-muted-foreground">ID Pemesanan</p>
              <p className="text-lg font-bold tracking-wider">{bookingId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => router.push(`/booking/${bookingId}`)} className="rounded-xl">
                Lihat Detail Pemesanan
              </Button>
              <Button variant="outline" onClick={() => router.push("/my-bookings")} className="rounded-xl">
                Ke Daftar Pemesanan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                    step > s.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : step === s.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {step > s.id ? <Check className="size-5" /> : <s.icon className="size-5" />}
                </div>
                <span
                  className={cn(
                    "mt-2 hidden text-xs font-medium sm:block",
                    step >= s.id ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 w-8 sm:w-16 md:w-24",
                    step > s.id ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          {/* Step 1: Select Asset */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Pilih Aset</h2>
                <p className="text-sm text-muted-foreground">Cari dan pilih aset yang ingin Anda pesan.</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Cari aset..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 max-h-96 overflow-y-auto pr-2">
                {filteredAssets.map((asset) => (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border-2 text-left transition-all",
                      selectedAsset?.id === asset.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="relative h-32 w-full">
                      <Image
                        src={asset.images[0]?.url || "/placeholder.svg"}
                        alt={asset.name}
                        fill
                        className="object-cover"
                      />
                      {selectedAsset?.id === asset.id && (
                        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="size-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{asset.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {asset.city}
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{asset.categoryName}</span>
                        <span className="text-sm font-semibold text-primary">{formatCurrency(asset.price)}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Date */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Pilih Tanggal</h2>
                <p className="text-sm text-muted-foreground">
                  Pilih tanggal pemesanan untuk {selectedAsset?.name}.
                </p>
              </div>
              {selectedAsset && (
                <Card className="bg-muted/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={selectedAsset.images[0]?.url || "/placeholder.svg"}
                        alt={selectedAsset.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{selectedAsset.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(selectedAsset.price)} / {selectedAsset.priceUnit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              <div className="space-y-2">
                <Label htmlFor="booking-date">Tanggal Pemesanan</Label>
                <Input
                  id="booking-date"
                  type="date"
                  min={getMinDate()}
                  max={getMaxDate()}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-12 text-base"
                />
              </div>
            </div>
          )}

          {/* Step 3: Choose Time Slot */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Pilih Waktu</h2>
                <p className="text-sm text-muted-foreground">Pilih sesi waktu pemesanan.</p>
              </div>
              {selectedDate && (
                <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm">
                  <CalendarDays className="mr-2 inline size-4" />
                  {new Date(selectedDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
              <div className="grid gap-3 sm:grid-cols-3">
                {dummyTimeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedTimeSlot(slot)}
                    disabled={!slot.isAvailable}
                    className={cn(
                      "rounded-xl border-2 p-4 text-center transition-all",
                      selectedTimeSlot?.id === slot.id
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                        : "border-border hover:border-primary/50",
                      !slot.isAvailable && "cursor-not-allowed opacity-50"
                    )}
                  >
                    <Clock className="mx-auto mb-2 size-5 text-muted-foreground" />
                    <p className="font-medium">
                      {slot.start} - {slot.end}
                    </p>
                    <p className="text-xs text-muted-foreground">WIB</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Ringkasan Pemesanan</h2>
                <p className="text-sm text-muted-foreground">Periksa kembali detail pemesanan Anda.</p>
              </div>

              {selectedAsset && (
                <Card className="bg-muted/50">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={selectedAsset.images[0]?.url || "/placeholder.svg"}
                        alt={selectedAsset.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">{selectedAsset.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedAsset.categoryName}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" />
                        {selectedAsset.city}, {selectedAsset.province}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Tanggal</p>
                  <p className="font-medium">
                    {selectedDate
                      ? new Date(selectedDate).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-xs text-muted-foreground mb-1">Waktu</p>
                  <p className="font-medium">
                    {selectedTimeSlot ? `${selectedTimeSlot.start} - ${selectedTimeSlot.end} WIB` : "-"}
                  </p>
                </div>
              </div>

              {(selectedAsset?.priceUnit === "per orang" || selectedAsset?.priceUnit === "per jam") && (
                <div className="space-y-2">
                  <Label htmlFor="quantity">Jumlah</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-xl"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notes">Catatan (Opsional)</Label>
                <Input
                  id="notes"
                  placeholder="Contoh: perlu dekorasi tambahan"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Harga {selectedAsset?.name}
                  </span>
                  <span>
                    {selectedAsset ? formatCurrency(selectedAsset.price) : "-"}
                  </span>
                </div>
                {(selectedAsset?.priceUnit === "per orang" || selectedAsset?.priceUnit === "per jam") && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Jumlah</span>
                    <span>{quantity}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(getTotalPrice())}</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Payment */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Pilih Pembayaran</h2>
                <p className="text-sm text-muted-foreground">Pilih metode pembayaran yang tersedia.</p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Total Pembayaran</span>
                  <span className="font-semibold text-lg text-primary">{formatCurrency(getTotalPrice())}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Transfer Bank</p>
                {paymentMethods
                  .filter((m) => m.type === "bank_transfer")
                  .map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all",
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <Building2 className="size-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">Transfer Bank</p>
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="size-5 text-primary" />
                      )}
                    </button>
                  ))}

                <p className="text-sm font-medium text-muted-foreground mt-6">E-Wallet</p>
                {paymentMethods
                  .filter((m) => m.type === "e_wallet")
                  .map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={cn(
                        "flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all",
                        selectedPayment === method.id
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                        <CreditCard className="size-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">E-Wallet</p>
                      </div>
                      {selectedPayment === method.id && (
                        <Check className="size-5 text-primary" />
                      )}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="rounded-xl"
            >
              <ChevronLeft className="mr-1 size-4" />
              Kembali
            </Button>
            <div className="text-sm text-muted-foreground">
              Langkah {step} dari 5
            </div>
            <Button
              onClick={handleNext}
              disabled={!canGoNext()}
              className="rounded-xl"
            >
              {step === 5 ? (
                <>
                  <CreditCard className="mr-1 size-4" />
                  Konfirmasi Pembayaran
                </>
              ) : (
                <>
                  Lanjutkan
                  <ChevronRight className="ml-1 size-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
