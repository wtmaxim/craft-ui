"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  // Aplatir la structure : items principaux + leurs sous-items au même niveau
  const flatItems = items.flatMap((item) => {
    const mainItem = {
      title: item.title,
      url: item.url,
      icon: item.icon,
      isActive: item.isActive,
    }
    const subItems = (item.items || []).map((subItem) => ({
      ...subItem,
      isActive: false,
    }))
    return [mainItem, ...subItems]
  })

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {flatItems.map((item) => {
          const Icon = item.icon
          const isActive = "isActive" in item ? item.isActive : false
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                <a href={item.url} className="flex items-center gap-2">
                  {Icon && <Icon className="size-4" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
