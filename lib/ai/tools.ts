/**
 * TALY - Tool Definitions
 *
 * Defines all available tools for the AI assistant
 */

import type { OpenRouterTool } from './types';

// =============================================================================
// READ-ONLY TOOLS (Phase 2)
// =============================================================================

export const getBalanceTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'getBalance',
    description: 'Obtiene el balance mensual del usuario: ingresos, gastos y balance neto. Usa este tool cuando el usuario pregunte por su balance, cuanto tiene, cuanto le queda, o su situacion financiera.',
    parameters: {
      type: 'object',
      properties: {
        month: {
          type: 'number',
          description: 'Mes a consultar (1-12). Si no se especifica, usa el mes actual.',
        },
        year: {
          type: 'number',
          description: 'Año a consultar. Si no se especifica, usa el año actual.',
        },
      },
      required: [],
    },
  },
};

export const listExpensesTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'listExpenses',
    description: 'Lista los gastos recientes del usuario. Usa este tool cuando el usuario pregunte por sus gastos, que ha gastado, o quiera ver sus transacciones.',
    parameters: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Numero maximo de gastos a retornar. Default: 10.',
        },
        categoryId: {
          type: 'number',
          description: 'Filtrar por categoria especifica (ID).',
        },
        search: {
          type: 'string',
          description: 'Buscar gastos por descripcion.',
        },
      },
      required: [],
    },
  },
};

export const getUpcomingPaymentsTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'getUpcomingPayments',
    description: 'Obtiene los gastos vencidos y proximos a vencer. Usa este tool cuando el usuario pregunte por pagos pendientes, gastos vencidos, o que tiene que pagar.',
    parameters: {
      type: 'object',
      properties: {
        daysAhead: {
          type: 'number',
          description: 'Dias hacia adelante para buscar gastos proximos. Default: 7.',
        },
      },
      required: [],
    },
  },
};

export const getCategoryStatsTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'getCategoryStats',
    description: 'Obtiene estadisticas de gastos por categoria. Usa este tool cuando el usuario pregunte cuanto gasta en una categoria, top categorias, o analisis de gastos.',
    parameters: {
      type: 'object',
      properties: {
        categoryId: {
          type: 'number',
          description: 'ID de la categoria especifica. Si no se especifica, retorna top categorias.',
        },
        month: {
          type: 'number',
          description: 'Mes a consultar (1-12). Default: mes actual.',
        },
        year: {
          type: 'number',
          description: 'Año a consultar. Default: año actual.',
        },
        limit: {
          type: 'number',
          description: 'Numero de categorias top a retornar. Default: 5.',
        },
      },
      required: [],
    },
  },
};

export const listCategoriesTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'listCategories',
    description: 'Lista las categorias del usuario. Usa este tool cuando necesites saber las categorias disponibles para registrar un gasto, o cuando el usuario pregunte por sus categorias.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
};

export const listPaymentMethodsTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'listPaymentMethods',
    description: 'Lista los metodos de pago del usuario. Usa este tool cuando necesites saber los metodos de pago disponibles.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
};

// =============================================================================
// MUTATION TOOLS (Phase 3)
// =============================================================================

export const addExpenseTool: OpenRouterTool = {
  type: 'function',
  function: {
    name: 'addExpense',
    description: 'Prepara un nuevo gasto para confirmar. NO guarda directamente, retorna los datos para que el usuario confirme. Usa este tool cuando el usuario quiera registrar un gasto.',
    parameters: {
      type: 'object',
      properties: {
        amount: {
          type: 'number',
          description: 'Monto del gasto (requerido).',
        },
        description: {
          type: 'string',
          description: 'Descripcion del gasto (requerido).',
        },
        categoryName: {
          type: 'string',
          description: 'Nombre de la categoria (el sistema buscara el ID). Si no existe, sugerira crear una.',
        },
        date: {
          type: 'string',
          description: 'Fecha del gasto en formato YYYY-MM-DD. Default: hoy.',
        },
        paymentStatus: {
          type: 'string',
          description: 'Estado del pago: "pagado" o "pendiente". Default: "pagado".',
          enum: ['pagado', 'pendiente'],
        },
      },
      required: ['amount', 'description'],
    },
  },
};

// =============================================================================
// ALL TOOLS EXPORT
// =============================================================================

export const READ_TOOLS: OpenRouterTool[] = [
  getBalanceTool,
  listExpensesTool,
  getUpcomingPaymentsTool,
  getCategoryStatsTool,
  listCategoriesTool,
  listPaymentMethodsTool,
];

export const MUTATION_TOOLS: OpenRouterTool[] = [
  addExpenseTool,
];

export const ALL_TOOLS: OpenRouterTool[] = [
  ...READ_TOOLS,
  ...MUTATION_TOOLS,
];

// =============================================================================
// TOOL NAME TYPE
// =============================================================================

export type ReadToolName =
  | 'getBalance'
  | 'listExpenses'
  | 'getUpcomingPayments'
  | 'getCategoryStats'
  | 'listCategories'
  | 'listPaymentMethods';

export type MutationToolName = 'addExpense';

export type ToolName = ReadToolName | MutationToolName;
