"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
    {
        id: 1,
        name: "Sarah M.",
        role: "Event Planner",
        avatar: "SM",
        rating: 5,
        text: "Foody catered our company holiday party and exceeded every expectation. The food was restaurant-quality, presentation was stunning, and the team was incredibly professional.",
    },
    {
        id: 2,
        name: "Michael T.",
        role: "Wedding Client",
        avatar: "MT",
        rating: 5,
        text: "Our wedding guests are still talking about the food! The truffle risotto and salmon were absolute perfection. Worth every penny.",
    },
    {
        id: 3,
        name: "Jennifer K.",
        role: "Regular Customer",
        avatar: "JK",
        rating: 5,
        text: "I order from Foody every week for family dinners. The Buddha bowls are my kids' favorite, and I love that everything is fresh and healthy.",
    },
]

export function Testimonials() {
    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-xs tracking-widest uppercase text-primary font-medium">Testimonials</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                        Loved by food enthusiasts
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        See what our customers have to say about their Foody experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card border-border rounded-2xl">
                                <CardContent className="p-6 space-y-4">
                                    <Quote className="h-8 w-8 text-primary/20" />
                                    
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    <p className="text-foreground leading-relaxed">
                                        &ldquo;{testimonial.text}&rdquo;
                                    </p>

                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
