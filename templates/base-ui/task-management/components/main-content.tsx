"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { FileIcon, LayoutIcon } from "@hugeicons/core-free-icons"
import { useSidebar } from "@/components/ui/sidebar"

export function MainContent() {
  const { toggle } = useSidebar()

  return (
    <div className="flex h-screen flex-1 flex-col bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="flex items-center justify-start h-14 border-b border-zinc-800/50 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
          onClick={toggle}
        >
          <HugeiconsIcon icon={LayoutIcon} className="size-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="flex h-full flex-col gap-4">
          {/* Three small blocks at the top */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="h-32 bg-zinc-900/50 border-zinc-800/50 rounded-xl" />
            <Card className="h-32 bg-zinc-900/50 border-zinc-800/50 rounded-xl" />
            <Card className="h-32 bg-zinc-900/50 border-zinc-800/50 rounded-xl" />
          </div>

          {/* Large block at the bottom */}
          <Card className="flex-1 bg-zinc-900/50 border-zinc-800/50 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

