"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Users, Building, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { BlurFade } from "@/components/magicui/blur-fade"

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Call Us",
    value: "832-713-0868",
    description: "Mon-Sat 8am-10pm",
    action: "tel:+18327130868"
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "hello@theacake.com",
    description: "We respond within 24 hours",
    action: "mailto:hello@theacake.com"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Houston/Texas",
    description: "Our Heart & Kitchen",
    action: "/locations"
  },
  {
    icon: Heart,
    title: "Support",
    value: "Track Your Order",
    description: "Checking on your cake?",
    action: "/tracker"
  }
]

const INQUIRY_TYPES = [
  { id: "general", label: "General", icon: MessageSquare },
  { id: "catering", label: "Catering", icon: Users },
  { id: "events", label: "Events", icon: Sparkles },
  { id: "wholesale", label: "Wholesale", icon: Building },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "general",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success("Thank you for reaching out! We&apos;ll be in touch soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "general",
      subject: "",
      message: ""
    })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <BlurFade delay={0.1} inView>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-sm">
                <MessageSquare className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">The A Cake</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Get in <br />
                <span className="text-accent italic font-serif normal-case tracking-normal">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto italic font-serif">
                We&apos;d love to hear from you.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-24 border-b border-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {CONTACT_INFO.map((info, idx) => (
              <BlurFade key={info.title} delay={0.1 + idx * 0.1} inView>
                <a
                  href={info.action || "#"}
                  className="block h-full bg-white p-8 rounded-sm border border-blue-50 hover:shadow-2xl transition-all duration-500 group text-center"
                >
                  <div className="h-14 w-14 rounded-sm bg-blue-50 flex items-center justify-center border border-blue-100/50 mx-auto mb-6 group-hover:bg-primary transition-colors">
                    <info.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">{info.title}</h3>
                  <p className="text-sm font-black text-primary uppercase tracking-widest mb-2 group-hover:text-accent transition-colors">{info.value}</p>
                  <p className="text-[10px] font-medium text-primary/60">{info.description}</p>
                </a>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-start max-w-6xl mx-auto">
            {/* Form Side */}
            <div className="space-y-12">
              <BlurFade delay={0.1} inView>
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tighter leading-tight">
                    Send a <br />
                    <span className="text-accent italic font-serif normal-case tracking-normal">Message</span>
                  </h2>
                  <p className="text-lg text-primary/60 font-medium max-w-md">
                    Fill out the form below and our team will get back to you faster than a cake rises!
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.2} inView>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Inquiry Type</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                          className={`h-12 rounded-sm border-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${formData.inquiryType === type.id
                            ? "border-primary bg-primary text-white shadow-lg"
                            : "border-blue-50 text-primary/40 hover:border-primary/20"
                            }`}
                        >
                          <type.icon className="h-3 w-3" />
                          <span>{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Your Name</Label>
                      <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email Address</Label>
                      <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className="h-14 rounded-sm border-blue-50 focus-visible:ring-primary font-medium" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Message</Label>
                    <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="How can we bless your day?" className="min-h-[160px] rounded-sm border-blue-50 focus-visible:ring-primary font-medium resize-none p-4" required />
                  </div>

                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-16 rounded-sm text-sm font-black uppercase tracking-widest bg-primary hover:bg-primary/90 shadow-2xl">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </BlurFade>
            </div>

            {/* Info Side */}
            <div className="space-y-12 lg:pt-12">
              <BlurFade delay={0.3} inView>
                <div className="bg-blue-50/20 p-10 md:p-12 rounded-sm border border-blue-50 space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-primary uppercase tracking-widest">Office Hours</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-medium text-primary/70">
                        <span>Monday - Thursday</span>
                        <span>8:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-medium text-primary/70">
                        <span>Friday - Saturday</span>
                        <span>8:00 AM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-black text-accent">
                        <span>Sunday</span>
                        <span>Closed for Rest</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-primary uppercase tracking-widest">Global Support</h3>
                    <p className="text-sm font-medium text-primary/60 leading-relaxed">
                      Our support team is available via email 24/7. We typically respond to all inquiries within one business day.
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <div className="relative aspect-video rounded-sm overflow-hidden border border-blue-50 group shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=800&q=80"
                    alt="Our Kitchen"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/20" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-sm rounded-sm">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Flagship Kitchen</p>
                    <p className="text-xs font-medium text-primary/70 italic">Where the magic happens daily.</p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      {/* Final Tagline Section */}
      <section className="py-24 bg-primary text-white text-center border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <BlurFade delay={0.2} inView>
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-widest text-accent">
                The A Cake
              </h2>
              <p className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight">
                Abraham&apos;s Delight — A Blessing in Every Slice.
              </p>
              <div className="w-24 h-1 bg-accent mx-auto mt-8"></div>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  )
}
