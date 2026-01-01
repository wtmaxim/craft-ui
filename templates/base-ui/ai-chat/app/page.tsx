"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatInterface } from "@/components/chat-interface"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  const [resetKey, setResetKey] = React.useState(0)

  const resetChat = React.useCallback(() => {
    setResetKey((prev) => prev + 1)
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar onNewChat={resetChat} />
      <SidebarInset>
        <ChatInterface key={resetKey} />
      </SidebarInset>
    </SidebarProvider>
  )
}
