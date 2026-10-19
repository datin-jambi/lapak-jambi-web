'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  subItems?: SidebarItemProps[];
  onClick?: () => void;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  isActive: forcedActive,
  isCollapsed = false,
  subItems,
  onClick,
}: SidebarItemProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(
    subItems?.some((child) => child.href && pathname.startsWith(child.href)) ?? false
  );

  const hasChildren = subItems && subItems.length > 0;
  const isActive = forcedActive ?? (href ? pathname === href || (href !== '/' && pathname.startsWith(href)) : false);
  const isChildActive = hasChildren && subItems.some((child) => child.href && pathname.startsWith(child.href));

  if (isCollapsed) {
    return (
      <div className="relative group">
        <Link
          href={href ?? '#'}
          onClick={(e) => {
            if (!href) e.preventDefault();
            if (hasChildren) setExpanded(!expanded);
            onClick?.();
          }}
          className={cn(
            'flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-colors',
            (isActive || isChildActive)
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <Icon className="size-5" />
        </Link>
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={href ?? '#'}
        onClick={(e) => {
          if (!href) e.preventDefault();
          if (hasChildren) setExpanded(!expanded);
          onClick?.();
        }}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
          (isActive || isChildActive)
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon className="size-5 shrink-0" />
        <span className="flex-1 truncate">{label}</span>
        {hasChildren && (
          <ChevronDown
            className={cn(
              'size-4 shrink-0 transition-transform',
              expanded && 'rotate-180'
            )}
          />
        )}
      </Link>
      {hasChildren && expanded && (
        <div className="ml-3 mt-1 space-y-1 border-l border-border pl-3">
          {subItems.map((child) => (
            <SidebarItem key={child.label} {...child} isCollapsed={false} />
          ))}
        </div>
      )}
    </div>
  );
}
