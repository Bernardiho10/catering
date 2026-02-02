"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, PartyPopper } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"

export function TreatsTruckSection() {
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-6 order-2 lg:order-1">
                        <BlurFade delay={0.1} inView>
                            <p className="text-xs tracking-widest uppercase text-primary font-semibold">
                                Special Events
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.2} inView>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                                Book the Treats Truck
                            </h2>
                        </BlurFade>

                        <BlurFade delay={0.3} inView>
                            <p className="text-lg text-muted-foreground">
                                Make your next event unforgettable! Our Treats Truck brings the warmth
                                of fresh-baked cookies directly to your celebration. Perfect for
                                weddings, corporate events, birthday parties, and more.
                            </p>
                        </BlurFade>

                        <BlurFade delay={0.4} inView>
                            <div className="grid sm:grid-cols-2 gap-4 py-4">
                                <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                        <PartyPopper className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Private Events</p>
                                        <p className="text-xs text-muted-foreground">Weddings, birthdays, celebrations</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Corporate Events</p>
                                        <p className="text-xs text-muted-foreground">Team building, client appreciation</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                        <MapPin className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">On-Location</p>
                                        <p className="text-xs text-muted-foreground">We come to you</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                        <Calendar className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Easy Booking</p>
                                        <p className="text-xs text-muted-foreground">Reserve your date online</p>
                                    </div>
                                </div>
                            </div>
                        </BlurFade>

                        <BlurFade delay={0.5} inView>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/catering">
                                    <Button size="lg" className="rounded-full h-12 px-8">
                                        Book Now
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
                                        Get a Quote
                                    </Button>
                                </Link>
                            </div>
                        </BlurFade>
                    </div>

                    {/* Truck Image */}
                    <BlurFade delay={0.3} inView>
                        <div className="relative order-1 lg:order-2">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1567129937968-cdad8f07e2f8?auto=format&fit=crop&w=800&q=80"
                                    alt="Food Truck"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -z-10 -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                            <div className="absolute -z-10 -top-4 -right-4 w-24 h-24 bg-amber-500/20 rounded-full blur-xl" />
                        </div>
                    </BlurFade>
                </div>
            </div>
        </section>
    )
}
