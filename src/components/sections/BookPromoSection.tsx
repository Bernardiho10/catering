"use client"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { BookOpen, ChevronRight, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function BookPromoSection() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/30 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Book Image Side */}
                    <BlurFade delay={0.2} inView>
                        <div className="relative flex justify-center lg:justify-start">
                            {/* Book Container */}
                            <div className="relative">
                                {/* Shadow/Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-orange-400/30 rounded-2xl blur-2xl transform rotate-3" />

                                {/* Book Image */}
                                <div className="relative w-[280px] md:w-[350px] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl transform hover:-rotate-2 transition-transform duration-300">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80"
                                        alt="It's Not Just Cake - Our Story"
                                        fill
                                        className="object-cover"
                                        sizes="350px"
                                    />
                                    {/* Book Cover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <p className="text-sm font-medium opacity-80">Our Story</p>
                                            <h3 className="text-2xl font-bold mt-1">It's Not Just Cake!</h3>
                                            <div className="flex items-center gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 md:-right-8 w-20 h-20 md:w-24 md:h-24 bg-[#c41e3a] rounded-full flex items-center justify-center text-white font-bold shadow-xl transform rotate-12">
                                    <div className="text-center">
                                        <p className="text-[10px] md:text-xs">BEST</p>
                                        <p className="text-sm md:text-base">SELLER</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BlurFade>

                    {/* Content Side */}
                    <div className="space-y-6 text-center lg:text-left">
                        <BlurFade delay={0.1} inView>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400">
                                <BookOpen className="h-4 w-4" />
                                Our Book
                            </span>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                It's Not Just Cake!
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Here is the long-awaited story of how Tiffany and Leon Chen turned her batch of
                                "sorry I stood you up" cakes into a first-of-its-kind
                                <span className="text-primary font-semibold"> organic cake delivery company focused on blessings</span>.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.35} inView>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                                And for the first time ever, fans will have recipes for some of their favorite
                                Tiff's Treats, along with vibrant color photography of finished goodies.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                                <Link href="/about">
                                    <Button
                                        size="lg"
                                        className="rounded-full px-8 h-14 text-base font-bold bg-[#c41e3a] hover:bg-[#a31830] shadow-lg"
                                    >
                                        Read Our Story
                                        <ChevronRight className="h-5 w-5 ml-1" />
                                    </Button>
                                </Link>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full px-8 h-14 text-base font-semibold border-2 border-amber-500 text-amber-700 hover:bg-amber-500/10"
                                >
                                    Order the Book
                                </Button>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </div>
        </section>
    )
}
