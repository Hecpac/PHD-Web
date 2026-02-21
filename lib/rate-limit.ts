/**
 * Lightweight in-memory sliding-window rate limiter.
 *
 * ⚠️  Serverless caveat: each warm instance has its own store. Across
 * concurrent instances this provides per-instance protection only.
 * For cross-instance enforcement, replace with Upstash Redis +
 * @upstash/ratelimit (zero-config Vercel integration available).
 *
 * Fails open: if an unexpected error occurs, the request is allowed
 * through so a broken rate limiter never blocks legitimate submissions.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export function checkRateLimit(key: string): RateLimitResult {
  try {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now >= entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + WINDOW_MS });
      return { allowed: true };
    }

    if (entry.count >= MAX_REQUESTS) {
      return { allowed: false, retryAfterMs: entry.resetAt - now };
    }

    entry.count += 1;
    return { allowed: true };
  } catch {
    // Fail open — never block a user due to a limiter bug
    return { allowed: true };
  }
}

/** Exposed only for unit tests. Do not call in application code. */
export function _clearStoreForTesting(): void {
  store.clear();
}
