import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkRateLimit, getIP, RATE_LIMIT_REQUESTS_PER_HOUR } from '@/lib/rate-limit'

export async function middleware(request: NextRequest) {
  // Only rate limit the optimize API endpoint
  if (request.nextUrl.pathname === '/api/optimize') {
    const ip = getIP(request)
    const { success, remaining, reset } = await checkRateLimit(ip)

    if (!success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: reset.toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_REQUESTS_PER_HOUR.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': reset.toISOString(),
            'Retry-After': Math.floor((reset.getTime() - Date.now()) / 1000).toString()
          }
        }
      )
    }

    // Add rate limit headers to successful requests
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', RATE_LIMIT_REQUESTS_PER_HOUR.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toISOString())
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*'
}
