import * as React from "react"
import { AudioWaveform, ChartPie, Command, Database, FileIcon, Frame, GalleryVerticalEnd, Map } from "lucide-react"

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
import { NavUsage } from "./nav-usage"


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
      title: "Dashboard",
      icon: ChartPie,
      url: "/",
      isActive: true,
    },
    {
      title: "Documents",
      icon: FileIcon,
      url: "/documents",
    },
    {
      title: "Datarooms",
      icon: Database,
      url: "/datarooms",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "/projects/design-engineering",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "/projects/sales-marketing",
      icon: ChartPie,
    },
    {
      name: "Travel",
      url: "/projects/travel",
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
        <NavUsage />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
