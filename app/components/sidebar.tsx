"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { 
  Sparkles, 
  LayoutDashboard, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  
  // Read initial state from data attribute set by pre-hydration script
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-sidebar-collapsed') === 'true'
    }
    return false
  })
  
  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-collapsed', isCollapsed.toString())
      document.documentElement.setAttribute('data-sidebar-collapsed', isCollapsed.toString())
    }
  }, [isCollapsed])
  
  // Only show collapsed state if not mobile and collapsed
  const shouldShowCollapsed = !isMobile && isCollapsed
  
  const navigationItems = [
    { name: "Optimize Prompt", icon: Sparkles, path: "/" },
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ]

  const handleNavigation = (path: string) => {
    router.push(path)
    if (onClose) onClose()
  }

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed)
    }
  }

  return (
    <div className={`${shouldShowCollapsed ? 'w-16' : 'w-80'} h-full bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className="flex items-center p-4">
        {shouldShowCollapsed ? (
          <h2 className="text-lg font-bold text-sidebar-foreground mx-auto">P2G</h2>
        ) : (
          <h2 className="text-xl font-bold text-sidebar-foreground">Prompt2Go</h2>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Button 
              key={item.path}
              variant="ghost" 
              className={`w-full ${shouldShowCollapsed ? 'justify-center p-0 h-10' : 'justify-start gap-3 h-10'} rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-sidebar-accent-foreground' : 'text-muted-foreground'}`} />
              {!shouldShowCollapsed && (
                <span className={`${isActive ? 'text-sidebar-accent-foreground font-medium' : 'text-sidebar-foreground'}`}>
                  {item.name}
                </span>
              )}
            </Button>
          )
        })}
      </div>

      {/* Bottom Toggle Button */}
      {!isMobile && (
        <div className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className={`${shouldShowCollapsed ? 'h-8 w-8 p-0 mx-auto' : 'h-8 w-full'} hover:bg-sidebar-accent`}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
