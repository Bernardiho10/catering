"use client"

import { motion } from "framer-motion"
import { MousePointerClick, ChefHat, Truck, PartyPopper } from "lucide-react"

const steps = [
    {
        icon: MousePointerClick,
        step: "01",
        title: "Select Your Blessing",
        description: "Choose from our organic cake flavors, special bundles, or seasonal treats.",
    },
    {
        icon: ChefHat,
        step: "02",
        title: "Baked with Prayer",
        description: "Our bakers prepare your order with love, faith, and 100% organic ingredients.",
    },
    {
        icon: Truck,
        step: "03",
        title: "Delivered with Care",
        description: "Track your wholesome delivery as it makes its way to your home or event.",
    },
    {
        icon: PartyPopper,
        step: "04",
        title: "Share the Love",
        description: "Gather your loved ones and enjoy a slice of pure, organic joy together.",
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center space-y-4 mb-12">
                    <p className="text-xs tracking-widest uppercase text-primary font-medium">Simple Process</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                        How The A Cake works
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        From our oven to your table, we make sharing the blessing simple.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            <div className="bg-card rounded-2xl border border-border p-6 h-full space-y-4 text-center">
                                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                    <step.icon className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-xs font-bold text-primary tracking-widest">{step.step}</span>
                                <h3 className="font-heading font-semibold text-lg text-foreground">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
