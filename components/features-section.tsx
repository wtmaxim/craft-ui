import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  CodeIcon,
  PaletteIcon,
  ZapIcon,
  ShieldCheckIcon,
} from "lucide-react"

const features = [
  {
    icon: CodeIcon,
    title: "Code Moderne",
    description: "Construit avec Next.js 16, React 19 et TypeScript pour des performances optimales.",
  },
  {
    icon: PaletteIcon,
    title: "Design Élégant",
    description: "Interface utilisateur soignée avec Base UI et Tailwind CSS, support du dark mode.",
  },
  {
    icon: ZapIcon,
    title: "Prêt à l'emploi",
    description: "Templates complets et fonctionnels, prêts à être déployés ou personnalisés.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Meilleures Pratiques",
    description: "Code propre, architecture solide et respect des standards de l'industrie.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Pourquoi choisir Craft UI ?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des templates conçus pour vous faire gagner du temps et vous inspirer
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border/50 transition-all duration-200 hover:shadow-md hover:border-border">
                <CardHeader>
                  <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 mb-4">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
