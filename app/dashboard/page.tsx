"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, Plus, CheckCircle, User } from "lucide-react"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projectName, setProjectName] = useState("Untitled Project")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("")
  const [techStack, setTechStack] = useState("")
  const [architecture, setArchitecture] = useState("")
  const [platforms, setPlatforms] = useState("")
  const [customRules, setCustomRules] = useState("")

  const handleCreateProject = () => {
    // Handle project creation logic here
    console.log("Creating project:", {
      projectName,
      description,
      language,
      techStack,
      architecture,
      platforms,
      customRules,
    })
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

        {/* Dashboard Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
          {/* Empty State */}
          <div className="flex flex-col items-center text-center max-w-md">
            <FolderOpen className="w-16 h-16 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">No projects yet</h2>
            <p className="text-muted-foreground mb-8">Create your first project to get started</p>

            {/* Create Project Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create First Project
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <FolderOpen className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{projectName}</DialogTitle>
                    <p className="text-sm text-muted-foreground">Tap to customize</p>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Project Details Section */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <h3 className="text-lg font-medium">Project Details</h3>
                      </div>

                      <div className="space-y-4">
                        {/* Description */}
                        <div>
                          <label className="text-sm font-medium text-foreground block mb-2">
                            Description
                          </label>
                          <Textarea
                            placeholder="Brief description of the project..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>

                        {/* Language and Tech Stack */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Language
                            </label>
                            <Input
                              placeholder="Swift, Python, JavaScript..."
                              value={language}
                              onChange={(e) => setLanguage(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Tech Stack
                            </label>
                            <Input
                              placeholder="SwiftUI, React, Django..."
                              value={techStack}
                              onChange={(e) => setTechStack(e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Architecture and Platforms */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Architecture
                            </label>
                            <Input
                              placeholder="MVVM, MVC, Clean Architecture..."
                              value={architecture}
                              onChange={(e) => setArchitecture(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                              Platforms
                            </label>
                            <Input
                              placeholder="iOS, macOS, Web, Android..."
                              value={platforms}
                              onChange={(e) => setPlatforms(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Custom Rules Section */}
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <User className="w-5 h-5 text-purple-500" />
                        <h3 className="text-lg font-medium">Custom Rules</h3>
                      </div>

                      <div>
                        <Textarea
                          placeholder="Define custom rules, coding preferences, architecture patterns, or specific guidelines for this project..."
                          value={customRules}
                          onChange={(e) => setCustomRules(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Create Button */}
                  <div className="flex justify-end">
                    <Button onClick={handleCreateProject} className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Create Project
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
} 