"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Particles } from "@/components/magicui/particles"

interface HeroSlide {
    id: string
    title: string
    subtitle: string
    description: string
    image: string
    ctaText: string
    ctaHref: string
    bgColor: string
}

const slides: HeroSlide[] = [
    {
        id: "valentines",
        title: "SWEET THEM OFF THEIR FEET",
        subtitle: "Valentine's Day",
        description: "If you're ready to create a warm and memorable Valentine's Day, you're in the right place.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=valentines",
        bgColor: "bg-rose-50 dark:bg-rose-950/30",
    },
    {
        id: "protein",
        title: "PROTEIN COOKIE",
        subtitle: "New Arrival",
        description: "Packed with hearty ingredients like creamy peanut butter, crunchy peanuts, and whey protein. 6 grams of protein in every cookie.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=protein",
        bgColor: "bg-amber-50 dark:bg-amber-950/30",
    },
    {
        id: "dubai-gold",
        title: "DUBAI GOLD COOKIES!",
        subtitle: "Limited Edition",
        description: "A luxurious sugar cookie loaded with white chips, filled with toasted kataifi and pistachio cream. Topped with glittery chopped pistachios for a golden finish.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=dubai",
        bgColor: "bg-yellow-50 dark:bg-yellow-950/30",
    },
    {
        id: "warm-cookies",
        title: "WARM, FRESH-BAKED COOKIES",
        subtitle: "Same-Day Delivery",
        description: "Order now for delivery, pickup, or nationwide shipping. Perfect for any occasion.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
        ctaText: "START ORDER",
        ctaHref: "/menu",
        bgColor: "bg-blue-50 dark:bg-blue-950/30",
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
        setTimeout(() => setIsAnimating(false), 500)
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
        }, 6000)
        return () => clearInterval(timer)
    }, [nextSlide])

    const slide = slides[currentSlide]

    return (
        <section className={cn("relative overflow-hidden transition-colors duration-500", slide.bgColor)}>
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px] md:min-h-[500px]">
                    {/* Content Side */}
                    <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
                        <BlurFade key={`subtitle-${slide.id}`} delay={0.1} inView>
                            <p className="text-sm tracking-widest uppercase text-primary font-semibold">
                                {slide.subtitle}
                            </p>
                        </BlurFade>

                        <BlurFade key={`title-${slide.id}`} delay={0.2} inView>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                {slide.title}
                            </h1>
                        </BlurFade>

                        <BlurFade key={`desc-${slide.id}`} delay={0.3} inView>
                            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                                {slide.description}
                            </p>
                        </BlurFade>

                        <BlurFade key={`cta-${slide.id}`} delay={0.4} inView>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button
                                    size="lg"
                                    className="rounded-full px-8 h-14 text-base font-bold shadow-lg hover:shadow-xl transition-shadow"
                                    onClick={onOrderClick}
                                >
                                    {slide.ctaText}
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="rounded-full px-8 h-14 text-base font-semibold"
                                >
                                    Track Order
                                </Button>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Image Side */}
                    <div className="order-1 lg:order-2 relative">
                        <BlurFade key={`image-${slide.id}`} delay={0.2} inView>
                            <div className="relative aspect-square max-w-[500px] mx-auto">
                                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        priority
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-xl" />
                            </div>
                        </BlurFade>
                    </div>
                </div>
            </div>

            {/* MagicUI Particles */}
            <Particles
                className="absolute inset-0 z-0"
                quantity={100}
                ease={80}
                color="#f59e0b"
                refresh
            />

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-zinc-800/90 shadow-lg flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 transition-colors z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            "w-3 h-3 rounded-full transition-all duration-300",
                            index === currentSlide
                                ? "bg-primary w-8"
                                : "bg-primary/30 hover:bg-primary/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
