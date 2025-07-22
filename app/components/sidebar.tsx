"use client"

import { useState } from "react"
import {
  Sparkles,
  ChevronDown,
  Code,
  Plus,
  RefreshCw,
  Globe,
  Gamepad2,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false)
  
  const projects = [
    { name: "Resume Builder", icon: Code, color: "text-yellow-400" },
    { name: "New Project", icon: Plus, color: "text-blue-400" },
    { name: "New Workspace", icon: RefreshCw, color: "text-cyan-400" },
    { name: "AI agent", icon: Globe, color: "text-yellow-400" },
    { name: "SWE", icon: Gamepad2, color: "text-cyan-400" },
  ]

  return (
    <div className="w-80 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-white">Prompt2Go</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {/* Prompt Optimization */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-full hover:bg-gray-800">
          <Sparkles className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Prompt Optimization</span>
        </Button>

        {/* Projects Section */}
        <div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 h-10 rounded-full hover:bg-gray-800"
            onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
          >
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProjectsExpanded ? '' : '-rotate-90'}`} />
            <span className="text-gray-300 font-medium">Projects</span>
          </Button>

          {isProjectsExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              {projects.map((project, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start gap-3 h-10 hover:bg-gray-800">
                  <project.icon className={`w-4 h-4 ${project.color}`} />
                  <span className="text-gray-300 text-sm">{project.name}</span>
                </Button>
              ))}
              <Button variant="ghost" className="w-full justify-start h-8 hover:bg-gray-800">
                <span className="text-gray-400 text-sm">See all</span>
              </Button>
            </div>
          )}
        </div>

        {/* Settings */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-10 rounded-full hover:bg-gray-800">
          <Settings className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300 font-medium">Settings</span>
        </Button>
        
      </div>
    </div>
  )
}
