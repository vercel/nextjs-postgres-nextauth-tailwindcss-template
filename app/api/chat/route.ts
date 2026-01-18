/**
 * TALY - Chat API Route
 *
 * Handles chat messages using Vercel AI SDK with OpenAI
 */

import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from 'ai';
import { createClient } from '@/lib/supabase/server';
import { getUserProfile } from '@/lib/profiles';
import { getModel } from '@/lib/ai/openai-client';
import { createTalyTools } from '@/lib/ai/tools-vercel';
import { getSystemPrompt, ERROR_MESSAGES } from '@/lib/ai/system-prompt';
import { createRateLimiter } from '@/lib/ai/rate-limiter';
import { runSecurityChecks } from '@/lib/ai/security';
import { DEFAULT_CURRENCY } from '@/lib/config/currencies';
import type { TalyContext } from '@/lib/ai/types';

// =============================================================================
// CONFIGURATION
// =============================================================================

export const maxDuration = 30;

// =============================================================================
// POST HANDLER
// =============================================================================

export async function POST(request: Request) {
  try {
    // 1. Authenticate user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: ERROR_MESSAGES.unauthorized }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Get user profile
    const profile = await getUserProfile();
    const plan = profile?.plan || 'free';

    // 3. Check rate limits
    const rateLimiter = createRateLimiter(user.id, plan);
    const limitStatus = rateLimiter.check();

    if (!limitStatus.allowed) {
      return new Response(JSON.stringify({ error: ERROR_MESSAGES.rateLimit }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 4. Parse request body
    const { messages } = await request.json() as { messages: UIMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 5. Get the last user message and run security checks
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'user') {
      return new Response(JSON.stringify({ error: 'Last message must be from user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Extract text content from the message parts
    const textContent = lastMessage.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join(' ') || '';

    if (textContent) {
      const securityCheck = runSecurityChecks(textContent);
      if (!securityCheck.allowed) {
        return new Response(JSON.stringify({ error: securityCheck.error || ERROR_MESSAGES.offTopic }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    // 6. Record message usage
    rateLimiter.recordMessage();

    // 7. Build context
    const context: TalyContext = {
      userId: user.id,
      currency: profile?.preferences?.currency || DEFAULT_CURRENCY,
      timezone: profile?.timezone || null,
      language: (profile?.preferences?.language as 'es' | 'en') || 'es',
    };

    // 8. Get system prompt and tools
    const systemPrompt = getSystemPrompt(context);
    const tools = createTalyTools(context);

    // 9. Convert messages to model format
    const modelMessages = await convertToModelMessages(messages);

    // 10. Stream the response
    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages: modelMessages,
      tools,
      stopWhen: stepCountIs(5),
      onFinish: ({ usage }) => {
        if (usage?.totalTokens) {
          rateLimiter.recordTokens(usage.totalTokens);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: ERROR_MESSAGES.apiError }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
