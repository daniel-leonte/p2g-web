"use client"

import { Menu, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DiscordIcon } from "@/components/ui/discord-icon"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const handleDiscordClick = () => {
    window.open('https://discord.gg/tm6339Ps', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <Button variant="ghost" size="sm" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </Button>
      
      {/* Keep only Discord button on mobile header to avoid crowding */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleDiscordClick}
        className="w-10 h-10 rounded-full hover:bg-purple-500/10 hover:text-purple-400 transition-colors group"
      >
        <DiscordIcon className="w-4 h-4 text-muted-foreground group-hover:text-purple-400" />
      </Button>
    </div>
  )
}
