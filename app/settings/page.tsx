"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"
import { MessageSquare, Key, Eye, EyeOff } from "lucide-react"

// CONSTANTS
const DEFAULT_PROMPT = `You are a prompt enhancer named PromptTweak, specialized in slightly improving user-provided prompts for software engineering tasks in LLMs like ChatGPT, Claude, or Gemini. Your goal is to make small, effective adjustments to enhance clarity, specificity, and output quality while keeping changes minimal and preserving the original structure and intent. Output only the refactored prompt, with no additional text, explanations, or analysis.

### Guidelines:
- **Preserve Intent:** Understand the user's goal in the software engineering context and keep the prompt’s core purpose intact.
- **Minimal Changes:** Apply 1-3 subtle improvements, such as:
  - Clarifying vague terms with more specific language, especially around code, algorithms, or systems.
  - Adding a clear output format (e.g., "in bullet points" or "step-by-step") if none exists.
  - Specifying tone or style (e.g., "professional" or "concise") if appropriate.
  - Always including this role at the beginning: "Act as a senior software engineer" for expert context.
  - Retain all key details, facts, requirements, and constraints from the original to avoid information loss.
- **Avoid Overhaul:** Do not add complex structures, examples, or chain-of-thought unless the original suggests them.
- **Efficiency:** Keep the prompt concise with only necessary tweaks.
- **Customization:** Incorporate user-specified details like target LLM or tone subtly. Default to Claude-compatible optimizations in Cursor for code-focused prompts.
- **Safety:** Ensure ethical, unbiased prompts with safeguards like promoting secure and efficient code.

### Output Rule:
- Output only the slightly improved prompt, ready for copy-paste into an LLM.
- Think internally to identify enhancements, but never include analysis or extra text.
`

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [usingCustomPrompt, setUsingCustomPrompt] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState(DEFAULT_PROMPT)
  const [prefixText, setPrefixText] = useState("")
  const [suffixText, setSuffixText] = useState("ultrathink")
  const [geminiKey, setGeminiKey] = useState("")
  const [showGeminiKey, setShowGeminiKey] = useState(false)

  const handleSaveChanges = () => {
    console.log("Saving changes:", {
      usingCustomPrompt,
      currentPrompt,
      prefixText,
      suffixText,
      geminiKey,
    })
  }

  const handleClearAll = () => {
    setPrefixText("")
    setSuffixText("")
    setCurrentPrompt("")
  }

  const handleUseDefault = () => {
    setCurrentPrompt(
      DEFAULT_PROMPT
    )
  }

  const handleTestApiKey = (provider: string) => {
    console.log(`Testing ${provider} API key...`)
    // Add API key testing logic here
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-80 h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Settings</h2>
              <p className="text-muted-foreground">Configure Prompt2Go for your workflow</p>
            </div>

            {/* System Prompt Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">System Prompt</h3>
                </div>

                {/* Custom Prompt Toggle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <h4 className="font-medium">Using Custom Prompt</h4>
                      <p className="text-sm text-muted-foreground">Controls how AI optimizes your prompts</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" onClick={handleUseDefault}>Use Default</Button>
                  </div>
                </div>

                {/* Current Prompt */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Current Prompt</h5>
                    <div className="flex gap-2 text-sm">
                      <Button variant="ghost" size="sm" className="text-primary">Copy</Button>
                      <Button variant="ghost" size="sm" className="text-primary">Expand</Button>
                    </div>
                  </div>
                  <Textarea
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Prefix & Suffix Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-3 bg-white rounded-sm"></div>
                  </div>
                  <h3 className="text-xl font-semibold">Prefix & Suffix</h3>
                </div>

                <p className="text-muted-foreground mb-6">Add custom text before and after your optimized prompts</p>

                <div className="space-y-6">
                  {/* Prefix Text */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Prefix Text</label>
                    <Textarea
                      value={prefixText}
                      onChange={(e) => setPrefixText(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Text to add before your prompt..."
                    />
                  </div>

                  {/* Suffix Text */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">Suffix Text</label>
                      <span className="text-xs text-muted-foreground">{suffixText.length}</span>
                    </div>
                    <Textarea
                      value={suffixText}
                      onChange={(e) => setSuffixText(e.target.value)}
                      className="min-h-[100px]"
                      placeholder="Text to add after your prompt..."
                    />
                  </div>

                  {/* Preview */}
                  <div>
                    <h6 className="font-medium mb-2">Preview</h6>
                    <div className="bg-muted p-4 rounded-2xl font-mono text-sm">
                      Your prompt here {suffixText}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Key className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">API Key</h3>
                </div>

                <p className="text-muted-foreground mb-6">Configure your Google Gemini API key for AI-powered prompt optimization</p>

                <div className="space-y-6">
                  {/* Gemini API Key */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Google Gemini API Key</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type={showGeminiKey ? "text" : "password"}
                          value={geminiKey}
                          onChange={(e) => setGeminiKey(e.target.value)}
                          placeholder="YOUR_GEMINI_API_KEY"
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowGeminiKey(!showGeminiKey)}
                        >
                          {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handleTestApiKey("Gemini")}
                        disabled={!geminiKey}
                      >
                        Test
                      </Button>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Your API key is stored locally and never sent to our servers. 
                      It is only used to make direct requests to Google's Gemini API.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="outline" onClick={handleClearAll}>Clear All</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 