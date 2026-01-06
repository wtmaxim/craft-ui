"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  ArrowUp01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

function Dialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return <AlertDialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return <AlertDialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  ...props
}: AlertDialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 bg-background ring-foreground/10 rounded-xl ring-1 duration-100 fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 outline-none p-0",
          className
        )}
        {...props}
      />
    </DialogPortal>
  )
}

function DialogClose({
  className,
  ...props
}: AlertDialogPrimitive.Close.Props) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(className)}
      render={
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
        />
      }
      {...props}
    >
      <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
      <span className="sr-only">Close</span>
    </AlertDialogPrimitive.Close>
  )
}

export function UploadDocumentDialog() {
  const [activeTab, setActiveTab] = React.useState<"document" | "notion">("document")

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            <HugeiconsIcon icon={PlusSignIcon} />
            Add document
          </Button>
        }
      />
      <DialogContent>
        <DialogClose />
        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="flex gap-1 border-b">
            <button
              type="button"
              onClick={() => setActiveTab("document")}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "document"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Document
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("notion")}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "notion"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Notion Page
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {activeTab === "document" ? (
              <>
                {/* Title */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Share a document</h2>
                  <p className="text-sm text-muted-foreground">
                    After uploading the document, create a shareable link. Upload larger files and more{" "}
                    <a href="#" className="underline hover:text-foreground">
                      file types
                    </a>{" "}
                    with a higher plan.
                  </p>
                </div>

                {/* Upload area */}
                <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    <HugeiconsIcon
                      icon={ArrowUp01Icon}
                      className="size-12 text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Choose a file to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Only *.pdf, *.xls, *.xlsx, *.csv, *.tsv, *.ods, *.png, *.jpeg, *.jpg
                    </p>
                  </div>
                </div>

                {/* Upload button */}
                <Button className="w-full" size="lg">
                  Upload document
                </Button>

                {/* Footer */}
                <p className="text-xs text-center text-muted-foreground">
                  Want to upload multiple files or share a link as a document?
                </p>
              </>
            ) : (
              <>
                {/* Title */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Share a Notion page</h2>
                  <p className="text-sm text-muted-foreground">
                    After submitting the Notion link, a shareable link will be generated and copied to your clipboard. Just like with a PDF document.
                  </p>
                </div>

                {/* Input field */}
                <div className="space-y-2">
                  <Label htmlFor="notion-link">Notion Page Link</Label>
                  <Input
                    id="notion-link"
                    type="text"
                    placeholder="notion.site/..."
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Notion page must be publicly shared.
                  </p>
                </div>

                {/* Save button */}
                <Button className="w-full" size="lg">
                  Save Notion link
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
