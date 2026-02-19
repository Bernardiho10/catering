/**
 * Rewards System Logic for The A Cake
 * 
 * Earning: 
 * - 10 points for every $1 spent.
 * - 10% bonus if all items are "Organic".
 * 
 * Value:
 * - 100 points = $0.50 ($5 \%$ effective give-back)
 */

export const REWARDS_CONFIG = {
    POINTS_PER_DOLLAR: 10,
    ORGANIC_BONUS_MULTIPLIER: 1.1,
    POINT_VALUE_CENTS: 0.5, // 100 points = $0.50
}

export interface RewardsCalculation {
    basePoints: number
    bonusPoints: number
    totalPoints: number
    isOrganicOnly: boolean
}

/**
 * Calculates points earned for a subtotal (in cents)
 */
export function calculatePoints(subtotalCents: number, items: { isOrganic?: boolean }[]): RewardsCalculation {
    const subtotalDollars = subtotalCents / 100
    const basePoints = Math.floor(subtotalDollars * REWARDS_CONFIG.POINTS_PER_DOLLAR)

    const isOrganicOnly = items.length > 0 && items.every(item => item.isOrganic)
    const totalPoints = isOrganicOnly
        ? Math.floor(basePoints * REWARDS_CONFIG.ORGANIC_BONUS_MULTIPLIER)
        : basePoints

    return {
        basePoints,
        bonusPoints: totalPoints - basePoints,
        totalPoints,
        isOrganicOnly
    }
}

/**
 * Converts points to dollar value (in cents)
 */
export function pointsToCents(points: number): number {
    return Math.floor((points / 100) * 50)
}

/**
 * Checks if user is eligible for specific tiers
 */
export const REDEMPTION_TIERS = [
    { points: 500, label: "$2.50 Off", valueCents: 250 },
    { points: 1000, label: "$5.00 Off", valueCents: 500 },
    { points: 2000, label: "$10.00 Off", valueCents: 1000 },
    { points: 5000, label: "Free Bundle", valueCents: 2500 },
]
