"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"
import { MessageSquare } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Settings, DEFAULT_SETTINGS } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settings, setSettings] = useLocalStorage<Settings>('prompt2go-settings', DEFAULT_SETTINGS)
  const [isPromptExpanded, setIsPromptExpanded] = useState(false)
  const { toast } = useToast()

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const handleClearAll = () => {
    setSettings({
      ...settings,
      prefixText: "",
      suffixText: "",
      customPrompt: "",
    })
    
    toast({
      title: "Fields Cleared",
      description: "Text fields have been cleared.",
    })
  }

  const handleUseDefault = () => {
    setSettings({
      ...settings,
      customPrompt: DEFAULT_SETTINGS.customPrompt
    })
  }


  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(settings.customPrompt)
      toast({
        title: "Copied!",
        description: "Custom prompt copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExpandPrompt = () => {
    setIsPromptExpanded(!isPromptExpanded)
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

                <p className="text-muted-foreground mb-6">Configure how AI optimizes your prompts</p>

                {/* Action Buttons */}
                <div className="flex gap-2 mb-4">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" onClick={handleUseDefault}>Use Default</Button>
                </div>

                {/* Current Prompt */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-medium">Custom Prompt</h5>
                    <div className="flex gap-2 text-sm">
                      <Button variant="ghost" size="sm" className="text-primary" onClick={handleCopyPrompt}>Copy</Button>
                      <Button variant="ghost" size="sm" className="text-primary" onClick={handleExpandPrompt}>
                        {isPromptExpanded ? "Collapse" : "Expand"}
                      </Button>
                    </div>
                  </div>
                  <Textarea
                    value={settings.customPrompt}
                    onChange={(e) => setSettings({ ...settings, customPrompt: e.target.value })}
                    className={`${isPromptExpanded ? "min-h-[300px]" : "min-h-[120px]"} font-mono text-sm transition-all duration-200`}
                    placeholder="Enter your custom optimization prompt..."
                  />
                  <p className="text-xs text-muted-foreground">
                    This prompt will be used for all optimizations. Character count: {settings.customPrompt.length}
                  </p>
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
                      value={settings.prefixText}
                      onChange={(e) => setSettings({ ...settings, prefixText: e.target.value })}
                      className="min-h-[100px]"
                      placeholder="Text to add before your prompt..."
                    />
                  </div>

                  {/* Suffix Text */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium">Suffix Text</label>
                      <span className="text-xs text-muted-foreground">{settings.suffixText.length}</span>
                    </div>
                    <Textarea
                      value={settings.suffixText}
                      onChange={(e) => setSettings({ ...settings, suffixText: e.target.value })}
                      className="min-h-[100px]"
                      placeholder="Text to add after your prompt..."
                    />
                  </div>

                  {/* Preview */}
                  <div>
                    <h6 className="font-medium mb-2">Preview</h6>
                    <div className="bg-muted p-4 rounded-2xl font-mono text-sm">
                      {settings.prefixText && <><span className="text-blue-400">{settings.prefixText}</span><br /><br /></>}
                      <span className="text-muted-foreground">[Your optimized prompt will appear here]</span>
                      {settings.suffixText && <><br /><br /><span className="text-green-400">{settings.suffixText}</span></>}
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
        </div>
      </div>
    </div>
  )
} 