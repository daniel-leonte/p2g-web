import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'

export interface OptimizationRequest {
  originalPrompt: string
  systemPrompt?: string
  prefixText?: string
  suffixText?: string
}

export interface OptimizationResult {
  optimizedPrompt: string
  originalPrompt: string
}

export async function optimizePrompt(
  apiKey: string,
  request: OptimizationRequest
): Promise<OptimizationResult> {
  if (!apiKey?.trim()) {
    throw new Error('API key is required')
  }

  if (!request.originalPrompt?.trim()) {
    throw new Error('Prompt is required')
  }

  try {
    // Create a Google AI instance with the API key
    const google = createGoogleGenerativeAI({ apiKey })
    const model = google('gemini-2.0-flash-exp')
    
    // Build the full prompt with prefix/suffix if provided
    const fullPrompt = [
      request.prefixText,
      request.originalPrompt,
      request.suffixText
    ].filter(Boolean).join('\n\n')

    const { text } = await generateText({
      model,
      system: request.systemPrompt,
      prompt: fullPrompt,
      temperature: 0.3,
      maxTokens: 1500,
    })

    return {
      optimizedPrompt: text.trim(),
      originalPrompt: request.originalPrompt
    }
  } catch (error) {
    console.error('Gemini API Error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Invalid API key. Please check your Gemini API key in Settings.')
      }
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        throw new Error('API rate limit exceeded. Please try again later.')
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.')
      }
    }
    
    throw new Error('Failed to optimize prompt. Please try again.')
  }
} 