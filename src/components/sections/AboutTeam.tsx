"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChefHat, Heart, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const team = [
    {
        id: 1,
        name: "Chef Katherine",
        role: "Founder & Executive Chef",
        bio: "Classically trained with 15 years of experience. Passionate about bringing restaurant-quality food to your table.",
        image: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 2,
        name: "Marcus Chen",
        role: "Head of Operations",
        bio: "Former restaurant manager ensuring every order is perfect and every event runs smoothly.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
        id: 3,
        name: "Sofia Rodriguez",
        role: "Pastry Chef",
        bio: "Creates our award-winning desserts with a focus on seasonal ingredients and beautiful presentation.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    },
]

const values = [
    {
        icon: Leaf,
        title: "Fresh & Local",
        description: "We source ingredients from local farms and markets daily for peak freshness and flavor.",
    },
    {
        icon: ChefHat,
        title: "Chef-Crafted",
        description: "Every dish is developed and tested by our culinary team to ensure restaurant-quality results.",
    },
    {
        icon: Heart,
        title: "Made with Love",
        description: "We put care into every detail, from cooking to packaging to delivery.",
    },
]

export function AboutTeam() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6 space-y-16">
                <div className="text-center space-y-4">
                    <p className="text-xs tracking-widest uppercase text-primary font-medium">About Us</p>
                    <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
                        The team behind your meals
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We&apos;re a passionate team of chefs and food lovers dedicated to making exceptional 
                        catering accessible for every occasion.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {values.map((value, index) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card border-border rounded-2xl text-center">
                                <CardContent className="p-6 space-y-4">
                                    <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <value.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-heading font-semibold text-lg text-foreground">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full bg-card border-border rounded-2xl overflow-hidden group">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                <CardContent className="p-5 space-y-2">
                                    <h3 className="font-heading font-semibold text-lg text-foreground">
                                        {member.name}
                                    </h3>
                                    <p className="text-sm text-primary font-medium">{member.role}</p>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {member.bio}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
