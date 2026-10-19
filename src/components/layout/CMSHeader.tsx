'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  Bell,
  Menu,
  UserCog,
  Settings,
  LogOut,
  ChevronRight,
  Home,
} from 'lucide-react';

interface CMSHeaderProps {
  title: string;
  onToggleSidebar?: () => void;
}

const breadcrumbLabels: Record<string, string> = {
  'cms': 'Dashboard',
  'aset': 'Aset',
  'kategori': 'Kategori',
  'fasilitas': 'Fasilitas',
  'booking': 'Booking',
  'transaksi': 'Transaksi',
  'pengguna': 'Pengguna',
  'roles': 'Roles & Permissions',
  'konten': 'Konten',
  'berita': 'Berita',
  'galeri': 'Galeri',
  'faq': 'FAQ',
  'banner': 'Banner',
  'laporan': 'Laporan',
  'pengaturan': 'Pengaturan',
  'profil': 'Profil',
  'umum': 'Umum',
  'audit': 'Audit Log',
  'notifikasi': 'Notifikasi',
};

export function CMSHeader({ title, onToggleSidebar }: CMSHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const breadcrumbs = useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = breadcrumbLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
      return { label, href, isLast: index === segments.length - 1 };
    });
  }, [pathname]);

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) ?? 'U';

  return (
    <header className="sticky top-0 z-40 flex items-center h-14 gap-4 border-b border-border bg-background px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onToggleSidebar}>
            <Menu className="size-5" />
          </Button>
        )}
        <div className="flex flex-col min-w-0">
          <h1 className="text-base font-semibold truncate">{title}</h1>
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs text-muted-foreground">
              <Link href="/cms" className="hover:text-foreground transition-colors">
                <Home className="size-3" />
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight className="size-3" />
                  {crumb.isLast ? (
                    <span className="text-foreground font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="size-5" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px] font-bold"
          >
            3
          </Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/cms/profile" />}>
              <UserCog className="size-4 mr-2" />
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/cms/settings" />}>
              <Settings className="size-4 mr-2" />
              Pengaturan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="size-4 mr-2" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
