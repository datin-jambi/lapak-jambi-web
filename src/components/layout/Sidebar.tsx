'use client';

import { useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from './SidebarItem';
import {
  LayoutDashboard,
  Database,
  Building2,
  Tags,
  ListChecks,
  CalendarCheck,
  Receipt,
  Users,
  UserCircle,
  Shield,
  FileText,
  Newspaper,
  Images,
  HelpCircle,
  Image,
  BarChart3,
  Settings,
  UserCog,
  Settings2,
  ScrollText,
  Bell,
  PanelLeftClose,
  PanelLeft,
  type LucideIcon,
} from 'lucide-react';
import type { UserRole } from '@/types';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  roles: UserRole[];
  children?: Omit<MenuItem, 'children'>[];
}

const menuGroups: { label: string; items: MenuItem[] }[] = [
  {
    label: 'Menu',
    items: [
      {
        icon: LayoutDashboard,
        label: 'Dashboard',
        href: '/cms',
        roles: ['SuperAdmin', 'Admin', 'AdminOPD', 'User'],
      },
    ],
  },
  {
    label: 'Master Data',
    items: [
      {
        icon: Database,
        label: 'Master Data',
        roles: ['SuperAdmin', 'Admin', 'AdminOPD'],
        children: [
          { icon: Building2, label: 'Aset', href: '/cms/assets', roles: ['SuperAdmin', 'Admin', 'AdminOPD'] },
          { icon: Tags, label: 'Kategori', href: '/cms/categories', roles: ['SuperAdmin', 'Admin'] },
          { icon: ListChecks, label: 'Fasilitas', href: '/cms/facilities', roles: ['SuperAdmin', 'Admin'] },
        ],
      },
    ],
  },
  {
    label: 'Transaksi',
    items: [
      {
        icon: CalendarCheck,
        label: 'Booking',
        href: '/cms/bookings',
        roles: ['SuperAdmin', 'Admin', 'AdminOPD', 'User'],
      },
      {
        icon: Receipt,
        label: 'Transaksi',
        href: '/cms/transactions',
        roles: ['SuperAdmin', 'Admin', 'AdminOPD'],
      },
    ],
  },
  {
    label: 'Pengguna',
    items: [
      {
        icon: Users,
        label: 'Pengguna',
        roles: ['SuperAdmin', 'Admin'],
        children: [
          { icon: UserCircle, label: 'Daftar User', href: '/cms/users', roles: ['SuperAdmin', 'Admin'] },
          { icon: Shield, label: 'Roles & Permissions', href: '/cms/roles', roles: ['SuperAdmin'] },
        ],
      },
    ],
  },
  {
    label: 'Konten',
    items: [
      {
        icon: FileText,
        label: 'Konten',
        roles: ['SuperAdmin', 'Admin'],
        children: [
          { icon: Newspaper, label: 'Berita', href: '/cms/news', roles: ['SuperAdmin', 'Admin'] },
          { icon: Images, label: 'Galeri', href: '/cms/gallery', roles: ['SuperAdmin', 'Admin'] },
          { icon: HelpCircle, label: 'FAQ', href: '/cms/faq', roles: ['SuperAdmin', 'Admin'] },
          { icon: Image, label: 'Banner', href: '/cms/banner', roles: ['SuperAdmin', 'Admin'] },
        ],
      },
    ],
  },
  {
    label: 'Laporan',
    items: [
      {
        icon: BarChart3,
        label: 'Laporan',
        href: '/cms/reports',
        roles: ['SuperAdmin', 'Admin'],
      },
    ],
  },
  {
    label: 'Pengaturan',
    items: [
      {
        icon: Settings,
        label: 'Pengaturan',
        roles: ['SuperAdmin', 'Admin'],
        children: [
          { icon: UserCog, label: 'Profil', href: '/cms/profile', roles: ['SuperAdmin', 'Admin', 'AdminOPD', 'User'] },
          { icon: Settings2, label: 'Umum', href: '/cms/settings', roles: ['SuperAdmin'] },
          { icon: ScrollText, label: 'Audit Log', href: '/cms/audit-log', roles: ['SuperAdmin'] },
        ],
      },
    ],
  },
  {
    label: 'Notifikasi',
    items: [
      {
        icon: Bell,
        label: 'Notifikasi',
        href: '/cms/notifications',
        roles: ['SuperAdmin', 'Admin', 'AdminOPD', 'User'],
      },
    ],
  },
];

function filterMenuItems(items: MenuItem[], hasRole: (roles: UserRole[]) => boolean): MenuItem[] {
  return items
    .filter((item) => hasRole(item.roles))
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) => hasRole(child.roles));
        return { ...item, children: filteredChildren.length > 0 ? filteredChildren : undefined };
      }
      return item;
    });
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { hasRole } = useAuth();

  const filteredGroups = menuGroups
    .map((group) => ({
      ...group,
      items: filterMenuItems(group.items, hasRole),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar border-r border-border h-full transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64',
        className
      )}
    >
      <div className={cn('flex items-center justify-center h-24 border-b border-border px-5', collapsed && 'justify-center px-0')}>
        {!collapsed && (
          <Link href="/cms" className="flex items-center">
            <NextImage src="/Icon/logo.png" alt="Logo Lapak Jambi" width={320} height={240} className="h-16 w-auto object-contain" priority />
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn('ml-auto', collapsed && 'ml-0')}
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className={cn('p-3 space-y-4', collapsed && 'p-2')}>
          {filteredGroups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </p>
              )}
              <div className={cn('space-y-1', collapsed && 'space-y-2')}>
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isCollapsed={collapsed}
                    subItems={item.children?.map((child) => ({
                      icon: child.icon,
                      label: child.label,
                      href: child.href,
                    }))}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
