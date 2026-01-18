'use client';

import * as React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// =============================================================================
// TYPES
// =============================================================================

interface TalyTriggerProps {
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function TalyTrigger({ className }: TalyTriggerProps) {
  return (
    <Button
      asChild
      size="icon"
      className={cn(
        'fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full shadow-lg',
        'sm:bottom-6 sm:right-6',
        'transition-transform hover:scale-105 active:scale-95',
        className
      )}
      aria-label="Abrir chat con Taly"
    >
      <Link href="/dashboard/chat">
        <MessageCircle className="h-6 w-6" />
      </Link>
    </Button>
  );
}
