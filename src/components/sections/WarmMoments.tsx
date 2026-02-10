
"use client";

import { Lens } from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";

export function WarmMoments() {
    return (
        <section className="py-20 md:py-24 bg-zinc-50 dark:bg-black/20 overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <div className="md:w-1/2 space-y-8 relative z-10">
                        <BlurFade delay={0.2} inView>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary">
                                <Heart className="h-4 w-4" fill="currentColor" />
                                <span>The David's Difference</span>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                                Warm Moments, <br />
                                <span className="text-primary italic">Delivered.</span>
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                There's nothing quite like a box of warm cookies arriving at your door.
                                Whether it's a birthday surprise, a thank you gift, or just a treat for yourself,
                                we bake fresh to order and deliver them while they're still warm and gooey.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg hover:shadow-primary/25" asChild>
                                    <Link href="/menu">
                                        Order Warm Cookies
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base font-semibold border-2" asChild>
                                    <Link href="/about">
                                        Our Story
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Lens Visual */}
                    <BlurFade delay={0.2} inView className="md:w-1/2 w-full flex justify-center perspective-1000">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-orange-400/20 rounded-2xl blur-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-500 opacity-70" />

                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 bg-card transform group-hover:scale-[1.02] transition-all duration-500">
                                <Lens zoomFactor={2} lensSize={200}>
                                    <img
                                        src="https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80"
                                        alt="Warm Cookies Stack"
                                        className="w-[600px] h-auto object-cover md:max-w-none max-w-full"
                                    />
                                </Lens>

                                {/* Floating badge */}
                                <div className="absolute bottom-6 left-6 px-5 py-3 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        15
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-muted-foreground">FLAVORS</span>
                                        <span className="text-sm font-bold">Baked Fresh Daily</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
        </section>
    );
}
