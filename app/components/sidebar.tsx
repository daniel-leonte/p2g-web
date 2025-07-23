"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  LayoutDashboard, 
  Settings 
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const navigationItems = [
    { name: "Optimize Prompt", icon: Sparkles, path: "/" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    if (onClose) onClose()
  }

  return (
    <div className="w-80 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-sidebar-foreground">Prompt2Go</h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Button 
              key={item.path}
              variant="ghost" 
              className={`w-full justify-start gap-3 h-10 rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-accent-foreground' : 'text-muted-foreground'}`} />
              <span className={`${isActive ? 'text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground'}`}>
                {item.name}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
