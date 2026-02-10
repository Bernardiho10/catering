"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Flame, Sparkles, Gift } from "lucide-react"
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
        id: "heart-pies",
        title: "New! Mini Heart Shaped Cookie Pies",
        subtitle: "Valentine's Day Special",
        description: "Uniquely created for Valentine's Day: Heart Sprinkle and Red Velvet Mini Cookie Pies come in packs of four and are delivered warm to the door.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=valentines",
        bgGradient: "from-pink-50 via-rose-50 to-red-50 dark:from-pink-950/40 dark:via-rose-950/30 dark:to-red-950/40",
        accentColor: "#c41e3a",
        icon: <Heart className="h-6 w-6" />,
    },
    {
        id: "game-day",
        title: "COOKIES FOR THE GAME",
        subtitle: "Game Day Treats",
        description: "Watching the big game this weekend? Treat your crew to warm, fresh-baked cookies while you cheer, watch the commercials, or just hang out.",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu",
        bgGradient: "from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/40",
        accentColor: "#f59e0b",
        icon: <Flame className="h-6 w-6" />,
    },
    {
        id: "heart-sprinkle",
        title: "HEART SPRINKLE COOKIES",
        subtitle: "Valentine's Collection",
        description: "Sprinkle in the love this Valentine's. These specialty sugar cookies are baked with delicious sprinkle hearts and delivered warm to the door.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=valentines",
        bgGradient: "from-rose-50 via-pink-50 to-fuchsia-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-fuchsia-950/40",
        accentColor: "#ec4899",
        icon: <Sparkles className="h-6 w-6" />,
    },
    {
        id: "red-velvet",
        title: "RED VELVET COOKIES",
        subtitle: "Seasonal Favorite",
        description: "Roll out the red carpet for one of our most requested seasonal cookies! Soft, rich, topped with powdered sugar, and always delivered warm.",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=seasonal",
        bgGradient: "from-red-50 via-rose-50 to-pink-50 dark:from-red-950/40 dark:via-rose-950/30 dark:to-pink-950/40",
        accentColor: "#dc2626",
        icon: <Heart className="h-6 w-6" />,
    },
    {
        id: "valentines",
        title: "SWEET THEM OFF THEIR FEET",
        subtitle: "Valentine's Day",
        description: "If you're ready to create a warm and memorable Valentine's Day, you're in the right place.",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=80",
        ctaText: "ORDER NOW",
        ctaHref: "/menu?category=valentines",
        bgGradient: "from-pink-100 via-rose-100 to-red-100 dark:from-pink-950/50 dark:via-rose-950/40 dark:to-red-950/50",
        accentColor: "#c41e3a",
        icon: <Gift className="h-6 w-6" />,
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
