"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: { label: string; onClick?: () => void; href?: string }
  className?: string
}

export function EmptyState({
  icon = "Inbox",
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const LucideIcon = (LucideIcons[icon as keyof typeof LucideIcons] ?? LucideIcons.Inbox) as React.ComponentType<{ className?: string }>

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
    >
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <LucideIcon className="size-7 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {description && (
          <p className="max-w-xs text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <>
          {action.href ? (
            <Button
              variant="outline"
              size="sm"
              render={<Link href={action.href} />}
            >
              {action.label}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </>
      )}
    </div>
  )
}
