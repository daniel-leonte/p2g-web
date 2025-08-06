import { useState, useCallback } from 'react'
import { OptimizationRequest, OptimizationResult } from '@/lib/gemini'
import { loadSettings, DEFAULT_PROMPT, Project, enhanceSystemPromptWithProject } from '@/lib/storage'

interface UseGeminiReturn {
  optimize: (prompt: string, project?: Project) => Promise<OptimizationResult | null>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export function useGemini(): UseGeminiReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const optimize = useCallback(async (prompt: string, project?: Project): Promise<OptimizationResult | null> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to optimize.')
      return null
    }

    const settings = loadSettings()
    let systemPrompt = settings.customPrompt || DEFAULT_PROMPT
    
    // Enhance system prompt with project context if project is provided
    if (project) {
      systemPrompt = enhanceSystemPromptWithProject(systemPrompt, project)
    }

    setIsLoading(true)
    setError(null)

    try {
      const request: OptimizationRequest = {
        originalPrompt: prompt,
        systemPrompt,
        prefixText: settings.prefixText || undefined,
        suffixText: settings.suffixText || undefined,
      }

      const response = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = errorData.retryAfter
          const retryDate = retryAfter ? new Date(retryAfter) : null
          const secondsUntilRetry = retryDate 
            ? Math.ceil((retryDate.getTime() - Date.now()) / 1000)
            : 60
          
          throw new Error(
            `Too many requests. Please try again in ${secondsUntilRetry} seconds.`
          )
        }
        
        throw new Error(errorData.error || 'Failed to optimize prompt')
      }

      const result: OptimizationResult = await response.json()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return { optimize, isLoading, error, clearError }
} 