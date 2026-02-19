import ProfileSettings from "@/components/profile/ProfileSettings"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Settings | Cake Delivery",
    description: "Update your account settings.",
}

export default function SettingsPage() {
    return <ProfileSettings />
}
