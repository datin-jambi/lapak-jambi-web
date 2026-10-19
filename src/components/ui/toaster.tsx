"use client"

import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "oklch(0.33 0.07 45)",
          color: "oklch(0.985 0 0)",
          border: "1px solid oklch(0.72 0.12 78 / 0.2)",
          borderRadius: "0.75rem",
          fontSize: "0.875rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        },
        className: "font-sans",
      }}
      richColors
      closeButton
    />
  )
}
