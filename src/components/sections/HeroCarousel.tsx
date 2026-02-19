"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Flame, Sparkles, Gift, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"

interface HeroSlide {
    id: string
    title: string
    subtitle: string
    description: string
    image: string
    ctaText: string
    ctaHref: string
    bgGradient: string
    accentColor: string
    icon?: React.ReactNode
}

const slides: HeroSlide[] = [
    {
        id: "main-hero",
        title: "Wholesome Ingredients. Family Roots. A Blessing in Every Slice.",
        subtitle: "100% Organic & Homemade",
        description: "Welcome to The A Cake, where we believe your family deserves the purest treats. 100% Organic. 100% Homemade.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
        ctaText: "BROWSE OUR FLAVORS",
        ctaHref: "/menu",
        bgGradient: "bg-white",
        accentColor: "hsl(var(--primary))",
        icon: <Sparkles className="h-6 w-6" />,
    },
    {
        id: "zesty-lemon",
        title: "ZESTY LEMON REFRESHMENT",
        subtitle: "Organic Cold-Pressed",
        description: "A bright, refreshing classic made with organic cold-pressed lemons and a light, citrus-infused crumb.",
        image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER ZESTY LEMON",
        ctaHref: "/menu",
        bgGradient: "bg-white",
        accentColor: "hsl(var(--accent))",
        icon: <Gift className="h-6 w-6" />,
    },
    {
        id: "nursing-mother",
        title: "THE NURSING MOTHER'S SPECIAL",
        subtitle: "Signature Recipe",
        description: "Crafted with specific organic ingredients known to support lactation, offering a delicious, nutrient-dense treat for new moms.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80",
        ctaText: "VIEW SPECIALTY MENU",
        ctaHref: "/menu",
        bgGradient: "bg-white",
        accentColor: "hsl(var(--primary))",
        icon: <Star className="h-6 w-6" />,
    },
]

interface HeroCarouselProps {
    onOrderClick?: () => void
}

export function HeroCarousel({ onOrderClick }: HeroCarouselProps) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const goToSlide = useCallback((index: number) => {
        if (isAnimating) return
        setIsAnimating(true)
        setCurrentSlide(index)
        setTimeout(() => setIsAnimating(false), 600)
    }, [isAnimating])

    const nextSlide = useCallback(() => {
        goToSlide((currentSlide + 1) % slides.length)
    }, [currentSlide, goToSlide])

    const prevSlide = useCallback(() => {
        goToSlide((currentSlide - 1 + slides.length) % slides.length)
    }, [currentSlide, goToSlide])

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [nextSlide])

    const slide = slides[currentSlide]


    return (
        <section className="relative w-full h-[85vh] overflow-hidden bg-background">
            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                {slides.map((s, index) => (
                    <div
                        key={s.id}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        )}
                    >
                        <Image
                            src={s.image}
                            alt={s.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                ))}
            </div>

            {/* Ribbon Overlay Content */}
            <div className="absolute inset-0 z-10 flex items-center justify-center md:justify-start container mx-auto px-4 md:px-12 pointer-events-none">
                <div className="relative max-w-2xl w-full pointer-events-auto">
                    {/* The Ribbon Itself */}
                    <div className="relative bg-background/95 backdrop-blur-md rounded-r-3xl border-l-8 border-primary shadow-2xl p-8 md:p-12 overflow-hidden">
                        {/* Decorative background pattern for ribbon */}
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            {slides[currentSlide].icon}
                        </div>

                        <div className="space-y-6 relative z-10">
                            <BlurFade key={`subtitle-${slide.id}`} delay={0.1} inView>
                                <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm">
                                    <span className="w-8 h-[2px] bg-primary"></span>
                                    {slide.subtitle}
                                </div>
                            </BlurFade>

                            <BlurFade key={`title-${slide.id}`} delay={0.2} inView>
                                <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                                    {slide.title}
                                </h1>
                            </BlurFade>

                            <BlurFade key={`desc-${slide.id}`} delay={0.3} inView>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {slide.description}
                                </p>
                            </BlurFade>

                            <BlurFade key={`cta-${slide.id}`} delay={0.4} inView>
                                <div className="pt-4 flex gap-4">
                                    <Button
                                        size="lg"
                                        className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all text-base font-semibold"
                                        onClick={onOrderClick}
                                    >
                                        {slide.ctaText}
                                    </Button>
                                </div>
                            </BlurFade>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 left-0 right-0 z-20 container mx-auto px-4 md:px-12 flex justify-between items-center pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                    {slides.map((s, index) => (
                        <button
                            key={s.id}
                            onClick={() => goToSlide(index)}
                            className={cn(
                                "h-2 transition-all duration-300 rounded-full",
                                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/80 hover:bg-white backdrop-blur-sm"
                        onClick={prevSlide}
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/80 hover:bg-white backdrop-blur-sm"
                        onClick={nextSlide}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
