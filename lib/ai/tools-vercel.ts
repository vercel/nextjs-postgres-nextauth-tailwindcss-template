/**
 * TALY - Tool Definitions for Vercel AI SDK
 *
 * Defines all available tools using Zod schemas
 */

import { z } from 'zod';
import { tool } from 'ai';
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
import type { TalyContext, PendingExpense } from './types';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getMonthName(month: number): string {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  return months[month - 1] || '';
}

// =============================================================================
// TOOL FACTORY
// =============================================================================

export function createTalyTools(context: TalyContext) {
  const currency = context.currency as CurrencyCode;

  return {
    getBalance: tool({
      description: 'Obtiene el balance mensual del usuario: ingresos, gastos y balance neto. Usa este tool cuando el usuario pregunte por su balance, cuanto tiene, cuanto le queda, o su situacion financiera.',
      inputSchema: z.object({
        month: z.number().min(1).max(12).optional().describe('Mes a consultar (1-12). Si no se especifica, usa el mes actual.'),
        year: z.number().optional().describe('Año a consultar. Si no se especifica, usa el año actual.'),
      }),
      execute: async ({ month, year }) => {
        const now = new Date();
        const targetMonth = month || now.getMonth() + 1;
        const targetYear = year || now.getFullYear();

        const summary = await getMonthlySummary(context.userId, targetYear, targetMonth);

        return {
          message: `Balance de ${getMonthName(targetMonth)} ${targetYear}:
- Ingresos: ${formatCurrency(summary.totalIncome, currency)}
- Gastos: ${formatCurrency(summary.totalExpenses, currency)}
- Balance: ${formatCurrency(summary.balance, currency)}
- ${summary.expensesCount} gastos, ${summary.incomesCount} ingresos`,
          data: summary,
        };
      },
    }),

    listExpenses: tool({
      description: 'Lista los gastos recientes del usuario. Usa este tool cuando el usuario pregunte por sus gastos, que ha gastado, o quiera ver sus transacciones.',
      inputSchema: z.object({
        limit: z.number().optional().default(10).describe('Numero maximo de gastos a retornar. Default: 10.'),
        search: z.string().optional().describe('Buscar gastos por descripcion.'),
      }),
      execute: async ({ limit, search }) => {
        const { expenses } = await getExpensesByUser(context.userId, {
          limit,
          search,
        });

        if (expenses.length === 0) {
          return { message: 'No tienes gastos registrados.', data: [] };
        }

        const categories = await getCategoriesByUser(context.userId);
        const categoryMap = new Map(categories.map((c) => [c.id, c]));

        const expenseList = expenses.map((e) => {
          const cat = categoryMap.get(e.category_id);
          return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || 'Sin categoria'}) - ${e.date}`;
        });

        return {
          message: `Ultimos ${expenses.length} gastos:\n${expenseList.join('\n')}`,
          data: expenses,
        };
      },
    }),

    getUpcomingPayments: tool({
      description: 'Obtiene los gastos vencidos y proximos a vencer. Usa este tool cuando el usuario pregunte por pagos pendientes, gastos vencidos, o que tiene que pagar.',
      inputSchema: z.object({
        daysAhead: z.number().optional().default(7).describe('Dias hacia adelante para buscar gastos proximos. Default: 7.'),
      }),
      execute: async ({ daysAhead }) => {
        const expenses = await getAttentionRequiredExpenses(context.userId, daysAhead);

        if (expenses.length === 0) {
          return { message: 'No tienes pagos pendientes ni vencidos.', data: [] };
        }

        const categories = await getCategoriesByUser(context.userId);
        const categoryMap = new Map(categories.map((c) => [c.id, c]));
        const today = new Date().toISOString().split('T')[0];

        const overdueExpenses = expenses.filter((e) => e.date < today);
        const upcomingExpenses = expenses.filter((e) => e.date >= today);

        let message = '';

        if (overdueExpenses.length > 0) {
          const overdueTotal = overdueExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
          message += `VENCIDOS (${overdueExpenses.length}):\n`;
          message += overdueExpenses.map((e) => {
            const cat = categoryMap.get(e.category_id);
            return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || ''}) - Vencido: ${e.date}`;
          }).join('\n');
          message += `\nTotal vencido: ${formatCurrency(overdueTotal, currency)}\n\n`;
        }

        if (upcomingExpenses.length > 0) {
          const upcomingTotal = upcomingExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
          message += `PROXIMOS (${upcomingExpenses.length}):\n`;
          message += upcomingExpenses.map((e) => {
            const cat = categoryMap.get(e.category_id);
            return `- ${formatCurrency(e.amount, currency)} - ${e.description || 'Sin descripcion'} (${cat?.name || ''}) - ${e.date}`;
          }).join('\n');
          message += `\nTotal proximo: ${formatCurrency(upcomingTotal, currency)}`;
        }

        return { message: message.trim(), data: expenses };
      },
    }),

    getCategoryStats: tool({
      description: 'Obtiene estadisticas de gastos por categoria. Usa este tool cuando el usuario pregunte cuanto gasta en una categoria, top categorias, o analisis de gastos.',
      inputSchema: z.object({
        categoryId: z.number().optional().describe('ID de la categoria especifica. Si no se especifica, retorna top categorias.'),
        month: z.number().min(1).max(12).optional().describe('Mes a consultar (1-12). Default: mes actual.'),
        year: z.number().optional().describe('Año a consultar. Default: año actual.'),
        limit: z.number().optional().default(5).describe('Numero de categorias top a retornar. Default: 5.'),
      }),
      execute: async ({ categoryId, month, year, limit }) => {
        const now = new Date();
        const targetMonth = month || now.getMonth() + 1;
        const targetYear = year || now.getFullYear();

        if (categoryId) {
          const stats = await getCategoryStatistics(context.userId, categoryId);
          const categories = await getCategoriesByUser(context.userId);
          const category = categories.find((c) => c.id === categoryId);

          return {
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

        const topCategories = await getTopCategoriesByMonth(context.userId, targetYear, targetMonth, limit);

        if (topCategories.length === 0) {
          return {
            message: `No hay gastos registrados en ${getMonthName(targetMonth)} ${targetYear}.`,
            data: [],
          };
        }

        const categoryList = topCategories.map((c, i) =>
          `${i + 1}. ${c.categoryName}: ${formatCurrency(c.total, currency)} (${c.percentage.toFixed(1)}%)`
        );

        return {
          message: `Top ${topCategories.length} categorias en ${getMonthName(targetMonth)} ${targetYear}:\n${categoryList.join('\n')}`,
          data: topCategories,
        };
      },
    }),

    listCategories: tool({
      description: 'Lista las categorias del usuario. Usa este tool cuando necesites saber las categorias disponibles para registrar un gasto, o cuando el usuario pregunte por sus categorias.',
      inputSchema: z.object({}),
      execute: async () => {
        const categories = await getCategoriesByUser(context.userId);

        if (categories.length === 0) {
          return { message: 'No tienes categorias creadas.', data: [] };
        }

        const categoryList = categories.map((c) => `- ${c.name} (ID: ${c.id})`);

        return {
          message: `Tus categorias (${categories.length}):\n${categoryList.join('\n')}`,
          data: categories,
        };
      },
    }),

    listPaymentMethods: tool({
      description: 'Lista los metodos de pago del usuario. Usa este tool cuando necesites saber los metodos de pago disponibles.',
      inputSchema: z.object({}),
      execute: async () => {
        const methods = await getPaymentMethodsByUser(context.userId);

        if (methods.length === 0) {
          return { message: 'No tienes metodos de pago configurados.', data: [] };
        }

        const methodList = methods.map((m) => {
          let name = m.name;
          if (m.bank) name += ` (${m.bank})`;
          if (m.last_four_digits) name += ` ••${m.last_four_digits}`;
          if (m.is_default) name += ' [Default]';
          return `- ${name} (ID: ${m.id})`;
        });

        return {
          message: `Tus metodos de pago (${methods.length}):\n${methodList.join('\n')}`,
          data: methods,
        };
      },
    }),

    addExpense: tool({
      description: 'Prepara un nuevo gasto para confirmar. NO guarda directamente, retorna los datos para que el usuario confirme. Usa este tool cuando el usuario quiera registrar un gasto.',
      inputSchema: z.object({
        amount: z.number().positive().describe('Monto del gasto (requerido).'),
        description: z.string().min(1).describe('Descripcion del gasto (requerido).'),
        categoryName: z.string().optional().describe('Nombre de la categoria (el sistema buscara el ID). Si no existe, sugerira crear una.'),
        date: z.string().optional().describe('Fecha del gasto en formato YYYY-MM-DD. Default: hoy.'),
        paymentStatus: z.enum(['pagado', 'pendiente']).optional().default('pagado').describe('Estado del pago: "pagado" o "pendiente". Default: "pagado".'),
      }),
      execute: async ({ amount, description, categoryName, date, paymentStatus }) => {
        const expenseDate = date || new Date().toISOString().split('T')[0];

        // Find category by name
        const categories = await getCategoriesByUser(context.userId);
        let category: Category | undefined;

        if (categoryName) {
          // Try exact match first
          category = categories.find((c) => c.name.toLowerCase() === categoryName.toLowerCase());
          if (!category) {
            // Try partial match (both directions)
            category = categories.find((c) =>
              c.name.toLowerCase().includes(categoryName.toLowerCase()) ||
              categoryName.toLowerCase().includes(c.name.toLowerCase())
            );
          }
        }

        // If user specified a category but it wasn't found, list available options
        if (!category && categoryName && categories.length > 0) {
          const availableCategories = categories.map((c) => c.name).join(', ');
          return {
            message: `No encontre la categoria "${categoryName}". Tus categorias son: ${availableCategories}. ¿Cual quieres usar?`,
            pendingAction: null,
          };
        }

        // If no categories exist at all
        if (categories.length === 0) {
          return {
            message: `No tienes categorias creadas. Primero crea una categoria desde el dashboard.`,
            pendingAction: null,
          };
        }

        // If user didn't specify a category, ask them to choose
        if (!category) {
          const availableCategories = categories.map((c) => c.name).join(', ');
          return {
            message: `¿En que categoria registro este gasto? Tus categorias son: ${availableCategories}`,
            pendingAction: null,
          };
        }

        // Calculate impact
        const now = new Date();
        const summary = await getMonthlySummary(context.userId, now.getFullYear(), now.getMonth() + 1);
        const remainingBalance = summary.balance - amount;

        const pendingExpense: PendingExpense = {
          amount,
          description,
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: category.icon,
          date: expenseDate,
          paymentStatus,
          impact: `Te quedan ${formatCurrency(remainingBalance, currency)}`,
        };

        return {
          message: `Gasto preparado para confirmar:
- Monto: ${formatCurrency(amount, currency)}
- Descripcion: ${description}
- Categoria: ${category.name}
- Fecha: ${expenseDate}
- Estado: ${paymentStatus === 'pagado' ? 'Pagado' : 'Pendiente'}

${pendingExpense.impact}`,
          pendingAction: {
            type: 'expense' as const,
            data: pendingExpense,
          },
        };
      },
    }),
  };
}
