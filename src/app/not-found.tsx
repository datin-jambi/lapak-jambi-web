import Link from "next/link"
import { Home, ArrowLeft, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-white p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Building2 className="size-24 text-primary/80" />
            <span className="absolute -top-2 -right-2 flex size-12 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-lg">
              ?
            </span>
          </div>
        </div>
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
          Silakan periksa kembali URL atau kembali ke halaman utama.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="rounded-xl" render={<Link href="/" />}>
            <Home className="mr-2 size-4" />
            Kembali ke Beranda
          </Button>
          <Button size="lg" variant="outline" className="rounded-xl" render={<Link href="/aset" />}>
            <ArrowLeft className="mr-2 size-4" />
            Jelajahi Aset
          </Button>
        </div>
      </div>
    </div>
  )
}
