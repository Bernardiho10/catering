import { Suspense } from "react"
import RewardsTracker from "@/components/profile/RewardsTracker"
import { getRewardsData } from "@/app/actions/rewards"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Rewards | Cake Delivery",
    description: "Track your points and redeem rewards.",
}

async function RewardsDataWrapper() {
    const result = await getRewardsData()
    return <RewardsTracker initialData={result.success ? result.data : null} />
}

export default function RewardsPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center">Loading your blessings...</div>}>
            <RewardsDataWrapper />
        </Suspense>
    )
}
