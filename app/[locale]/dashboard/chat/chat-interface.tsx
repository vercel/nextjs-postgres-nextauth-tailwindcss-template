'use client';

import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { TextStreamChatTransport } from 'ai';
import type { ToolUIPart } from 'ai';
import { Bot, Send, RefreshCw, User, Sparkles, Check, X, Loader2, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { confirmExpense } from '@/lib/ai/actions';
import type { PendingExpense } from '@/lib/ai/types';

// AI Elements components
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import { Loader } from '@/components/ai-elements/loader';
import { Suggestions, Suggestion } from '@/components/ai-elements/suggestion';
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from '@/components/ai-elements/tool';

// =============================================================================
// CHAT TRANSPORT
// =============================================================================

const chatTransport = new TextStreamChatTransport({
  api: '/api/chat',
});

// =============================================================================
// TOOL DISPLAY NAMES (for Spanish UI)
// =============================================================================

const TOOL_LABELS: Record<string, string> = {
  getBalance: 'Consultando balance',
  listExpenses: 'Buscando gastos',
  getUpcomingPayments: 'Verificando pagos pendientes',
  getCategoryStats: 'Analizando categorias',
  createExpense: 'Preparando gasto',
};

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

  const isLoading = status === 'submitted' || status === 'streaming';

  // Parse messages to detect pending expense confirmations
  React.useEffect(() => {
    if (messages.length === 0 || pendingExpense) return;

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

    // Skip if this is a confirmation of already saved expense
    const isAlreadySaved =
      normalizedContent.includes('registrado correctamente') ||
      normalizedContent.includes('ha sido registrado') ||
      normalizedContent.includes('guardado correctamente') ||
      normalizedContent.includes('el gasto ha sido') ||
      normalizedContent.includes('gasto registrado') ||
      normalizedContent.includes('creado exitosamente');

    if (isAlreadySaved) return;

    // Check if this looks like an expense confirmation REQUEST (not already saved)
    const isExpenseConfirmation =
      normalizedContent.includes('gasto preparado') ||
      normalizedContent.includes('voy a registrar') ||
      (normalizedContent.includes('confirma') && normalizedContent.includes('guardarlo'));

    if (!isExpenseConfirmation) return;

    // Helper function to parse currency amount
    const parseAmount = (str: string): number => {
      if (!str) return 0;
      const cleaned = str.replace(/[^\d,.\-]/g, '');
      if (!cleaned) return 0;

      let normalized = cleaned;
      if (normalized.includes(',') && normalized.includes('.')) {
        const lastComma = normalized.lastIndexOf(',');
        const lastDot = normalized.lastIndexOf('.');
        normalized = lastComma > lastDot
          ? normalized.replace(/\./g, '').replace(',', '.')
          : normalized.replace(/,/g, '');
      } else if (normalized.includes(',')) {
        const parts = normalized.split(',');
        normalized = parts.length === 2 && parts[1].length <= 2
          ? normalized.replace(',', '.')
          : normalized.replace(/,/g, '');
      }
      return parseFloat(normalized) || 0;
    };

    // Split into lines and parse all fields in a single pass
    const lines = content.replace(/\r\n?/g, '\n').split('\n').map(l => l.trim());

    let amount = 0;
    let description = '';
    let categoryName = '';

    for (const line of lines) {
      if (!amount && /[Mm]onto/i.test(line)) {
        const match = line.match(/[Mm]onto[:\s\-*]*\$?\s*([\d,.\s]+)/i);
        if (match) amount = parseAmount(match[1]);
      }
      if (!description && /[Dd]escripci[oó]n/i.test(line)) {
        const match = line.match(/[Dd]escripci[oó]n[:\s\-*]+(.+)/i);
        if (match) description = match[1].trim();
      }
      if (!categoryName && /[Cc]ategor[ií]a/i.test(line)) {
        const match = line.match(/[Cc]ategor[ií]a[:\s\-*]+(.+)/i);
        if (match) categoryName = match[1].trim();
      }
      // Early exit if all fields found
      if (amount && description && categoryName) break;
    }

    const paymentStatus = content.toLowerCase().includes('pendiente') ? 'pendiente' : 'pagado';
    const impactMatch = content.match(/[Tt]e quedan?\s*:?\s*(\$?[\d,.\s]+)/i);

    if (amount > 0) {
      setPendingExpense({
        amount,
        description: description || 'Sin descripcion',
        categoryId: 0,
        categoryName: categoryName || 'Sin categoria',
        date: new Date().toISOString().split('T')[0],
        paymentStatus,
        impact: impactMatch ? `Balance: ${impactMatch[1].trim()}` : undefined,
      });
      setConfirmationStatus('idle');
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

  const handleUpdateExpense = (updates: Partial<PendingExpense>) => {
    if (!pendingExpense) return;
    setPendingExpense({ ...pendingExpense, ...updates });
  };

  const handleSubmit = async ({ text }: { text: string }) => {
    if (!text.trim() || isLoading) return;
    setInput('');
    await sendMessage({ text: text.trim() });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] max-w-4xl mx-auto w-full">
      {/* Messages Area */}
      <Conversation className="flex-1" aria-live="polite" aria-relevant="additions">
        <ConversationContent className="gap-6 py-4 px-4">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
          ) : (
            messages.map((message) => {
              // Check for tool calls in the message
              const toolParts = message.parts?.filter(
                (p): p is ToolUIPart => p.type === 'tool-invocation'
              ) || [];

              return (
                <React.Fragment key={message.id}>
                  {/* Render tool calls */}
                  {toolParts.length > 0 && message.role === 'assistant' && (
                    <div className="flex gap-3 sm:gap-4">
                      <ChatAvatar role="assistant" />
                      <div className="flex-1 space-y-2">
                        {toolParts.map((tool) => (
                          <ToolCallDisplay key={tool.toolCallId} tool={tool} />
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Render message */}
                  <MessageBubble message={message} />
                </React.Fragment>
              );
            })
          )}

          {/* Loading indicator */}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex gap-3 sm:gap-4">
              <ChatAvatar role="assistant" />
              <div className="flex-1 pt-1">
                <LoadingIndicator status={status} />
              </div>
            </div>
          )}

          {/* Expense Confirmation Card */}
          {pendingExpense && confirmationStatus !== 'success' && (
            <ConfirmationCard
              expense={pendingExpense}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              onUpdate={handleUpdateExpense}
              isLoading={isConfirming}
              status={confirmationStatus}
            />
          )}

          {error && (
            <ErrorMessage error={error} onRetry={regenerate} />
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="max-w-3xl mx-auto">
          <PromptInput
            onSubmit={handleSubmit}
            className="relative"
          >
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Preguntale a Taly sobre tus finanzas..."
              disabled={isLoading}
              aria-label="Mensaje para Taly"
              className="min-h-[44px] max-h-[200px]"
            />
            <PromptInputFooter>
              <PromptInputTools>
                {/* Placeholder for future tools */}
              </PromptInputTools>
              {isLoading ? (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={stop}
                  aria-label="Detener generacion"
                  className="shrink-0 h-8 w-8"
                >
                  <div className="h-4 w-4 rounded-sm bg-foreground" />
                </Button>
              ) : (
                <PromptInputSubmit
                  disabled={!input.trim()}
                  aria-label="Enviar mensaje"
                  className="shrink-0"
                />
              )}
            </PromptInputFooter>
          </PromptInput>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Taly puede cometer errores. Verifica la informacion importante.
          </p>
        </div>
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

  // Skip data messages
  if (message.role === 'data') return null;

  // Extract text content from parts
  const content = message.parts
    ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text' && !!p.text)
    .map((p) => p.text)
    .join('\n') || '';

  if (!content) return null;

  // Cast role to accepted type (data is filtered out above)
  const messageRole = message.role as 'user' | 'assistant' | 'system';

  return (
    <Message
      from={messageRole}
      className={cn(
        'animate-in fade-in-50 slide-in-from-bottom-2 duration-300',
        isUser && 'max-w-[85%] sm:max-w-[80%] ml-auto'
      )}
    >
      <div className={cn('flex gap-3 sm:gap-4', isUser && 'flex-row-reverse')}>
        <ChatAvatar role={message.role} />
        <MessageContent
          className={cn(
            isUser && 'bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-sm'
          )}
        >
          {isUser ? (
            <p className="m-0 whitespace-pre-wrap leading-relaxed">{content}</p>
          ) : (
            <MessageResponse className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:leading-relaxed">
              {content}
            </MessageResponse>
          )}
        </MessageContent>
      </div>
    </Message>
  );
}

// =============================================================================
// CHAT AVATAR
// =============================================================================

function ChatAvatar({ role }: { role: string }) {
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
// LOADING INDICATOR
// =============================================================================

function LoadingIndicator({ status }: { status: string }) {
  const getMessage = () => {
    switch (status) {
      case 'submitted':
        return 'Pensando...';
      case 'streaming':
        return 'Escribiendo...';
      default:
        return 'Procesando...';
    }
  };

  return (
    <div
      className="flex items-center gap-3 py-2 animate-in fade-in-50 duration-300"
      role="status"
      aria-label={getMessage()}
    >
      <Loader variant="dots" />
      <span className="text-sm text-muted-foreground">{getMessage()}</span>
    </div>
  );
}

// =============================================================================
// TOOL CALL DISPLAY
// =============================================================================

function ToolCallDisplay({ tool }: { tool: ToolUIPart }) {
  // Extract tool name from type (format: "tool-<name>")
  const toolName = tool.type.startsWith('tool-')
    ? tool.type.slice(5) // Remove "tool-" prefix
    : tool.type;
  const displayName = TOOL_LABELS[toolName] || toolName;

  // Cast input/output to any to satisfy AI Elements component types
  const toolInput = tool.input as Record<string, unknown> | undefined;
  const toolOutput = tool.output as Record<string, unknown> | undefined;
  const toolError = tool.errorText as string | undefined;

  return (
    <Tool defaultOpen={false}>
      <ToolHeader
        title={displayName}
        type={tool.type}
        state={tool.state}
      />
      <ToolContent>
        {toolInput && <ToolInput input={toolInput} />}
        <ToolOutput output={toolOutput} errorText={toolError} />
      </ToolContent>
    </Tool>
  );
}

// =============================================================================
// WELCOME SCREEN
// =============================================================================

function WelcomeScreen({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) {
  const suggestions = [
    'Cual es mi balance este mes?',
    'Muestra mis ultimos gastos',
    'Tengo pagos pendientes?',
    'En que categoria gasto mas?',
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

      <div className="w-full max-w-lg">
        <Suggestions className="justify-center flex-wrap gap-3">
          {suggestions.map((text, i) => (
            <Suggestion
              key={i}
              suggestion={text}
              onClick={onSuggestionClick}
              variant="outline"
              className="min-h-[44px] px-4 py-2 text-sm"
              aria-label={`Preguntar: ${text}`}
            >
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              {text}
            </Suggestion>
          ))}
        </Suggestions>
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
// CONFIRMATION CARD (Editable)
// =============================================================================

interface ConfirmationCardProps {
  expense: PendingExpense;
  onConfirm: () => void;
  onCancel: () => void;
  onUpdate: (updates: Partial<PendingExpense>) => void;
  isLoading: boolean;
  status: 'idle' | 'success' | 'error';
}

function ConfirmationCard({ expense, onConfirm, onCancel, onUpdate, isLoading, status }: ConfirmationCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div className="flex gap-3 sm:gap-4">
      <ChatAvatar role="assistant" />
      <Card className="flex-1 max-w-md border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Confirmar gasto</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="h-8 px-2 text-xs"
              disabled={isLoading}
            >
              {isEditing ? 'Listo' : 'Editar'}
            </Button>
          </div>

          <div className="space-y-3 text-sm mb-4">
            {/* Monto */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground shrink-0">Monto:</span>
              {isEditing ? (
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={expense.amount}
                  onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
                  className="h-10 w-32 text-right"
                  aria-label="Monto del gasto"
                />
              ) : (
                <span className="font-semibold">${expense.amount.toLocaleString('es-AR')}</span>
              )}
            </div>

            {/* Descripcion */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground shrink-0">Descripcion:</span>
              {isEditing ? (
                <Input
                  type="text"
                  value={expense.description}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  className="h-10 flex-1 text-right"
                  aria-label="Descripcion del gasto"
                />
              ) : (
                <span className="truncate max-w-[180px]">{expense.description}</span>
              )}
            </div>

            {/* Categoria */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground shrink-0">Categoria:</span>
              {isEditing ? (
                <Input
                  type="text"
                  value={expense.categoryName}
                  onChange={(e) => onUpdate({ categoryName: e.target.value })}
                  className="h-10 flex-1 text-right"
                  aria-label="Categoria del gasto"
                />
              ) : (
                <span className="truncate max-w-[180px]">{expense.categoryName}</span>
              )}
            </div>

            {/* Estado */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground shrink-0">Estado:</span>
              {isEditing ? (
                <Select
                  value={expense.paymentStatus}
                  onValueChange={(value) => onUpdate({ paymentStatus: value as 'pagado' | 'pendiente' })}
                >
                  <SelectTrigger className="min-h-[44px] w-36" aria-label="Estado del pago">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pagado">Pagado</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span>{expense.paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}</span>
              )}
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
              disabled={isLoading || expense.amount <= 0}
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
