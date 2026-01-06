"use client"

import Image from "next/image"
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

interface TemplateCardFullProps {
  title: string
  description: string
  features: string[]
  screenshot: string
  demoUrl?: string
  githubUrl?: string
  icon?: React.ReactNode
}

export function TemplateCardFull({
  title,
  description,
  features,
  screenshot,
  demoUrl,
  githubUrl,
  icon,
}: TemplateCardFullProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 border-border/50 mb-16 md:mb-24">
      <div className="relative w-full overflow-hidden bg-muted">
        <Image
          src={screenshot}
          alt={`${title} screenshot`}
          width={1200}
          height={800}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, calc(100vw - 400px)"
          priority={false}
          loading="lazy"
        />
      </div>
      <CardHeader className="space-y-4 px-6 md:px-8 pt-6 md:pt-8">
        <div>
          <CardTitle className="text-2xl md:text-3xl mb-2">{title}</CardTitle>
          <CardDescription className="text-sm md:text-base leading-relaxed">
            {description}
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-sm px-3 py-1"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col sm:flex-row items-center gap-3 pt-4 px-6 md:px-8 pb-6 md:pb-8">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "flex-1 sm:flex-initial")}
          >
            View Demo
            <ExternalLinkIcon className="ml-2 size-4" />
          </a>
        )}
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 sm:flex-initial")}
          >
            <GithubIcon className="mr-2 size-4" />
            Source Code
          </a>
        )}
      </CardFooter>
    </Card>
  )
}
