"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ProductDialog } from "@/features/menu/components/ProductDialog"
import { MOCK_MENU_ITEMS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { formatCurrency, cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Particles } from "@/components/magicui/particles"
import { Cookie, Heart, Gift, Cake, IceCream, CupSoda, UtensilsCrossed, Sparkles, Crown, Truck, Package, Star, Flame, ChevronRight } from "lucide-react"

const categories = [
    { id: null, name: "All", icon: Cookie, color: "#c41e3a" },
    { id: "warm", name: "Warm Cookies", icon: Cookie, color: "#c41e3a" },
    { id: "valentines", name: "Valentine's Day", icon: Heart, color: "#ec4899", badge: "NEW" },
    { id: "birthday", name: "Birthday", icon: Gift, color: "#8b5cf6" },
    { id: "pie", name: "Cookie Pie", icon: Cake, color: "#f59e0b", badge: "POPULAR" },
    { id: "brownies", name: "Brownies", icon: UtensilsCrossed, color: "#78350f" },
    { id: "ice-cream", name: "Ice Cream", icon: IceCream, color: "#06b6d4" },
    { id: "truffles", name: "Truffles", icon: Sparkles, color: "#a855f7" },
    { id: "drinks", name: "Drinks", icon: CupSoda, color: "#0ea5e9" },
    { id: "ship", name: "Ship Nationwide", icon: Truck, color: "#6366f1" },
]

const getPageTitle = (cat: string | null, occ: string | null) => {
    if (occ) {
        switch (occ) {
            case 'bday': return 'Birthday Treats'
            case 'thank-you': return 'Thank You Gifts'
            case 'love': return 'Romance & Love'
            case 'congrats': return 'Congratulations'
            default: return 'Occasions'
        }
    }
    if (cat) {
        const category = categories.find(c => c.id === cat)
        return category?.name || 'Menu'
    }
    return 'Full Menu'
}

function MenuContent() {
    const searchParams = useSearchParams()
    const category = searchParams.get('cat')
    const occasion = searchParams.get('occ')

    const filteredItems = MOCK_MENU_ITEMS.filter(item => {
        if (occasion) return item.seasonal === occasion
        if (category) {
            if (category === 'featured') return item.featured
            return item.category === category
        }
        return true
    })

    const title = getPageTitle(category, occasion)
    const activeCategory = categories.find(c => c.id === category) || categories[0]

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Banner */}
            <div className="relative bg-gradient-to-br from-[#c41e3a] via-[#a31830] to-[#8b1528] text-white py-12 md:py-16 overflow-hidden">
                <Particles
                    className="absolute inset-0 z-0 pointer-events-none opacity-30"
                    quantity={40}
                    staticity={50}
                    color="#ffffff"
                />
                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <BlurFade delay={0.1} inView>
                        <div className="text-center space-y-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/10">
                                <Cookie className="h-4 w-4" />
                                Our Menu
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">{title}</h1>
                            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
                                Freshly baked and delivered warm to your door. Every cookie, every time.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Category Navigation */}
            <div className="sticky top-[112px] z-30 bg-white dark:bg-zinc-950 border-b border-border shadow-sm">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
                        {categories.map((cat) => {
                            const isActive = cat.id === category
                            return (
                                <Link
                                    key={cat.id || 'all'}
                                    href={cat.id ? `/menu?cat=${cat.id}` : '/menu'}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border-2",
                                        isActive
                                            ? "text-white border-transparent"
                                            : "border-border hover:border-[#c41e3a]/30 text-foreground"
                                    )}
                                    style={{
                                        backgroundColor: isActive ? cat.color : undefined
                                    }}
                                >
                                    <cat.icon className="h-4 w-4" />
                                    {cat.name}
                                    {cat.badge && !isActive && (
                                        <span
                                            className="px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                                            style={{ backgroundColor: cat.color }}
                                        >
                                            {cat.badge}
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {filteredItems.map((item, index) => (
                            <BlurFade key={item.id} delay={0.05 + index * 0.02} inView>
                                <ProductCard item={item} />
                            </BlurFade>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl">
                        <div className="space-y-4">
                            <div className="h-20 w-20 mx-auto rounded-full bg-[#c41e3a]/10 flex items-center justify-center">
                                <Cookie className="h-10 w-10 text-[#c41e3a]" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">No items found</h3>
                            <p className="text-muted-foreground">
                                Sorry, no items found in this category right now.
                            </p>
                            <Link href="/menu">
                                <Button className="rounded-full bg-[#c41e3a] hover:bg-[#a31830]">
                                    View Full Menu
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Valentine's CTA Banner */}
            {!category && (
                <section className="py-12 bg-gradient-to-r from-pink-50 via-rose-50 to-red-50 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-red-950/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-[#c41e3a] flex items-center justify-center">
                                    <Heart className="h-8 w-8 text-white" fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">Valentine's Day is Coming!</h3>
                                    <p className="text-muted-foreground">Order your heart-shaped treats now</p>
                                </div>
                            </div>
                            <Link href="/menu?cat=valentines">
                                <Button size="lg" className="rounded-full bg-[#c41e3a] hover:bg-[#a31830]">
                                    Shop Valentine's
                                    <Heart className="h-4 w-4 ml-2" fill="currentColor" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

export default function MenuPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="h-12 w-12 mx-auto rounded-full bg-[#c41e3a] animate-pulse" />
                    <p className="text-muted-foreground">Loading menu...</p>
                </div>
            </div>
        }>
            <MenuContent />
        </Suspense>
    )
}

function ProductCard({ item }: { item: typeof MOCK_MENU_ITEMS[0] }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div
                className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-[#c41e3a]/30"
                onClick={() => setOpen(true)}
            >
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {item.featured && (
                        <div className="absolute top-3 left-3 bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            POPULAR
                        </div>
                    )}
                    {item.rating && (
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {item.rating}
                        </div>
                    )}
                </div>
                <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-lg text-foreground line-clamp-1 group-hover:text-[#c41e3a] transition-colors">
                            {item.name}
                        </h3>
                        <span className="font-bold text-[#c41e3a] whitespace-nowrap text-lg">
                            {formatCurrency(item.price)}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                        {item.description}
                    </p>
                    <Button
                        className="w-full rounded-xl font-semibold bg-[#c41e3a] hover:bg-[#a31830] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                        Add to Order
                    </Button>
                </div>
            </div>

            <ProductDialog open={open} onOpenChange={setOpen} item={item} />
        </>
    )
}
