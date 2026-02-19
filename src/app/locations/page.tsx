"use client"

import { MapPin, Clock, Phone, ChevronRight, Globe } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LocationsPage() {
    const locations = [
        {
            name: "Houston Flagship",
            address: "123 Blessing Blvd, Houston, TX 77002",
            phone: "(555) 123-4567",
            hours: "Mon-Sun: 9am - 10pm",
            type: "Full Service"
        },
        {
            name: "Westville Kitchen",
            address: "456 Baker Street, Westville, CA 90025",
            phone: "(555) 987-6543",
            hours: "Mon-Sat: 10am - 9pm",
            type: "Pickup & Delivery"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <BlurFade delay={0.1} inView>
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                                <MapPin className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Presence</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                                Find the <br />
                                <span className="text-accent italic font-serif normal-case tracking-normal">Blessing</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
                                Visit us in person for the freshest organic treats and a warm welcome.
                            </p>
                        </div>
                    </BlurFade>
                </div>
            </section>

            {/* Locations Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {locations.map((loc, i) => (
                            <BlurFade key={i} delay={0.1 + i * 0.1} inView>
                                <div className="bg-white rounded-sm p-10 border border-blue-50 shadow-sm hover:shadow-2xl transition-all duration-500 group">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">{loc.name}</h3>
                                            <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{loc.type}</p>
                                        </div>
                                        <div className="h-12 w-12 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="text-primary/40 pt-1">
                                                <MapPin className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-medium text-primary/70 leading-relaxed">
                                                {loc.address}
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="text-primary/40 pt-1">
                                                <Clock className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-medium text-primary/70 leading-relaxed">
                                                {loc.hours}
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="text-primary/40 pt-1">
                                                <Phone className="h-4 w-4" />
                                            </div>
                                            <p className="text-sm font-medium text-primary/70 leading-relaxed">
                                                {loc.phone}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-blue-50 flex flex-wrap gap-4">
                                        <Link href="/menu" className="flex-1">
                                            <Button className="w-full rounded-sm h-14 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl">
                                                Order From Here
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" className="h-14 px-6 rounded-sm border-2 border-primary/10 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-blue-50">
                                            Get Directions
                                        </Button>
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Expansion Section */}
            <section className="py-24 bg-blue-50/10 border-t border-blue-50 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-8">
                            <BlurFade delay={0.1} inView>
                                <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
                                    Spreading the <br />
                                    <span className="text-accent italic font-serif normal-case tracking-normal">Love Nationally</span>
                                </h2>
                            </BlurFade>
                            <BlurFade delay={0.2} inView>
                                <p className="text-xl text-primary/60 font-medium leading-relaxed">
                                    Abraham&apos;s Organic Treats is growing! We&apos;re currently shipping our gourmet desserts to all 50 states, with more physical locations opening soon.
                                </p>
                            </BlurFade>
                            <BlurFade delay={0.3} inView>
                                <Button size="lg" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-primary shadow-xl">
                                    Notify Me of New Locations
                                </Button>
                            </BlurFade>
                        </div>
                        <div className="flex-1 relative">
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30" />
                                <Globe className="w-full h-full relative z-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
