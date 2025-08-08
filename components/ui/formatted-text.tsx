"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { cn } from '@/lib/utils'

interface FormattedTextProps {
  children: string
  className?: string
}

export function FormattedText({ children, className }: FormattedTextProps) {
  return (
    <div className={cn("prose prose-sm dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Customize heading styles to match design system
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold mb-2 text-foreground">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold mb-2 text-foreground">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold mb-1 text-foreground">{children}</h3>
          ),
          // Style paragraphs
          p: ({ children }) => (
            <p className="text-sm mb-2 text-foreground leading-relaxed">{children}</p>
          ),
          // Style lists
          ul: ({ children }) => (
            <ul className="text-sm mb-2 ml-4 space-y-1 list-disc text-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="text-sm mb-2 ml-4 space-y-1 list-decimal text-foreground">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-sm text-foreground leading-relaxed">{children}</li>
          ),
          // Style code blocks
          code: ({ inline, children }) => (
            inline ? (
              <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground">
                {children}
              </code>
            ) : (
              <code className="block bg-muted p-3 rounded text-xs font-mono text-foreground whitespace-pre-wrap">
                {children}
              </code>
            )
          ),
          // Style blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary pl-4 italic text-sm text-muted-foreground mb-2">
              {children}
            </blockquote>
          ),
          // Style strong/bold text
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          // Style emphasis/italic text
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),
          // Remove default margins and customize line breaks
          br: () => <br className="mb-1" />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}