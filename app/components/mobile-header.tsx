"use client"

import { Menu, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  onMenuClick: () => void
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <Button variant="ghost" size="sm" onClick={onMenuClick}>
        <Menu className="w-6 h-6" />
      </Button>
    </div>
  )
}
