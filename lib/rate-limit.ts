import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis client - will use env vars UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
let redis: Redis | null = null
let rateLimiter: Ratelimit | null = null

try {
  // Only initialize if env vars are present
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv()
    
    // Simple rate limiter: 20 requests per hour per IP
    rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, '1 h'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  }
} catch (error) {
  console.warn('Rate limiting disabled - Redis not configured:', error)
}

export async function checkRateLimit(identifier: string) {
  // If rate limiter not configured, allow all requests (MVP fallback)
  if (!rateLimiter) {
    return { 
      success: true, 
      remaining: 999,
      reset: new Date(Date.now() + 3600000)
    }
  }

  try {
    const result = await rateLimiter.limit(identifier)
    return {
      success: result.success,
      remaining: result.remaining,
      reset: new Date(result.reset)
    }
  } catch (error) {
    // If Redis fails, allow request but log error
    console.error('Rate limit check failed:', error)
    return { 
      success: true, 
      remaining: 999,
      reset: new Date(Date.now() + 3600000)
    }
  }
}

// Helper to get IP from request
export function getIP(request: Request): string {
  // Try various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip')
  if (cfIP) {
    return cfIP.trim()
  }

  // Fallback to a default
  return '127.0.0.1'
}
