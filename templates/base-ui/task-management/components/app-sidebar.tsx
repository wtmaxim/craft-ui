"use client"

import * as React from "react"
import {
    HugeiconsIcon,
} from "@hugeicons/react"
import { cn } from "@/lib/utils"
import {
    PlayIcon,
    Layers01Icon,
    BookOpen01Icon,
    Settings02Icon,
    SquareIcon,
    DashboardSquare01Icon,
    AirplaneIcon,
    CommandIcon,
    User02Icon,
    ArrowUpDownIcon,
    ChevronDown,
    ChevronRight,
    Add01Icon,
    Sorting05Icon,
} from "@hugeicons/core-free-icons"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarMenuTooltip,
    useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const teams = [
    {
        name: "Acme Inc",
        logo: CommandIcon,
        plan: "Enterprise",
    },
    {
        name: "Acme Corp.",
        logo: SquareIcon,
        plan: "Startup",
    },
    {
        name: "Evil Corp.",
        logo: PlayIcon,
        plan: "Free",
    },
]

export function AppSidebar() {
    const [activeTeam, setActiveTeam] = React.useState(teams[0])
    const { collapsed } = useSidebar()
    const [mounted, setMounted] = React.useState(false)

    const [openMenus, setOpenMenus] = React.useState<string[]>(["Playground"])

    const toggleMenu = (name: string) => {
        setOpenMenus((prev) =>
            prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
        )
    }

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Sidebar className="text-muted-foreground">
                <SidebarHeader className="border-b border-border" />
                <SidebarContent className="scrollbar-hide" />
                <SidebarFooter className="h-14 py-0 flex items-center" />
            </Sidebar>
        )
    }

    return (
        <Sidebar className="text-muted-foreground">
            <SidebarHeader className="border-b border-border h-14 flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        id="team-switcher-trigger"
                        className={cn(
                            "flex items-center gap-3 w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2 rounded-lg transition-colors text-left outline-none cursor-pointer overflow-hidden",
                            collapsed && "justify-center"
                        )}
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <HugeiconsIcon icon={activeTeam.logo} className="size-5" />
                        </div>
                        {!collapsed && (
                            <>
                                <div className="flex flex-col flex-1 min-w-0">
                                    <span className="text-sm font-semibold text-foreground truncate">{activeTeam.name}</span>
                                    <span className="text-[11px] leading-tight truncate text-muted-foreground">{activeTeam.plan}</span>
                                </div>
                                <HugeiconsIcon icon={Sorting05Icon} className="size-4 shrink-0" />
                            </>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64" align="start" side="bottom" sideOffset={4}>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-normal">Teams</DropdownMenuLabel>
                            {teams.map((team) => (
                                <DropdownMenuItem
                                    key={team.name}
                                    onClick={() => setActiveTeam(team)}
                                    className="gap-3 p-2"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted border border-border text-foreground">
                                        <HugeiconsIcon icon={team.logo} className="size-3.5" />
                                    </div>
                                    <div className="flex flex-col flex-1 min-w-0">
                                        <span className="text-sm font-medium truncate">{team.name}</span>
                                        <span className="text-[11px] text-muted-foreground truncate">{team.plan}</span>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-3 p-2">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-dashed border-border text-muted-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                                <HugeiconsIcon icon={Add01Icon} className="size-3.5" />
                            </div>
                            <span className="text-sm font-medium">Add team</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarHeader>

            <SidebarContent className="scrollbar-hide">
                <SidebarGroup>
                    <SidebarGroupLabel className="font-medium text-[10px] uppercase tracking-[0.1em] px-2 mb-1">Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Tasks">
                                    <SidebarMenuButton
                                        onClick={() => window.location.href = '/tasks'}
                                    >
                                        <HugeiconsIcon icon={Layers01Icon} className="size-4" />
                                        {!collapsed && <span>Tasks</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Projects">
                                    <SidebarMenuButton
                                        onClick={() => toggleMenu("Projects")}
                                    >
                                        <HugeiconsIcon icon={PlayIcon} className="size-4" />
                                        {!collapsed && (
                                            <>
                                                <span>Projects</span>
                                                <HugeiconsIcon
                                                    icon={ChevronDown}
                                                    className={cn(
                                                        "size-4 ml-auto transition-transform duration-200",
                                                        !openMenus.includes("Projects") && "-rotate-90"
                                                    )}
                                                />
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                                {!collapsed && openMenus.includes("Projects") && (
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>All Projects</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>New Project</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>Archived Projects</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Teams">
                                    <SidebarMenuButton
                                        onClick={() => toggleMenu("Teams")}
                                    >
                                        <HugeiconsIcon icon={Layers01Icon} className="size-4" />
                                        {!collapsed && (
                                            <>
                                                <span>Teams</span>
                                                <HugeiconsIcon
                                                    icon={ChevronRight}
                                                    className={cn(
                                                        "size-4 ml-auto transition-transform duration-200",
                                                        openMenus.includes("Teams") && "rotate-90"
                                                    )}
                                                />
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                                {!collapsed && openMenus.includes("Models") && (
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>All Models</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Users">
                                    <SidebarMenuButton
                                        onClick={() => toggleMenu("Users")}
                                    >
                                        <HugeiconsIcon icon={User02Icon} className="size-4" />
                                        {!collapsed && (
                                            <>
                                                <span>Users</span>
                                                <HugeiconsIcon
                                                    icon={ChevronRight}
                                                    className={cn(
                                                        "size-4 ml-auto transition-transform duration-200",
                                                        openMenus.includes("Users") && "rotate-90"
                                                    )}
                                                />
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                                {!collapsed && openMenus.includes("Documentation") && (
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>Introduction</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Settings">
                                    <SidebarMenuButton
                                        onClick={() => toggleMenu("Settings")}
                                    >
                                        <HugeiconsIcon icon={Settings02Icon} className="size-4" />
                                        {!collapsed && (
                                            <>
                                                <span>Settings</span>
                                                <HugeiconsIcon
                                                    icon={ChevronRight}
                                                    className={cn(
                                                        "size-4 ml-auto transition-transform duration-200",
                                                        openMenus.includes("Settings") && "rotate-90"
                                                    )}
                                                />
                                            </>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                                {!collapsed && openMenus.includes("Settings") && (
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton>General</SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                )}
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="font-medium text-[10px] uppercase tracking-[0.1em] px-2 mb-1">Projects</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Design Engineering">
                                    <SidebarMenuButton>
                                        <HugeiconsIcon icon={CommandIcon} className="size-4" />
                                        {!collapsed && <span>Design Engineering</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="Sales & Marketing">
                                    <SidebarMenuButton>
                                        <HugeiconsIcon icon={DashboardSquare01Icon} className="size-4" />
                                        {!collapsed && <span>Sales & Marketing</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuTooltip content="AI Research">
                                    <SidebarMenuButton>
                                        <HugeiconsIcon icon={BookOpen01Icon} className="size-4" />
                                        {!collapsed && <span>AI Research</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuTooltip>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="h-14 flex items-center">
                <div className={cn("flex items-center gap-3 w-full overflow-hidden transition-all duration-300", collapsed && "justify-center gap-0")}>
                    <Avatar className="h-8 w-8 rounded-lg overflow-hidden shrink-0">
                        <AvatarImage src="/placeholder-user.jpg" alt="max" />
                        <AvatarFallback className="bg-muted text-foreground">MX</AvatarFallback>
                    </Avatar>
                    {!collapsed && (
                        <>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-sm font-semibold text-foreground truncate">max</span>
                                <span className="text-[11px] leading-tight truncate text-muted-foreground">max@example.com</span>
                            </div>
                            <HugeiconsIcon icon={Sorting05Icon} className="size-4 shrink-0" />
                        </>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
