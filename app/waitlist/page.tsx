"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"

export default function WaitlistPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const WAITLIST_ID = 30570

      const upstreamRes = await fetch("https://api.getwaitlist.com/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ waitlist_id: WAITLIST_ID, email }),
      })

      if (!upstreamRes.ok) {
        throw new Error(`HTTP error! status: ${upstreamRes.status}`)
      }
      
      setIsSubmitted(true)
      toast({
        title: "Successfully joined!",
        description: "You've been added to our waitlist. We'll be in touch soon!",
      })
    } catch (error) {
      console.error("Waitlist signup error:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderWaitlistCard = () => {
    if (isSubmitted) {
      return (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <CardTitle>You're on the list!</CardTitle>
            <CardDescription>
              Thanks for joining our waitlist. We'll notify you as soon as Prompt2Go is officially released.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              variant="outline" 
              className="w-full"
            >
              Join another email
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Mail className="w-6 h-6 text-blue-500" />
          </div>
          <CardTitle>Join our Waitlist</CardTitle>
          <CardDescription>
            Be the first to know when we officially release Prompt2Go.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || !email.trim()}
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </CardContent>
      </Card>
    )
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

        {/* Waitlist Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          {renderWaitlistCard()}
        </div>
      </div>
    </div>
  )
}