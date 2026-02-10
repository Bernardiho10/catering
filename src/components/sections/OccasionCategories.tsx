"use client"

import Link from "next/link"
import Image from "next/image"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Cookie, Heart, Gift, Cake, IceCream, CupSoda, UtensilsCrossed, Sparkles, Crown, Truck, Package } from "lucide-react"

const categories = [
    {
        name: "Warm Cookies",
        href: "/menu?cat=warm",
        icon: Cookie,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
        color: "#c41e3a",
    },
    {
        name: "Valentine's Day",
        href: "/menu?cat=valentines",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80",
        color: "#ec4899",
        badge: "NEW",
    },
    {
        name: "Birthday Bundles",
        href: "/menu?cat=birthday",
        icon: Gift,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80",
        color: "#8b5cf6",
    },
    {
        name: "Cookie Pie",
        href: "/menu?cat=pie",
        icon: Cake,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
        color: "#f59e0b",
        badge: "POPULAR",
    },
    {
        name: "Brownies",
        href: "/menu?cat=brownies",
        icon: UtensilsCrossed,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80",
        color: "#78350f",
    },
    {
        name: "Ice Cream",
        href: "/menu?cat=ice-cream",
        icon: IceCream,
        image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80",
        color: "#06b6d4",
    },
    {
        name: "Cookie Truffles",
        href: "/menu?cat=truffles",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=400&q=80",
        color: "#a855f7",
    },
    {
        name: "Drinks",
        href: "/menu?cat=drinks",
        icon: CupSoda,
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=400&q=80",
        color: "#0ea5e9",
    },
    {
        name: "Gift Cards",
        href: "/gift-cards",
        icon: Gift,
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=400&q=80",
        color: "#10b981",
    },
    {
        name: "Ship Nationwide",
        href: "/menu?cat=ship",
        icon: Truck,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
        color: "#6366f1",
    },
    {
        name: "Special Occasions",
        href: "/menu?cat=occasions",
        icon: Crown,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80",
        color: "#eab308",
    },
    {
        name: "Cookie Trays",
        href: "/menu?cat=trays",
        icon: Package,
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&q=80",
        color: "#dc2626",
    },
]

export function OccasionCategories() {
    return (
        <section className="py-16 md:py-20 bg-white dark:bg-zinc-950">
            <div className="container mx-auto px-4 md:px-6">
                <BlurFade delay={0.1} inView>
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#c41e3a]/10 text-[#c41e3a] mb-4">
                            Our Menu
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                            What's on the Menu?
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            From piping hot cookies to chocolaty brownies, we've got treats to please any sweet tooth—hand delivered warm to your door!
                        </p>
                    </div>
                </BlurFade>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <BlurFade key={category.name} delay={0.05 + index * 0.03} inView>
                            <Link
                                href={category.href}
                                className="group relative flex flex-col items-center text-center p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 border border-transparent hover:border-[#c41e3a]/20 transition-all duration-300 hover:shadow-lg overflow-hidden"
                            >
                                {/* Badge */}
                                {category.badge && (
                                    <span
                                        className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        {category.badge}
                                    </span>
                                )}

                                {/* Icon Circle */}
                                <div
                                    className="relative w-20 h-20 rounded-full overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)`,
                                        border: `2px solid ${category.color}30`
                                    }}
                                >
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        sizes="80px"
                                    />
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors"
                                    >
                                        <category.icon
                                            className="h-8 w-8 text-white drop-shadow-lg"
                                        />
                                    </div>
                                </div>

                                {/* Category Name */}
                                <h3
                                    className="font-semibold text-sm text-foreground group-hover:text-[#c41e3a] transition-colors leading-tight"
                                >
                                    {category.name}
                                </h3>
                            </Link>
                        </BlurFade>
                    ))}
                </div>

                {/* View Full Menu Link */}
                <BlurFade delay={0.4} inView>
                    <div className="text-center mt-10">
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 text-[#c41e3a] font-semibold hover:underline text-lg"
                        >
                            View Full Menu
                            <span className="text-xl">→</span>
                        </Link>
                    </div>
                </BlurFade>
            </div>
        </section>
    )
}
