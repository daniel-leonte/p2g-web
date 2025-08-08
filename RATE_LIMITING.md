# Rate Limiting Setup

This app includes simple rate limiting to prevent abuse. It's configured to work with or without Redis.

## Current Limits
- **20 requests per hour** per IP address (configurable via `RATE_LIMIT_REQUESTS_PER_HOUR`)
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
RATE_LIMIT_REQUESTS_PER_HOUR=20  # Optional: defaults to 20
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
You can configure the rate limit by setting the environment variable:
```env
RATE_LIMIT_REQUESTS_PER_HOUR=50  # Set to desired limit per hour
```

Common configurations:
- `10` - 10 requests per hour
- `50` - 50 requests per hour
- `100` - 100 requests per hour

**Note**: The rate limiting uses a 1-hour sliding window. For different time periods (minutes/days), you would need to modify the code in `/lib/rate-limit.ts`.
