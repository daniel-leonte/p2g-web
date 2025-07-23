"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Zap, FileText, BarChart3, Paperclip, Mic, Loader2 } from "lucide-react"
import { useGemini } from "@/hooks/use-gemini"
import { useToast } from "@/hooks/use-toast"
import { OptimizationResult } from "@/lib/gemini"

export function MainContent() {
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<OptimizationResult | null>(null)
  const { optimize, isLoading, error, clearError } = useGemini()
  const { toast } = useToast()

  const handleOptimize = async () => {
    if (!prompt.trim()) {
      toast({
        title: "No Prompt",
        description: "Please enter a prompt to optimize.",
        variant: "destructive",
      })
      return
    }

    clearError()
    const optimizationResult = await optimize(prompt)
    
    if (optimizationResult) {
      setResult(optimizationResult)
      toast({
        title: "Prompt Optimized",
        description: "Your prompt has been successfully optimized!",
      })
    } else if (error) {
      toast({
        title: "Optimization Failed",
        description: error,
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow default behavior (add newline)
        return
      } else {
        // Prevent default newline and trigger optimization
        e.preventDefault()
        handleOptimize()
      }
    }
  }

  const handleCopyOptimized = () => {
    if (result) {
      navigator.clipboard.writeText(result.optimizedPrompt)
      toast({
        title: "Copied!",
        description: "Optimized prompt copied to clipboard.",
      })
    }
  }

  const handleUseOptimized = () => {
    if (result) {
      setPrompt(result.optimizedPrompt)
      setResult(null)
      toast({
        title: "Prompt Updated",
        description: "Using the optimized prompt as your new input.",
      })
    }
  }

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

        {/* Responsive Prompt Input */}
        <div className="w-full max-w-4xl mb-8">
          <div className="flex items-start gap-3 lg:gap-4 bg-muted border border-border rounded-2xl lg:rounded-3xl p-3 lg:p-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your prompt to optimize, analyze, or enhance..."
              className="flex-1 min-h-8 max-h-32 lg:max-h-40 bg-transparent border-none text-base lg:text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
              disabled={isLoading}
            />
            <div className="flex items-center gap-1 lg:gap-2 pt-1">
              <Button 
                size="sm" 
                variant="ghost" 
                className="rounded-full h-8 w-8 lg:h-10 lg:w-10 shrink-0"
                onClick={handleOptimize}
                disabled={isLoading || !prompt.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Optimization Result */}
        {result && (
          <div className="w-full max-w-4xl mb-8 p-6 bg-card border border-border rounded-2xl lg:rounded-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Optimized Prompt</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-2xl lg:rounded-3xl">
                <p className="text-sm font-medium text-muted-foreground mb-2">Original:</p>
                <p className="text-sm">{result.originalPrompt}</p>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-2xl lg:rounded-3xl border border-primary/20">
                <p className="text-sm font-medium text-primary mb-2">Optimized:</p>
                <p className="text-sm">{result.optimizedPrompt}</p>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" onClick={handleCopyOptimized}>
                  Copy Optimized
                </Button>
                <Button size="sm" variant="outline" onClick={handleUseOptimized}>
                  Use This Prompt
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setResult(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            { 
              icon: Sparkles, 
              label: "Optimize Prompt", 
              description: "Enhance clarity & effectiveness",
              color: "text-primary",
              onClick: handleOptimize,
              disabled: isLoading || !prompt.trim()
            },
            { 
              icon: BarChart3, 
              label: "Analyze Performance", 
              description: "Evaluate prompt quality",
              color: "text-chart-2",
              onClick: () => {},
              disabled: true
            },
            { 
              icon: Zap, 
              label: "Generate Variations", 
              description: "Create alternative versions",
              color: "text-chart-3",
              onClick: () => {},
              disabled: true
            },
            { 
              icon: FileText, 
              label: "Template Library", 
              description: "Browse proven prompts",
              color: "text-chart-4",
              onClick: () => {},
              disabled: true
            },
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-24 lg:h-28 flex flex-col gap-2 bg-card hover:bg-accent hover:text-accent-foreground border-border group transition-all duration-200 disabled:opacity-50"
              onClick={action.onClick}
              disabled={action.disabled}
            >
              {action.icon === Sparkles && isLoading ? (
                <Loader2 className="w-6 h-6 lg:w-7 lg:h-7 animate-spin" />
              ) : (
                <action.icon className={`w-6 h-6 lg:w-7 lg:h-7 ${action.color} group-hover:scale-110 transition-transform`} />
              )}
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
