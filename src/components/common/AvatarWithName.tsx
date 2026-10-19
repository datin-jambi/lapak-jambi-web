import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface AvatarWithNameProps {
  name: string
  avatar?: string
  subtitle?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: { avatarSize: "sm" as const, nameClass: "text-sm", subtitleClass: "text-xs" },
  md: { avatarSize: "default" as const, nameClass: "text-sm font-medium", subtitleClass: "text-xs" },
  lg: { avatarSize: "lg" as const, nameClass: "text-base font-medium", subtitleClass: "text-sm" },
}

export function AvatarWithName({
  name,
  avatar,
  subtitle,
  size = "md",
  className,
}: AvatarWithNameProps) {
  const config = sizeConfig[size]
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar size={config.avatarSize}>
        {avatar ? (
          <AvatarImage src={avatar} alt={name} />
        ) : (
          <AvatarFallback>{initials}</AvatarFallback>
        )}
      </Avatar>
      <div className="flex flex-col">
        <span className={cn("leading-tight text-foreground", config.nameClass)}>
          {name}
        </span>
        {subtitle && (
          <span className={cn("leading-tight text-muted-foreground", config.subtitleClass)}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
}
