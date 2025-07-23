"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  FileText, 
  Zap, 
  History, 
  BookOpen, 
  ChevronDown, 
  Settings 
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [isPromptLibraryExpanded, setIsPromptLibraryExpanded] = useState(false)
  
  const promptCategories = [
    { name: "Writing & Content", icon: FileText, color: "text-chart-1" },
    { name: "Code Generation", icon: Zap, color: "text-chart-2" },
    { name: "Data Analysis", icon: BookOpen, color: "text-chart-3" },
    { name: "Creative Tasks", icon: Sparkles, color: "text-chart-4" },
    { name: "Business & Strategy", icon: FileText, color: "text-chart-5" },
  ]

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-sidebar-foreground">Prompt2Go</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {/* Prompt Optimization */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Sparkles className="w-5 h-5 text-muted-foreground" />
          <span className="text-sidebar-foreground">Optimize Prompt</span>
        </Button>

        {/* Prompt History */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <History className="w-5 h-5 text-muted-foreground" />
          <span className="text-sidebar-foreground">Recent Prompts</span>
        </Button>

        {/* Prompt Library Section */}
        <div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={() => setIsPromptLibraryExpanded(!isPromptLibraryExpanded)}
          >
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isPromptLibraryExpanded ? '' : '-rotate-90'}`} />
            <span className="text-sidebar-foreground font-medium">Prompt Library</span>
          </Button>

          {isPromptLibraryExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              {promptCategories.map((category, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start gap-3 h-10 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <category.icon className={`w-4 h-4 ${category.color}`} />
                  <span className="text-sidebar-foreground text-sm">{category.name}</span>
                </Button>
              ))}
              <Button variant="ghost" className="w-full justify-start h-8 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <span className="text-muted-foreground text-sm">Browse all</span>
              </Button>
            </div>
          )}
        </div>

        {/* Settings */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-sidebar-foreground font-medium">Settings</span>
        </Button>
        
      </div>
    </div>
  )
}
