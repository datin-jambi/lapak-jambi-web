"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const contactInfo = [
  {
    icon: Phone,
    label: "Telepon",
    value: "(0741) 1234567",
    desc: "Senin - Jumat, 08.00 - 16.00 WIB",
  },
  {
    icon: Mail,
    label: "Email",
    value: "cs.lapakjambi@bpkpd.jambiprov.go.id",
    desc: "Kami akan merespon dalam 1x24 jam",
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: "Jl. Jenderal Gatot Subroto No. 17",
    desc: "Kota Jambi, 36123",
  },
  {
    icon: Clock,
    label: "Jam Kerja",
    value: "Senin - Kamis: 08.00 - 16.00",
    desc: "Jumat: 08.00 - 16.30",
  },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Hubungi Kami"
            description="Punya pertanyaan atau butuh bantuan? Hubungi tim Lapak Jambi melalui berbagai saluran yang tersedia."
            breadcrumbs={[{ label: "Kontak" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
            {contactInfo.map((info) => (
              <GlassCard key={info.label} className="p-6 text-center" hover>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm">
                  <info.icon className="size-7" />
                </div>
                <h3 className="mb-1.5 font-semibold text-foreground">{info.label}</h3>
                <p className="text-sm font-medium text-foreground">{info.value}</p>
                <p className="mt-1.5 text-xs text-muted-foreground">{info.desc}</p>
              </GlassCard>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionTitle
                title="Kirim Pesan"
                subtitle="Isi form di bawah ini untuk mengirimkan pesan atau pertanyaan kepada tim Lapak Jambi."
              />
              {submitted ? (
                <GlassCard className="mt-6 p-8 text-center">
                  <CheckCircle className="mx-auto mb-4 size-16 text-emerald-500" />
                  <h3 className="mb-2 text-lg font-semibold">Pesan Terkirim!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Terima kasih, pesan Anda telah kami terima. Tim kami akan menghubungi Anda dalam waktu 1x24 jam.
                  </p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }) }}>
                    Kirim Pesan Lain
                  </Button>
                </GlassCard>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Masukkan nama Anda"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="Masukkan email Anda"
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="Masukkan nomor telepon"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subjek</Label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Subjek pesan"
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={5}
                      required
                      className="rounded-xl resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-xl" size="lg">
                    <Send className="mr-2 size-4" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <GlassCard className="p-6">
                <h3 className="mb-4 font-semibold">Peta Lokasi</h3>
                <div className="h-80 rounded-xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 size-10 text-muted-foreground/40" />
                    Peta Lokasi BPKPD Provinsi Jambi
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="mb-4 font-semibold">Informasi Lainnya</h3>
                <div className="space-y-4 text-sm">
                  <p className="text-muted-foreground leading-relaxed">
                    Untuk pertanyaan terkait pemesanan aset, silakan menghubungi customer service kami pada jam kerja.
                    Untuk pengaduan dan laporan, dapat melalui aplikasi LAPOR! atau datang langsung ke kantor BPKPD Provinsi Jambi.
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-4" />
                    <span>Senin - Kamis: 08.00 - 16.00 | Jumat: 08.00 - 16.30</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>BPKPD Provinsi Jambi, Lt. 1, Pusat Layanan Terpadu</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
