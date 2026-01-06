"use client"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { GithubIcon, HeartIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function LandingSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[320px] md:w-[400px] border-r border-border bg-background flex flex-col p-6 md:p-8 overflow-y-auto z-10 hidden md:flex">
      {/* Header */}
      <div className="space-y-6 mb-8 flex-shrink-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">C</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">Craft UI</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Ready-to-use Next.js Templates
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Collection of modern and elegant templates to accelerate the development of your Next.js applications. 
            Each template is carefully designed with best practices.
          </p>
          <Badge variant="secondary" className="w-fit">
            2 Templates Available
          </Badge>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mb-auto flex-shrink-0">
        <a
          href="https://github.com/wtmaxim/craft-ui"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "w-full justify-start")}
        >
          <GithubIcon className="mr-2 size-4" />
          GitHub
        </a>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t border-border flex-shrink-0">
        <p className="text-xs text-muted-foreground">
          Built by{" "}
          <a
            href="https://x.com/wtAngat"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline"
          >
            Max
          </a>
        </p>
      </div>
    </aside>
  )
}
