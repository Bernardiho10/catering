"use client"

import Link from "next/link"
import { Menu, Cookie, Search, MapPin, User, ChevronDown, Truck, Heart, Gift, Cake, IceCream, CupSoda, UtensilsCrossed, Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/features/cart/components/CartSheet"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { LoginModal, RegisterModal } from "@/components/modals/AuthModals"
import { DeliveryModal } from "@/components/modals/DeliveryModal"
import Image from "next/image"

export function Header() {
    const [loginOpen, setLoginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const [deliveryOpen, setDeliveryOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Check login status on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hasAuth = localStorage.getItem("isLoggedIn")
            if (hasAuth) setIsLoggedIn(true)
        }
    }, [])

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn")
        localStorage.removeItem("user")
        localStorage.removeItem("lastOrder")
        setIsLoggedIn(false)
        window.location.href = "/"
    }

    const menuCategories = [
        { name: "Warm Cookies", href: "/menu?cat=warm", icon: Cookie },
        { name: "Valentine's Day", href: "/menu?cat=valentines", icon: Heart },
        { name: "Birthday Bundles", href: "/menu?cat=birthday", icon: Gift },
        { name: "Cookie Pie", href: "/menu?cat=pie", icon: Cake },
        { name: "Brownies", href: "/menu?cat=brownies", icon: UtensilsCrossed },
        { name: "Ice Cream", href: "/menu?cat=ice-cream", icon: IceCream },
        { name: "Drinks", href: "/menu?cat=drinks", icon: CupSoda },
        { name: "Gift Cards", href: "/gift-cards", icon: Gift },
    ]

    const specialties = [
        { name: "Cookie Truffles", href: "/menu?cat=truffles" },
        { name: "Frost 'ems®", href: "/menu?cat=frost-ems" },
        { name: "Cookie Trays", href: "/menu?cat=trays" },
        { name: "Ship Nationwide", href: "/menu?cat=ship" },
        { name: "Special Occasions", href: "/menu?cat=occasions" },
    ]

    return (
        <header className={cn(
            "sticky top-0 z-50 flex flex-col w-full transition-all duration-300",
            scrolled
                ? "bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-md"
                : "bg-white dark:bg-zinc-900 border-b border-border"
        )}>
            {/* Top Utility Bar */}
            <div className="w-full bg-[#c41e3a] text-white py-2 text-xs md:text-sm">
                <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/about" className="hover:text-white/80 transition-colors hidden sm:inline">
                            About
                        </Link>
                        <Link href="/about" className="hover:text-white/80 transition-colors hidden md:inline">
                            Careers
                        </Link>
                        <Link href="/contact" className="hover:text-white/80 transition-colors hidden md:inline">
                            Contact Us
                        </Link>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/tracker" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium">
                            <Truck className="h-3.5 w-3.5" />
                            Track Order
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link href="/rewards" className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium hidden sm:flex">
                                    <Star className="h-3.5 w-3.5" />
                                    David's Rewards®
                                </Link>
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium"
                                >
                                    <User className="h-3.5 w-3.5" />
                                    My Profile
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => setLoginOpen(true)}
                                className="flex items-center gap-1.5 hover:text-white/80 transition-colors font-medium"
                            >
                                <User className="h-3.5 w-3.5" />
                                Sign In / Join
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0 group">
                    <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#c41e3a] to-[#8b1528] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                        <Cookie className="h-8 w-8 text-white" />
                    </div>
                    <div className="hidden sm:flex flex-col">
                        <span className="font-heading font-bold text-2xl text-[#c41e3a] leading-none tracking-tight">David's Delights</span>
                        <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">Warm Moments Delivered®</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
                    {/* Order Online */}
                    <Button
                        onClick={() => setDeliveryOpen(true)}
                        className="bg-[#c41e3a] hover:bg-[#a31830] text-white rounded-full px-6 font-bold mx-2"
                    >
                        ORDER ONLINE
                    </Button>

                    {/* Menu Dropdown */}
                    <div className="group relative h-20 flex items-center">
                        <Link href="/menu" className="flex items-center gap-1 px-4 py-2 hover:text-[#c41e3a] transition-colors">
                            MENU
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                        </Link>
                        {/* Mega Menu Content */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[700px] p-6 bg-white dark:bg-zinc-900 border border-border shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2">
                                    <h4 className="font-bold text-[#c41e3a] border-b border-border pb-2 mb-4">OUR MENU</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {menuCategories.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors group/item"
                                            >
                                                <div className="h-10 w-10 rounded-full bg-[#c41e3a]/10 flex items-center justify-center">
                                                    <item.icon className="h-5 w-5 text-[#c41e3a]" />
                                                </div>
                                                <span className="text-foreground group-hover/item:text-[#c41e3a] transition-colors">{item.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#c41e3a] border-b border-border pb-2 mb-4">SPECIALTIES</h4>
                                    <ul className="space-y-2 text-muted-foreground">
                                        {specialties.map((item) => (
                                            <li key={item.name}>
                                                <Link href={item.href} className="hover:text-[#c41e3a] block py-1 transition-colors">
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-border">
                                <Link href="/menu" className="text-[#c41e3a] font-semibold hover:underline">
                                    View Full Menu →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Special Events Dropdown */}
                    <div className="group relative h-20 flex items-center">
                        <Link href="/catering" className="flex items-center gap-1 px-4 py-2 hover:text-[#c41e3a] transition-colors">
                            SPECIAL EVENTS
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                        </Link>
                        <div className="absolute top-full left-0 w-56 p-4 bg-white dark:bg-zinc-900 border border-border shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link href="/catering" className="hover:text-[#c41e3a] block py-1.5">Catering</Link></li>
                                <li><Link href="/catering/treats-truck" className="hover:text-[#c41e3a] block py-1.5">Treats Truck</Link></li>
                            </ul>
                        </div>
                    </div>

                    <Link href="/corporate" className="px-4 py-2 hover:text-[#c41e3a] transition-colors">
                        CORPORATE GIFTING
                    </Link>

                    {/* Locations Dropdown */}
                    <div className="group relative h-20 flex items-center">
                        <Link href="/locations" className="flex items-center gap-1 px-4 py-2 hover:text-[#c41e3a] transition-colors">
                            LOCATIONS
                            <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                        </Link>
                        <div className="absolute top-full right-0 w-56 p-4 bg-white dark:bg-zinc-900 border border-border shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                            <ul className="space-y-2 text-muted-foreground">
                                <li><Link href="/delivery-areas" className="hover:text-[#c41e3a] block py-1.5">Delivery Areas</Link></li>
                                <li><Link href="/locations" className="hover:text-[#c41e3a] block py-1.5">Store Locations</Link></li>
                                <li><Link href="/locations/full-list" className="hover:text-[#c41e3a] block py-1.5">Full Store List</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-3 ml-auto lg:ml-0">
                    <button
                        onClick={() => setDeliveryOpen(true)}
                        className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#c41e3a] transition-colors"
                    >
                        <MapPin className="h-4 w-4" />
                        <span className="hidden xl:inline">Select Area</span>
                    </button>

                    <CartSheet />

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[320px] sm:w-[400px] overflow-y-auto">
                            <nav className="flex flex-col gap-6 mt-8">
                                <Button
                                    size="lg"
                                    className="w-full rounded-full font-bold bg-[#c41e3a] hover:bg-[#a31830]"
                                    onClick={() => setDeliveryOpen(true)}
                                >
                                    ORDER NOW
                                </Button>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg border-b pb-2 text-[#c41e3a]">Menu</h4>
                                    {menuCategories.slice(0, 6).map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="flex items-center gap-3 text-muted-foreground hover:text-[#c41e3a] py-1"
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link href="/menu" className="block text-[#c41e3a] font-semibold pt-2">
                                        View Full Menu →
                                    </Link>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg border-b pb-2 text-[#c41e3a]">Special Events</h4>
                                    <Link href="/catering" className="block text-muted-foreground hover:text-[#c41e3a]">Catering</Link>
                                    <Link href="/catering/treats-truck" className="block text-muted-foreground hover:text-[#c41e3a]">Treats Truck</Link>
                                    <Link href="/corporate" className="block text-muted-foreground hover:text-[#c41e3a]">Corporate Gifting</Link>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg border-b pb-2 text-[#c41e3a]">Account</h4>
                                    {isLoggedIn ? (
                                        <>
                                            <Link href="/profile" className="block text-muted-foreground hover:text-[#c41e3a]">My Profile</Link>
                                            <Link href="/rewards" className="block text-muted-foreground hover:text-[#c41e3a]">David's Rewards®</Link>
                                            <button onClick={handleLogout} className="block text-muted-foreground hover:text-[#c41e3a]">Sign Out</button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setLoginOpen(true)}
                                            className="block text-left text-muted-foreground hover:text-[#c41e3a] w-full"
                                        >
                                            Sign In / Join Rewards
                                        </button>
                                    )}
                                    <Link href="/tracker" className="block text-muted-foreground hover:text-[#c41e3a]">Track Order</Link>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-bold text-lg border-b pb-2 text-[#c41e3a]">Locations</h4>
                                    <Link href="/delivery-areas" className="block text-muted-foreground hover:text-[#c41e3a]">Delivery Areas</Link>
                                    <Link href="/locations" className="block text-muted-foreground hover:text-[#c41e3a]">Store Locations</Link>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Modals */}
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
