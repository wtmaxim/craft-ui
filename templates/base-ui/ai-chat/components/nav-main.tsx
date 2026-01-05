"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: (e: React.MouseEvent) => void
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile, state } = useSidebar()
  const showTooltip = state === "collapsed" && !isMobile

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item: {
          title: string
          url: string
          icon?: LucideIcon
          isActive?: boolean
          onClick?: (e: React.MouseEvent) => void
          items?: {
            title: string
            url: string
          }[]
        }) => {
          // Si l'élément a des sous-items, utiliser Collapsible
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                key={item.title}
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    render={CollapsibleTrigger}
                    tooltip={showTooltip ? {
                      side: "right",
                      align: "center",
                      children: item.title,
                    } : undefined}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton href={subItem.url}>
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          }
          
          // Sinon, élément simple sans sous-menu
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                render={(props) => (
                  <a 
                    href={item.url} 
                    {...props}
                    onClick={(e) => {
                      if (item.onClick) {
                        item.onClick(e)
                      }
                    }}
                  />
                )}
                isActive={item.isActive}
                tooltip={showTooltip ? {
                  side: "right",
                  align: "center",
                  children: item.title,
                } : undefined}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
