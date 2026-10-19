'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Settings,
  UserCog,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '/' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Aset', href: '/aset' },
  { label: 'Berita', href: '/berita' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'U';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-primary/30 before:via-gold/50 before:to-primary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/Icon/logo.png" alt="Logo Lapak Jambi" width={96} height={96} className="h-12 w-auto object-contain" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="size-5" />
            </Button>

            {isLoading ? (
              <div className="size-8 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="size-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{initials}</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCog className="size-4 mr-2" />
                    Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="size-4 mr-2" />
                    Pengaturan
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LayoutDashboard className="size-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    <LogOut className="size-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" size="sm" render={<Link href="/login" />}>
                  <LogIn className="size-4 mr-1" />
                  Masuk
                </Button>
                <Button size="sm" render={<Link href="/register" />}>
                  <UserPlus className="size-4 mr-1" />
                  Daftar
                </Button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 h-14 border-b border-border">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                      <div className="flex items-center justify-center size-7 rounded-lg bg-primary text-primary-foreground font-bold text-xs">
                        K
                      </div>
                      <span className="text-lg font-bold">Lapak Jambi</span>
                    </Link>
                    <SheetClose
                      render={
                        <Button variant="ghost" size="icon-sm">
                          <X className="size-4" />
                        </Button>
                      }
                    />
                  </div>

                  <div className="flex-1 overflow-y-auto py-4 px-3">
                    <nav className="space-y-1">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                            pathname === link.href
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {!isAuthenticated && (
                    <div className="border-t border-border p-4 space-y-2">
                      <Button className="w-full" render={<Link href="/login" />} onClick={() => setMobileOpen(false)}>
                        <LogIn className="size-4 mr-2" />
                        Masuk
                      </Button>
                      <Button variant="outline" className="w-full" render={<Link href="/register" />} onClick={() => setMobileOpen(false)}>
                        <UserPlus className="size-4 mr-2" />
                        Daftar
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
