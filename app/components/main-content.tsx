"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Zap, FileText, BarChart3, Paperclip, Mic } from "lucide-react"

export function MainContent() {
  const [prompt, setPrompt] = useState("")

  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-primary rounded-full relative">
              <div className="absolute inset-1 border-2 border-primary-foreground rounded-full" />
              <div className="absolute top-2 left-2 w-2 h-4 bg-primary-foreground transform rotate-45" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Prompt2Go</h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
          Optimize your LLM prompts for better AI interactions and results
        </p>

        {/* Desktop Prompt Input */}
        <div className="hidden lg:block w-full max-w-4xl mb-8">
          <div className="relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt to optimize, analyze, or enhance..."
              className="w-full h-16 bg-muted border-border rounded-full px-6 pr-24 text-lg placeholder:text-muted-foreground focus:border-ring resize-none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button size="sm" variant="ghost" className="rounded-full">
                <Sparkles className="w-5 h-5 text-primary" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Mic className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Prompt Input */}
        <div className="lg:hidden w-full mb-8">
          <div className="relative">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt to optimize..."
              className="w-full h-14 bg-muted border-border rounded-full px-4 pr-20 placeholder:text-muted-foreground focus:border-ring"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8">
                <Sparkles className="w-4 h-4 text-primary" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full h-8 w-8">
                <Paperclip className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            { 
              icon: Sparkles, 
              label: "Optimize Prompt", 
              description: "Enhance clarity & effectiveness",
              color: "text-primary" 
            },
            { 
              icon: BarChart3, 
              label: "Analyze Performance", 
              description: "Evaluate prompt quality",
              color: "text-chart-2" 
            },
            { 
              icon: Zap, 
              label: "Generate Variations", 
              description: "Create alternative versions",
              color: "text-chart-3" 
            },
            { 
              icon: FileText, 
              label: "Template Library", 
              description: "Browse proven prompts",
              color: "text-chart-4" 
            },
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-24 lg:h-28 flex flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground border-border group transition-all duration-200"
            >
              <action.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${action.color} group-hover:scale-110 transition-transform`} />
              <div className="text-center">
                <div className="text-sm lg:text-base font-medium text-card-foreground">{action.label}</div>
                <div className="text-xs text-muted-foreground hidden lg:block">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>

        {/* Features Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl">
          <p>
            Analyze prompt structure • Improve response quality • Track performance metrics • 
            Build template library • Export optimized prompts
          </p>
        </div>
      </div>
    </div>
  )
}
