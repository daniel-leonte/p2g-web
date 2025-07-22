"use client"

import {
  Search,
  MessageSquare,
  FileText,
  CheckSquare,
  ChevronDown,
  Code,
  Plus,
  RefreshCw,
  Globe,
  Gamepad2,
  X,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const projects = [
    { name: "Resume Builder", icon: Code, color: "text-yellow-400" },
    { name: "New Project", icon: Plus, color: "text-blue-400" },
    { name: "New Workspace", icon: RefreshCw, color: "text-cyan-400" },
    { name: "AI agent", icon: Globe, color: "text-yellow-400" },
    { name: "SWE", icon: Gamepad2, color: "text-cyan-400" },
  ]

  const historyItems = [
    "Rapid B2C AI SaaS Growth Pl...",
    "B2B Contract Details for SRL",
    "Java Maven API Project Devel...",
    "Image Visibility and Analysis",
  ]

  return (
    <div className="w-80 h-full bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Prompt2Go</h2>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">Private</span>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {/* Search */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-12 rounded-full bg-gray-800/50 hover:bg-gray-800"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Search</span>
        </Button>

        {/* Chat */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-full hover:bg-gray-800">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Chat</span>
        </Button>

        {/* Files */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-full hover:bg-gray-800">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Files</span>
        </Button>

        {/* Tasks */}
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 rounded-full hover:bg-gray-800">
          <CheckSquare className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">Tasks</span>
        </Button>

        {/* Projects Section */}
        <div className="pt-4">
          <Button variant="ghost" className="w-full justify-start gap-3 h-10 hover:bg-gray-800">
            <ChevronDown className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-medium">Projects</span>
          </Button>

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
        </div>

        {/* History Section */}
        <div className="pt-4">
          <Button variant="ghost" className="w-full justify-start gap-3 h-10 hover:bg-gray-800">
            <ChevronDown className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 font-medium">History</span>
          </Button>

          <div className="ml-4 mt-2 space-y-1">
            <div className="text-gray-400 text-sm py-2">Pinned</div>
            {historyItems.slice(0, 2).map((item, index) => (
              <div key={index} className="text-gray-400 text-sm py-1 hover:text-gray-300 cursor-pointer">
                {item}
              </div>
            ))}

            <div className="text-gray-400 text-sm py-2 pt-4">Today</div>
            {historyItems.slice(2).map((item, index) => (
              <div key={index} className="text-gray-400 text-sm py-1 hover:text-gray-300 cursor-pointer">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">Grok 4</span>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ml-auto">
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
