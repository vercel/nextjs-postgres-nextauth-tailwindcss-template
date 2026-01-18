/**
 * TALY - Rate Limiter
 *
 * In-memory rate limiting per user/plan
 * Note: In production, use Redis for persistence across instances
 */

import type { UserPlan } from '@/lib/profiles';
import type { RateLimitConfig, RateLimitStatus } from './types';

// =============================================================================
// RATE LIMIT CONFIGURATION BY PLAN
// =============================================================================

export const RATE_LIMITS: Record<UserPlan, RateLimitConfig> = {
  free: {
    messagesPerHour: 20,
    tokensPerDay: 10_000,
  },
  pro: {
    messagesPerHour: 100,
    tokensPerDay: 50_000,
  },
  plus: {
    messagesPerHour: 500,
    tokensPerDay: 200_000,
  },
  admin: {
    messagesPerHour: 1000,
    tokensPerDay: 1_000_000,
  },
};

// =============================================================================
// IN-MEMORY STORE
// =============================================================================

interface UserUsage {
  messageCount: number;
  messageResetAt: number;
  tokenCount: number;
  tokenResetAt: number;
}

const usageStore = new Map<string, UserUsage>();

// =============================================================================
// RATE LIMITER CLASS
// =============================================================================

export class RateLimiter {
  private userId: string;
  private plan: UserPlan;
  private config: RateLimitConfig;

  constructor(userId: string, plan: UserPlan) {
    this.userId = userId;
    this.plan = plan;
    this.config = RATE_LIMITS[plan];
  }

  /**
   * Check if user can send a message
   */
  checkMessageLimit(): RateLimitStatus {
    const usage = this.getUsage();
    const now = Date.now();

    // Reset if hour has passed
    if (now > usage.messageResetAt) {
      usage.messageCount = 0;
      usage.messageResetAt = now + 60 * 60 * 1000; // 1 hour
      this.saveUsage(usage);
    }

    const remaining = this.config.messagesPerHour - usage.messageCount;
    const allowed = remaining > 0;

    return {
      allowed,
      remaining: Math.max(0, remaining),
      resetAt: new Date(usage.messageResetAt),
      reason: allowed ? undefined : 'messages',
    };
  }

  /**
   * Check if user has token budget
   */
  checkTokenLimit(tokensNeeded: number = 0): RateLimitStatus {
    const usage = this.getUsage();
    const now = Date.now();

    // Reset if day has passed
    if (now > usage.tokenResetAt) {
      usage.tokenCount = 0;
      usage.tokenResetAt = now + 24 * 60 * 60 * 1000; // 24 hours
      this.saveUsage(usage);
    }

    const remaining = this.config.tokensPerDay - usage.tokenCount;
    const allowed = remaining >= tokensNeeded;

    return {
      allowed,
      remaining: Math.max(0, remaining),
      resetAt: new Date(usage.tokenResetAt),
      reason: allowed ? undefined : 'tokens',
    };
  }

  /**
   * Check both message and token limits
   */
  check(tokensNeeded: number = 0): RateLimitStatus {
    const messageStatus = this.checkMessageLimit();
    if (!messageStatus.allowed) {
      return messageStatus;
    }

    const tokenStatus = this.checkTokenLimit(tokensNeeded);
    if (!tokenStatus.allowed) {
      return tokenStatus;
    }

    return {
      allowed: true,
      remaining: Math.min(messageStatus.remaining, tokenStatus.remaining),
      resetAt: new Date(
        Math.min(
          messageStatus.resetAt.getTime(),
          tokenStatus.resetAt.getTime()
        )
      ),
    };
  }

  /**
   * Record a message sent
   */
  recordMessage(): void {
    const usage = this.getUsage();
    usage.messageCount++;
    this.saveUsage(usage);
  }

  /**
   * Record tokens used
   */
  recordTokens(tokens: number): void {
    const usage = this.getUsage();
    usage.tokenCount += tokens;
    this.saveUsage(usage);
  }

  /**
   * Get current usage stats
   */
  getStats(): {
    messagesUsed: number;
    messagesLimit: number;
    tokensUsed: number;
    tokensLimit: number;
    plan: UserPlan;
  } {
    const usage = this.getUsage();
    return {
      messagesUsed: usage.messageCount,
      messagesLimit: this.config.messagesPerHour,
      tokensUsed: usage.tokenCount,
      tokensLimit: this.config.tokensPerDay,
      plan: this.plan,
    };
  }

  // Private helpers

  private getUsage(): UserUsage {
    let usage = usageStore.get(this.userId);

    if (!usage) {
      const now = Date.now();
      usage = {
        messageCount: 0,
        messageResetAt: now + 60 * 60 * 1000,
        tokenCount: 0,
        tokenResetAt: now + 24 * 60 * 60 * 1000,
      };
      usageStore.set(this.userId, usage);
    }

    return usage;
  }

  private saveUsage(usage: UserUsage): void {
    usageStore.set(this.userId, usage);
  }
}

// =============================================================================
// FACTORY FUNCTION
// =============================================================================

export function createRateLimiter(userId: string, plan: UserPlan): RateLimiter {
  return new RateLimiter(userId, plan);
}

// =============================================================================
// CLEANUP (for serverless environments)
// =============================================================================

// Clean up old entries periodically
const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hour

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    // Use Array.from for compatibility
    const entries = Array.from(usageStore.entries());
    for (const [userId, usage] of entries) {
      // Remove entries that haven't been updated in over a day
      if (now - usage.tokenResetAt > oneDay) {
        usageStore.delete(userId);
      }
    }
  }, CLEANUP_INTERVAL);
}
