import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <Badge variant="secondary" className="mb-4">
          2 Templates Disponibles
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
          Craft UI
          <span className="block text-primary mt-2">Templates Next.js Prêts à l'emploi</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Découvrez une collection de templates modernes et élégants pour accélérer le développement de vos applications Next.js. 
          Chaque template est soigneusement conçu avec les meilleures pratiques.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="#templates"
            className={cn(buttonVariants({ size: "lg" }), "text-sm")}
          >
            Explorer les Templates
            <ArrowDownIcon className="ml-2 size-4" />
          </Link>
          <a 
            href="https://github.com/wtmaxim/craft-ui" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "text-sm")}
          >
            Voir sur GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
