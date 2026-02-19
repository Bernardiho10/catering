"use client"

import Link from "next/link"
import Image from "next/image"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Cookie, Heart, Gift, Cake, IceCream, CupSoda, UtensilsCrossed, Sparkles, Crown, Truck, Package } from "lucide-react"

const categories = [
    {
        name: "Organic Cakes",
        href: "/menu?cat=organic-cakes",
        icon: Cake,
        image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=400&q=80",
        color: "#1e3a8a", // Primary Blue
    },
    {
        name: "Specialty",
        href: "/menu?cat=specialty",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        color: "#ec4899",
        badge: "NEW",
    },
    {
        name: "Family Bundles",
        href: "/menu?cat=bundles",
        icon: Gift,
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=400&q=80",
        color: "#d97706", // Gold
    },
    {
        name: "Mini Samplers",
        href: "/menu?cat=bundles",
        icon: Package,
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=400&q=80",
        color: "#f59e0b",
        badge: "POPULAR",
    },
    {
        name: "Gluten Free",
        href: "/menu?cat=gluten-free",
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
        name: "Catering",
        href: "/menu?cat=catering",
        icon: Truck,
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80",
        color: "#6366f1",
    },
]

export function OccasionCategories() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <BlurFade delay={0.1} inView>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter mb-4">
                            Shop Our Blessings
                        </h2>
                        <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
                        <p className="text-lg text-primary/70 max-w-2xl mx-auto font-medium">
                            Warm, fresh-baked organic treats delivered straight to your door.
                        </p>
                    </div>
                </BlurFade>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((category, index) => (
                        <BlurFade key={category.name} delay={0.05 + index * 0.05} inView>
                            <Link
                                href={category.href}
                                className="group block text-center space-y-4"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-blue-50">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                                    {category.badge && (
                                        <div className="absolute top-4 right-4 bg-accent text-primary text-[10px] font-black px-3 py-1 rounded-sm uppercase tracking-widest shadow-lg">
                                            {category.badge}
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-sm font-black text-primary uppercase tracking-widest group-hover:text-accent transition-colors">
                                    {category.name}
                                </h3>
                            </Link>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    )
}
