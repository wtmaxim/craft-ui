"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface TemplateCardProps {
  title: string
  description: string
  features: string[]
  screenshot: string
  demoUrl?: string
  githubUrl?: string
  icon?: React.ReactNode
}

export function TemplateCard({
  title,
  description,
  features,
  screenshot,
  demoUrl,
  githubUrl,
  icon,
}: TemplateCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] flex flex-col h-full border-border/50">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={screenshot}
          alt={`${title} screenshot`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        {icon && (
          <div className="absolute top-4 left-4 flex items-center justify-center size-12 rounded-lg bg-background/90 backdrop-blur-sm border border-border shadow-sm">
            {icon}
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default" }), "flex-1 w-full sm:w-auto")}
          >
            Voir la démo
            <ExternalLinkIcon className="ml-2 size-3.5" />
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "flex-1 w-full sm:w-auto")}
          >
            <GithubIcon className="mr-2 size-3.5" />
            Code source
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
