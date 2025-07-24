"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FolderOpen, Plus, CheckCircle, User, Edit, Trash2 } from "lucide-react"
import { Sidebar } from "../components/sidebar"
import { MobileHeader } from "../components/mobile-header"

// Types
interface Project {
  id: string
  name: string
  description: string
  language: string
  techStack: string
  architecture: string
  platforms: string
  customRules: string
  createdAt: number
  updatedAt: number
}

// Local Storage utilities
const STORAGE_KEY = 'p2g-projects'

const saveProjectsToStorage = (projects: Project[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error('Failed to save projects to localStorage:', error)
  }
}

const loadProjectsFromStorage = (): Project[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load projects from localStorage:', error)
    return []
  }
}

const generateProjectId = (): string => {
  return `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  
  // Form fields
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [language, setLanguage] = useState("")
  const [techStack, setTechStack] = useState("")
  const [architecture, setArchitecture] = useState("")
  const [platforms, setPlatforms] = useState("")
  const [customRules, setCustomRules] = useState("")
  
  // Validation
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  // Load projects on mount
  useEffect(() => {
    const loadedProjects = loadProjectsFromStorage()
    setProjects(loadedProjects)
  }, [])

  // Form validation
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!projectName.trim()) {
      newErrors.projectName = "Project name is required"
    }
    
    if (!description.trim()) {
      newErrors.description = "Description is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Clear form
  const clearForm = () => {
    setProjectName("")
    setDescription("")
    setLanguage("")
    setTechStack("")
    setArchitecture("")
    setPlatforms("")
    setCustomRules("")
    setErrors({})
    setEditingProject(null)
  }

  // Populate form for editing
  const populateForm = (project: Project) => {
    setProjectName(project.name)
    setDescription(project.description)
    setLanguage(project.language)
    setTechStack(project.techStack)
    setArchitecture(project.architecture)
    setPlatforms(project.platforms)
    setCustomRules(project.customRules)
    setEditingProject(project)
    setErrors({})
  }

  // Handle create/update project
  const handleSaveProject = () => {
    if (!validateForm()) return

    const now = Date.now()
    const projectData = {
      name: projectName.trim(),
      description: description.trim(),
      language: language.trim(),
      techStack: techStack.trim(),
      architecture: architecture.trim(),
      platforms: platforms.trim(),
      customRules: customRules.trim(),
    }

    if (editingProject) {
      // Update existing project
      const updatedProject = {
        ...editingProject,
        ...projectData,
        updatedAt: now
      }
      
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id ? updatedProject : p
      )
      
      setProjects(updatedProjects)
      saveProjectsToStorage(updatedProjects)
    } else {
      // Create new project
      const newProject: Project = {
        id: generateProjectId(),
        ...projectData,
        createdAt: now,
        updatedAt: now
      }
      
      const updatedProjects = [...projects, newProject]
      setProjects(updatedProjects)
      saveProjectsToStorage(updatedProjects)
    }

    setDialogOpen(false)
    clearForm()
  }

  // Handle delete project
  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(p => p.id !== projectId)
      setProjects(updatedProjects)
      saveProjectsToStorage(updatedProjects)
    }
  }

  // Handle new project
  const handleNewProject = () => {
    clearForm()
    setDialogOpen(true)
  }

  // Handle edit project
  const handleEditProject = (project: Project) => {
    populateForm(project)
    setDialogOpen(true)
  }

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false)
    clearForm()
  }

  const isFormValid = projectName.trim() && description.trim()

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
        <div className="flex-1 p-6 lg:p-12">
          {projects.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
              <FolderOpen className="w-16 h-16 text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No projects yet</h2>
              <p className="text-muted-foreground mb-8">Create your first project to get started</p>
              <Button onClick={handleNewProject} className="gap-2">
                <Plus className="w-4 h-4" />
                Create First Project
              </Button>
            </div>
          ) : (
            // Projects Grid
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Your Projects</h1>
                  <p className="text-muted-foreground">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
                </div>
                <Button onClick={handleNewProject} className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Project
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card 
                    key={project.id} 
                    className="group hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                    onClick={() => handleEditProject(project)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate">{project.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditProject(project)
                            }}
                            className="h-8 w-8 p-0"
                            title="Edit project"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteProject(project.id)
                            }}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            title="Delete project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2">
                        {project.language && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {project.language}
                          </span>
                        )}
                        {project.techStack && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {project.techStack}
                          </span>
                        )}
                        {project.platforms && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {project.platforms}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Project Dialog */}
      <Dialog open={dialogOpen} onOpenChange={(open) => !open && handleDialogClose()}>
        <DialogContent className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 pb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold">
                {editingProject ? 'Edit Project' : 'New Project'}
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                {editingProject ? 'Update your project details' : 'Create a new project with your specifications'}
              </p>
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
                  {/* Project Name */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Project Name *
                    </label>
                    <Input
                      placeholder="Enter your project name..."
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                    {errors.projectName && (
                      <p className="text-sm text-destructive mt-1">{errors.projectName}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      Description *
                    </label>
                    <Textarea
                      placeholder="Brief description of the project..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[80px]"
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive mt-1">{errors.description}</p>
                    )}
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleDialogClose}>
                Cancel
              </Button>
              <Button 
                onClick={handleSaveProject} 
                disabled={!isFormValid}
                className="gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                {editingProject ? 'Update Project' : 'Create Project'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 