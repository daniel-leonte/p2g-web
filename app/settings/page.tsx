"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"
import { Settings as SettingsIcon, MessageSquare, Key, User } from "lucide-react"

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("prompts")
  const [usingCustomPrompt, setUsingCustomPrompt] = useState(true)
  const [currentPrompt, setCurrentPrompt] = useState(
    "You are a prompt enhancer named PromptTweak, designed to slightly improve user-provided prompts for large language models (LLMs) like ChatGPT, Claude, or Gemini. Your goal is to make small, effective adjustments to the original prompt to enhance clarity, specificity, and output quality while keeping changes minimal and preserving the original structure and intent. Output only the"
  )
  const [prefixText, setPrefixText] = useState("")
  const [suffixText, setSuffixText] = useState("ultrathink")

  const settingsNavigation = [
    { id: "general", name: "General", icon: SettingsIcon },
    { id: "prompts", name: "Prompts", icon: MessageSquare },
    { id: "api", name: "API Keys", icon: Key },
  ]

  const handleSaveChanges = () => {
    console.log("Saving changes:", {
      usingCustomPrompt,
      currentPrompt,
      prefixText,
      suffixText,
    })
  }

  const handleClearAll = () => {
    setPrefixText("")
    setSuffixText("")
    setCurrentPrompt("")
  }

  const handleUseDefault = () => {
    setCurrentPrompt(
      "You are a prompt enhancer named PromptTweak, designed to slightly improve user-provided prompts for large language models (LLMs) like ChatGPT, Claude, or Gemini. Your goal is to make small, effective adjustments to the original prompt to enhance clarity, specificity, and output quality while keeping changes minimal and preserving the original structure and intent. Output only the"
    )
  }

  const renderSettingsContent = () => {
    switch (activeSection) {
      case "general":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">General Settings</h2>
              <p className="text-muted-foreground">Configure general application preferences</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">General settings coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )
      
      case "api":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">API Keys</h2>
              <p className="text-muted-foreground">Manage your API keys and integrations</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">API key management coming soon...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "prompts":
      default:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Prompts Settings</h2>
              <p className="text-muted-foreground">Configure how AI optimizes your prompts</p>
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

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleSaveChanges}>Save Changes</Button>
              <Button variant="outline" onClick={handleClearAll}>Clear All</Button>
            </div>
          </div>
        )
    }
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
      <div className="flex-1 flex min-w-0">
        {/* Settings Navigation Sidebar */}
        <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-sidebar-foreground">Settings</h2>
                <p className="text-sm text-muted-foreground">Customize Prompt2Go for your workflow</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2">
            {settingsNavigation.map((item) => {
              const isActive = activeSection === item.id
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-sidebar-accent-foreground' : 'text-muted-foreground'}`} />
                  <span className={`${isActive ? 'text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground'}`}>
                    {item.name}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile Header */}
          <div className="lg:hidden">
            <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  )
} 