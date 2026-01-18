'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/ai/types';

// =============================================================================
// TYPES
// =============================================================================

interface TalyMessageProps {
  message: ChatMessage;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TalyMessage({ message }: TalyMessageProps) {
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex w-full',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted rounded-bl-md'
        )}
      >
        {message.content ? (
          <MessageContent content={message.content} isUser={isUser} />
        ) : isAssistant ? (
          <TypingIndicator />
        ) : null}
      </div>
    </div>
  );
}

// =============================================================================
// MESSAGE CONTENT
// =============================================================================

interface MessageContentProps {
  content: string;
  isUser: boolean;
}

function MessageContent({ content, isUser }: MessageContentProps) {
  // Parse content for formatting
  const lines = content.split('\n');

  return (
    <div className={cn('space-y-1', isUser && 'text-right')}>
      {lines.map((line, index) => {
        // Handle list items
        if (line.startsWith('- ')) {
          return (
            <div key={index} className="flex gap-2">
              <span className="text-muted-foreground">-</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        }

        // Handle numbered items
        const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
        if (numberedMatch) {
          return (
            <div key={index} className="flex gap-2">
              <span className="text-muted-foreground font-medium">
                {numberedMatch[1]}.
              </span>
              <span>{numberedMatch[2]}</span>
            </div>
          );
        }

        // Handle bold text (simple **text** pattern)
        const formattedLine = line.replace(
          /\*\*(.+?)\*\*/g,
          '<strong class="font-semibold">$1</strong>'
        );

        // Empty lines become spacing
        if (!line.trim()) {
          return <div key={index} className="h-2" />;
        }

        // Regular text
        return (
          <p
            key={index}
            className="leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        );
      })}
    </div>
  );
}

// =============================================================================
// TYPING INDICATOR
// =============================================================================

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-1" aria-label="Escribiendo...">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
    </div>
  );
}
