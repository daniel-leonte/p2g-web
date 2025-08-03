import { NextRequest, NextResponse } from 'next/server'
import { optimizePrompt, OptimizationRequest } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body: OptimizationRequest = await request.json()
    
    if (!body.originalPrompt?.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const result = await optimizePrompt(body)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('API Route Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to optimize prompt'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}