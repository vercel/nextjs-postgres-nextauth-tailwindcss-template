'use client';

import * as React from 'react';
import { confirmExpense } from '@/lib/ai/actions';
import type { ChatMessage, PendingAction, PendingExpense, StreamEvent } from '@/lib/ai/types';

// =============================================================================
// TYPES
// =============================================================================

interface TalyContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  messages: ChatMessage[];
  pendingAction: PendingAction | null;
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  confirmAction: () => Promise<void>;
  cancelAction: () => void;
  clearMessages: () => void;
}

const TalyContext = React.createContext<TalyContextValue | null>(null);

// =============================================================================
// HOOK
// =============================================================================

export function useTaly() {
  const context = React.useContext(TalyContext);
  if (!context) {
    throw new Error('useTaly must be used within TalyProvider');
  }
  return context;
}

// =============================================================================
// PROVIDER
// =============================================================================

interface TalyProviderProps {
  children: React.ReactNode;
}

export function TalyProvider({ children }: TalyProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [pendingAction, setPendingAction] = React.useState<PendingAction | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);

  const clearMessages = React.useCallback(() => {
    setMessages([]);
    setPendingAction(null);
    setError(null);
  }, []);

  const sendMessage = React.useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    setPendingAction(null);

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create assistant message placeholder
    const assistantId = crypto.randomUUID();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar mensaje');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      // Process SSE stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed || trimmed === 'data: [DONE]') {
            continue;
          }

          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.slice(6);
            try {
              const event = JSON.parse(jsonStr) as StreamEvent;

              switch (event.type) {
                case 'content':
                  accumulatedContent += event.data as string;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, content: accumulatedContent }
                        : m
                    )
                  );
                  break;

                case 'tool_result':
                  // Tool results are intermediate, content will follow
                  break;

                case 'pending_action':
                  setPendingAction(event.data as PendingAction);
                  break;

                case 'error':
                  const errorData = event.data as { error: string };
                  setError(errorData.error);
                  break;
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');

      // Remove the empty assistant message on error
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const confirmAction = React.useCallback(async () => {
    if (!pendingAction) return;

    setIsLoading(true);
    setError(null);

    try {
      if (pendingAction.type === 'expense') {
        const result = await confirmExpense(pendingAction.data as PendingExpense);

        if (result.success) {
          // Add success message
          const successMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Gasto registrado correctamente.',
            createdAt: new Date(),
          };
          setMessages((prev) => [...prev, successMessage]);
        } else {
          setError(result.error || 'Error al guardar el gasto');
        }
      }

      setPendingAction(null);
    } catch (err) {
      console.error('Confirm action error:', err);
      setError(err instanceof Error ? err.message : 'Error al confirmar');
    } finally {
      setIsLoading(false);
    }
  }, [pendingAction]);

  const cancelAction = React.useCallback(() => {
    setPendingAction(null);

    // Add cancellation message
    const cancelMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Operacion cancelada.',
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, cancelMessage]);
  }, []);

  const value = React.useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      messages,
      pendingAction,
      isLoading,
      error,
      sendMessage,
      confirmAction,
      cancelAction,
      clearMessages,
    }),
    [
      isOpen,
      open,
      close,
      toggle,
      messages,
      pendingAction,
      isLoading,
      error,
      sendMessage,
      confirmAction,
      cancelAction,
      clearMessages,
    ]
  );

  return <TalyContext.Provider value={value}>{children}</TalyContext.Provider>;
}
