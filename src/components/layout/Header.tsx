"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, X, LogOut, ChevronRight, ChevronDown, Bell, Cake, Star, MapPin, Truck, Utensils, Gift, Info, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useCartStore } from "@/features/cart/store"
import { cn } from "@/lib/utils"
import { LoginModal, RegisterModal } from "@/components/modals/AuthModals"
import { Logo } from "@/components/layout/Logo"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { UserNav } from "./UserNav"
import { CartSheet } from "@/features/cart/components/CartSheet"
import { MobileOrderButton } from "./MobileOrderButton"

export function Header() {
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    const supabase = createClient()

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY > 10;
                    setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
                    ticking = false;
                });
                ticking = true;
            }
        }

        // Auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
            setLoading(false)
        })

        // Initial session check
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user || null)
            setLoading(false)
        }

        checkSession()
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            subscription.unsubscribe()
        }
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

    const shopItems = [
        { name: "Full Menu", href: "/menu", icon: Utensils },
        { name: "Organic Cakes", href: "/menu?cat=organic-cakes", icon: Cake },
        { name: "Specialty Items", href: "/menu?cat=specialty", icon: Sparkles },
        { name: "Family Bundles", href: "/menu?cat=bundles", icon: Gift },
    ]

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
                isScrolled ? "h-16 border-b shadow-sm" : "h-32"
            )}>
                {/* Row 1: Utility Nav */}
                {!isScrolled && (
                    <div className="hidden border-b lg:block h-10 bg-white">
                        <div className="container mx-auto h-full flex items-center justify-end gap-6 px-4">
                            <Link href="/tracker" className="text-[10px] font-black text-primary hover:text-accent flex items-center gap-1.5 transition-colors uppercase tracking-widest">
                                <Truck className="h-3 w-3" />
                                Track Order
                            </Link>
                            <Link href="/rewards" className="text-[10px] font-black text-primary hover:text-accent flex items-center gap-1.5 transition-colors uppercase tracking-widest">
                                <Star className="h-3 w-3" />
                                Abraham&apos;s Rewards
                            </Link>
                            {!loading && (
                                user ? (
                                    <div className="flex items-center gap-1 text-[10px] font-black text-primary">
                                        <UserNav user={user} />
                                    </div>
                                ) : (
                                    <button onClick={() => setShowLoginModal(true)} className="text-[10px] font-black text-primary hover:text-accent flex items-center gap-1.5 transition-colors uppercase tracking-widest">
                                        <User className="h-3 w-3" />
                                        Sign In
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                )}

                {/* Row 2: Main Nav */}
                <div className={cn(
                    "container mx-auto px-4 h-full flex items-center justify-between",
                    isScrolled ? "h-16" : "h-22"
                )}>
                    <div className="flex items-center gap-4">
                        <Logo className={cn("transition-all", isScrolled ? "scale-75 origin-left" : "scale-100")} />

                        {!isScrolled && (
                            <span className="hidden xl:block text-primary/60 italic text-[11px] font-serif ml-4 border-l pl-4 border-blue-100">
                                Warm Moments Delivered®
                            </span>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link href="/menu" className={cn(
                            "text-[12px] font-black tracking-[0.1em] transition-colors hover:text-accent uppercase",
                            pathname === "/menu" ? "text-primary border-b-2 border-primary" : "text-primary"
                        )}>
                            Order Online
                        </Link>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent text-[12px] font-black tracking-[0.1em] text-primary hover:text-accent uppercase p-0 h-auto cursor-pointer">
                                        Menu
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-6 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                            {shopItems.map((item) => (
                                                <li key={item.name}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={item.href}
                                                            className="flex select-none items-center gap-4 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:text-accent-foreground group"
                                                        >
                                                            <item.icon className="h-8 w-8 text-accent transition-transform group-hover:scale-110" />
                                                            <div className="flex flex-col gap-1">
                                                                <div className="text-lg font-black uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                                                                    {item.name}
                                                                </div>
                                                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground font-medium">
                                                                    Explore our {item.name.toLowerCase()} collection
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <Link href="/catering" className="text-[12px] font-black tracking-[0.1em] text-primary hover:text-accent uppercase">
                            Special Events
                        </Link>

                        <Link href="/gift-cards" className="text-[12px] font-black tracking-[0.1em] text-primary hover:text-accent uppercase">
                            Gifting
                        </Link>

                        <Link href="/locations" className="text-[12px] font-black tracking-[0.1em] text-primary hover:text-accent uppercase">
                            Locations
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <CartSheet />

                        <Button
                            variant="default"
                            size="sm"
                            className="lg:hidden rounded-sm px-4 h-10 font-black text-[11px] uppercase tracking-widest bg-primary hover:bg-primary/90"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            Menu
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 z-50 lg:hidden transition-all duration-500",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
                <div className={cn(
                    "absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="p-6 flex items-center justify-between border-b">
                        <Logo className="w-32" />
                        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="h-6 w-6 text-primary" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-10">
                        <nav className="flex flex-col gap-6">
                            <Link href="/menu" className="text-xl font-black text-primary uppercase tracking-widest border-b border-blue-50 pb-4 flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                                <ShoppingCart className="h-6 w-6 text-accent" />
                                Order Online
                            </Link>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/30 flex items-center gap-2">
                                    <Utensils className="h-3 w-3" />
                                    Categories
                                </div>
                                <div className="flex flex-col gap-4 pl-4 border-l-2 border-blue-50">
                                    {shopItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="text-sm font-bold text-primary/70 hover:text-primary uppercase tracking-widest transition-colors flex items-center gap-3"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <item.icon className="h-4 w-4 text-primary/30" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 pt-6 border-t border-blue-50">
                                <Link href="/catering" className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Sparkles className="h-6 w-6 text-accent" />
                                    Special Events
                                </Link>
                                <Link href="/gift-cards" className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Gift className="h-6 w-6 text-accent" />
                                    Gifting
                                </Link>
                                <Link href="/tracker" className="text-xl font-black text-primary uppercase tracking-widest flex items-center gap-4" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Truck className="h-6 w-6 text-accent" />
                                    Track Order
                                </Link>
                            </div>
                        </nav>
                    </div>

                    <div className="p-10 border-t bg-blue-50/20">
                        {user ? (
                            <div className="space-y-4">
                                <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full rounded-sm h-14 justify-center bg-primary" variant="default">
                                        <span className="font-black uppercase text-xs tracking-widest">My Account</span>
                                    </Button>
                                </Link>
                                <Button onClick={handleSignOut} className="w-full text-red-600 font-black uppercase text-[10px] tracking-widest hover:bg-red-50" variant="ghost">
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setShowLoginModal(true)
                                }}
                                className="w-full h-16 rounded-sm text-sm font-black uppercase tracking-widest bg-primary shadow-xl"
                            >
                                Sign In / Join
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <LoginModal
                open={showLoginModal}
                onOpenChange={setShowLoginModal}
                onSwitchToRegister={() => {
                    setShowLoginModal(false)
                    setShowRegisterModal(true)
                }}
            />

            <RegisterModal
                open={showRegisterModal}
                onOpenChange={setShowRegisterModal}
                onSwitchToLogin={() => {
                    setShowRegisterModal(false)
                    setShowLoginModal(true)
                }}
            />

            <MobileOrderButton onOrderClick={() => { }} />
        </>
    )
}
