"use client"

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

// Données statiques des documents
const documents = [
  {
    id: "1",
    name: "CV Maxime DERAME_signed.pdf",
    type: "pdf",
    date: "Feb 19, 2025",
    links: 1,
    versions: 0,
    views: 0,
  },
  {
    id: "2",
    name: "VOLONTAIRES POLE SOCIAL.xls",
    type: "excel",
    date: "Dec 19, 2024",
    links: 1,
    versions: 2,
    views: 3,
  },
  {
    id: "3",
    name: "Rapport_annuel_2024.docx",
    type: "word",
    date: "Jan 15, 2025",
    links: 2,
    versions: 1,
    views: 12,
  },
  {
    id: "4",
    name: "Logo_entreprise.png",
    type: "image",
    date: "Mar 1, 2025",
    links: 0,
    versions: 0,
    views: 45,
  },
]

// Fonction pour obtenir l'icône selon le type de fichier
function getFileIcon(type: string) {
  // Pour l'instant, on utilise FileIcon pour tous les types
  // Vous pouvez ajouter des icônes spécifiques plus tard
  return FileIcon
}

// Fonction pour obtenir la couleur selon le type de fichier
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

// Fonction pour formater les métadonnées
function formatMetadata(doc: typeof documents[0]) {
  const parts = [doc.date]
  if (doc.links > 0) {
    parts.push(`${doc.links} ${doc.links === 1 ? "Lien" : "Liens"}`)
  }
  if (doc.versions > 0) {
    parts.push(`${doc.versions} ${doc.versions === 1 ? "Version" : "Versions"}`)
  }
  return parts.join(" • ")
}

export default function Page() {
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
                  Documents
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tous les documents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Header principal */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold">Tous les documents</h1>
              <p className="text-sm text-muted-foreground">
                Gérez tous vos documents en un seul endroit
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <HugeiconsIcon icon={FolderIcon} />
                <span className="sr-only">Créer un dossier</span>
              </Button>
              <UploadDocumentDialog />
            </div>
          </div>

          {/* Barre de recherche et filtre */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <HugeiconsIcon
                icon={SearchIcon}
                className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <HugeiconsIcon icon={MoreHorizontalCircle01Icon} />
              <span className="sr-only">Filtrer</span>
            </Button>
          </div>

          {/* Compteur de documents */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <HugeiconsIcon icon={FileIcon} className="size-4" />
            <span>{documents.length} {documents.length === 1 ? "document" : "documents"}</span>
          </div>

          {/* Liste de documents */}
          <div className="flex flex-col gap-2">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    {/* Icône du type de fichier */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border bg-background">
                      <HugeiconsIcon
                        icon={getFileIcon(doc.type)}
                        className={`size-6 ${getFileColor(doc.type)}`}
                      />
                    </div>

                    {/* Informations du document */}
                    <Link href={`/documents/${doc.id}`} className="flex-1 min-w-0">
                      <h3 className="font-medium truncate hover:text-primary transition-colors">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatMetadata(doc)}
                      </p>
                    </Link>

                    {/* Vues et menu */}
                    <div className="flex items-center gap-3 shrink-0">
                      <Button variant="ghost" size="sm" className="gap-1.5">
                        <HugeiconsIcon icon={EyeIcon} className="size-4" />
                        <span className="text-xs">{doc.views} {doc.views === 1 ? "vue" : "vues"}</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={<Button variant="ghost" size="icon" className="h-8 w-8" />}
                        >
                          <HugeiconsIcon icon={MoreVerticalCircle01Icon} className="size-4" />
                          <span className="sr-only">Options</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Télécharger</DropdownMenuItem>
                          <DropdownMenuItem>Partager</DropdownMenuItem>
                          <DropdownMenuItem>Renommer</DropdownMenuItem>
                          <DropdownMenuItem>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
