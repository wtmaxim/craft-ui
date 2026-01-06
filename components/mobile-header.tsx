"use client"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { GithubIcon, HeartIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function MobileHeader() {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">C</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Craft UI</h1>
            <p className="text-xs text-muted-foreground">Templates Next.js</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/wtmaxim/craft-ui"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            aria-label="GitHub"
          >
            <GithubIcon className="size-4" />
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          2 Templates
        </Badge>
      </div>
    </header>
  )
}
