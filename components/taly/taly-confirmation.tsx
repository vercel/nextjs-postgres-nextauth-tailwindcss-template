'use client';

import * as React from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryIcon } from '@/components/ui/category-icon';
import { useTaly } from './taly-provider';
import type { PendingExpense, PendingAction } from '@/lib/ai/types';

// =============================================================================
// TYPES
// =============================================================================

interface TalyConfirmationProps {
  action: PendingAction;
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function TalyConfirmation({ action }: TalyConfirmationProps) {
  const { confirmAction, cancelAction, isLoading } = useTaly();
  const [isConfirming, setIsConfirming] = React.useState(false);

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await confirmAction();
    } finally {
      setIsConfirming(false);
    }
  };

  if (action.type === 'expense') {
    return (
      <ExpenseConfirmation
        expense={action.data as PendingExpense}
        onConfirm={handleConfirm}
        onCancel={cancelAction}
        isLoading={isConfirming || isLoading}
      />
    );
  }

  return null;
}

// =============================================================================
// EXPENSE CONFIRMATION
// =============================================================================

interface ExpenseConfirmationProps {
  expense: PendingExpense;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

function ExpenseConfirmation({
  expense,
  onConfirm,
  onCancel,
  isLoading,
}: ExpenseConfirmationProps) {
  return (
    <Card className="p-4 space-y-4 border-primary/20 bg-primary/5">
      <div className="flex items-start gap-3">
        <div className="shrink-0">
          <CategoryIcon
            icon={expense.categoryIcon || 'receipt'}
            color="#9FFF66"
            size={24}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">Registrar gasto</h4>
          <p className="text-2xl font-semibold mt-1">
            ${expense.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <DetailRow label="Descripcion" value={expense.description} />
        <DetailRow label="Categoria" value={expense.categoryName} />
        <DetailRow label="Fecha" value={formatDate(expense.date)} />
        <DetailRow
          label="Estado"
          value={expense.paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}
        />
      </div>

      {expense.impact && (
        <div className="pt-2 border-t">
          <p className="text-sm font-medium text-muted-foreground">
            {expense.impact}
          </p>
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 h-11"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button
          size="lg"
          className="flex-1 h-11"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          Confirmar
        </Button>
      </div>
    </Card>
  );
}

// =============================================================================
// HELPERS
// =============================================================================

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateOnly = new Date(year, month - 1, day);
  dateOnly.setHours(0, 0, 0, 0);

  if (dateOnly.getTime() === today.getTime()) {
    return 'Hoy';
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateOnly.getTime() === yesterday.getTime()) {
    return 'Ayer';
  }

  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
