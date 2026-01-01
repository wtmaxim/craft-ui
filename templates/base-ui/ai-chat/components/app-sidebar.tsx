"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Plus,
  Code,
  Info,
  FileText,
  Shield,
  Github,
  MessageSquare,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavHistory } from "@/components/nav-history"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
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
      title: "New Chat",
      url: "#",
      icon: Plus,
      isActive: true,
    },
    {
      title: "API",
      url: "#",
      icon: Code,
    },
    {
      title: "About",
      url: "#",
      icon: Info,
    },
    {
      title: "Blog",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Terms",
      url: "#",
      icon: FileText,
    },
    {
      title: "Privacy",
      url: "#",
      icon: Shield,
    },
    {
      title: "GitHub",
      url: "#",
      icon: Github,
    },
    {
      title: "Feedback",
      url: "#",
      icon: MessageSquare,
    },
  ],
  history: [
    {
      id: "1",
      title: "New Chat",
      url: "#",
      timestamp: "2024-01-15",
    },
    {
      id: "2",
      title: "React Components Discussion",
      url: "#",
      timestamp: "2024-01-14",
    },
    {
      id: "3",
      title: "API Integration Help",
      url: "#",
      timestamp: "2024-01-13",
    },
  ],
}

export function AppSidebar({ 
  onNewChat,
  ...props 
}: React.ComponentProps<typeof Sidebar> & {
  onNewChat?: () => void
}) {
  // Modifier les items pour ajouter le handler sur "New Chat"
  const navMainItems = data.navMain.map((item) => {
    if (item.title === "New Chat" && onNewChat) {
      return {
        ...item,
        onClick: (e: React.MouseEvent) => {
          e.preventDefault()
          onNewChat()
        },
      }
    }
    return item
  })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavHistory history={data.history} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
