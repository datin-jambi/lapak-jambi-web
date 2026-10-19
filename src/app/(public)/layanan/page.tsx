import Link from "next/link"
import { Building2, Building, Dumbbell, Mountain, Ticket, Landmark, Handshake, Wrench, ArrowRight, CheckCircle } from "lucide-react"
import { PageHeader } from "@/components/common/PageHeader"
import { SectionTitle } from "@/components/common/SectionTitle"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { categories } from "@/dummy/categories"

const iconMap: Record<string, React.ElementType> = {
  Building,
  Building2,
  Dumbbell,
  Mountain,
  Ticket,
  Landmark,
  Handshake,
  Wrench,
}

export default function ServicesPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/80 py-24 ornament pattern-songket">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Layanan"
            description="Jelajahi berbagai layanan dan kategori aset yang tersedia untuk masyarakat melalui platform Lapak Jambi."
            breadcrumbs={[{ label: "Layanan" }]}
            className="text-white [&_nav]:text-white/80 [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Kategori Layanan"
            subtitle="Temukan layanan yang Anda butuhkan dari berbagai kategori yang tersedia"
            centered
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Building2
              return (
                <Link key={cat.id} href={`/assets?category=${cat.slug}`}>
                  <GlassCard hover className="p-6">
                    <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary shadow-sm transition-all group-hover:shadow-md group-hover:from-primary group-hover:to-primary/90 group-hover:text-primary-foreground">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="mb-1.5 text-lg font-semibold text-foreground">{cat.name}</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed line-clamp-2">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{cat.assetCount} Aset</span>
                      <ArrowRight className="size-4 text-primary/60 transition-all group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <SectionTitle
                title="Mengapa Menggunakan Lapak Jambi?"
                subtitle="Nikmati berbagai kemudahan dalam mengakses layanan publik"
              />
              <ul className="mt-8 space-y-4">
                {[
                  "Proses pemesanan aset secara online dan real-time",
                  "Informasi ketersediaan aset yang akurat dan terkini",
                  "Pembayaran digital yang aman dan terpercaya",
                  "Laporan dan riwayat pemesanan yang lengkap",
                  "Dukungan customer service yang responsif",
                  "Akses mudah melalui website dan aplikasi mobile",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <GlassCard className="p-8">
              <h3 className="mb-4 text-lg font-semibold">Mulai Menggunakan Layanan</h3>
              <ol className="space-y-4">
                {[
                  { step: "01", title: "Daftar Akun", desc: "Buat akun Lapak Jambi dengan email atau nomor telepon" },
                  { step: "02", title: "Cari Aset", desc: "Temukan aset atau layanan yang Anda butuhkan" },
                  { step: "03", title: "Pesan & Bayar", desc: "Pilih jadwal dan lakukan pembayaran secara online" },
                  { step: "04", title: "Nikmati Layanan", desc: "Gunakan aset atau layanan yang telah dipesan" },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button className="mt-6 w-full rounded-xl" render={<Link href="/register" />}>
                Daftar Sekarang
              </Button>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionTitle
            title="Siap Menggunakan Layanan Kami?"
            subtitle="Daftar sekarang dan mulai jelajahi berbagai aset dan layanan publik yang tersedia"
            centered
          />
          <div className="mt-8 flex justify-center gap-3">
            <Button size="lg" className="rounded-xl" render={<Link href="/register" />}>
              Daftar Sekarang
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl" render={<Link href="/kontak" />}>
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
