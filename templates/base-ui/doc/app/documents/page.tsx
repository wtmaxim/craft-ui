"use client"

import * as React from "react"
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
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PlusSignIcon,
  FolderIcon,
  SearchIcon,
  MoreVerticalCircle01Icon,
  FileIcon,
  EyeIcon,
  MoreHorizontalCircle01Icon,
} from "@hugeicons/core-free-icons"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Static document data
const documents = [
  {
    id: "1",
    name: "resume_signed.pdf",
    type: "pdf",
    date: "Feb 19, 2025",
    links: 1,
    versions: 0,
    views: 0,
  },
  {
    id: "2",
    name: "volunteers_data.xls",
    type: "excel",
    date: "Dec 19, 2024",
    links: 1,
    versions: 2,
    views: 3,
  },
  {
    id: "3",
    name: "annual_report_2024.docx",
    type: "word",
    date: "Jan 15, 2025",
    links: 2,
    versions: 1,
    views: 12,
  },
  {
    id: "4",
    name: "company_logo.png",
    type: "image",
    date: "Mar 1, 2025",
    links: 0,
    versions: 0,
    views: 45,
  },
]

// Function to get icon based on file type
function getFileIcon(type: string) {
  // For now, we use FileIcon for all types
  // You can add specific icons later
  return FileIcon
}

// Function to get color based on file type
function getFileColor(type: string) {
  switch (type) {
    case "pdf":
      return "text-red-600"
    case "excel":
      return "text-green-600"
    case "word":
      return "text-blue-600"
    case "image":
      return "text-purple-600"
    default:
      return "text-muted-foreground"
  }
}

// Function to format metadata
function formatMetadata(doc: typeof documents[0]) {
  const parts = [doc.date]
  if (doc.links > 0) {
    parts.push(`${doc.links} ${doc.links === 1 ? "Link" : "Links"}`)
  }
  if (doc.versions > 0) {
    parts.push(`${doc.versions} ${doc.versions === 1 ? "Version" : "Versions"}`)
  }
  return parts.join(" • ")
}

export default function Page() {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [documentToDelete, setDocumentToDelete] = React.useState<{
    id: string
    name: string
  } | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleDeleteClick = (doc: typeof documents[0]) => {
    setDocumentToDelete({ id: doc.id, name: doc.name })
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    // TODO: Implement delete logic here
    console.log("Deleting document:", documentToDelete)
    setDeleteDialogOpen(false)
    setDocumentToDelete(null)
  }

  // Filter documents based on search query
  const filteredDocuments = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return documents
    }
    const query = searchQuery.toLowerCase()
    return documents.filter((doc) =>
      doc.name.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query)
    )
  }, [searchQuery])

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Documents
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>All documents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Main header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">All documents</h1>
              <p className="text-sm text-muted-foreground">
                Manage all your documents in one place
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <HugeiconsIcon icon={FolderIcon} />
                <span className="sr-only">Create folder</span>
              </Button>
              <UploadDocumentDialog />
            </div>
          </div>

          {/* Search bar and filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <HugeiconsIcon
                icon={SearchIcon}
                className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <HugeiconsIcon icon={MoreHorizontalCircle01Icon} />
              <span className="sr-only">Filter</span>
            </Button>
          </div>

          {/* Document counter */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={FileIcon} className="size-4" />
            <span>
              {filteredDocuments.length} {filteredDocuments.length === 1 ? "document" : "documents"}
              {searchQuery && filteredDocuments.length !== documents.length && (
                <span className="ml-1">of {documents.length}</span>
              )}
            </span>
          </div>

          {/* Document list */}
          <div className="flex flex-col gap-2">
            {filteredDocuments.length === 0 ? (
              <Card>
                <CardHeader>
                  <div className="text-center py-8 text-muted-foreground">
                    <HugeiconsIcon icon={FileIcon} className="size-8 mx-auto mb-2 opacity-50" />
                    <p>No documents found</p>
                    {searchQuery && (
                      <p className="text-xs mt-1">Try a different search term</p>
                    )}
                  </div>
                </CardHeader>
              </Card>
            ) : (
              filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* File type icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border bg-background">
                      <HugeiconsIcon
                        icon={getFileIcon(doc.type)}
                        className={`size-6 ${getFileColor(doc.type)}`}
                      />
                    </div>

                    {/* Document information */}
                    <Link href={`/documents/${doc.id}`} className="flex-1 min-w-0">
                      <h3 className="font-medium truncate hover:text-primary transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatMetadata(doc)}
                      </p>
                    </Link>

                    {/* Views and menu */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <HugeiconsIcon icon={EyeIcon} className="size-4" />
                        <span className="text-xs">{doc.views} {doc.views === 1 ? "view" : "views"}</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="ghost" size="icon" className="h-8 w-8" />}
                        >
                          <HugeiconsIcon icon={MoreVerticalCircle01Icon} className="size-4" />
                          <span className="sr-only">Options</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault()
                              handleDeleteClick(doc)
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
              </Card>
              ))
            )}
          </div>
        </div>
      </SidebarInset>

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete document</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{documentToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}
