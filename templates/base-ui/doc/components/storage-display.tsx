"use client"

import { cn } from "@/lib/utils"
import { SidebarGroup } from "@/components/ui/sidebar"

interface StorageCategory {
  name: string
  color: string
  size: number
}

interface StorageDisplayProps {
  used: number
  total: number
  categories?: StorageCategory[]
  className?: string
}

export function StorageDisplay({
  used,
  total,
  categories = [
    { name: "Images", color: "oklch(0.65 0.18 280)", size: 3.5 },
    { name: "Videos", color: "oklch(0.75 0.18 340)", size: 3.2 },
    { name: "Documents", color: "oklch(0.85 0.15 50)", size: 2.2 },
  ],
  className,
}: StorageDisplayProps) {
  const percentage = (used / total) * 100
  const formatSize = (size: number) => {
    return `${size.toFixed(1)} GB`
  }

  return (
    <SidebarGroup className={cn("px-2 py-2", className)}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-sidebar-foreground">
            Storage
          </span>
          <span className="text-sm text-sidebar-foreground/70">
            {formatSize(used)} / {formatSize(total)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-sidebar-accent/50">
          <div
            className="h-full rounded-full transition-all duration-300 bg-sidebar-foreground/20"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        {/* Categories Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center gap-1.5"
            >
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-xs text-sidebar-foreground/70">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SidebarGroup>
  )
}
