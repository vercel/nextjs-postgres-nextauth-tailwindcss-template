'use client';

import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import { Bot, Send, RefreshCw, User, Sparkles, Check, X, Loader2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { confirmExpense } from '@/lib/ai/actions';
import type { PendingExpense } from '@/lib/ai/types';

// =============================================================================
// CHAT TRANSPORT
// =============================================================================

const chatTransport = new TextStreamChatTransport({
  api: '/api/chat',
});

// =============================================================================
// CHAT INTERFACE
// =============================================================================

export function ChatInterface() {
  const {
    messages,
    sendMessage,
    status,
    error,
    regenerate,
    stop,
  } = useChat({
    transport: chatTransport,
  });

  const [input, setInput] = React.useState('');
  const [pendingExpense, setPendingExpense] = React.useState<PendingExpense | null>(null);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [confirmationStatus, setConfirmationStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const isLoading = status === 'submitted' || status === 'streaming';

  // Parse messages to detect pending expense confirmations
  React.useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'assistant') return;

    // Extract text content
    const content = lastMessage.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text' && !!p.text)
      .map((p) => p.text)
      .join('\n') || '';

    // Normalize text for detection (remove accents for matching)
    const normalizedContent = content
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    // Check if this looks like an expense confirmation message
    const isExpenseConfirmation =
      normalizedContent.includes('gasto preparado') ||
      normalizedContent.includes('registrar') && normalizedContent.includes('gasto') ||
      normalizedContent.includes('voy a registrar') ||
      (normalizedContent.includes('monto:') &&
       normalizedContent.includes('descripcion:') &&
       normalizedContent.includes('categoria:')) ||
      (normalizedContent.includes('confirma') && normalizedContent.includes('guardarlo'));

    if (isExpenseConfirmation && !pendingExpense) {
      // Helper function to parse currency amount
      const parseAmount = (str: string): number => {
        if (!str) return 0;
        // Remove currency symbols, spaces, and other non-numeric chars except commas and dots
        const cleaned = str.replace(/[^\d,.\-]/g, '');
        if (!cleaned) return 0;

        // Determine format based on position of comma vs dot
        let normalized = cleaned;
        if (normalized.includes(',') && normalized.includes('.')) {
          const lastComma = normalized.lastIndexOf(',');
          const lastDot = normalized.lastIndexOf('.');
          if (lastComma > lastDot) {
            // European format: 1.000,50 -> 1000.50
            normalized = normalized.replace(/\./g, '').replace(',', '.');
          } else {
            // US format: 1,000.50 -> 1000.50
            normalized = normalized.replace(/,/g, '');
          }
        } else if (normalized.includes(',')) {
          const parts = normalized.split(',');
          // Check if comma is decimal separator (e.g., "100,50") or thousands (e.g., "1,000")
          if (parts.length === 2 && parts[1].length <= 2) {
            normalized = normalized.replace(',', '.');
          } else {
            // Thousands separator
            normalized = normalized.replace(/,/g, '');
          }
        }
        return parseFloat(normalized) || 0;
      };

      // Normalize content: replace various line endings and bullets
      const normalizedText = content
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');

      // Split into lines for more reliable parsing
      const lines = normalizedText.split('\n').map(l => l.trim());

      // Find amount - look for line containing "Monto"
      let amount = 0;
      for (const line of lines) {
        if (/[Mm]onto/i.test(line)) {
          // Extract everything after "Monto" that looks like a number
          const valueMatch = line.match(/[Mm]onto[:\s\-*]*\$?\s*([\d,.\s]+)/i);
          if (valueMatch) {
            amount = parseAmount(valueMatch[1]);
            break;
          }
        }
      }

      // Find description - look for line containing "Descripcion"
      let description = '';
      for (const line of lines) {
        if (/[Dd]escripci[oó]n/i.test(line)) {
          // Extract everything after "Descripcion:"
          const valueMatch = line.match(/[Dd]escripci[oó]n[:\s\-*]+(.+)/i);
          if (valueMatch) {
            description = valueMatch[1].trim();
            break;
          }
        }
      }

      // Find category - look for line containing "Categoria"
      let categoryName = '';
      for (const line of lines) {
        if (/[Cc]ategor[ií]a/i.test(line)) {
          // Extract everything after "Categoria:"
          const valueMatch = line.match(/[Cc]ategor[ií]a[:\s\-*]+(.+)/i);
          if (valueMatch) {
            categoryName = valueMatch[1].trim();
            break;
          }
        }
      }

      // Find status
      const paymentStatus = normalizedText.toLowerCase().includes('pendiente') ? 'pendiente' : 'pagado';

      // Find impact (balance remaining)
      let impact = '';
      const impactMatch = normalizedText.match(/[Tt]e quedan?\s*:?\s*(\$?[\d,.\s]+)/i);
      if (impactMatch) {
        impact = `Balance: ${impactMatch[1].trim()}`;
      }

      console.log('TALY Parse Debug:', { lines: lines.slice(0, 6), amount, description, categoryName });

      if (amount > 0) {
        setPendingExpense({
          amount,
          description: description || 'Sin descripcion',
          categoryId: 0,
          categoryName: categoryName || 'Sin categoria',
          date: new Date().toISOString().split('T')[0],
          paymentStatus,
          impact: impact || undefined,
        });
        setConfirmationStatus('idle');
      }
    }
  }, [messages, pendingExpense]);

  // Handle expense confirmation
  const handleConfirm = async () => {
    if (!pendingExpense || isConfirming) return;

    setIsConfirming(true);
    try {
      const result = await confirmExpense(pendingExpense);
      if (result.success) {
        setConfirmationStatus('success');
        // Send a confirmation message
        setTimeout(() => {
          setPendingExpense(null);
          sendMessage({ text: 'Gasto confirmado' });
        }, 1000);
      } else {
        setConfirmationStatus('error');
      }
    } catch {
      setConfirmationStatus('error');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setPendingExpense(null);
    setConfirmationStatus('idle');
  };

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-focus input
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const text = input.trim();
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    await sendMessage({ text });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] max-w-4xl mx-auto w-full">
      {/* Messages Area */}
      <ScrollArea ref={scrollRef} className="flex-1 px-4">
        <div
          className="py-4 space-y-6"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={(text) => {
              setInput(text);
              inputRef.current?.focus();
            }} />
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}

          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-4">
              <Avatar role="assistant" />
              <div className="flex-1 pt-1">
                <TypingIndicator />
              </div>
            </div>
          )}

          {/* Expense Confirmation Card */}
          {pendingExpense && confirmationStatus !== 'success' && (
            <ConfirmationCard
              expense={pendingExpense}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              isLoading={isConfirming}
              status={confirmationStatus}
            />
          )}

          {error && (
            <ErrorMessage error={error} onRetry={regenerate} />
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
          <div className="relative flex items-end gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Preguntale a Taly sobre tus finanzas..."
              disabled={isLoading}
              rows={1}
              className="min-h-[44px] max-h-[200px] resize-none py-3"
              aria-label="Mensaje para Taly"
            />
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={stop}
                aria-label="Detener generacion"
                className="shrink-0"
              >
                <div className="h-4 w-4 rounded-sm bg-foreground" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                aria-label="Enviar mensaje"
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Taly puede cometer errores. Verifica la informacion importante.
          </p>
        </form>
      </div>
    </div>
  );
}

// =============================================================================
// MESSAGE BUBBLE
// =============================================================================

interface MessageBubbleProps {
  message: {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    parts?: Array<{ type: string; text?: string }>;
  };
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  // Extract text content from parts
  const content = message.parts
    ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text' && !!p.text)
    .map((p) => p.text)
    .join('\n') || '';

  if (!content) return null;

  return (
    <div className={cn('flex gap-3 sm:gap-4', isUser && 'flex-row-reverse')}>
      <Avatar role={message.role} />
      <div
        className={cn(
          'flex-1 space-y-2 overflow-hidden',
          isUser && 'flex justify-end'
        )}
      >
        <div
          className={cn(
            'prose prose-sm dark:prose-invert max-w-none',
            isUser && 'bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 inline-block max-w-[85%] sm:max-w-[80%]'
          )}
        >
          {isUser ? (
            <p className="m-0 whitespace-pre-wrap leading-relaxed">{content}</p>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// AVATAR
// =============================================================================

function Avatar({ role }: { role: string }) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'shrink-0 h-10 w-10 rounded-full flex items-center justify-center',
        isUser ? 'bg-primary/10 border border-primary/20' : 'bg-primary'
      )}
      aria-hidden="true"
    >
      {isUser ? (
        <User className="h-5 w-5 text-primary" />
      ) : (
        <Bot className="h-5 w-5 text-primary-foreground" />
      )}
    </div>
  );
}

// =============================================================================
// TYPING INDICATOR
// =============================================================================

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2" aria-label="Escribiendo..." role="status">
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none motion-reduce:opacity-70" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none motion-reduce:opacity-70" />
      <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce motion-reduce:animate-none motion-reduce:opacity-70" />
    </div>
  );
}

// =============================================================================
// WELCOME SCREEN
// =============================================================================

function WelcomeScreen({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) {
  const suggestions = [
    { icon: Sparkles, text: 'Cual es mi balance este mes?' },
    { icon: Sparkles, text: 'Muestra mis ultimos gastos' },
    { icon: Sparkles, text: 'Tengo pagos pendientes?' },
    { icon: Sparkles, text: 'En que categoria gasto mas?' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-8">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-2 ring-primary/20">
        <Bot className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Hola, soy Taly</h1>
      <p className="text-muted-foreground mb-8 max-w-md text-sm sm:text-base">
        Tu asistente financiero personal. Preguntame sobre tu balance, gastos, pagos pendientes o registra nuevos gastos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg px-2 sm:px-0">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-left group min-h-[44px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Preguntar: ${suggestion.text}`}
          >
            <suggestion.icon className="h-5 w-5 shrink-0 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm leading-snug">{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// ERROR MESSAGE
// =============================================================================

interface ErrorMessageProps {
  error: Error;
  onRetry: () => void;
}

function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  // Parse error message - handle JSON format from API
  let message = error.message;
  try {
    const parsed = JSON.parse(message);
    if (parsed.error) {
      message = parsed.error;
    }
  } catch {
    // Not JSON, use as-is
  }

  // Detect rate limit errors
  const isRateLimit = message.toLowerCase().includes('limite') ||
                      message.toLowerCase().includes('limit') ||
                      message.includes('429');

  if (isRateLimit) {
    return (
      <div className="flex gap-3 sm:gap-4">
        <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-amber-500/10">
          <Clock className="h-5 w-5 text-amber-500" />
        </div>
        <Card className="flex-1 max-w-md border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-sm text-amber-700 dark:text-amber-400">
                Limite alcanzado
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Has alcanzado el limite de mensajes de tu plan. Espera unos minutos e intenta de nuevo.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Tip: Actualiza tu plan para mas mensajes
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Regular error
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-destructive/10">
        <AlertCircle className="h-5 w-5 text-destructive" />
      </div>
      <Card className="flex-1 max-w-md border-destructive/20 bg-destructive/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium text-sm text-destructive">
              Algo salio mal
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {message || 'Hubo un problema al procesar tu mensaje.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="min-h-[44px]"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// =============================================================================
// CONFIRMATION CARD
// =============================================================================

interface ConfirmationCardProps {
  expense: PendingExpense;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
  status: 'idle' | 'success' | 'error';
}

function ConfirmationCard({ expense, onConfirm, onCancel, isLoading, status }: ConfirmationCardProps) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <Avatar role="assistant" />
      <Card className="flex-1 max-w-md border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Check className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Confirmar gasto</span>
          </div>

          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monto:</span>
              <span className="font-semibold">${expense.amount.toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Descripcion:</span>
              <span>{expense.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Categoria:</span>
              <span>{expense.categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado:</span>
              <span>{expense.paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}</span>
            </div>
            {expense.impact && (
              <div className="pt-2 border-t text-muted-foreground">
                {expense.impact}
              </div>
            )}
          </div>

          {status === 'error' && (
            <p className="text-destructive text-xs mb-3">
              Error al guardar. Intenta de nuevo.
            </p>
          )}

          <div className="flex gap-2">
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              size="sm"
              className="flex-1 min-h-[44px]"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Confirmar
                </>
              )}
            </Button>
            <Button
              onClick={onCancel}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="min-h-[44px]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
