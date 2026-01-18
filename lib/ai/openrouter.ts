/**
 * TALY - OpenRouter Client
 *
 * Client for communicating with OpenRouter API with streaming support
 */

import type {
  OpenRouterRequest,
  OpenRouterMessage,
  OpenRouterTool,
  OpenRouterStreamChunk,
} from './types';

// =============================================================================
// CONFIGURATION
// =============================================================================

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'openai/gpt-4o-mini';
const DEFAULT_MAX_TOKENS = 1024;
const DEFAULT_TEMPERATURE = 0.7;

// =============================================================================
// CLIENT
// =============================================================================

export interface OpenRouterClientConfig {
  apiKey: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
  siteUrl?: string;
  siteName?: string;
}

export class OpenRouterClient {
  private apiKey: string;
  private model: string;
  private maxTokens: number;
  private temperature: number;
  private siteUrl: string;
  private siteName: string;

  constructor(config: OpenRouterClientConfig) {
    this.apiKey = config.apiKey;
    this.model = config.model || DEFAULT_MODEL;
    this.maxTokens = config.maxTokens || DEFAULT_MAX_TOKENS;
    this.temperature = config.temperature || DEFAULT_TEMPERATURE;
    this.siteUrl = config.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://tallify.app';
    this.siteName = config.siteName || 'Tallify';
  }

  /**
   * Send a streaming chat completion request
   */
  async *streamChat(
    messages: OpenRouterMessage[],
    tools?: OpenRouterTool[]
  ): AsyncGenerator<OpenRouterStreamChunk> {
    const request: OpenRouterRequest = {
      model: this.model,
      messages,
      stream: true,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    };

    if (tools && tools.length > 0) {
      request.tools = tools;
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': this.siteUrl,
        'X-Title': this.siteName,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed || trimmed === 'data: [DONE]') {
            continue;
          }

          if (trimmed.startsWith('data: ')) {
            const jsonStr = trimmed.slice(6);
            try {
              const chunk = JSON.parse(jsonStr) as OpenRouterStreamChunk;
              yield chunk;
            } catch {
              // Skip malformed JSON
              console.warn('Malformed JSON in stream:', jsonStr);
            }
          }
        }
      }

      // Process any remaining buffer
      if (buffer.trim() && buffer.startsWith('data: ') && buffer !== 'data: [DONE]') {
        const jsonStr = buffer.trim().slice(6);
        try {
          const chunk = JSON.parse(jsonStr) as OpenRouterStreamChunk;
          yield chunk;
        } catch {
          // Skip malformed JSON
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Send a non-streaming chat completion request (for tool calls)
   */
  async chat(
    messages: OpenRouterMessage[],
    tools?: OpenRouterTool[]
  ): Promise<{
    content: string | null;
    toolCalls: Array<{
      id: string;
      name: string;
      arguments: Record<string, unknown>;
    }>;
    usage: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
  }> {
    const request: OpenRouterRequest = {
      model: this.model,
      messages,
      stream: false,
      max_tokens: this.maxTokens,
      temperature: this.temperature,
    };

    if (tools && tools.length > 0) {
      request.tools = tools;
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': this.siteUrl,
        'X-Title': this.siteName,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const choice = data.choices[0];
    const message = choice.message;

    const toolCalls = (message.tool_calls || []).map((tc: {
      id: string;
      function: { name: string; arguments: string };
    }) => ({
      id: tc.id,
      name: tc.function.name,
      arguments: JSON.parse(tc.function.arguments || '{}'),
    }));

    return {
      content: message.content,
      toolCalls,
      usage: {
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        totalTokens: data.usage?.total_tokens || 0,
      },
    };
  }
}

// =============================================================================
// FACTORY FUNCTION
// =============================================================================

let clientInstance: OpenRouterClient | null = null;

export function getOpenRouterClient(): OpenRouterClient {
  if (!clientInstance) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is not set');
    }

    clientInstance = new OpenRouterClient({
      apiKey,
      model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
    });
  }

  return clientInstance;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Convert internal messages to OpenRouter format
 */
export function toOpenRouterMessages(
  messages: Array<{ role: string; content: string }>
): OpenRouterMessage[] {
  return messages.map((m) => ({
    role: m.role as OpenRouterMessage['role'],
    content: m.content,
  }));
}
