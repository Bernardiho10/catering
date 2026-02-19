"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, ChefHat, Star, Check, ArrowRight, Phone, Mail, Utensils, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import Image from "next/image"
import { submitCateringRequest } from "@/app/actions/catering"
import { BlurFade } from "@/components/magicui/blur-fade"

const CATERING_PACKAGES = [
  {
    name: "Small Blessing",
    description: "Perfect for intimate gatherings and office meetings",
    pricePerPerson: 15,
    minGuests: 12,
    features: [
      "Assorted Organic Mini Cakes",
      "Choice of 2 Signature Flavors",
      "Biodegradable Napkins",
      "Standard Local Delivery"
    ],
    popular: false
  },
  {
    name: "Family Feast",
    description: "Ideal for birthday parties and celebrations",
    pricePerPerson: 22,
    minGuests: 24,
    features: [
      "Full Sized Signature Cakes",
      "Choice of 4 Signature Flavors",
      "Custom Gift Note",
      "Premium Delivery & Setup",
      "Dedicated Treats Coordinator"
    ],
    popular: true
  },
  {
    name: "Prophetic Event",
    description: "Full-service experience for grand occasions",
    pricePerPerson: 35,
    minGuests: 50,
    features: [
      "Unlimited Cake Service",
      "Custom Seasonal Flavors",
      "Luxury Serving Ware",
      "On-site Warm Station",
      "Complimentary Tasting Session",
      "Full Setup & Cleanup"
    ],
    popular: false
  }
]

const EVENT_TYPES = [
  { name: "Corporate Blessings", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop" },
  { name: "Divine Weddings", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop" },
  { name: "Family Reunions", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop" },
  { name: "Church Events", image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=300&fit=crop" },
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

    try {
      const result = await submitCateringRequest(formData)
      if (result.success) {
        toast.success("Catering request sent! We'll be in touch soon.")
        setFormData({ name: "", email: "", phone: "", eventDate: "", guestCount: "", eventType: "", message: "" })
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                <ChefHat className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Catering & Events</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Share the <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">Blessing</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
                From business lunches to divine celebrations, we bring the warmth of Abraham&apos;s to every occasion.
              </p>
              <div className="flex flex-wrap gap-4 justify-center pt-6">
                <Button size="lg" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest bg-white text-primary hover:bg-white/90 shadow-2xl">
                  Request Quote
                </Button>
                <Button size="lg" variant="outline" className="rounded-sm px-10 h-16 text-sm font-black uppercase tracking-widest border-2 border-white text-white hover:bg-white/10">
                  View Packages
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Event Types Grid */}
      <section className="py-24 border-b border-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {EVENT_TYPES.map((event, index) => (
              <BlurFade key={event.name} delay={0.1 + index * 0.1} inView>
                <div className="relative aspect-[4/5] rounded-sm overflow-hidden group">
                  <Image src={event.image} alt={event.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-all duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-center bg-gradient-to-t from-primary to-transparent">
                    <p className="text-sm font-black text-white uppercase tracking-widest">{event.name}</p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-blue-50/10">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-6xl font-black text-primary uppercase tracking-tighter mb-4">Catering Packages</h2>
              <div className="w-24 h-1 bg-accent mx-auto"></div>
            </div>
          </BlurFade>

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {CATERING_PACKAGES.map((pkg, index) => (
              <BlurFade key={pkg.name} delay={0.1 + index * 0.1} inView>
                <Card className={`rounded-sm h-full flex flex-col border-2 ${pkg.popular ? "border-primary shadow-2xl scale-105" : "border-blue-50 shadow-sm"} bg-white relative`}>
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-primary text-[10px] font-black uppercase tracking-widest rounded-sm border-2 border-primary shadow-xl">
                      ⭐ Most Requested
                    </div>
                  )}
                  <CardHeader className="p-8 text-center">
                    <CardTitle className="text-lg font-black text-primary uppercase tracking-widest">{pkg.name}</CardTitle>
                    <p className="text-xs font-medium text-primary/40 leading-relaxed mt-2">{pkg.description}</p>
                  </CardHeader>
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="text-center mb-8 border-y border-blue-50 py-6">
                      <span className="text-4xl font-black text-primary">${pkg.pricePerPerson}</span>
                      <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest ml-2">/ Guest</span>
                      <p className="text-[10px] font-bold text-accent uppercase tracking-widest mt-2">Minimum {pkg.minGuests} Guests</p>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-xs font-medium text-primary/70">
                          <Check className="h-4 w-4 text-accent shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button size="lg" className={`w-full rounded-sm h-14 font-black uppercase tracking-widest ${pkg.popular ? "bg-primary shadow-xl" : "variant-ghost border-2 border-primary bg-transparent text-primary hover:bg-primary/5"}`}>
                      Select Package
                    </Button>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-10">
                <BlurFade delay={0.1} inView>
                  <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-none">
                    Tailored For <br />
                    <span className="text-accent italic font-serif normal-case tracking-normal">Your Event</span>
                  </h2>
                </BlurFade>
                <BlurFade delay={0.2} inView>
                  <p className="text-lg text-primary/60 font-medium leading-relaxed">
                    Need a custom blessing? Our team works closely with you to curate a unique organic treat experience for your specific needs.
                  </p>
                </BlurFade>
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Call Us</p>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="h-12 w-12 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-primary/40 uppercase tracking-widest">Email Us</p>
                      <p className="text-sm font-black text-primary uppercase tracking-widest">blessings@abrahams.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <BlurFade delay={0.3} inView>
                <Card className="rounded-sm border-blue-50 shadow-2xl p-10 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Full Name</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Address</Label>
                        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Event Date</Label>
                          <Input type="date" value={formData.eventDate} onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })} className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Guest Count</Label>
                          <Input type="number" value={formData.guestCount} onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })} className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Tell Us More</Label>
                        <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="min-h-[120px] rounded-sm border-blue-50 focus-visible:ring-primary font-medium resize-none p-4" placeholder="Event details, dietary needs..." />
                      </div>
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-sm h-16 font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-xl">
                      {isSubmitting ? "Submitting..." : "Send Request"}
                    </Button>
                  </form>
                </Card>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
