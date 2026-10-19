"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { CMSLayout } from "@/components/layout/CMSLayout"
import { getCurrentUser, hasRole } from "@/services/auth.service"
import { LoadingSpinner } from "@/components/common/Loading"

export default function CmsRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const checked = useRef(false)
  const [hydrated, setHydrated] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    setHydrated(true)
    if (checked.current) return
    checked.current = true
    const user = getCurrentUser()
    if (!user || !hasRole(user, ["SuperAdmin", "Admin", "AdminOPD"])) {
      router.replace("/login")
    } else {
      setAuthorized(true)
    }
  }, [router])

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner text="Memeriksa akses..." />
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner text="Memeriksa akses..." />
      </div>
    )
  }

  return <CMSLayout>{children}</CMSLayout>
}
