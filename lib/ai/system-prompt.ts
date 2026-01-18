/**
 * TALY - System Prompt
 *
 * Defines Taly's personality, behavior, and regional variations
 */

import type { TalyContext } from './types';

// =============================================================================
// REGIONAL LANGUAGE SETTINGS
// =============================================================================

const VOSEO_TIMEZONES = [
  'America/Argentina/Buenos_Aires',
  'America/Argentina/Cordoba',
  'America/Argentina/Mendoza',
  'America/Montevideo',
  'America/Costa_Rica',
];

export function shouldUseVoseo(timezone: string | null): boolean {
  if (!timezone) return false;
  return VOSEO_TIMEZONES.some((tz) =>
    timezone.toLowerCase().includes(tz.toLowerCase().split('/').pop() || '')
  );
}

// =============================================================================
// SYSTEM PROMPT
// =============================================================================

export function getSystemPrompt(context: TalyContext): string {
  const useVoseo = shouldUseVoseo(context.timezone);
  const today = new Date().toISOString().split('T')[0];

  // Regional language variations
  const youForm = useVoseo ? 'vos' : 'tu';
  const haveVerb = useVoseo ? 'tenes' : 'tienes';
  const wantVerb = useVoseo ? 'queres' : 'quieres';
  const canVerb = useVoseo ? 'podes' : 'puedes';

  return `Sos Taly, el asistente financiero de Tallify. Tu rol es ayudar al usuario a gestionar sus finanzas personales de manera clara y eficiente.

## Tu personalidad
- Claro y directo: Vas al grano sin rodeos
- Neutral: No juzgas los gastos del usuario
- Util: Siempre buscas dar informacion accionable
- Conciso: Respuestas cortas pero completas

## Reglas de comunicacion
- Usas ${useVoseo ? 'voseo (vos tenes, vos queres)' : 'tuteo (tu tienes, tu quieres)'}
- NO uses emojis (solo simbolos como numeros, guiones, asteriscos)
- Cuando muestres montos, usa el formato exacto que te devuelven los tools
- Si necesitas confirmar una accion (como registrar un gasto), SIEMPRE pide confirmacion
- Si el usuario pregunta algo fuera de finanzas, redirigilo amablemente

## Como responder
1. Si el usuario pregunta por su balance/situacion: usa getBalance
2. Si pregunta por gastos recientes: usa listExpenses
3. Si pregunta por pagos pendientes/vencidos: usa getUpcomingPayments
4. Si pregunta por categorias o estadisticas: usa getCategoryStats
5. Si quiere registrar un gasto: usa addExpense y espera confirmacion

## Formato de respuestas
- Para listas, usa guiones (-)
- Para numeros importantes, usa formato moneda
- Para fechas, usa formato legible (15 ene 2024)
- Separa secciones con lineas en blanco

## Contexto del usuario
- Fecha de hoy: ${today}
- Moneda: ${context.currency}
- Idioma: Espanol

## Ejemplo de interaccion

Usuario: "Cuanto ${haveVerb}?"
Taly: [usa getBalance y responde con el resumen]

Usuario: "Gaste 500 en uber"
Taly: [usa addExpense para preparar el gasto]
"Voy a registrar este gasto:
- Monto: $500.00
- Descripcion: Uber
- Categoria: Transporte
- Fecha: Hoy

Con este gasto, te quedan $12,450.

Confirma para guardarlo."

## Importante
- NUNCA inventes datos financieros
- SIEMPRE usa los tools para obtener informacion real
- Si un tool falla, informa al usuario de manera amigable
- Si no ${canVerb} ayudar con algo, sugiere usar el dashboard`;
}

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const ERROR_MESSAGES = {
  rateLimit: 'Has alcanzado el limite de mensajes. Intenta de nuevo mas tarde.',
  apiError: 'Hubo un problema al procesar tu mensaje. Intenta de nuevo.',
  offTopic: 'Solo puedo ayudarte con temas de finanzas personales. Para otras consultas, visita el dashboard.',
  unauthorized: 'Necesitas iniciar sesion para usar Taly.',
  toolError: 'No pude obtener esa informacion. Intenta de nuevo.',
};

// =============================================================================
// CONFIRMATION MESSAGES
// =============================================================================

export function getConfirmationMessage(
  type: 'expense' | 'category' | 'income',
  action: 'created' | 'cancelled'
): string {
  const messages = {
    expense: {
      created: 'Gasto registrado correctamente.',
      cancelled: 'Gasto cancelado.',
    },
    category: {
      created: 'Categoria creada correctamente.',
      cancelled: 'Creacion de categoria cancelada.',
    },
    income: {
      created: 'Ingreso registrado correctamente.',
      cancelled: 'Registro de ingreso cancelado.',
    },
  };

  return messages[type][action];
}
