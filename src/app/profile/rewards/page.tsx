import RewardsTracker from "@/components/profile/RewardsTracker"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Rewards | Cookie Delivery",
    description: "Track your points and redeem rewards.",
}

export default function RewardsPage() {
    return <RewardsTracker />
}
