"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, ChefHat, Star, Check, ArrowRight, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Image from "next/image"

const CATERING_PACKAGES = [
  {
    name: "Essential",
    description: "Perfect for small gatherings and office meetings",
    pricePerPerson: 25,
    minGuests: 10,
    features: [
      "Choice of 2 main courses",
      "2 side dishes",
      "Fresh bread basket",
      "Disposable plates & utensils",
      "Standard delivery"
    ],
    popular: false
  },
  {
    name: "Premium",
    description: "Ideal for corporate events and celebrations",
    pricePerPerson: 45,
    minGuests: 20,
    features: [
      "Choice of 3 main courses",
      "3 side dishes",
      "Appetizer selection",
      "Fresh bread & butter",
      "Premium serving ware",
      "Setup assistance",
      "Dedicated coordinator"
    ],
    popular: true
  },
  {
    name: "Luxury",
    description: "Full-service experience for memorable events",
    pricePerPerson: 75,
    minGuests: 30,
    features: [
      "Full menu customization",
      "4+ main courses",
      "Appetizers & desserts",
      "Premium beverages",
      "Elegant serving ware",
      "Full setup & cleanup",
      "On-site chef & servers",
      "Complimentary tasting"
    ],
    popular: false
  }
]

const EVENT_TYPES = [
  { name: "Corporate Events", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop" },
  { name: "Weddings", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop" },
  { name: "Private Parties", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop" },
  { name: "Holiday Events", image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop" },
]

export default function CateringPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    guestCount: "",
    eventType: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success("Request submitted! Our catering team will contact you within 24 hours.")
    setFormData({ name: "", email: "", phone: "", eventDate: "", guestCount: "", eventType: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-amber-50/20 to-background dark:from-background dark:via-amber-950/10 dark:to-background">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20 mb-6">
              <ChefHat className="h-4 w-4" />
              Catering Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Exceptional Catering for <span className="text-golden">Every Occasion</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              From intimate gatherings to grand celebrations, our catering team delivers restaurant-quality cuisine with impeccable service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full gap-2">
                <Calendar className="h-4 w-4" />
                Request a Quote
              </Button>
              <Button size="lg" variant="outline" className="rounded-full gap-2">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {EVENT_TYPES.map((event, index) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <Image src={event.image} alt={event.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">{event.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Catering Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Choose from our curated packages or work with us to create a custom menu.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CATERING_PACKAGES.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`rounded-3xl h-full relative ${pkg.popular ? "border-primary border-2" : ""}`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" /> Most Popular
                    </div>
                  )}
                  <CardHeader className="pt-8">
                    <CardTitle className="text-xl">{pkg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">${pkg.pricePerPerson}</span>
                      <span className="text-muted-foreground">/person</span>
                      <p className="text-sm text-muted-foreground mt-1">Minimum {pkg.minGuests} guests</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full rounded-full ${pkg.popular ? "" : "variant-outline"}`} variant={pkg.popular ? "default" : "outline"}>
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Request a Custom Quote</h2>
              <p className="text-muted-foreground">Tell us about your event and we'll create a personalized proposal.</p>
            </motion.div>

            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Input id="eventDate" type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guestCount">Guest Count</Label>
                      <Input id="guestCount" type="number" value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} className="rounded-xl" placeholder="Approx. number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <Input id="eventType" value={formData.eventType} onChange={(e) => setFormData({ ...formData, eventType: e.target.value })} className="rounded-xl" placeholder="e.g., Wedding, Corporate" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell Us More</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl resize-none" rows={4} placeholder="Any special requests, dietary needs, or questions?" />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full gap-2">
                    {isSubmitting ? "Submitting..." : <><ArrowRight className="h-4 w-4" /> Submit Request</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
