"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Edit, Newspaper, User, ChevronDown, Mic, Paperclip, Sparkles } from "lucide-react"

export function MainContent() {
  const [query, setQuery] = useState("")

  return (
    <div className="flex-1 flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-gray-900 rounded-full relative">
              <div className="absolute inset-1 border-2 border-white rounded-full" />
              <div className="absolute top-2 left-2 w-2 h-4 bg-white transform rotate-45" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold">Prompt2Go</h1>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden lg:block w-full max-w-2xl mb-8">
          <div className="relative">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you want to know?"
              className="w-full h-14 bg-gray-800 border-gray-700 rounded-full px-6 pr-20 text-lg placeholder:text-gray-400 focus:border-gray-600"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button size="sm" variant="ghost" className="rounded-full">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </Button>
              <Button size="sm" variant="ghost" className="rounded-full">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden p-4 border-t border-gray-800">
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to know?"
            className="w-full h-14 bg-gray-800 border-gray-700 rounded-full px-6 pr-24 text-lg placeholder:text-gray-400 focus:border-gray-600"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
            <Button size="sm" variant="ghost" className="rounded-full">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full">
              <Paperclip className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
