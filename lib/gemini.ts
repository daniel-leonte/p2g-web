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
  request: OptimizationRequest
): Promise<OptimizationResult> {
  if (!request.originalPrompt?.trim()) {
    throw new Error('Prompt is required')
  }

  // Validate environment variables
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey?.trim()) {
    console.error('Environment variable GOOGLE_GENERATIVE_AI_API_KEY is not set or empty')
    throw new Error('Google Generative AI API key not configured. Please set GOOGLE_GENERATIVE_AI_API_KEY environment variable.')
  }

  // Get model from environment variable with fallback
  const modelName = process.env.GOOGLE_GENERATIVE_AI_MODEL || 'gemini-2.0-flash'

  try {
    // Create a Google Generative AI instance
    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    })
    const model = google(modelName)
    
    // Send only the core prompt to AI for optimization
    const { text } = await generateText({
      model,
      system: request.systemPrompt,
      prompt: request.originalPrompt,
      temperature: 0.3,
    })

    // Build final result with prefix/suffix appended to optimized prompt
    const optimizedWithContext = [
      request.prefixText,
      text.trim(),
      request.suffixText
    ].filter(Boolean).join('\n\n')

    return {
      optimizedPrompt: optimizedWithContext,
      originalPrompt: request.originalPrompt
    }
  } catch (error) {
    console.error('Google Generative AI Error:', error)
    
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()
      
      if (errorMessage.includes('api key') || errorMessage.includes('authentication') || errorMessage.includes('unauthorized')) {
        throw new Error('Invalid API key. Please check your GOOGLE_GENERATIVE_AI_API_KEY environment variable.')
      }
      if (errorMessage.includes('generative language api has not been used') || errorMessage.includes('service_disabled')) {
        throw new Error('Google Generative Language API is not enabled. Please enable it in Google Cloud Console and try again.')
      }
      if (errorMessage.includes('billing') || errorMessage.includes('payment')) {
        throw new Error('Billing issue detected. Please check your Google Cloud billing settings.')
      }
      if (errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
        throw new Error('API rate limit exceeded. Please try again later.')
      }
      if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.')
      }
    }
    
    throw new Error('Failed to optimize prompt. Please try again.')
  }
} 