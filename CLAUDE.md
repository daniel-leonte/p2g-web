# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Development Approach

**This is a prototype/MVP project - keep it simple:**
- Use existing patterns and components
- Prefer simple solutions over complex ones
- Focus on core functionality, avoid over-engineering

## Project Architecture

This is a **prototype** Next.js 15 web application for LLM prompt optimization with basic project management capabilities.

### Core Structure
- **App Router**: Uses Next.js 15 app router structure (`app/` directory)
- **UI Components**: Built with Radix UI primitives and Tailwind CSS
- **Styling**: Tailwind CSS with dark theme as default (forced dark mode)
- **State Management**: React hooks with localStorage persistence for projects and settings
- **AI Integration**: Google Generative AI integration for prompt optimization

### Key Directories
- `app/` - Next.js app router pages and API routes
- `components/ui/` - Reusable UI components (Radix UI + Tailwind)
- `lib/` - Utility functions and API client code
- `hooks/` - Custom React hooks

### Layout Architecture
- Responsive design with collapsible sidebar
- Mobile-first approach with overlay sidebar on mobile
- Desktop sidebar with localStorage persistence of collapsed state
- Pre-hydration script prevents sidebar flash

### Data Management
- Project data stored in localStorage using custom storage utilities
- Projects have metadata: name, description, language, tech stack, architecture, platforms, custom rules
- CRUD operations handled through custom localStorage utilities in dashboard

### AI Integration
- Google Generative AI integration in `lib/gemini.ts`
- Uses simple API key authentication for centralized deployment configuration
- Prompt optimization with system prompts, prefix/suffix support
- Error handling for API key validation, rate limits, and network issues
- No user-level AI configuration required
- Compatible with Google Vertex AI for enterprise deployments

### Component Patterns
- Consistent use of Radix UI primitives
- Form validation with error state management
- Dialog-based modals for project creation/editing
- Card-based layouts for project display