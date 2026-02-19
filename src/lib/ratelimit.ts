import { Ratelimit } from "@upstash/ratelimit"
import redis from "./redis"

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const globalRateLimiter = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(20, "10 s"),
    analytics: true,
    prefix: "@upstash/ratelimit",
}) : { limit: () => Promise.resolve({ success: true, limit: 0, remaining: 0, reset: 0 }) }

// More strict limiter for auth/sensitive actions
export const authRateLimiter = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    analytics: true,
    prefix: "@upstash/ratelimit:auth",
}) : { limit: () => Promise.resolve({ success: true, limit: 0, remaining: 0, reset: 0 }) }
