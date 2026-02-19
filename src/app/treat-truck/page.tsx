
"use client"

import { motion } from "framer-motion"
import { Truck, Calendar, MapPin, Clock, Instagram, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { RetroGrid } from "@/components/magicui/retro-grid"

export default function TreatTruckPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#c41e3a]">
                <RetroGrid className="opacity-20" color="#ffffff" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

                {/* Background Image (Mock) */}
                <Image
                    src="https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2071&auto=format&fit=crop"
                    alt="David's Delights Treat Truck"
                    fill
                    className="object-cover opacity-60"
                    priority
                />

                <div className="container relative z-20 text-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-bold mb-6 border border-white/30">
                            <Truck className="h-5 w-5" />
                            On The Move
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight drop-shadow-lg">
                            The Treat Truck
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-medium drop-shadow-md">
                            Bringing fresh cakes and smiles to neighborhoods, events, and festivals near you.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="rounded-full bg-white text-[#c41e3a] hover:bg-zinc-100 font-bold h-14 px-8 text-lg">
                                Find Us Now
                            </Button>
                            <Button size="lg" variant="outline" className="rounded-full border-2 border-white text-white hover:bg-white/20 font-bold h-14 px-8 text-lg bg-transparent">
                                Book for Event
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Upcoming Stops */}
            <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Upcoming Stops</h2>
                            <p className="text-muted-foreground text-lg">See where we're parking next!</p>
                        </div>
                        <Button variant="link" className="text-[#c41e3a] font-bold text-lg gap-2 p-0 h-auto">
                            View Full Calendar <Calendar className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { location: "Downtown Food Park", date: "Today", time: "11:00 AM - 8:00 PM", address: "123 Main St, Metro City" },
                            { location: "Riverside Festival", date: "Sat, Feb 14", time: "10:00 AM - 10:00 PM", address: "Riverside Park, Southbank" },
                            { location: "Tech Campus Lunch", date: "Mon, Feb 16", time: "11:30 AM - 2:00 PM", address: "Innovate Way, Tech District" }
                        ].map((stop, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow border-none shadow-md overflow-hidden group">
                                    <div className="h-3 bg-[#c41e3a]" />
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-[#c41e3a]/10 text-[#c41e3a] font-bold px-3 py-1 rounded-full text-sm">
                                                {stop.date}
                                            </div>
                                            <MapPin className="h-5 w-5 text-muted-foreground group-hover:text-[#c41e3a] transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{stop.location}</h3>
                                        <div className="space-y-2 text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                {stop.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                {stop.address}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Book the Truck */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop"
                                alt="Book the truck"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                <div className="text-white">
                                    <h3 className="text-3xl font-bold mb-2">Private Events</h3>
                                    <p className="text-lg opacity-90">Weddings, birthdays, corporate parties - we do it all.</p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Have the Truck at Your Next Event</h2>
                                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                                    Imagine the smell of fresh-baked cakes wafting through your event. Our Treat Truck comes fully stocked with fresh cakes, ice cold milk, and ice cream sandwiches.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Custom Menu", desc: "Choose your favorite flavors and treats." },
                                        { title: "Full Service", desc: "Our friendly team handles everything." },
                                        { title: "Photo Ops", desc: "The truck makes a perfect backdrop." }
                                    ].map((feature, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-12 w-12 rounded-full bg-[#c41e3a]/10 flex items-center justify-center shrink-0">
                                                <Check className="h-6 w-6 text-[#c41e3a]" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold">{feature.title}</h4>
                                                <p className="text-muted-foreground">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-[#c41e3a] hover:bg-[#a31830]">
                                        Request Booking Info
                                    </Button>
                                    <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold">
                                        Download Menu PDF
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Follow Us */}
            <section className="py-16 bg-[#c41e3a] text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-heading font-bold mb-4">Follow the Crumbs</h2>
                    <p className="text-white/80 mb-8 max-w-lg mx-auto">
                        Follow us on Instagram for daily location updates, secret menu items, and giveaways!
                    </p>
                    <Button variant="secondary" size="lg" className="rounded-full font-bold gap-2">
                        <Instagram className="h-5 w-5" />
                        @DavidsDelightsTruck
                    </Button>
                </div>
            </section>
        </div>
    )
}
