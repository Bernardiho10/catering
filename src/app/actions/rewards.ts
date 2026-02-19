"use server"

import { createClient } from "@/lib/supabase/server"
import redis from "@/lib/redis"

const REWARDS_CACHE_KEY = (userId: string) => `user:${userId}:rewards`
const CACHE_TTL = 60 * 15 // 15 minutes for user data

export async function getRewardsData() {
    const supabase = await createClient()

    // 1. Get User Session
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { success: false, message: "Not authenticated" }

    const cacheKey = REWARDS_CACHE_KEY(user.id)

    // 2. Try Redis Cache
    if (redis) {
        try {
            const cached = await redis.get(cacheKey)
            if (cached) {
                console.log("Redis Cache Hit: Rewards")
                return { success: true, data: cached, source: 'cache' }
            }
        } catch (error) {
            console.warn("Redis Error:", error)
        }
    }

    // 3. Fallback to Supabase
    const { data: profile, error } = await supabase
        .from('users')
        .select('points, role')
        .eq('id', user.id)
        .single()

    if (error) {
        return { success: false, message: error.message }
    }

    // Logic for tier calculation
    const points = profile.points || 0
    let tier = 'Bronze'
    let nextTierPoints = 500
    if (points >= 2500) {
        tier = 'Elite'
        nextTierPoints = 0
    } else if (points >= 1000) {
        tier = 'Premium'
        nextTierPoints = 2500
    } else if (points >= 500) {
        tier = 'Gold'
        nextTierPoints = 1000
    }

    const rewardsData = {
        points,
        tier,
        nextTierPoints,
        progress: nextTierPoints > 0 ? (points / nextTierPoints) * 100 : 100,
        pointsUntilNext: nextTierPoints > 0 ? nextTierPoints - points : 0
    }

    // 4. Update Redis Cache
    if (redis) {
        try {
            await redis.set(cacheKey, rewardsData, { ex: CACHE_TTL })
        } catch (cacheError) {
            console.warn("Failed to update cache:", cacheError)
        }
    }

    return { success: true, data: rewardsData, source: 'database' }
}
