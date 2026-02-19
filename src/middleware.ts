import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import { globalRateLimiter } from "@/lib/ratelimit"

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // 1. Rate Limiting to protect free tier and prevent DDoS
    // We only rate limit if Redis is configured
    if (process.env.UPSTASH_REDIS_REST_URL && (request.nextUrl.pathname.startsWith('/api') || request.nextUrl.pathname.startsWith('/checkout') || request.nextUrl.pathname.startsWith('/auth'))) {
        try {
            const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1"
            const { success, limit, reset, remaining } = await globalRateLimiter.limit(
                `ratelimit_middleware_${ip}`
            )

            if (!success) {
                return new NextResponse("Too Many Requests", {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    },
                })
            }
        } catch (error) {
            console.warn("Rate limiting skipped due to Redis error:", error)
        }
    }

    // 2. Supabase Session Management
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    })
                },
            },
        }
    )

    await supabase.auth.getUser()

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}
