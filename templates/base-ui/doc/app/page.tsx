"use client"

import * as React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Link01Icon, File01Icon, UserIcon, EyeIcon, Calendar03Icon, LinkCircleIcon } from "@hugeicons/core-free-icons"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { date: "Wed, Dec 31", views: 25 },
    { date: "Thu, Jan 1", views: 40 },
    { date: "Fri, Jan 2", views: 35 },
    { date: "Sat, Jan 3", views: 15 },
    { date: "Sun, Jan 4", views: 20 },
    { date: "Mon, Jan 5", views: 45 },
    { date: "Tue, Jan 6", views: 60 },
]

const linksData = [
    {
        id: "1",
        url: "https://example.com/pitch-deck",
        document: "Pitch Deck 2025.pdf",
        views: 45,
        avgDuration: "2m 30s",
        lastViewed: "2 mins ago",
    },
    {
        id: "2",
        url: "https://example.com/contract",
        document: "Service Agreement.docx",
        views: 28,
        avgDuration: "5m 15s",
        lastViewed: "1 hour ago",
    },
    {
        id: "3",
        url: "https://example.com/invoice",
        document: "Invoice #1023.pdf",
        views: 12,
        avgDuration: "1m 05s",
        lastViewed: "3 hours ago",
    },
    {
        id: "4",
        url: "https://example.com/proposal",
        document: "Project Proposal.pptx",
        views: 8,
        avgDuration: "3m 45s",
        lastViewed: "5 hours ago",
    },
    {
        id: "5",
        url: "https://example.com/report",
        document: "Q4 Financial Report.xlsx",
        views: 65,
        avgDuration: "8m 20s",
        lastViewed: "1 day ago",
    },
]


const chartConfig = {
    views: {
        label: "Views",
        color: "hsl(var(--primary))",
    },
}

export default function DashboardPage() {
    const [activeTab, setActiveTab] = React.useState("links")

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>



                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">


                    {/* Dashboard Title & Actions */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <p className="text-sm text-muted-foreground">
                                Overview of your activity and performance
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Select defaultValue="7d">

                                <SelectTrigger className="w-[140px]">
                                    <HugeiconsIcon icon={Calendar03Icon} className="mr-2 size-4" />
                                    <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                                <SelectContent align="end">
                                    <SelectItem value="7d">Last 7 days</SelectItem>
                                    <SelectItem value="30d">Last 30 days</SelectItem>
                                    <SelectItem value="90d">Last 3 months</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Chart Section */}

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-medium">Views Overview</h2>
                            <HugeiconsIcon icon={Link01Icon} className="size-4 text-muted-foreground opacity-0" /> {/* Placeholder/Alignment */}
                        </div>
                        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 pt-6">
                            <ChartContainer config={chartConfig} className="aspect-[3/1] w-full min-h-[300px]">
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted/30" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={10}
                                        tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                                        domain={[0, 100]} // To match mocked data range

                                        allowDecimals={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={{ fill: "hsl(var(--muted)/0.2)" }} />
                                    <Bar
                                        dataKey="views"
                                        fill="hsl(var(--primary)/0.2)" // Light gray fill as in screenshot
                                        radius={[4, 4, 0, 0]}
                                        activeBar={{ fill: "hsl(var(--primary)/0.5)" }} // Darker on hover
                                        barSize={60}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </div>

                    {/* Tabs and Data Table */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-6 border-b pb-px">
                            {[
                                { id: "links", label: "Links", count: linksData.length },
                                { id: "documents", label: "Documents", count: 12 },
                                { id: "visitors", label: "Visitors", count: 245 },
                                { id: "recent", label: "Recent Views", count: 8 },
                            ].map((tab) => (

                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                    flex items-center gap-2 pb-3 text-sm font-medium transition-colors border-b-2 -mb-px
                    ${activeTab === tab.id
                                            ? "border-primary text-foreground"
                                            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}
                  `}
                                >
                                    {tab.label}
                                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                                        {tab.count}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button variant="outline" size="sm" className="gap-2 h-8">
                                <HugeiconsIcon icon={Link01Icon} className="size-3.5" />
                                Upgrade to Export
                            </Button>
                        </div>

                        <div className="rounded-lg border bg-card">
                            {/* Table Header */}
                            <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 p-4 text-xs font-medium text-muted-foreground border-b bg-muted/30">
                                <div>Links</div>
                                <div>Document</div>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">Views <ArrowSortIcon /></div>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">Avg Duration <ArrowSortIcon /></div>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">Last Viewed <ArrowDownIcon /></div>
                            </div>

                            {/* Empty State */}
                            <div className="flex flex-col">
                                {linksData.map((link) => (
                                    <div key={link.id} className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] gap-4 p-4 text-sm items-center border-b last:border-0 hover:bg-muted/50 transition-colors">
                                        <div className="font-medium truncate text-primary">{link.url}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="bg-primary/10 p-1.5 rounded-md">
                                                <HugeiconsIcon icon={File01Icon} className="size-4 text-primary" />
                                            </div>
                                            <span className="truncate">{link.document}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 tabular-nums">
                                            <HugeiconsIcon icon={EyeIcon} className="size-4 text-muted-foreground" />
                                            {link.views}
                                        </div>
                                        <div className="tabular-nums text-muted-foreground">{link.avgDuration}</div>
                                        <div className="text-muted-foreground">{link.lastViewed}</div>
                                    </div>
                                ))}
                            </div>


                            {/* Pagination */}
                            <div className="flex items-center justify-between border-t p-4">
                                <div className="text-xs text-muted-foreground">
                                    {linksData.length} of {linksData.length} links shown

                                </div>
                                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        Links per page
                                        <Select defaultValue="10">
                                            <SelectTrigger className="h-7 w-14">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="10">10</SelectItem>
                                                <SelectItem value="20">20</SelectItem>
                                                <SelectItem value="50">50</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        Page 1 of 1

                                        <div className="flex items-center gap-1">
                                            <Button variant="outline" size="icon" className="h-7 w-7" disabled>
                                                <ChevronLeftIcon className="size-3.5" />
                                            </Button>

                                            <Button variant="outline" size="icon" className="h-7 w-7" disabled>
                                                <ChevronRightIcon className="size-3.5" />
                                            </Button>

                                            <Button variant="outline" size="icon" className="h-7 w-7" disabled>
                                                <ChevronsRightIcon className="size-3.5" />
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

function ArrowSortIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 12.5C8 12.7761 7.77614 13 7.5 13C7.22386 13 7 12.7761 7 12.5L7 2.5C7 2.22386 7.22386 2 7.5 2ZM5.14645 4.85355C4.95118 4.65829 4.95118 4.34171 5.14645 4.14645L7.14645 2.14645C7.34171 1.95118 7.65829 1.95118 7.85355 2.14645L9.85355 4.14645C10.0488 4.34171 10.0488 4.65829 9.85355 4.85355C9.65829 5.04882 9.34171 5.04882 9.14645 4.85355L7.5 3.20711L5.85355 4.85355C5.65829 5.04882 5.34171 5.04882 5.14645 4.85355ZM5.14645 10.1464C5.34171 9.95118 5.65829 9.95118 5.85355 10.1465L7.5 11.7929L9.14645 10.1465C9.34171 9.95118 9.65829 9.95118 9.85355 10.1464C10.0488 10.3417 10.0488 10.6583 9.85355 10.8536L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536L5.14645 10.8536C4.95118 10.6583 4.95118 10.3417 5.14645 10.1464Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}

function ArrowDownIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
            <path d="M7.5 2C7.77614 2 8 2.22386 8 2.5L8 11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.65829 13.0488 7.34171 13.0488 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929L7 2.5C7 2.22386 7.22386 2 7.5 2Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}

function ChevronLeftIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}

function ChevronRightIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6.1584 3.13523C6.35985 2.94607 6.67627 2.95601 6.86542 3.15746L10.6154 7.15079C10.7957 7.34289 10.7957 7.64196 10.6154 7.83406L6.86542 11.8274C6.67627 12.0288 6.35985 12.0388 6.1584 11.8496C5.95694 11.6605 5.94699 11.3441 6.13614 11.1426L9.56507 7.49243L6.13614 3.84225C5.94699 3.6408 5.95694 3.32438 6.1584 3.13523Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}

function ChevronsRightIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M4.1584 3.13523C4.35985 2.94607 4.67627 2.95601 4.86542 3.15746L8.61542 7.15079C8.79573 7.34289 8.79573 7.64196 8.61542 7.83406L4.86542 11.8274C4.67627 12.0288 4.35985 12.0388 4.1584 11.8496C3.95694 11.6605 3.94699 11.3441 4.13614 11.1426L7.56507 7.49243L4.13614 3.84225C3.94699 3.6408 3.95694 3.32438 4.1584 3.13523Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            <path d="M8.1584 3.13523C8.35985 2.94607 8.67627 2.95601 8.86542 3.15746L12.6154 7.15079C12.7957 7.34289 12.7957 7.64196 12.6154 7.83406L8.86542 11.8274C8.67627 12.0288 8.35985 12.0388 8.1584 11.8496C7.95694 11.6605 7.94699 11.3441 8.13614 11.1426L11.5651 7.49243L8.13614 3.84225C7.94699 3.6408 7.95694 3.32438 8.1584 3.13523Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    )
}
