"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface Action {
  label: string
  icon: string
  onClick: () => void
  variant?: "default" | "destructive"
}

interface ActionDropdownProps {
  actions: Action[]
}

export function ActionDropdown({ actions }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => {
          const Icon = LucideIcons[action.icon as keyof typeof LucideIcons] as LucideIcon | undefined
          return (
            <DropdownMenuItem
              key={index}
              variant={action.variant ?? "default"}
              onSelect={action.onClick}
            >
              {Icon && <Icon className="size-4" />}
              {action.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
