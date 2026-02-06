import DashboardOverview from "@/components/profile/DashboardOverview"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "My Account | Cookie Delivery",
    description: "Manage your account, orders, and rewards.",
}

export default function ProfilePage() {
    return <DashboardOverview />
}
