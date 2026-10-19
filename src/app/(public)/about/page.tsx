import Link from "next/link"
import { Building2, Eye, Target, CheckCircle, Users, Award, ArrowRight } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"

const milestones = [
  { year: "2020", title: "Inisiasi Program", desc: "BPKPD mulai merencanakan sistem digitalisasi pengelolaan aset daerah." },
  { year: "2021", title: "Pengembangan Prototipe", desc: "Pengembangan awal aplikasi Lapak Jambi untuk inventarisasi aset." },
  { year: "2022", title: "Uji Coba Terbatas", desc: "Uji coba sistem pada beberapa OPD di lingkungan Pemprov Jambi." },
  { year: "2023", title: "Peluncuran Publik", desc: "Lapak Jambi resmi diluncurkan untuk masyarakat umum." },
  { year: "2024", title: "Pengembangan Fitur", desc: "Penambahan fitur pemesanan dan pembayaran online." },
  { year: "2025", title: "Integrasi Layanan", desc: "Integrasi dengan seluruh OPD dan layanan publik daerah." },
]

const teamMembers = [
  { name: "Budi Hartono", role: "Kepala BPKPD", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi%20Hartono" },
  { name: "Siti Rahmawati", role: "Koordinator Teknis", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti%20Rahmawati" },
  { name: "Agus Wijaya", role: "Pengembang Sistem", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Agus%20Wijaya" },
  { name: "Dwi Lestari", role: "Manajer Layanan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dwi%20Lestari" },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Tentang Lapak Jambi"
            description="Platform digital resmi Pemerintah Provinsi Jambi untuk pengelolaan dan pemesanan aset daerah secara transparan dan efisien."
            breadcrumbs={[{ label: "Tentang Kami" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="relative -mt-10 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <GlassCard className="p-8">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/5 text-primary">
              <Eye className="size-7" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Visi</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Menjadi platform digital terdepan dalam pengelolaan aset daerah yang transparan, akuntabel, dan berorientasi pada pelayanan publik terbaik di Indonesia.
            </p>
          </GlassCard>
          <GlassCard className="p-8">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Target className="size-7" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Misi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                Digitalisasi seluruh proses pengelolaan aset daerah
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                Meningkatkan transparansi dan akuntabilitas aset publik
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                Memberikan kemudahan akses layanan bagi masyarakat
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                Optimalisasi pemanfaatan aset daerah untuk kesejahteraan
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Tentang Aplikasi Lapak Jambi"
            subtitle="Lapak Jambi adalah platform digital yang dikembangkan oleh BPKPD Provinsi Jambi"
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <GlassCard className="p-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <Building2 className="size-6" />
              </div>
              <h3 className="mb-1 font-semibold">Kelola Aset</h3>
              <p className="text-sm text-muted-foreground">Manajemen inventaris aset daerah secara digital dan terpusat</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <Users className="size-6" />
              </div>
              <h3 className="mb-1 font-semibold">Layanan Masyarakat</h3>
              <p className="text-sm text-muted-foreground">Kemudahan akses layanan publik bagi seluruh masyarakat Jambi</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <Award className="size-6" />
              </div>
              <h3 className="mb-1 font-semibold">Transparansi</h3>
              <p className="text-sm text-muted-foreground">Pengelolaan aset yang transparan dan dapat dipantau secara real-time</p>
            </GlassCard>
            <GlassCard className="p-6 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                <Target className="size-6" />
              </div>
              <h3 className="mb-1 font-semibold">Efisiensi</h3>
              <p className="text-sm text-muted-foreground">Proses digital yang cepat, mudah, dan mengurangi birokrasi</p>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Sejarah Perkembangan" subtitle="Perjalanan Lapak Jambi dalam mendigitalisasi layanan publik" centered />
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border hidden md:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`hidden flex-1 md:block ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block rounded-xl bg-white p-4 shadow-sm border border-border/50">
                      <h4 className="font-semibold">{m.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-md">
                    {m.year.slice(-2)}
                  </div>
                  <div className={`flex-1 md:hidden`}>
                    <div className="rounded-xl bg-white p-4 shadow-sm border border-border/50">
                      <h4 className="font-semibold">{m.year} - {m.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Tim Pengembang"
            subtitle="Tim yang berdedikasi dalam pengembangan dan pengelolaan Lapak Jambi"
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <GlassCard key={member.name} className="p-6 text-center">
                <div className="mx-auto mb-4 size-20 overflow-hidden rounded-full bg-muted">
                  <img src={member.avatar} alt={member.name} className="size-full object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Bergabung dengan Lapak Jambi</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Daftar sekarang dan nikmati kemudahan dalam mengakses layanan publik Provinsi Jambi.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 font-semibold shadow-lg" render={<Link href="/register" />}>
              Daftar Sekarang <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-white/30 text-white hover:bg-white/10" render={<Link href="/kontak" />}>
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
