/**
 * TALY - OpenAI Client
 *
 * Client using Vercel AI SDK with OpenAI provider
 */

import { createOpenAI } from '@ai-sdk/openai';

// =============================================================================
// CONFIGURATION
// =============================================================================

const DEFAULT_MODEL = 'gpt-4o-mini';

// =============================================================================
// CLIENT
// =============================================================================

let openaiInstance: ReturnType<typeof createOpenAI> | null = null;

export function getOpenAI() {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    openaiInstance = createOpenAI({
      apiKey,
    });
  }

  return openaiInstance;
}

export function getModel(modelId?: string) {
  const openai = getOpenAI();
  return openai(modelId || DEFAULT_MODEL);
}

export { DEFAULT_MODEL };
