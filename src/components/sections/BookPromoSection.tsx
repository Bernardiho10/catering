"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, ChefHat } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"

export function BookPromoSection() {
    return (
        <section className="py-16 md:py-24 bg-amber-50 dark:bg-amber-950/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Book Image */}
                    <BlurFade delay={0.2} inView>
                        <div className="relative flex justify-center">
                            <div className="relative">
                                {/* Book shadow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 rounded-lg transform rotate-3 translate-x-2 translate-y-2" />
                                {/* Book */}
                                <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
                                        alt="Our Book"
                                        width={350}
                                        height={450}
                                        className="object-cover"
                                    />
                                </div>
                                {/* Decorative badge */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                                    <span className="text-white font-bold text-sm text-center leading-tight">NEW<br />RELEASE</span>
                                </div>
                            </div>
                        </div>
                    </BlurFade>

                    {/* Content */}
                    <div className="space-y-6">
                        <BlurFade delay={0.1} inView>
                            <p className="text-xs tracking-widest uppercase text-primary font-semibold">
                                Our Story
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                It's Not Just Cookies!
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg text-muted-foreground">
                                Here is the long-awaited story of how we turned a batch of "sorry I stood you up"
                                chocolate chip cookies into a first-of-its-kind warm-cookie delivery company.
                                And for the first time ever, fans will have recipes for some of their favorite treats,
                                along with vibrant color photography of finished goodies.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <div className="flex flex-wrap gap-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <Heart className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Our Love Story</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <ChefHat className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Exclusive Recipes</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <BookOpen className="h-5 w-5 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium">Behind the Scenes</span>
                                </div>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/about">
                                    <Button size="lg" className="rounded-full h-12 px-8">
                                        Read Our Story
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
                                    Get the Book
                                </Button>
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </div>
        </section>
    )
}
