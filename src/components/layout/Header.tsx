"use client"

import Link from "next/link"
import { Menu, Leaf, Search, MapPin, User, Gift, ChevronDown, Package, HelpCircle, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/features/cart/components/CartSheet"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { LoginModal, RegisterModal } from "@/components/modals/AuthModals"
import { DeliveryModal } from "@/components/modals/DeliveryModal"

export function Header() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const [deliveryOpen, setDeliveryOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check login status on mount
    useState(() => {
        if (typeof window !== "undefined") {
            const hasAuth = localStorage.getItem("isLoggedIn")
            if (hasAuth) setIsLoggedIn(true)
        }
    })

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("user")
        localStorage.removeItem("lastOrder")
        setIsLoggedIn(false)
        window.location.href = "/"
    }

    return (
        <header className="sticky top-0 z-50 flex flex-col w-full bg-white dark:bg-zinc-900 border-b border-border shadow-sm">
            {/* Top Utility Bar */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-900 border-b border-border py-2 text-xs md:text-sm">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDeliveryOpen(true)}
                            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            <MapPin className="h-3.5 w-3.5" />
                            Select Delivery Area
                        </button>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/tracker" className="text-xs font-medium hover:text-primary transition-colors flex items-center gap-1.5">
                            <Truck className="h-3.5 w-3.5" />
                            Track Order
                        </Link>
                        <Link href="/faq" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors hidden sm:flex">
                            <HelpCircle className="h-3.5 w-3.5" />
                            Help
                        </Link>
                        <div className="h-4 w-px bg-border hidden sm:block" />

                        {isLoggedIn ? (
                            <Link
                                href="/profile"
                                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
                            >
                                <User className="h-3.5 w-3.5" />
                                My Account
                            </Link>
                        ) : (
                            <button
                                onClick={() => setLoginOpen(true)}
                                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors font-medium"
                            >
                                <User className="h-3.5 w-3.5" />
                                Sign In / Join Rewards
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 via-primary to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div className="hidden lg:flex flex-col">
                        <span className="font-heading font-bold text-2xl text-foreground leading-none">Foody</span>
                        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Since 2026</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
                    {/* Menu Dropdown */}
                    <div className="group relative h-20 flex items-center">
                        <Link href="/menu" className="flex items-center gap-1 hover:text-primary transition-colors">
                            MENU
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        {/* Mega Menu Content */}
                        <div className="absolute top-full left-0 w-[600px] p-6 bg-white dark:bg-zinc-900 border border-border shadow-xl rounded-b-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-primary border-b border-border pb-2">COOKIES</h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li><Link href="/menu?cat=warm" className="hover:text-primary block">Warm Cookies</Link></li>
                                        <li><Link href="/menu?cat=frozen" className="hover:text-primary block">Frozen Dough</Link></li>
                                        <li><Link href="/menu?cat=packs" className="hover:text-primary block">Cookie Packs</Link></li>
                                        <li><Link href="/menu?cat=featured" className="hover:text-primary block">Featured Flavors</Link></li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-primary border-b border-border pb-2">SPECIALTIES</h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li><Link href="/menu?cat=pie" className="hover:text-primary block">Cookie Pies</Link></li>
                                        <li><Link href="/menu?cat=brownies" className="hover:text-primary block">Brownies</Link></li>
                                        <li><Link href="/menu?cat=ice-cream" className="hover:text-primary block">Ice Cream</Link></li>
                                        <li><Link href="/menu?cat=drinks" className="hover:text-primary block">Drinks</Link></li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-primary border-b border-border pb-2">OCCASIONS</h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        <li><Link href="/menu?occ=bday" className="hover:text-primary block">Birthday</Link></li>
                                        <li><Link href="/menu?occ=thank-you" className="hover:text-primary block">Thank You</Link></li>
                                        <li><Link href="/menu?occ=love" className="hover:text-primary block">Romance</Link></li>
                                        <li><Link href="/menu?occ=congrats" className="hover:text-primary block">Congrats</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/specials" className="hover:text-primary transition-colors">SPECIALS</Link>

                    <div className="group relative h-20 flex items-center">
                        <Link href="/gifts" className="flex items-center gap-1 hover:text-primary transition-colors">
                            GIFTS
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                        <div className="absolute top-full left-0 w-48 p-4 bg-white dark:bg-zinc-900 border border-border shadow-xl rounded-b-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                            <ul className="space-y-3 text-muted-foreground">
                                <li><Link href="/gift-cards" className="hover:text-primary block">Gift Cards</Link></li>
                                <li><Link href="/corporate" className="hover:text-primary block">Corporate Gifting</Link></li>
                                <li><Link href="/merch" className="hover:text-primary block">Merchandise</Link></li>
                            </ul>
                        </div>
                    </div>

                    <Link href="/locations" className="hover:text-primary transition-colors">LOCATIONS</Link>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4 ml-auto lg:ml-0">
                    <form className="hidden xl:block relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find your favorite..."
                            className="pl-9 w-64 rounded-full bg-muted/30 border-muted focus:bg-background focus:border-primary transition-all"
                        />
                    </form>

                    <Button
                        size="lg"
                        onClick={() => setDeliveryOpen(true)}
                        className="hidden md:flex rounded-full px-6 font-bold shadow-md hover:shadow-lg transition-all"
                    >
                        ORDER NOW
                    </Button>

                    <CartSheet />

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <nav className="flex flex-col gap-6 mt-8">
                                <Button size="lg" className="w-full rounded-full font-bold" onClick={() => setDeliveryOpen(true)}>
                                    ORDER NOW
                                </Button>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-lg border-b pb-2">Menu</h4>
                                    <Link href="/menu" className="block text-muted-foreground hover:text-primary">All Items</Link>
                                    <Link href="/menu?cat=warm" className="block text-muted-foreground hover:text-primary">Warm Cookies</Link>
                                    <Link href="/menu?cat=packs" className="block text-muted-foreground hover:text-primary">Cookie Packs</Link>
                                    <Link href="/menu?cat=pie" className="block text-muted-foreground hover:text-primary">Cookie Pies</Link>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-lg border-b pb-2">Account</h4>
                                    <button onClick={() => setLoginOpen(true)} className="block text-left text-muted-foreground hover:text-primary w-full">Sign In / Join Rewards</button>
                                    <Link href="/tracker" className="block text-muted-foreground hover:text-primary">Track Order</Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Modals placed here to be accessible from header */}
            <LoginModal
                open={loginOpen}
                onOpenChange={setLoginOpen}
                onSwitchToRegister={() => {
                    setLoginOpen(false)
                    setRegisterOpen(true)
                }}
                onLoginSuccess={() => {
                    setIsLoggedIn(true)
                    setLoginOpen(false)
                }}
            />
            <RegisterModal
                open={registerOpen}
                onOpenChange={setRegisterOpen}
                onSwitchToLogin={() => {
                    setRegisterOpen(false)
                    setLoginOpen(true)
                }}
            />
            <DeliveryModal
                open={deliveryOpen}
                onOpenChange={setDeliveryOpen}
            />
        </header>
    )
}
