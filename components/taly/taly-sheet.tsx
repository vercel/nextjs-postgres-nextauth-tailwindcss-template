'use client';

import * as React from 'react';
import { Bot, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTaly } from './taly-provider';
import { TalyMessage } from './taly-message';
import { TalyInput } from './taly-input';
import { TalyConfirmation } from './taly-confirmation';

// =============================================================================
// COMPONENT
// =============================================================================

export function TalySheet() {
  const {
    isOpen,
    close,
    messages,
    pendingAction,
    error,
    clearMessages,
  } = useTaly();

  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pendingAction]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] p-0 flex flex-col"
      >
        <SheetHeader className="px-4 py-3 border-b shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <SheetTitle className="text-base">Taly</SheetTitle>
                <SheetDescription className="text-xs">
                  Tu asistente financiero
                </SheetDescription>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearMessages}
                className="h-8 w-8"
                aria-label="Limpiar conversacion"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea
          ref={scrollRef}
          className="flex-1 px-4"
        >
          <div className="py-4 space-y-4">
            {messages.length === 0 ? (
              <WelcomeMessage />
            ) : (
              <>
                {messages.map((message) => (
                  <TalyMessage key={message.id} message={message} />
                ))}

                {pendingAction && (
                  <TalyConfirmation action={pendingAction} />
                )}

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    {error}
                  </div>
                )}
              </>
            )}
          </div>
        </ScrollArea>

        <TalyInput placeholder="Escribe un mensaje..." />
      </SheetContent>
    </Sheet>
  );
}

// =============================================================================
// WELCOME MESSAGE
// =============================================================================

function WelcomeMessage() {
  return (
    <div className="text-center py-8 px-4">
      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
        <Bot className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-semibold text-lg mb-2">Hola, soy Taly</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Tu asistente financiero personal. Puedo ayudarte a:
      </p>
      <ul className="text-sm text-left space-y-2 text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="text-primary">-</span>
          <span>Ver tu balance y gastos</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">-</span>
          <span>Registrar gastos rapidamente</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">-</span>
          <span>Revisar pagos pendientes</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">-</span>
          <span>Analizar gastos por categoria</span>
        </li>
      </ul>
      <p className="text-xs text-muted-foreground mt-6">
        Prueba escribiendo: "Cuanto tengo?" o "Gaste 500 en uber"
      </p>
    </div>
  );
}
