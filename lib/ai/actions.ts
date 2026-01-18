'use server';

import { createExpense, getCategoriesByUser } from '@/lib/db';
import { withAuth, revalidateGastos, type ActionResult } from '@/lib/action-helpers';
import type { PendingExpense } from './types';

// =============================================================================
// CONFIRM EXPENSE
// =============================================================================

export async function confirmExpense(
  pending: PendingExpense
): Promise<ActionResult> {
  return withAuth(async (userId) => {
    // Validate pending expense
    if (!pending.amount || pending.amount <= 0) {
      throw new Error('Monto invalido');
    }

    if (!pending.description) {
      throw new Error('Descripcion requerida');
    }

    // Resolve category ID from name if needed
    let categoryId = pending.categoryId;

    if (!categoryId || categoryId === 0) {
      if (!pending.categoryName) {
        throw new Error('Categoria requerida');
      }

      // Look up category by name
      const categories = await getCategoriesByUser(userId);
      const category = categories.find(
        (c) => c.name.toLowerCase() === pending.categoryName?.toLowerCase()
      ) || categories.find(
        (c) => c.name.toLowerCase().includes(pending.categoryName?.toLowerCase() || '') ||
               (pending.categoryName?.toLowerCase() || '').includes(c.name.toLowerCase())
      );

      if (!category) {
        // Use first category as fallback
        if (categories.length > 0) {
          categoryId = categories[0].id;
        } else {
          throw new Error('No hay categorias disponibles');
        }
      } else {
        categoryId = category.id;
      }
    }

    // Create the expense
    await createExpense({
      user_id: userId,
      amount: pending.amount.toString(),
      description: pending.description,
      category_id: categoryId,
      date: pending.date,
      payment_status: pending.paymentStatus,
      payment_method: pending.paymentMethodId?.toString(),
      is_recurring: 0,
    });

    // Revalidate dashboard
    revalidateGastos();
  });
}

// =============================================================================
// CANCEL ACTION (for logging purposes)
// =============================================================================

export async function cancelTalyAction(): Promise<ActionResult> {
  // No-op, just for logging/analytics if needed
  return { success: true };
}
