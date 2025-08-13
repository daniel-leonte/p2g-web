# Prompt2Go

A modern web application for optimizing LLM prompts with project management capabilities. Built with Next.js 15, TypeScript, and Google Generative AI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-brightgreen)](https://p2g-web.vercel.app/)

## Features

- **AI-Powered Prompt Optimization** - Transform basic prompts into structured, effective LLM prompts
- **Project Management** - Organize prompts by project with context-aware optimization
- **Rate Limiting** - Production-ready rate limiting with Redis integration
- **Responsive Design** - Mobile-first design with collapsible sidebar
- **Dark Theme** - Modern dark UI with Tailwind CSS and Radix UI components

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives
- **AI Integration**: Google Generative AI (Gemini)
- **Rate Limiting**: Upstash Redis
- **Storage**: Browser localStorage for client-side data

## Quick Start

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd p2g-web
   npm install
   ```

2. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```
   Add your Google AI API key to `.env.local`

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open** http://localhost:3000

## Environment Setup

### Required
- `GOOGLE_GENERATIVE_AI_API_KEY` - Get from [Google AI Studio](https://aistudio.google.com/apikey)

### Optional (for rate limiting)
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

## Key Features Demo

- Create projects with tech stack context
- Optimize prompts with AI assistance
- Manage multiple projects with localStorage persistence
- Responsive design works on mobile and desktop

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

- **App Router**: Next.js 15 app directory structure
- **API Routes**: Server-side prompt optimization endpoint
- **Middleware**: Rate limiting and request handling
- **Client Storage**: localStorage for projects and settings
- **Error Handling**: Comprehensive error management with user feedback

---

Built with modern web technologies for optimal developer experience and production performance.
