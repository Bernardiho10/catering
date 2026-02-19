import { createClient } from "@/lib/supabase/server"
import { Metadata } from "next"
import DashboardView from "@/components/profile/DashboardView"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "My Account | Cake Delivery",
    description: "Manage your account, orders, and rewards.",
}

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // Redirect to login if not authenticated
        // For demo/development continuity, we might want to mock a user if redirect is too aggressive,
        // but strictly we should redirect.
        // Let's pass null user and handle it or redirect.
        // redirect('/login')  <-- Uncomment for strict auth

        // DEMO MODE: If no user, show Guest Dashboard
        return <DashboardView user={{ name: "Guest", email: "" }} points={0} orders={[]} />
    }

    // Fetch Profile
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    // Fetch Recent Orders
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

    const userInfo = {
        name: profile?.full_name || user.email?.split('@')[0] || "User",
        email: user.email || ""
    }

    return <DashboardView
        user={userInfo}
        points={profile?.points || 0}
        orders={orders || []}
    />
}
