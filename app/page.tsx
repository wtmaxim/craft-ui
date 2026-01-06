import { LandingSidebar } from "@/components/landing-sidebar"
import { MobileHeader } from "@/components/mobile-header"
import { TemplateCardFull } from "@/components/template-card-full"
import { MessageSquareIcon, LayoutGridIcon } from "lucide-react"

const templates = [
  {
    title: "AI Chat",
    description: "Modern AI chat interface with support for multiple models, question suggestions and real-time spell checking",
    features: ["Multi-model AI", "Smart Suggestions", "Spell Checking", "Modern Design"],
    screenshot: "/templates/base-ui/ai-chat/public/screenshot.png",
    demoUrl: "https://ai-chat-red-pi.vercel.app/",
    githubUrl: "https://github.com/wtmaxim/craft-ui/tree/main/templates/base-ui/ai-chat",
    icon: <MessageSquareIcon className="size-7 text-primary" />,
  },
  {
    title: "Task Management",
    description: "Task management application with Kanban board, drag-and-drop, advanced filters and dark/light theme",
    features: ["Kanban Board", "Drag & Drop", "Advanced Filters", "Dark/Light Theme"],
    screenshot: "/templates/base-ui/task-management/public/screenshot.png",
    demoUrl: "https://task-management-chi-liard.vercel.app/",
    githubUrl: "https://github.com/wtmaxim/craft-ui/tree/main/templates/base-ui/task-management",
    icon: <LayoutGridIcon className="size-7 text-primary" />,
  },
]

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <LandingSidebar />
      <MobileHeader />
      <main className="flex-1 md:ml-[320px] lg:ml-[400px] min-h-screen pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-24">
          <div className="space-y-12 md:space-y-20">
            {templates.map((template, index) => (
              <TemplateCardFull key={index} {...template} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
