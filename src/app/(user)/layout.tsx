import type { Metadata } from "next"
import { PublicLayout } from "@/components/layout/PublicLayout"

export const metadata: Metadata = {
  title: {
    default: "Akun Saya | Lapak Jambi",
    template: "%s | Lapak Jambi",
  },
  description: "Kelola akun dan pemesanan Anda di Lapak Jambi.",
}

export default function UserSectionLayout({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>
}
