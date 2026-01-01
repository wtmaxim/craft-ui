"use client"

import * as React from "react"
import {
  FileText,
  X,
  Sparkles,
  ArrowUp,
  ChevronDown,
  User,
  Bot,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatInterface() {
  const [model, setModel] = React.useState("grok-4.1-fast")
  const [query, setQuery] = React.useState("")
  const [showProCard, setShowProCard] = React.useState(true)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const editableRef = React.useRef<HTMLDivElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Simulation de vérification orthographique - mots à souligner
  const formatTextWithSpellCheck = React.useCallback((text: string) => {
    if (!text) return ""
    const spellCheckWords = ["mechanical", "programming"]
    const words = text.split(/(\s+)/)
    return words.map((word) => {
      const cleanWord = word.trim().toLowerCase()
      const shouldHighlight = spellCheckWords.some(w => cleanWord.includes(w.toLowerCase()))
      if (shouldHighlight && word.trim()) {
        return `<span class="underline decoration-red-500 decoration-wavy decoration-2 underline-offset-2">${word}</span>`
      }
      return word
    }).join("")
  }, [])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const text = e.currentTarget.textContent || ""
    setQuery(text)
  }

  // Fonction pour envoyer un message
  const handleSendMessage = async () => {
    if (!query.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setQuery("")
    if (editableRef.current) {
      editableRef.current.textContent = ""
    }

    setIsLoading(true)

    // Simuler une réponse de l'IA (à remplacer par un vrai appel API)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Voici une réponse simulée à votre question: "${userMessage.content}". En utilisant le modèle ${model}, je peux vous fournir des informations détaillées et sourcées en temps réel.`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  // Gérer l'envoi avec la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Questions préfaites suggérées
  const suggestedQuestions = [
    "What are the latest trends in AI development?",
    "Explain quantum computing in simple terms",
    "How does machine learning differ from deep learning?",
    "What are the best practices for React performance?",
    "Compare TypeScript vs JavaScript for modern web development",
    "What is the impact of climate change on global economy?"
  ]

  // Fonction pour gérer le clic sur une question suggérée
  const handleSuggestedQuestion = (question: string) => {
    setQuery(question)
    if (editableRef.current) {
      editableRef.current.textContent = question
      // Focus sur le champ pour permettre l'édition
      editableRef.current.focus()
      // Placer le curseur à la fin
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(editableRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  // Fonctions pour la carte "Passer à Pro"
  const handleCloseProCard = () => {
    setShowProCard(false)
  }

  const handleUpgrade = () => {
    console.log("Upgrade clicked")
    // TODO: Implémenter la logique de mise à niveau
  }

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  React.useEffect(() => {
    if (editableRef.current) {
      const formatted = formatTextWithSpellCheck(query)
      // Ne mettre à jour que si le contenu est différent pour éviter les boucles infinies
      if (editableRef.current.textContent !== query && editableRef.current.innerHTML !== formatted) {
        const selection = window.getSelection()
        const range = selection?.rangeCount ? selection.getRangeAt(0) : null
        editableRef.current.innerHTML = formatted
        // Restaurer la position du curseur si possible
        if (range && editableRef.current.firstChild) {
          try {
            const newRange = document.createRange()
            newRange.selectNodeContents(editableRef.current)
            newRange.collapse(false)
            selection?.removeAllRanges()
            selection?.addRange(newRange)
          } catch {
            // Ignore les erreurs de sélection
          }
        }
      }
    }
  }, [query, formatTextWithSpellCheck])

  return (
    <div className="relative flex flex-1 flex-col h-full">
      {/* Background pattern avec carrés très légers */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Messages Area - Affichée uniquement s'il y a des messages */}
      {messages.length > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${message.role === "user"
                      ? "bg-[#8B4513] text-white"
                      : "bg-muted/50 text-foreground"
                      }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5 text-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#8B4513] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="max-w-[70%] rounded-2xl px-4 py-3 bg-muted/50">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Main Chat Input - En bas quand il y a des messages */}
          <div className="relative w-full max-w-4xl mx-auto px-4 pb-8">
            <div className="relative">
              {/* Zone de saisie avec vérification orthographique */}
              <div className="relative min-h-32 rounded-2xl border bg-muted/50 px-4 py-6 pr-20 text-base shadow-sm">
                <div
                  ref={editableRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[60px] outline-none whitespace-pre-wrap break-words empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  data-placeholder="Ask a question..."
                />

                {/* Toolbar intégrée dans la zone de saisie */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-end">

                  <div className="flex items-center gap-2">
                    {/* Sélecteur de modèle IA */}
                    <Select value={model} onValueChange={(value) => value && setModel(value)}>
                      <SelectTrigger size="sm" className="h-auto rounded-full border-0 bg-transparent px-2 py-1 shadow-none hover:bg-muted/80">
                        <SelectValue />
                        <ChevronDown className="ml-1 size-3.5" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grok-4.1-fast">Grok 4.1 Fast</SelectItem>
                        <SelectItem value="grok-4.1-deep">Grok 4.1 Deep</SelectItem>
                        <SelectItem value="grok-4.0">Grok 4.0</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Icône document */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <FileText className="size-4" />
                    </Button>

                    {/* Icône baguette magique */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <Sparkles className="size-4" />
                    </Button>

                    {/* Bouton d'envoi circulaire marron foncé */}
                    <Button
                      size="icon"
                      className="size-9 rounded-full bg-[#8B4513] hover:bg-[#7A3A12] text-white shadow-sm disabled:opacity-50"
                      onClick={handleSendMessage}
                      disabled={!query.trim() || isLoading}
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* État initial - Chat centré */
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Brand Name */}
          <h1 className="relative mb-8 text-5xl font-semibold text-foreground">ChatAI</h1>

          {/* Main Chat Input - Centré au début */}
          <div className="relative w-full max-w-4xl">
            <div className="relative">
              {/* Zone de saisie avec vérification orthographique */}
              <div className="relative min-h-32 rounded-2xl border bg-muted/50 px-4 py-6 pr-20 text-base shadow-sm">
                <div
                  ref={editableRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="min-h-[60px] outline-none whitespace-pre-wrap break-words empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground"
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  data-placeholder="Ask a question..."
                />

                {/* Toolbar intégrée dans la zone de saisie */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-end">

                  <div className="flex items-center gap-2">
                    {/* Sélecteur de modèle IA */}
                    <Select value={model} onValueChange={(value) => value && setModel(value)}>
                      <SelectTrigger size="sm" className="h-auto rounded-full border-0 bg-transparent px-2 py-1 shadow-none hover:bg-muted/80">
                        <SelectValue />
                        <ChevronDown className="ml-1 size-3.5" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grok-4.1-fast">Grok 4.1 Fast</SelectItem>
                        <SelectItem value="grok-4.1-deep">Grok 4.1 Deep</SelectItem>
                        <SelectItem value="grok-4.0">Grok 4.0</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Icône document */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <FileText className="size-4" />
                    </Button>

                    {/* Icône baguette magique */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                    >
                      <Sparkles className="size-4" />
                    </Button>

                    {/* Bouton d'envoi circulaire marron foncé */}
                    <Button
                      size="icon"
                      className="size-9 rounded-full bg-[#8B4513] hover:bg-[#7A3A12] text-white shadow-sm disabled:opacity-50"
                      onClick={handleSendMessage}
                      disabled={!query.trim() || isLoading}
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions suggérées */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  className="rounded-full bg-muted/50 hover:bg-muted border-0 text-sm px-4 py-2 w-full text-left justify-start whitespace-normal h-auto min-h-[2.5rem]"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  <span className="line-clamp-2">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upgrade to Pro Card */}
      {showProCard && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-80 sm:max-w-sm">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-semibold">Upgrade to Pro</CardTitle>
              <CardAction>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={handleCloseProCard}
                >
                  <X className="size-4" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Select from the best models for each query and access advanced tools such as Research and Labs.
              </p>
              <Button
                variant="default"
                className="w-full"
                onClick={handleUpgrade}
              >
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
