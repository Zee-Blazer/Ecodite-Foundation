/**
 * Rate Limiter
 * IP-based rate limiting with a pluggable store interface.
 * Default: in-memory store (resets on server restart).
 */

export interface RateLimitStore {
  get(key: string): Promise<RateLimitEntry | null>
  set(key: string, entry: RateLimitEntry, ttlMs: number): Promise<void>
}

export interface RateLimitEntry {
  count: number
  resetAt: number
}

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  store?: RateLimitStore
}

/** In-memory rate limit store (default) */
class MemoryStore implements RateLimitStore {
  private store = new Map<string, { entry: RateLimitEntry; expiresAt: number }>()

  async get(key: string): Promise<RateLimitEntry | null> {
    const record = this.store.get(key)
    if (!record) return null
    if (Date.now() > record.expiresAt) {
      this.store.delete(key)
      return null
    }
    return record.entry
  }

  async set(key: string, entry: RateLimitEntry, ttlMs: number): Promise<void> {
    this.store.set(key, {
      entry,
      expiresAt: Date.now() + ttlMs,
    })
  }
}

const defaultStore = new MemoryStore()

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const store = config.store || defaultStore
  const now = Date.now()

  const existing = await store.get(identifier)

  if (!existing || now > existing.resetAt) {
    // First request or window expired
    const entry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    }
    await store.set(identifier, entry, config.windowMs)
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: entry.resetAt,
    }
  }

  if (existing.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    }
  }

  const updated: RateLimitEntry = {
    count: existing.count + 1,
    resetAt: existing.resetAt,
  }
  await store.set(identifier, updated, existing.resetAt - now)

  return {
    allowed: true,
    remaining: config.maxRequests - updated.count,
    resetAt: updated.resetAt,
  }
}

/** Helper to get client IP from request headers */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }
  return '127.0.0.1'
}
