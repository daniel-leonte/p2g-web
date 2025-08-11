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
- **Styling**: Tailwind CSS with dark theme as default (forced dark mode via ThemeProvider)
- **State Management**: React hooks with localStorage/sessionStorage persistence
- **AI Integration**: Google Generative AI integration for prompt optimization
- **Rate Limiting**: Upstash Redis-based rate limiting with graceful fallback

### Key Directories
- `app/` - Next.js app router pages and API routes
- `components/ui/` - Reusable UI components (Radix UI + Tailwind)
- `lib/` - Utility functions and API client code
- `hooks/` - Custom React hooks for storage, mobile detection, and AI interaction

### Layout Architecture
- Responsive design with collapsible sidebar managed by pre-hydration script in `app/layout.tsx:23-36`
- Mobile-first approach with overlay sidebar on mobile
- Desktop sidebar with localStorage persistence of collapsed state
- Pre-hydration script prevents sidebar flash by setting `data-sidebar-collapsed` attribute
- Theme provider forces dark mode with `forcedTheme="dark"`

### Data Management
- **Project Storage**: localStorage-based persistence in `lib/storage.ts` with type-safe interfaces
- **Settings Storage**: Customizable system prompts, prefix/suffix text stored in localStorage
- **Project Structure**: Projects contain metadata (name, description, language, tech stack, architecture, platforms, custom rules)
- **Enhanced Prompts**: System prompts are dynamically enhanced with project context via `enhanceSystemPromptWithProject()`

### AI Integration & Rate Limiting
- **Google Generative AI**: Integration in `lib/gemini.ts` using `@ai-sdk/google` and `ai` packages
- **Model Configuration**: Uses `gemini-2.0-flash` model by default, configurable via `GOOGLE_GENERATIVE_AI_MODEL` env var
- **Error Handling**: Comprehensive error handling for API key validation, billing, quotas, and network issues
- **Rate Limiting**: Middleware-based rate limiting (20 requests/hour per IP) using Upstash Redis
- **Graceful Fallback**: Rate limiting disables gracefully if Redis is not configured
- **API Endpoint**: Single `/api/optimize/route.ts` endpoint handles all prompt optimization requests

### Environment Configuration
- **Required**: `GOOGLE_GENERATIVE_AI_API_KEY` for AI functionality
- **Optional**: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for rate limiting
- **Optional**: `GOOGLE_GENERATIVE_AI_MODEL` to override default model
- **Optional**: `RATE_LIMIT_REQUESTS_PER_HOUR` to configure rate limit (defaults to 20)

### Component Patterns
- Extensive use of Radix UI primitives for consistent design system
- Form validation with error state management
- Dialog-based modals for project creation/editing
- Card-based layouts for project display
- Custom hooks pattern for localStorage/sessionStorage operations

## Additional Development Information

### Testing
- No formal test framework is currently configured
- Manual testing through the development server is the primary approach
- Check specific functionality through the debug endpoints in `app/api/debug-*`

### Project Management Features
- Projects stored in localStorage with metadata (name, description, language, tech stack, architecture, platforms, custom rules)
- Project data managed through `lib/storage.ts` with type-safe interfaces
- Project context automatically injected into prompt optimization via `enhanceSystemPromptWithProject()`

### Debugging & Development
- Debug endpoints available at `/api/debug-env`, `/api/debug-google`, `/api/env-check`, `/api/test-gemini`
- Environment validation functions in `lib/storage.ts` for API key checking
- Comprehensive error handling with user-friendly messages for common Google AI API issues

### Middleware & Rate Limiting
- Rate limiting implemented via Next.js middleware in `middleware.ts`
- Only applies to `/api/optimize` endpoint
- Graceful fallback when Redis is not configured (allows all requests)
- Rate limit headers included in responses for client-side handling