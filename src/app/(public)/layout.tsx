import type { Metadata } from "next"
import { PublicLayout } from "@/components/layout/PublicLayout"

export const metadata: Metadata = {
  title: {
    default: "Lapak Jambi - Layanan Publik dalam Genggaman",
    template: "%s | Lapak Jambi",
  },
  description: "Platform digital Pemerintah Provinsi Jambi untuk menemukan, memesan, dan membayar layanan fasilitas publik.",
}

export default function PublicSectionLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>
}
