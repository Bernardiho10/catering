"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Cake, Users, Gift, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const occasions = [
    {
        id: "valentines",
        title: "Valentine's Day",
        description: "Sweet treats for your sweetheart",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80",
        href: "/menu?category=valentines",
        color: "from-rose-500/20 to-pink-500/20",
        iconColor: "text-rose-500",
    },
    {
        id: "birthday",
        title: "Birthday",
        description: "Make their day extra special",
        icon: Cake,
        image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=400&q=80",
        href: "/menu?category=birthday",
        color: "from-amber-500/20 to-orange-500/20",
        iconColor: "text-amber-500",
    },
    {
        id: "corporate",
        title: "Corporate Events",
        description: "Impress clients & colleagues",
        icon: Users,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
        href: "/corporate",
        color: "from-blue-500/20 to-indigo-500/20",
        iconColor: "text-blue-500",
    },
    {
        id: "gifts",
        title: "Gift Giving",
        description: "Perfect for any occasion",
        icon: Gift,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80",
        href: "/gift-cards",
        color: "from-purple-500/20 to-violet-500/20",
        iconColor: "text-purple-500",
    },
    {
        id: "bestsellers",
        title: "Best Sellers",
        description: "Fan favorites you'll love",
        icon: Star,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
        href: "/menu?filter=bestsellers",
        color: "from-yellow-500/20 to-amber-500/20",
        iconColor: "text-yellow-500",
    },
    {
        id: "seasonal",
        title: "Seasonal Specials",
        description: "Limited time favorites",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1486427944544-d2c6e82eb7a5?auto=format&fit=crop&w=400&q=80",
        href: "/menu?filter=seasonal",
        color: "from-emerald-500/20 to-teal-500/20",
        iconColor: "text-emerald-500",
    },
]

export function OccasionCategories() {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-10">
                    <p className="text-xs tracking-widest uppercase text-primary font-semibold mb-2">
                        Shop by Occasion
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Find the Perfect Treat
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {occasions.map((occasion) => {
                        const Icon = occasion.icon
                        return (
                            <Link
                                key={occasion.id}
                                href={occasion.href}
                                className="group relative flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden"
                            >
                                {/* Background gradient on hover */}
                                <div className={cn(
                                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                                    occasion.color
                                )} />

                                {/* Image */}
                                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3 ring-2 ring-border group-hover:ring-primary/50 transition-all">
                                    <Image
                                        src={occasion.image}
                                        alt={occasion.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        sizes="80px"
                                    />
                                </div>

                                {/* Icon badge */}
                                <div className={cn(
                                    "absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm",
                                    occasion.iconColor
                                )}>
                                    <Icon className="w-4 h-4" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                        {occasion.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {occasion.description}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
