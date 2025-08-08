"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, FolderOpen } from "lucide-react"
import { useGemini } from "@/hooks/use-gemini"
import { useToast } from "@/hooks/use-toast"
import { useSessionStorage } from "@/hooks/use-session-storage"
import { OptimizationResult } from "@/lib/gemini"
import { Project } from "@/lib/storage"
import { FormattedText } from "@/components/ui/formatted-text"

export function MainContent() {
  const [prompt, setPrompt] = useSessionStorage('prompt2go-current-prompt', "")
  const [result, setResult] = useSessionStorage<OptimizationResult | null>('prompt2go-optimization-result', null)
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useSessionStorage<string>('prompt2go-selected-project', '')
  const { optimize, isLoading, error, clearError } = useGemini()
  const { toast } = useToast()

  // Load projects from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('p2g-projects')
      if (stored) {
        setProjects(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Failed to load projects:', error)
    }
  }, [])

  const handleOptimize = async () => {
    if (!prompt.trim()) {
      toast({
        title: "No Prompt",
        description: "Please enter a prompt to optimize.",
        variant: "destructive",
      })
      return
    }

    // Find selected project
    const selectedProject = selectedProjectId && selectedProjectId !== 'none'
      ? projects.find(p => p.id === selectedProjectId) 
      : undefined

    // Clear previous result before new optimization
    setResult(null)
    clearError()
    const optimizationResult = await optimize(prompt, selectedProject)
    
    if (optimizationResult) {
      setResult(optimizationResult)
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


  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <Image
            src="/promt2go-icon.png"
            alt="Prompt2Go Logo"
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">Prompt2Go</h1>
        </div>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl">
          Optimize your LLM prompts for better AI interactions and results
        </p>

        {/* Project Selector */}
        {projects.length > 0 && (
          <div className="w-full max-w-4xl mb-6">
            <div className="flex items-center justify-center gap-3">
              <FolderOpen className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-80 h-10">
                  <SelectValue placeholder="Select project (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No project</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center mt-2 h-6">
              {selectedProjectId && selectedProjectId !== 'none' && (
                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                  Project context will be included in optimization
                </div>
              )}
            </div>
          </div>
        )}

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
                <FormattedText className="text-sm">{result.optimizedPrompt}</FormattedText>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" onClick={handleCopyOptimized}>
                  Copy Optimized
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setResult(null); setPrompt("") }}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
