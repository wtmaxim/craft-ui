"use client"

import * as React from "react"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function NavUsage() {
    return (
        <SidebarGroup className="mt-auto px-2">
            <Card size="sm" className="bg-sidebar-accent/30 border-none shadow-none ring-0">
                <CardContent className="gap-5 py-4 flex flex-col">
                    <div className="flex flex-col gap-2.5">
                        <div className="text-sm font-medium tracking-tight">2 / 50 links</div>
                        <div className="h-1 w-full rounded-full bg-sidebar-accent/50 overflow-hidden">
                            <div
                                className="h-full bg-sidebar-foreground transition-all duration-500 ease-in-out"
                                style={{ width: "4%" }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <div className="text-sm font-medium tracking-tight">2 / 50 documents</div>
                        <div className="h-1 w-full rounded-full bg-sidebar-accent/50 overflow-hidden">
                            <div
                                className="h-full bg-sidebar-foreground transition-all duration-500 ease-in-out"
                                style={{ width: "4%" }}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4">
                    <button className="text-[13px] text-sidebar-foreground/50 hover:text-sidebar-foreground text-left transition-colors leading-relaxed">
                        Change plan to increase usage limits
                    </button>
                </CardFooter>
            </Card>
        </SidebarGroup>
    )
}

