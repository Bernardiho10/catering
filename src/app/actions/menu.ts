"use server"

import { createClient } from "@/lib/supabase/server"
import redis from "@/lib/redis"
import { MenuItem } from "@/features/menu/types"

const MENU_CACHE_KEY = "menu:items"
const CACHE_TTL = 60 * 60 * 24 // 24 hours

export async function getMenu() {
    // 1. Try Redis Cache
    if (redis) {
        try {
            const cached = await redis.get(MENU_CACHE_KEY)
            if (cached) {
                console.log("Redis Cache Hit: Menu")
                return { success: true, data: cached as MenuItem[], source: 'cache' }
            }
        } catch (error) {
            console.warn("Redis Error:", error)
        }
    }

    // 2. Fallback to Supabase
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('active', true)

    if (error) {
        return { success: false, message: error.message }
    }

    // 3. Update Redis Cache (Fire and Forget)
    if (redis) {
        try {
            await redis.set(MENU_CACHE_KEY, data, { ex: CACHE_TTL })
        } catch (cacheError) {
            console.warn("Failed to update cache:", cacheError)
        }
    }

    return { success: true, data: data as MenuItem[], source: 'database' }
}
