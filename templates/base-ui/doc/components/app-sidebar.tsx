import * as React from "react"
import { AudioWaveform, ChartPie, Command, Database, FileIcon, Frame, GalleryVerticalEnd, SquareTerminal } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"

const data = {
  user: {
    name: "max",
    email: "m@example.com",
    avatar: "/avatars/max.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Applications",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          icon: ChartPie,
          url: "#",
        },
        {
          title: "Documents",
          icon: FileIcon,
          url: "#",
        },
        {
          title: "Datarooms",
          icon: Database,
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: ChartPie,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
