/**
 * TALY - Security Module
 *
 * Input sanitization, prompt injection protection, and content filtering
 */

// =============================================================================
// INPUT SANITIZATION
// =============================================================================

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Trim and limit length
  let sanitized = input.trim().slice(0, 2000);

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Remove control characters (except newlines and tabs)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return sanitized;
}

// =============================================================================
// PROMPT INJECTION DETECTION
// =============================================================================

const INJECTION_PATTERNS = [
  // Direct instruction override attempts
  /ignore\s+(previous|all|above)\s+instructions?/i,
  /disregard\s+(previous|all|above)\s+instructions?/i,
  /forget\s+(previous|all|above)\s+instructions?/i,
  /override\s+(system|previous)\s+(prompt|instructions?)/i,

  // Role manipulation
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(a|an)\s+/i,
  /pretend\s+(to\s+be|you\s+are)/i,
  /roleplay\s+as/i,

  // System prompt extraction
  /what\s+(is|are)\s+your\s+(system\s+)?instructions?/i,
  /reveal\s+your\s+(system\s+)?prompt/i,
  /show\s+(me\s+)?your\s+(system\s+)?instructions?/i,
  /print\s+your\s+(system\s+)?prompt/i,

  // Jailbreak attempts
  /jailbreak/i,
  /dan\s+mode/i,
  /developer\s+mode/i,
  /bypass\s+(safety|filter|content)/i,

  // Code execution attempts
  /<script/i,
  /javascript:/i,
  /eval\s*\(/i,
  /exec\s*\(/i,
];

export interface InjectionCheckResult {
  safe: boolean;
  reason?: string;
}

/**
 * Check if input contains potential prompt injection
 */
export function checkForInjection(input: string): InjectionCheckResult {
  const normalized = input.toLowerCase();

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        safe: false,
        reason: 'Detected potential prompt injection attempt',
      };
    }
  }

  return { safe: true };
}

// =============================================================================
// OFF-TOPIC DETECTION
// =============================================================================

const OFF_TOPIC_PATTERNS = [
  // Code generation requests
  /write\s+(me\s+)?(a\s+)?(code|script|program)/i,
  /generate\s+(a\s+)?(code|script|program)/i,
  /create\s+(a\s+)?(python|javascript|java|c\+\+)/i,

  // General knowledge questions
  /who\s+(is|was)\s+/i,
  /what\s+is\s+the\s+capital\s+of/i,
  /tell\s+me\s+(a\s+)?(joke|story)/i,
  /explain\s+(quantum|physics|history)/i,

  // Harmful content
  /how\s+to\s+(hack|steal|fraud)/i,
  /illegal\s+ways?\s+to/i,
];

// Financial topic keywords that indicate valid queries
const FINANCIAL_KEYWORDS = [
  'gasto',
  'gastos',
  'ingreso',
  'ingresos',
  'balance',
  'dinero',
  'plata',
  'pago',
  'pagos',
  'deuda',
  'deudas',
  'ahorro',
  'ahorros',
  'presupuesto',
  'categoria',
  'categorias',
  'transferencia',
  'tarjeta',
  'efectivo',
  'banco',
  'cuenta',
  'sueldo',
  'salario',
  'factura',
  'recibo',
  'expense',
  'income',
  'money',
  'payment',
  'debt',
  'savings',
  'budget',
  'cuanto',
  'tengo',
  'queda',
  'gaste',
  'recibi',
  'pague',
  'debo',
  'vencido',
  'pendiente',
  'pagado',
  'registrar',
  'agregar',
  'añadir',
];

export interface TopicCheckResult {
  onTopic: boolean;
  reason?: string;
}

/**
 * Check if the query is related to financial topics
 */
export function checkTopic(input: string): TopicCheckResult {
  const normalized = input.toLowerCase();

  // Check for explicitly off-topic patterns
  for (const pattern of OFF_TOPIC_PATTERNS) {
    if (pattern.test(normalized)) {
      return {
        onTopic: false,
        reason: 'Query appears to be off-topic',
      };
    }
  }

  // Check if it contains financial keywords
  const hasFinancialKeyword = FINANCIAL_KEYWORDS.some((keyword) =>
    normalized.includes(keyword)
  );

  // Short queries or greetings are allowed
  const isShortOrGreeting =
    input.length < 30 ||
    /^(hola|hey|hi|buenos?\s+d[ií]as?|buenas?\s+(tardes?|noches?))/i.test(
      normalized
    );

  if (hasFinancialKeyword || isShortOrGreeting) {
    return { onTopic: true };
  }

  // Allow general questions that might be financial
  if (normalized.includes('?') && input.length < 100) {
    return { onTopic: true };
  }

  // Be permissive - only block clearly off-topic
  return { onTopic: true };
}

// =============================================================================
// TOOL RESPONSE VALIDATION
// =============================================================================

/**
 * Validate that tool response doesn't contain sensitive data leaks
 */
export function validateToolResponse(response: unknown): boolean {
  if (!response) return true;

  const responseStr = JSON.stringify(response);

  // Check for potential sensitive data patterns
  const sensitivePatterns = [
    /password/i,
    /secret/i,
    /api_key/i,
    /access_token/i,
    /private_key/i,
  ];

  for (const pattern of sensitivePatterns) {
    if (pattern.test(responseStr)) {
      console.warn('Potential sensitive data in tool response');
      return false;
    }
  }

  return true;
}

// =============================================================================
// MAIN SECURITY CHECK
// =============================================================================

export interface SecurityCheckResult {
  allowed: boolean;
  error?: string;
  sanitizedInput?: string;
}

/**
 * Run all security checks on user input
 */
export function runSecurityChecks(input: string): SecurityCheckResult {
  // 1. Sanitize input
  const sanitized = sanitizeInput(input);

  if (!sanitized) {
    return {
      allowed: false,
      error: 'El mensaje esta vacio.',
    };
  }

  // 2. Check for injection attempts
  const injectionCheck = checkForInjection(sanitized);
  if (!injectionCheck.safe) {
    return {
      allowed: false,
      error: 'No puedo procesar ese tipo de solicitud.',
    };
  }

  // 3. Check topic relevance
  const topicCheck = checkTopic(sanitized);
  if (!topicCheck.onTopic) {
    return {
      allowed: false,
      error: 'Solo puedo ayudarte con temas de finanzas personales.',
    };
  }

  return {
    allowed: true,
    sanitizedInput: sanitized,
  };
}
