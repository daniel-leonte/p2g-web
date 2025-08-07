export interface Settings {
  customPrompt: string
  prefixText: string
  suffixText: string
}

export const DEFAULT_PROMPT = `You are a prompt optimization specialist. Your ONLY job is to transform user input into a structured prompt using the EXACT format below.

CRITICAL: You MUST output EXACTLY this structure with ALL 6 sections. Do NOT deviate from this format.

MANDATORY TEMPLATE (COPY EXACTLY):

ROLE: Act as a 10x Senior Software Engineer

TASK: [Transform the user's request into a clear, actionable task]

CONTEXT:
[This section will be populated with project-specific information]

CONSTRAINTS: [List specific constraints relevant to the task - include coding standards, best practices, security considerations, etc.]

OUTPUT: [Define exactly what should be delivered - code, documentation, analysis, etc.]

GOAL: [State the clear objective]
`

export const DEFAULT_SETTINGS: Settings = {
  customPrompt: DEFAULT_PROMPT,
  prefixText: '',
  suffixText: '',
}

export const STORAGE_KEY = 'prompt2go-settings'

export function loadSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch (error) {
    console.error('Error saving settings:', error)
  }
}

export function validateApiKey(): boolean {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  return !!(apiKey && apiKey.trim().length > 0)
}

export function getEnvironmentStatus(): {
  isConfigured: boolean
  apiKeyLength: number
  error?: string
} {
  try {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    
    if (!apiKey) {
      return {
        isConfigured: false,
        apiKeyLength: 0,
        error: 'GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set'
      }
    }
    
    if (!apiKey.trim()) {
      return {
        isConfigured: false,
        apiKeyLength: 0,
        error: 'GOOGLE_GENERATIVE_AI_API_KEY environment variable is empty'
      }
    }
    
    return {
      isConfigured: true,
      apiKeyLength: apiKey.length
    }
  } catch (error) {
    return {
      isConfigured: false,
      apiKeyLength: 0,
      error: `Error checking environment: ${error}`
    }
  }
}

export interface Project {
  id: string
  name: string
  description: string
  language: string
  techStack: string
  architecture: string
  platforms: string
  customRules: string
  createdAt: number
  updatedAt: number
}

export function enhanceSystemPromptWithProject(basePrompt: string, project: Project): string {
  const contextLines = [
    `PROJECT CONTEXT:`,
    `You are optimizing prompts for the project: "${project.name}"`,
    `Description: ${project.description}`
  ]
  
  // Add non-empty fields
  if (project.language.trim()) {
    contextLines.push(`- Programming Language: ${project.language}`)
  }
  if (project.techStack.trim()) {
    contextLines.push(`- Technology Stack: ${project.techStack}`)
  }
  if (project.architecture.trim()) {
    contextLines.push(`- Architecture Pattern: ${project.architecture}`)
  }
  if (project.platforms.trim()) {
    contextLines.push(`- Target Platforms: ${project.platforms}`)
  }
  if (project.customRules.trim()) {
    contextLines.push(`- Custom Rules: ${project.customRules}`)
  }
  
  const projectContext = contextLines.join('\n')
  
  // Simple append - no parsing needed!
  return `${basePrompt}\n\n${projectContext}`
} 