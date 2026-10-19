import { cn } from "@/lib/utils"
import { BreadcrumbNav } from "./BreadcrumbNav"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8 space-y-4", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbNav items={breadcrumbs} />
      )}
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-base text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
