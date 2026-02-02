"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Smartphone, Star, MapPin, Bell } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Meteors } from "@/components/magicui/meteors"

export function AppDownloadSection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <BlurFade delay={0.1} inView>
                            <p className="text-xs tracking-widest uppercase text-primary font-semibold">
                                Download Our App
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                Make an <span className="text-primary">APP-etizing</span> Choice
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg text-muted-foreground max-w-lg">
                                The best way to order warm cookies? Through our app! Repeat orders in a snap
                                and even track your delivery all the way to your door on the map.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <div className="grid grid-cols-2 gap-4 max-w-md">
                                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Star className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Easy Reorder</p>
                                        <p className="text-xs text-muted-foreground">One-tap favorites</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Live Tracking</p>
                                        <p className="text-xs text-muted-foreground">Watch your order</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Bell className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Notifications</p>
                                        <p className="text-xs text-muted-foreground">Order updates</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Smartphone className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Exclusive Deals</p>
                                        <p className="text-xs text-muted-foreground">App-only offers</p>
                                    </div>
                                </div>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button
                                    size="lg"
                                    className="rounded-full h-14 px-6 gap-3 shadow-lg hover:shadow-primary/25 transition-shadow"
                                >
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    App Store
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full h-14 px-6 gap-3"
                                >
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.18 23L12 13.77 20.82 23 22 21.74 12 11.19 2 21.74 3.18 23zm8.82-11.23L22 1.26 20.82 0 12 9.23 3.18 0 2 1.26l10 10.51z" />
                                    </svg>
                                    Google Play
                                </Button>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Phone Mockup */}
                    <BlurFade delay={0.3} inView>
                        <div className="relative flex justify-center lg:justify-end text-black">
                            <div className="relative w-[280px] md:w-[320px]">
                                {/* Phone frame */}
                                <div className="relative bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-4 border-zinc-800">
                                    <div className="bg-zinc-800 rounded-[2.5rem] overflow-hidden relative z-10">
                                        <Image
                                            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80"
                                            alt="App Screenshot"
                                            width={300}
                                            height={600}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                    {/* Notch */}
                                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-900 rounded-full z-20" />
                                </div>
                                {/* Decorative */}
                                <div className="absolute -z-10 -bottom-8 -right-8 w-48 h-48 bg-primary/20 rounded-full blur-3xl opacity-50" />
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            <Meteors number={20} />
        </section>
    )
}
