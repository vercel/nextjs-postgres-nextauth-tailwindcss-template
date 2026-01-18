'use client';

import * as React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTaly } from './taly-provider';

// =============================================================================
// TYPES
// =============================================================================

interface TalyInputProps {
  placeholder?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TalyInput({ placeholder = 'Escribe un mensaje...' }: TalyInputProps) {
  const { sendMessage, isLoading } = useTaly();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!value.trim() || isLoading) return;

      const message = value.trim();
      setValue('');
      await sendMessage(message);
      inputRef.current?.focus();
    },
    [value, isLoading, sendMessage]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t bg-background p-3"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 min-h-[44px] rounded-xl border bg-muted/50 px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50"
        aria-label="Mensaje para Taly"
      />
      <Button
        type="submit"
        size="icon"
        disabled={!value.trim() || isLoading}
        className="h-11 w-11 shrink-0 rounded-xl"
        aria-label={isLoading ? 'Enviando...' : 'Enviar mensaje'}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
}
