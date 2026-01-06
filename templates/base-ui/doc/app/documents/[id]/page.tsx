"use client"

import { use } from "react"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  LinkIcon,
  EyeIcon,
} from "@hugeicons/core-free-icons"

// Extended mock data for details
const documentDetails: Record<string, {
  id: string
  name: string
  type: string
  date: string
  links: number
  versions: number
  views: number
  viewStats: Array<{ period: string; views: number }>
  metrics: {
    totalViews: number
    averageCompletion: number
    averageDuration: number
  }
  sharedLinks: Array<{
    id: string
    url: string
    controls: number
    views: number
    lastViewed: string
    active: boolean
  }>
  visitors: Array<{
    email: string
    viewDuration: number
    completion: number
    lastViewed: string
  }>
}> = {
  "1": {
    id: "1",
    name: "resume_signed.pdf",
    type: "pdf",
    date: "Feb 19, 2025",
    links: 1,
    versions: 0,
    views: 0,
    viewStats: [
      { period: "1", views: 0 },
      { period: "2", views: 0 },
      { period: "3", views: 0 },
      { period: "4", views: 0 },
      { period: "5", views: 0 },
      { period: "6", views: 0 },
      { period: "7", views: 0 },
      { period: "8", views: 0 },
      { period: "9", views: 0 },
      { period: "10", views: 0 },
    ],
    metrics: {
      totalViews: 0,
      averageCompletion: 0,
      averageDuration: 0,
    },
    sharedLinks: [],
    visitors: [],
  },
  "2": {
    id: "2",
    name: "volunteers_data.xls",
    type: "excel",
    date: "Dec 19, 2024",
    links: 1,
    versions: 2,
    views: 3,
    viewStats: [
      { period: "1", views: 0.07 },
      { period: "2", views: 0.02 },
      { period: "3", views: 0.01 },
      { period: "4", views: 0.03 },
      { period: "5", views: 0.01 },
      { period: "6", views: 0.02 },
      { period: "7", views: 0.01 },
      { period: "8", views: 0.02 },
      { period: "9", views: 0.01 },
      { period: "10", views: 0.07 },
    ],
    metrics: {
      totalViews: 3,
      averageCompletion: 633,
      averageDuration: 16,
    },
    sharedLinks: [
      {
        id: "3ukwe",
        url: "https://example.com/view/3ukwe",
        controls: 2,
        views: 3,
        lastViewed: "Sep 23, 2025",
        active: true,
      },
    ],
    visitors: [
      {
        email: "user1@example.com",
        viewDuration: 15,
        completion: 200,
        lastViewed: "Sep 23, 2025",
      },
      {
        email: "user2@example.com",
        viewDuration: 13,
        completion: 800,
        lastViewed: "Mar 28, 2025",
      },
      {
        email: "user3@example.com",
        viewDuration: 20,
        completion: 900,
        lastViewed: "Jan 18, 2025",
      },
    ],
  },
  "3": {
    id: "3",
    name: "annual_report_2024.docx",
    type: "word",
    date: "Jan 15, 2025",
    links: 2,
    versions: 1,
    views: 12,
    viewStats: [
      { period: "1", views: 0.05 },
      { period: "2", views: 0.08 },
      { period: "3", views: 0.06 },
      { period: "4", views: 0.04 },
      { period: "5", views: 0.07 },
      { period: "6", views: 0.09 },
      { period: "7", views: 0.05 },
      { period: "8", views: 0.06 },
      { period: "9", views: 0.08 },
      { period: "10", views: 0.07 },
    ],
    metrics: {
      totalViews: 12,
      averageCompletion: 450,
      averageDuration: 25,
    },
    sharedLinks: [
      {
        id: "abc123",
        url: "https://example.com/view/abc123",
        controls: 1,
        views: 8,
        lastViewed: "Feb 10, 2025",
        active: true,
      },
      {
        id: "def456",
        url: "https://example.com/view/def456",
        controls: 0,
        views: 4,
        lastViewed: "Jan 20, 2025",
        active: false,
      },
    ],
    visitors: [
      {
        email: "user1@example.com",
        viewDuration: 30,
        completion: 500,
        lastViewed: "Feb 10, 2025",
      },
      {
        email: "user2@example.com",
        viewDuration: 20,
        completion: 400,
        lastViewed: "Jan 25, 2025",
      },
    ],
  },
  "4": {
    id: "4",
    name: "company_logo.png",
    type: "image",
    date: "Mar 1, 2025",
    links: 0,
    versions: 0,
    views: 45,
    viewStats: [
      { period: "1", views: 0.1 },
      { period: "2", views: 0.15 },
      { period: "3", views: 0.12 },
      { period: "4", views: 0.18 },
      { period: "5", views: 0.14 },
      { period: "6", views: 0.16 },
      { period: "7", views: 0.13 },
      { period: "8", views: 0.17 },
      { period: "9", views: 0.15 },
      { period: "10", views: 0.19 },
    ],
    metrics: {
      totalViews: 45,
      averageCompletion: 950,
      averageDuration: 5,
    },
    sharedLinks: [],
    visitors: [
      {
        email: "viewer1@example.com",
        viewDuration: 3,
        completion: 1000,
        lastViewed: "Mar 15, 2025",
      },
      {
        email: "viewer2@example.com",
        viewDuration: 7,
        completion: 900,
        lastViewed: "Mar 10, 2025",
      },
    ],
  },
}

export default function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const document = documentDetails[id]

  // Chart configuration
  const chartConfig: ChartConfig = {
    views: {
      label: "Views",
      color: "hsl(var(--chart-1))",
    },
  }

  // Transform data for chart
  const chartData = document
    ? document.viewStats.map((stat) => ({
        period: stat.period,
        views: stat.views,
      }))
    : []

  if (!document) {
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
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-semibold mb-2">Document not found</h1>
              <p className="text-muted-foreground mb-4">
                The document you are looking for does not exist.
              </p>
              <Link href="/">
                <Button>Back to documents</Button>
              </Link>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

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
                <BreadcrumbLink href="/">Documents</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="truncate max-w-[200px]">
                  {document.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header with title and button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold truncate">{document.name}</h1>
              <p className="text-sm text-muted-foreground">
                {document.date} • {document.links} {document.links === 1 ? "Link" : "Links"} • {document.versions} {document.versions === 1 ? "Version" : "Versions"}
              </p>
            </div>
            <Button>
              <HugeiconsIcon icon={PlusSignIcon} />
              Create link
            </Button>
          </div>

          {/* Excel banner */}
          {document.type === "excel" && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">Advanced Excel mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Upgrade to Pro to unlock advanced Excel mode with additional features.
                      </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Upgrade to Pro
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* View Statistics section */}
          <Card>
            <CardHeader>
              <CardTitle>View Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chart with recharts */}
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 12,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="period"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value: string) => `Period ${value}`}
                      />
                    }
                  />
                  <Bar
                    dataKey="views"
                    fill="var(--color-views)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total views
                  </p>
                  <p className="text-2xl font-semibold">{document.metrics.totalViews}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average completion rate
                  </p>
                  <p className="text-2xl font-semibold">
                    {document.metrics.averageCompletion}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Average view duration
                  </p>
                  <p className="text-2xl font-semibold">
                    {document.metrics.averageDuration}s
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All Links section */}
          <Card>
            <CardHeader>
              <CardTitle>All Links</CardTitle>
            </CardHeader>
            <CardContent>
              {document.sharedLinks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Link ID</th>
                        <th className="text-left py-2 px-4 font-medium">URL</th>
                        <th className="text-left py-2 px-4 font-medium">Controls</th>
                        <th className="text-left py-2 px-4 font-medium">Views</th>
                        <th className="text-left py-2 px-4 font-medium">Last viewed</th>
                        <th className="text-left py-2 px-4 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {document.sharedLinks.map((link) => (
                        <tr key={link.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono text-xs">
                            #{link.id}
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline truncate block max-w-xs"
                            >
                              {link.url}
                            </a>
                          </td>
                          <td className="py-3 px-4">{link.controls}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <HugeiconsIcon icon={EyeIcon} className="size-4" />
                              {link.views}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {link.lastViewed}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={link.active ? "default" : "outline"}>
                              {link.active ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <HugeiconsIcon icon={LinkIcon} className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No shared links</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* All Visitors section */}
          <Card>
            <CardHeader>
              <CardTitle>All Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              {document.visitors.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4 font-medium">Email</th>
                          <th className="text-left py-2 px-4 font-medium">
                            View duration
                          </th>
                          <th className="text-left py-2 px-4 font-medium">
                            Completion rate
                          </th>
                          <th className="text-left py-2 px-4 font-medium">Last viewed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {document.visitors.map((visitor, index) => (
                          <tr key={index} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{visitor.email}</td>
                            <td className="py-3 px-4">{visitor.viewDuration} secs</td>
                            <td className="py-3 px-4">{visitor.completion}%</td>
                            <td className="py-3 px-4 text-muted-foreground">
                              {visitor.lastViewed}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Simulated pagination */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-muted-foreground">
                      10 items per page
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Page 1 of 1
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <HugeiconsIcon icon={EyeIcon} className="size-8 mx-auto mb-2 opacity-50" />
                  <p>No visitors</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
