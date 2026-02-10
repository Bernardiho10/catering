"use client"

import { Button } from "@/components/ui/button"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Truck, Users, PartyPopper, Calendar, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const features = [
    {
        icon: Users,
        title: "Perfect for Crowds",
        description: "Corporate events, parties, weddings & more",
    },
    {
        icon: PartyPopper,
        title: "Full Experience",
        description: "Our team serves warm cookies on-site",
    },
    {
        icon: Calendar,
        title: "Easy Booking",
        description: "Book online or call us to plan your event",
    },
]

export function TreatsTruckSection() {
    return (
        <section className="py-16 md:py-24 bg-zinc-900 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c41e3a]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content Side */}
                    <div className="space-y-8 order-2 lg:order-1">
                        <BlurFade delay={0.1} inView>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-[#c41e3a] text-white">
                                <Truck className="h-4 w-4" />
                                Treats Truck
                            </span>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                Ordering for a <span className="text-[#c41e3a]">Special Event?</span>
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
                                From cookie trays to Tiffwich® Ice Cream Sandwich parties, we've got you covered.
                                Check out our tasty solutions for parties, gifts, and gatherings.
                            </p>
                        </BlurFade>

                        {/* Features */}
                        <BlurFade delay={0.4} inView>
                            <div className="space-y-4 pt-4">
                                {features.map((feature) => (
                                    <div
                                        key={feature.title}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                                    >
                                        <div className="h-12 w-12 rounded-full bg-[#c41e3a] flex items-center justify-center shrink-0">
                                            <feature.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg">{feature.title}</h4>
                                            <p className="text-zinc-400">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/catering">
                                    <Button
                                        size="lg"
                                        className="rounded-full px-8 h-14 text-base font-bold bg-[#c41e3a] hover:bg-[#a31830] shadow-lg"
                                    >
                                        Explore Catering
                                        <ChevronRight className="h-5 w-5 ml-1" />
                                    </Button>
                                </Link>
                                <Link href="/catering/treats-truck">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="rounded-full px-8 h-14 text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10"
                                    >
                                        Book the Truck
                                    </Button>
                                </Link>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Image Side */}
                    <BlurFade delay={0.3} inView>
                        <div className="relative order-1 lg:order-2">
                            {/* Main Image */}
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
                                    alt="Tiff's Treats Truck Catering"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>

                            {/* Floating Stats Cards */}
                            <div className="absolute -bottom-6 -left-6 md:left-6 bg-white text-zinc-900 rounded-2xl shadow-xl p-4 md:p-5">
                                <p className="text-3xl md:text-4xl font-bold text-[#c41e3a]">1000+</p>
                                <p className="text-sm text-zinc-600">Events Catered</p>
                            </div>

                            <div className="absolute -top-6 -right-6 md:right-6 bg-[#c41e3a] text-white rounded-2xl shadow-xl p-4 md:p-5">
                                <p className="text-3xl md:text-4xl font-bold">5★</p>
                                <p className="text-sm text-white/80">Customer Rating</p>
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}
