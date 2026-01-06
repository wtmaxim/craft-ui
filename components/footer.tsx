import { GithubIcon } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>© {new Date().getFullYear()} Craft UI. Tous droits réservés.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/wtmaxim/craft-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="size-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
