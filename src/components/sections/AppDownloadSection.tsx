"use client"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Smartphone, MapPin, Bell, Star, ChevronRight } from "lucide-react"
import Image from "next/image"

const features = [
    {
        icon: Smartphone,
        title: "Easy Ordering",
        description: "Repeat orders in a snap with saved favorites",
    },
    {
        icon: MapPin,
        title: "Live Tracking",
        description: "Track your delivery all the way to your door on the map",
    },
    {
        icon: Bell,
        title: "Push Notifications",
        description: "Get updates when your cakes are being baked and delivered",
    },
    {
        icon: Star,
        title: "Earn Rewards",
        description: "Stack up points on every purchase for free treats",
    },
]

export function AppDownloadSection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#c41e3a] via-[#a31830] to-[#8b1528] text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content Side */}
                    <div className="space-y-8">
                        <BlurFade delay={0.1} inView>
                            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm">
                                📱 Download Our App
                            </span>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Make an APPetizing Choice
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                                The best way to order The A Cake's organic cakes? Through our app!
                                Repeat orders in a snap and even track your delivery all the way to your door on the map.
                            </p>
                        </BlurFade>

                        {/* Features Grid */}
                        <BlurFade delay={0.4} inView>
                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                {features.map((feature, index) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-start gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                            <feature.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{feature.title}</h4>
                                            <p className="text-sm text-white/70">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BlurFade>

                        {/* App Store Buttons */}
                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-zinc-900 transition-colors"
                                >
                                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="white">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-[10px] text-white/70">Download on the</p>
                                        <p className="text-sm font-semibold text-white">App Store</p>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-black rounded-xl hover:bg-zinc-900 transition-colors"
                                >
                                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="white">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-[10px] text-white/70">Get it on</p>
                                        <p className="text-sm font-semibold text-white">Google Play</p>
                                    </div>
                                </a>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Phone Mockup Side */}
                    <BlurFade delay={0.3} inView>
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Phone Frame */}
                            <div className="relative w-[280px] md:w-[320px]">
                                {/* Phone Outer Frame */}
                                <div className="relative bg-zinc-900 rounded-[3rem] p-3 shadow-2xl">
                                    {/* Screen */}
                                    <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-white">
                                        <Image
                                            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
                                            alt="Tiff's Treats App"
                                            fill
                                            className="object-cover"
                                            sizes="320px"
                                        />
                                        {/* App UI Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#c41e3a] via-transparent to-black/50">
                                            <div className="p-6 text-white">
                                                <p className="text-xs opacity-70">Welcome back!</p>
                                                <p className="text-lg font-bold">Your Favorites</p>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-zinc-900 font-semibold text-sm">Track Order</p>
                                                        <p className="text-zinc-500 text-xs">On the way → 5 min</p>
                                                    </div>
                                                    <div className="h-10 w-10 rounded-full bg-[#c41e3a] flex items-center justify-center">
                                                        <ChevronRight className="h-5 w-5 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Notch */}
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-full" />
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce">
                                    <span className="text-2xl">🍪</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-bounce delay-300">
                                    <span className="text-xl">❤️</span>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}
