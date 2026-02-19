"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    ShoppingBag,
    MapPin,
    Trophy,
    Settings,
    LogOut,
    Menu,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useEffect } from "react"
import { toast } from "sonner"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()
    }, [])

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Signed out successfully")
            window.location.href = "/"
        }
    }

    const navigation = [
        { name: "Dashboard", href: "/profile", icon: LayoutDashboard },
        { name: "Order History", href: "/profile/orders", icon: ShoppingBag },
        { name: "Address Book", href: "/profile/addresses", icon: MapPin },
        { name: "Rewards & Elite", href: "/profile/rewards", icon: Trophy },
        { name: "Account Settings", href: "/profile/settings", icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-muted/20">
            {/* Mobile Sidebar Trigger */}
            <div className="lg:hidden p-4 bg-background border-b flex items-center justify-between sticky top-[var(--header-height)] z-20">
                <span className="font-semibold text-lg">My Account</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
            </div>

            <div className="container mx-auto py-8 lg:py-12 px-4 md:px-6">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">

                    {/* Sidebar Navigation */}
                    <aside className={cn(
                        "lg:block bg-background rounded-2xl border shadow-sm h-fit sticky top-24 transition-all duration-300 z-10",
                        isMobileMenuOpen ? "fixed inset-0 top-[120px] z-50 p-4 m-0 rounded-none h-[calc(100vh-120px)] overflow-y-auto" : "hidden"
                    )}>
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold font-heading">
                                Welcome, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || "Guest"}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">Tier: <span className="text-amber-600 font-semibold">Gold Elite</span></p>
                        </div>
                        <nav className="p-4 space-y-1">
                            {navigation.map((item) => {
                                const isActive = pathname === item.href
                                return (
                                    <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                        <div className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm",
                                            isActive
                                                ? "bg-primary/10 text-primary hover:bg-primary/15"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        )}>
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </div>
                                    </Link>
                                )
                            })}
                            <div className="pt-4 mt-4 border-t">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Sign Out
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content Area */}
                    <main className="min-h-[500px]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
