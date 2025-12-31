"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
    collapsed: boolean
    setCollapsed: (collapsed: boolean) => void
    toggle: () => void
} | null>(null)

export function useSidebar() {
    const context = React.useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider")
    }
    return context
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = React.useState(false)

    const toggle = React.useCallback(() => {
        setCollapsed((prev) => !prev)
    }, [])

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed, toggle }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar()
    return (
        <aside
            className={cn(
                "flex h-screen flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
                collapsed ? "w-[60px]" : "w-64",
                className
            )}
            {...props}
        >
            {children}
        </aside>
    )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar()
    return (
        <div className={cn(
            "flex items-center h-14 px-3 py-0 transition-all duration-300 overflow-hidden",
            collapsed && "px-2",
            className
        )} {...props}>
            {children}
        </div>
    )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("flex-1 overflow-y-auto overflow-x-hidden px-3 py-2", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar()
    return (
        <div className={cn(
            "mt-auto flex items-center h-14 px-3 py-0 border-t border-border transition-all duration-300 overflow-hidden",
            collapsed && "px-2",
            className
        )} {...props}>
            {children}
        </div>
    )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("py-2", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarGroupLabel({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar()
    if (collapsed) return null
    return (
        <div
            className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider", className)}
            {...props}
        >
            {children}
        </div>
    )
}

export function SidebarGroupContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("space-y-1", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("space-y-1", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("group relative", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarMenuButton({
    className,
    active,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
    const { collapsed } = useSidebar()
    return (
        <button
            className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-all duration-300 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground disabled:opacity-50 overflow-hidden",
                active && "bg-sidebar-accent text-sidebar-accent-foreground",
                collapsed && "justify-center px-0 gap-0",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}

export function SidebarMenuSub({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { collapsed } = useSidebar()
    if (collapsed) return null
    return (
        <div className={cn("ml-6 space-y-0.5 border-l border-border pl-4 mt-1", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarMenuSubItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("", className)} {...props}>
            {children}
        </div>
    )
}

export function SidebarMenuSubButton({
    className,
    active,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
    return (
        <button
            className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-1 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "text-sidebar-foreground",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export function SidebarMenuTooltip({
    children,
    content,
    ...props
}: {
    children: React.ReactNode
    content: React.ReactNode
} & React.ComponentProps<typeof Tooltip>) {
    const { collapsed } = useSidebar()

    if (!collapsed) return <>{children}</>

    if (!children) return null

    // Ensure children is a valid React element for the render prop
    const childElement = React.isValidElement(children) 
        ? children 
        : <span>{children}</span>

    return (
        <Tooltip {...props}>
            <TooltipTrigger render={childElement as React.ReactElement} />
            <TooltipContent side="right" align="center" sideOffset={12}>
                {content}
            </TooltipContent>
        </Tooltip>
    )
}
