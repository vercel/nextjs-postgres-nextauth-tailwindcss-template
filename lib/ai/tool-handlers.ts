/**
 * TALY - Tool Handlers
 *
 * Implements the logic for each tool, mapping to lib/db.ts functions
 */

import {
  getMonthlySummary,
  getExpensesByUser,
  getAttentionRequiredExpenses,
  getCategoryStatistics,
  getTopCategoriesByMonth,
  getCategoriesByUser,
  getPaymentMethodsByUser,
  type Category,
} from '@/lib/db';
import { formatCurrency } from '@/lib/utils/formatting';
import type { CurrencyCode } from '@/lib/config/currencies';
import type { TalyContext, PendingExpense, PendingAction } from './types';
import type { ToolName } from './tools';

// =============================================================================
// TOOL HANDLER TYPES
// =============================================================================

export interface ToolResult {
  success: boolean;
  data?: unknown;
  message: string;
  pendingAction?: PendingAction;
}

type ToolHandler = (
  args: Record<string, unknown>,
  context: TalyContext
) => Promise<ToolResult>;

// =============================================================================
// READ TOOL HANDLERS
// =============================================================================

async function handleGetBalance(
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const now = new Date();
  const month = (args.month as number) || now.getMonth() + 1;
  const year = (args.year as number) || now.getFullYear();

  const summary = await getMonthlySummary(context.userId, year, month);
  const currency = context.currency as CurrencyCode;

  return {
    success: true,
    message: `Balance de ${getMonthName(month)} ${year}:
- Ingresos: ${formatCurrency(summary.totalIncome, currency)}
- Gastos: ${formatCurrency(summary.totalExpenses, currency)}
- Balance: ${formatCurrency(summary.balance, currency)}
- ${summary.expensesCount} gastos, ${summary.incomesCount} ingresos`,
    data: summary,
  };
}

async function handleListExpenses(
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const limit = (args.limit as number) || 10;
  const search = args.search as string | undefined;

  const { expenses } = await getExpensesByUser(context.userId, {
    limit,
    search,
  });

  if (expenses.length === 0) {
    return {
      success: true,
      message: 'No tienes gastos registrados.',
      data: [],
    };
  }

  const categories = await getCategoriesByUser(context.userId);
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const currency = context.currency as CurrencyCode;

  const expenseList = expenses.map((e) => {
    const cat = categoryMap.get(e.category_id);
    return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || 'Sin categoria'}) - ${e.date}`;
  });

  return {
    success: true,
    message: `Ultimos ${expenses.length} gastos:\n${expenseList.join('\n')}`,
    data: expenses,
  };
}

async function handleGetUpcomingPayments(
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const daysAhead = (args.daysAhead as number) || 7;

  const expenses = await getAttentionRequiredExpenses(context.userId, daysAhead);

  if (expenses.length === 0) {
    return {
      success: true,
      message: 'No tienes pagos pendientes ni vencidos.',
      data: [],
    };
  }

  const categories = await getCategoriesByUser(context.userId);
  const categoryMap = new Map(categories.map((c) => [c.id, c]));
  const currency = context.currency as CurrencyCode;
  const today = new Date().toISOString().split('T')[0];

  const overdueExpenses = expenses.filter((e) => e.date < today);
  const upcomingExpenses = expenses.filter((e) => e.date >= today);

  let message = '';

  if (overdueExpenses.length > 0) {
    const overdueTotal = overdueExpenses.reduce(
      (sum, e) => sum + parseFloat(e.amount),
      0
    );
    message += `VENCIDOS (${overdueExpenses.length}):\n`;
    message += overdueExpenses
      .map((e) => {
        const cat = categoryMap.get(e.category_id);
        return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || ''}) - Vencido: ${e.date}`;
      })
      .join('\n');
    message += `\nTotal vencido: ${formatCurrency(overdueTotal, currency)}\n\n`;
  }

  if (upcomingExpenses.length > 0) {
    const upcomingTotal = upcomingExpenses.reduce(
      (sum, e) => sum + parseFloat(e.amount),
      0
    );
    message += `PROXIMOS (${upcomingExpenses.length}):\n`;
    message += upcomingExpenses
      .map((e) => {
        const cat = categoryMap.get(e.category_id);
        return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || ''}) - ${e.date}`;
      })
      .join('\n');
    message += `\nTotal proximo: ${formatCurrency(upcomingTotal, currency)}`;
  }

  return {
    success: true,
    message: message.trim(),
    data: expenses,
  };
}

async function handleGetCategoryStats(
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const now = new Date();
  const month = (args.month as number) || now.getMonth() + 1;
  const year = (args.year as number) || now.getFullYear();
  const categoryId = args.categoryId as number | undefined;
  const limit = (args.limit as number) || 5;
  const currency = context.currency as CurrencyCode;

  if (categoryId) {
    // Get stats for specific category
    const stats = await getCategoryStatistics(context.userId, categoryId);
    const categories = await getCategoriesByUser(context.userId);
    const category = categories.find((c) => c.id === categoryId);

    return {
      success: true,
      message: `Estadisticas de ${category?.name || 'categoria'}:
- Total gastado: ${formatCurrency(stats.totalSpent, currency)}
- Numero de gastos: ${stats.expenseCount}
- Promedio por gasto: ${formatCurrency(stats.averageExpense, currency)}
- Pagados: ${formatCurrency(stats.paidTotal, currency)} (${stats.paidCount})
- Pendientes: ${formatCurrency(stats.pendingTotal, currency)} (${stats.pendingCount})
- Vencidos: ${formatCurrency(stats.overdueTotal, currency)} (${stats.overdueCount})`,
      data: stats,
    };
  }

  // Get top categories
  const topCategories = await getTopCategoriesByMonth(
    context.userId,
    year,
    month,
    limit
  );

  if (topCategories.length === 0) {
    return {
      success: true,
      message: `No hay gastos registrados en ${getMonthName(month)} ${year}.`,
      data: [],
    };
  }

  const categoryList = topCategories.map(
    (c, i) =>
      `${i + 1}. ${c.categoryName}: ${formatCurrency(c.total, currency)} (${c.percentage.toFixed(1)}%)`
  );

  return {
    success: true,
    message: `Top ${topCategories.length} categorias en ${getMonthName(month)} ${year}:\n${categoryList.join('\n')}`,
    data: topCategories,
  };
}

async function handleListCategories(
  _args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const categories = await getCategoriesByUser(context.userId);

  if (categories.length === 0) {
    return {
      success: true,
      message: 'No tienes categorias creadas.',
      data: [],
    };
  }

  const categoryList = categories.map((c) => `- ${c.name} (ID: ${c.id})`);

  return {
    success: true,
    message: `Tus categorias (${categories.length}):\n${categoryList.join('\n')}`,
    data: categories,
  };
}

async function handleListPaymentMethods(
  _args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const methods = await getPaymentMethodsByUser(context.userId);

  if (methods.length === 0) {
    return {
      success: true,
      message: 'No tienes metodos de pago configurados.',
      data: [],
    };
  }

  const methodList = methods.map((m) => {
    let name = m.name;
    if (m.bank) name += ` (${m.bank})`;
    if (m.last_four_digits) name += ` ••${m.last_four_digits}`;
    if (m.is_default) name += ' [Default]';
    return `- ${name} (ID: ${m.id})`;
  });

  return {
    success: true,
    message: `Tus metodos de pago (${methods.length}):\n${methodList.join('\n')}`,
    data: methods,
  };
}

// =============================================================================
// MUTATION TOOL HANDLERS
// =============================================================================

async function handleAddExpense(
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const amount = args.amount as number;
  const description = args.description as string;
  const categoryName = args.categoryName as string | undefined;
  const date = (args.date as string) || new Date().toISOString().split('T')[0];
  const paymentStatus = (args.paymentStatus as 'pagado' | 'pendiente') || 'pagado';

  if (!amount || amount <= 0) {
    return {
      success: false,
      message: 'El monto debe ser mayor a 0.',
    };
  }

  if (!description) {
    return {
      success: false,
      message: 'La descripcion es requerida.',
    };
  }

  // Find category by name
  const categories = await getCategoriesByUser(context.userId);
  let category: Category | undefined;

  if (categoryName) {
    // Try exact match first
    category = categories.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase()
    );

    // Try partial match
    if (!category) {
      category = categories.find((c) =>
        c.name.toLowerCase().includes(categoryName.toLowerCase())
      );
    }
  }

  if (!category && categories.length > 0) {
    // Use first category as fallback
    category = categories[0];
  }

  if (!category) {
    return {
      success: false,
      message: `No encontre la categoria "${categoryName}". Primero crea una categoria desde el dashboard.`,
    };
  }

  const currency = context.currency as CurrencyCode;

  // Calculate impact (remaining balance after this expense)
  const now = new Date();
  const summary = await getMonthlySummary(
    context.userId,
    now.getFullYear(),
    now.getMonth() + 1
  );
  const remainingBalance = summary.balance - amount;

  const pendingExpense: PendingExpense = {
    amount,
    description,
    categoryId: category.id,
    categoryName: category.name,
    categoryIcon: category.icon,
    date,
    paymentStatus,
    impact: `Te quedan ${formatCurrency(remainingBalance, currency)}`,
  };

  return {
    success: true,
    message: `Gasto preparado para confirmar:
- Monto: ${formatCurrency(amount, currency)}
- Descripcion: ${description}
- Categoria: ${category.name}
- Fecha: ${date}
- Estado: ${paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}

${pendingExpense.impact}`,
    pendingAction: {
      type: 'expense',
      data: pendingExpense,
    },
  };
}

// =============================================================================
// HANDLER REGISTRY
// =============================================================================

const toolHandlers: Record<ToolName, ToolHandler> = {
  getBalance: handleGetBalance,
  listExpenses: handleListExpenses,
  getUpcomingPayments: handleGetUpcomingPayments,
  getCategoryStats: handleGetCategoryStats,
  listCategories: handleListCategories,
  listPaymentMethods: handleListPaymentMethods,
  addExpense: handleAddExpense,
};

// =============================================================================
// MAIN EXECUTOR
// =============================================================================

export async function executeTool(
  toolName: string,
  args: Record<string, unknown>,
  context: TalyContext
): Promise<ToolResult> {
  const handler = toolHandlers[toolName as ToolName];

  if (!handler) {
    return {
      success: false,
      message: `Tool "${toolName}" no encontrado.`,
    };
  }

  try {
    return await handler(args, context);
  } catch (error) {
    console.error(`Error executing tool ${toolName}:`, error);
    return {
      success: false,
      message: 'Hubo un error al procesar tu solicitud.',
    };
  }
}

// =============================================================================
// HELPERS
// =============================================================================

function getMonthName(month: number): string {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return months[month - 1] || '';
}
