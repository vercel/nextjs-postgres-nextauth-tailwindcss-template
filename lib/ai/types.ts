/**
 * TALY - Types and Schemas
 *
 * Type definitions for the conversational AI assistant
 */

import type { PaymentStatus } from '@/lib/constants/enums';

// =============================================================================
// CHAT MESSAGE TYPES
// =============================================================================

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  toolCalls?: ToolCall[];
  pending?: PendingAction;
  createdAt: Date;
}

export interface ToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
  result?: unknown;
}

// =============================================================================
// PENDING ACTION TYPES (for confirmations)
// =============================================================================

export type PendingActionType = 'expense' | 'category' | 'income';

export interface PendingAction {
  type: PendingActionType;
  data: PendingExpense | PendingCategory | PendingIncome;
}

export interface PendingExpense {
  amount: number;
  description: string;
  categoryId: number;
  categoryName: string;
  categoryIcon?: string | null;
  date: string;
  paymentStatus: PaymentStatus;
  paymentMethodId?: number;
  paymentMethodName?: string;
  impact?: string; // "Te quedan $12,450"
}

export interface PendingCategory {
  name: string;
  color: string;
  icon: string;
  description?: string;
}

export interface PendingIncome {
  amount: number;
  source: string;
  categoryId?: number;
  categoryName?: string;
  date: string;
  description?: string;
}

// =============================================================================
// API REQUEST/RESPONSE TYPES
// =============================================================================

export interface ChatRequest {
  messages: ChatMessage[];
  userId: string;
}

export interface ChatResponse {
  message: ChatMessage;
  usage?: TokenUsage;
}

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

// =============================================================================
// TOOL DEFINITIONS
// =============================================================================

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, ToolParameter>;
    required?: string[];
  };
}

export interface ToolParameter {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  enum?: string[];
  items?: { type: string };
}

// =============================================================================
// RATE LIMITING
// =============================================================================

export interface RateLimitConfig {
  messagesPerHour: number;
  tokensPerDay: number;
}

export interface RateLimitStatus {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  reason?: 'messages' | 'tokens';
}

// =============================================================================
// CONTEXT FOR TOOL HANDLERS
// =============================================================================

export interface TalyContext {
  userId: string;
  currency: string;
  timezone: string | null;
  language: 'es' | 'en';
}

// =============================================================================
// OPENROUTER API TYPES
// =============================================================================

export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string | null;
  tool_calls?: OpenRouterToolCall[];
  tool_call_id?: string;
}

export interface OpenRouterToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  tools?: OpenRouterTool[];
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
}

export interface OpenRouterTool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface OpenRouterStreamDelta {
  role?: string;
  content?: string;
  tool_calls?: Array<{
    index: number;
    id?: string;
    type?: string;
    function?: {
      name?: string;
      arguments?: string;
    };
  }>;
}

export interface OpenRouterStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    delta: OpenRouterStreamDelta;
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// =============================================================================
// STREAMING TYPES
// =============================================================================

export interface StreamEvent {
  type: 'content' | 'tool_call' | 'tool_result' | 'pending_action' | 'done' | 'error';
  data: string | ToolCall | PendingAction | { error: string };
}
