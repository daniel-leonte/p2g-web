# Rate Limiting Setup

This app includes simple rate limiting to prevent abuse. It's configured to work with or without Redis.

## Current Limits
- **20 requests per hour** per IP address
- Sliding window (most recent hour)
- Graceful fallback if Redis is unavailable

## Setup Options

### Option 1: With Upstash Redis (Recommended for Production)
1. Sign up for free at [Upstash Console](https://console.upstash.com/)
2. Create a new Redis database (free tier includes 10,000 commands/day)
3. Copy your credentials
4. Add to your `.env.local`:
```env
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

### Option 2: Without Redis (Development/Testing)
Simply don't set the Upstash environment variables. The app will:
- Allow all requests (no rate limiting)
- Log a warning on startup
- Continue to work normally

## How It Works
- Rate limiting is applied at the edge using Next.js middleware
- IP addresses are extracted from request headers
- Users see clear error messages when rate limited
- Rate limit info is included in response headers

## Monitoring
When using Upstash Redis, you can:
- View real-time metrics in the Upstash dashboard
- See which IPs are making requests
- Monitor your usage against the free tier limits

## Adjusting Limits
To change the rate limits, edit `/lib/rate-limit.ts`:
```typescript
// Change from 20 per hour to your desired limit
Ratelimit.slidingWindow(20, '1 h')
```

Common configurations:
- `(10, '1 h')` - 10 per hour
- `(100, '1 d')` - 100 per day  
- `(3, '1 m')` - 3 per minute (burst protection)
