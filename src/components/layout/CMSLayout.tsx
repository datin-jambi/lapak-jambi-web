"use client"

import { useState } from "react"
import Link from "next/link"
import NextImage from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Wrench,
  CalendarCheck,
  Receipt,
  Users,
  Shield,
  KeyRound,
  Newspaper,
  Image,
  HelpCircle,
  ImagePlus,
  BarChart3,
  Settings,
  UserCircle,
  ScrollText,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Search,
  Building2,
} from "lucide-react"
import { getInitials } from "@/utils/format"

const sidebarMenu = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/cms" },
  { id: "assets", label: "Aset", icon: Package, href: "/cms/assets" },
  { id: "categories", label: "Kategori", icon: FolderTree, href: "/cms/categories" },
  { id: "facilities", label: "Fasilitas", icon: Wrench, href: "/cms/facilities" },
  { id: "bookings", label: "Pemesanan", icon: CalendarCheck, href: "/cms/bookings" },
  { id: "transactions", label: "Transaksi", icon: Receipt, href: "/cms/transactions" },
  { id: "users", label: "Pengguna", icon: Users, href: "/cms/users" },
  { id: "roles", label: "Peran", icon: Shield, href: "/cms/roles" },
  { id: "permissions", label: "Izin Akses", icon: KeyRound, href: "/cms/permissions" },
  { id: "news", label: "Berita", icon: Newspaper, href: "/cms/news" },
  { id: "gallery", label: "Galeri", icon: Image, href: "/cms/gallery" },
  { id: "faq", label: "FAQ", icon: HelpCircle, href: "/cms/faq" },
  { id: "banner", label: "Banner", icon: ImagePlus, href: "/cms/banner" },
  { id: "reports", label: "Laporan", icon: BarChart3, href: "/cms/reports" },
  { id: "audit-log", label: "Audit Log", icon: ScrollText, href: "/cms/audit-log" },
  { id: "notifications", label: "Notifikasi", icon: Bell, href: "/cms/notifications" },
  { id: "settings", label: "Pengaturan", icon: Settings, href: "/cms/settings" },
  { id: "profile", label: "Profil", icon: UserCircle, href: "/cms/profile" },
]

const bottomMenu = [
  { id: "settings", label: "Pengaturan", icon: Settings, href: "/cms/settings" },
  { id: "profile", label: "Profil", icon: UserCircle, href: "/cms/profile" },
]

interface CMSLayoutProps {
  children: React.ReactNode
}

export function CMSLayout({ children }: CMSLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem("lapakjambi_auth_user")
    localStorage.removeItem("lapakjambi_auth_token")
    router.push("/login")
  }

  const isActive = (href: string) => {
    if (href === "/cms") return pathname === "/cms"
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-zinc-900 text-zinc-100 transition-all duration-300 lg:static",
          collapsed ? "w-16" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className={cn("flex h-24 items-center justify-center border-b border-zinc-800 px-5", collapsed && "px-2")}>
          <Link href="/cms" className="flex items-center">
            <NextImage
              src="/Icon/logo-light.png"
              alt="Logo Lapak Jambi"
              width={320}
              height={240}
              className={cn("w-auto object-contain", collapsed ? "h-8" : "h-16")}
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin scrollbar-thumb-zinc-700">
          {sidebarMenu.map((item) => (
            collapsed ? (
              <Tooltip key={item.id}>
                <TooltipTrigger render={<Link href={item.href} className={cn(
                  "flex items-center justify-center rounded-lg px-2 py-2 text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                )} />}>
                  <item.icon className="size-4 shrink-0" />
                </TooltipTrigger>
                <TooltipContent side="right">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(item.href)
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                )}
              >
                <item.icon className="size-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <div className={cn("border-t border-zinc-800 p-2", collapsed && "flex flex-col items-center")}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors lg:flex"
          >
            {collapsed ? <ChevronRight className="size-4" /> : <><ChevronLeft className="size-4" /> <span>Ciutkan</span></>}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center border-b bg-white px-4 lg:px-6">
          <button
            onClick={() => setMobileOpen(true)}
            className="mr-3 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative ml-2 hidden max-w-xs flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Cari..."
              className="h-8 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20"
            />
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              href="/cms/notifications"
              className="relative rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100"
            >
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-medium text-white">3</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger render={<button type="button" className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-zinc-100 focus:outline-none" />}>
                <Avatar size="sm">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Budi%20Hartono" alt="Budi Hartono" />
                  <AvatarFallback>{getInitials("Budi Hartono")}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-xs font-medium text-zinc-900">Budi Hartono</p>
                  <p className="text-[10px] text-zinc-500">Super Admin</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem onClick={() => router.push("/cms/profile")}>
                  <UserCircle className="mr-2 size-4" />
                  Profil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
