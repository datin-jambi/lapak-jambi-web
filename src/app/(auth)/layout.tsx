export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-primary/90 p-4 pattern-songket">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 size-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 size-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      </div>
      {children}
    </div>
  )
}
