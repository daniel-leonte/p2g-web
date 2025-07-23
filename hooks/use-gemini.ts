import { useState, useCallback } from 'react'
import { optimizePrompt, OptimizationRequest, OptimizationResult } from '@/lib/gemini'
import { loadSettings, DEFAULT_PROMPT } from '@/lib/storage'

interface UseGeminiReturn {
  optimize: (prompt: string) => Promise<OptimizationResult | null>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

export function useGemini(): UseGeminiReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const optimize = useCallback(async (prompt: string): Promise<OptimizationResult | null> => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to optimize.')
      return null
    }

    const settings = loadSettings()
    
    if (!settings.geminiApiKey.trim()) {
      setError('Gemini API key not configured. Please add your API key in Settings.')
      return null
    }

    setIsLoading(true)
    setError(null)

    try {
      const request: OptimizationRequest = {
        originalPrompt: prompt,
        systemPrompt: settings.customPrompt || DEFAULT_PROMPT,
        prefixText: settings.prefixText || undefined,
        suffixText: settings.suffixText || undefined,
      }

      const result = await optimizePrompt(settings.geminiApiKey, request)
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