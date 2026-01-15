"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Phone",
    value: "(555) 123-4567",
    description: "Mon-Fri 9am-9pm, Sat-Sun 10am-8pm",
    action: "tel:+15551234567"
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@foody.com",
    description: "We respond within 24 hours",
    action: "mailto:hello@foody.com"
  },
  {
    icon: MapPin,
    title: "Kitchen Location",
    value: "123 Culinary Street",
    description: "Austin, TX 78701",
    action: "https://maps.google.com"
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Open Daily",
    description: "10:00 AM - 10:00 PM",
    action: null
  }
]

const INQUIRY_TYPES = [
  { id: "general", label: "General Inquiry", icon: MessageSquare },
  { id: "catering", label: "Catering Request", icon: Users },
  { id: "corporate", label: "Corporate Account", icon: Building },
  { id: "feedback", label: "Feedback", icon: Mail },
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
    
    toast.success("Message sent! We'll get back to you soon.")
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
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 via-primary/10 to-blue-500/10 rounded-full text-amber-600 dark:text-amber-400 text-sm font-medium border border-amber-200/50 dark:border-amber-500/20 mb-6">
              <MessageSquare className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              We'd Love to <span className="text-golden">Hear From You</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question, feedback, or want to discuss catering for your next event? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {CONTACT_INFO.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="rounded-2xl h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    {info.action ? (
                      <a 
                        href={info.action} 
                        className="text-primary hover:underline font-medium"
                        target={info.action.startsWith("http") ? "_blank" : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-primary font-medium">{info.value}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-xl">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div className="space-y-2">
                      <Label>What can we help you with?</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {INQUIRY_TYPES.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                            className={`p-3 rounded-xl border-2 text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                              formData.inquiryType === type.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <type.icon className="h-5 w-5" />
                            <span className="text-xs">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          className="rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone & Subject */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(555) 123-4567"
                          className="rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="How can we help?"
                          className="rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        className="rounded-xl resize-none"
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full rounded-full gap-2"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ & Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Answers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">What are your delivery hours?</h4>
                    <p className="text-sm text-muted-foreground">We deliver daily from 10 AM to 10 PM.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">How far in advance should I order?</h4>
                    <p className="text-sm text-muted-foreground">Regular orders need 2 hours; catering needs 24-48 hours.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Do you accommodate dietary restrictions?</h4>
                    <p className="text-sm text-muted-foreground">Yes! We offer vegetarian, vegan, and gluten-free options.</p>
                  </div>
                  <a href="/faq" className="text-primary hover:underline text-sm font-medium block mt-4">
                    View All FAQs →
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-primary/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Planning an Event?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our catering team is ready to help you create an unforgettable experience.
                  </p>
                  <a href="/catering">
                    <Button variant="outline" className="rounded-full w-full">
                      Explore Catering
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Corporate Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Streamline ordering for your business with dedicated support and invoicing.
                  </p>
                  <a href="/corporate">
                    <Button variant="outline" className="rounded-full w-full">
                      Learn More
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
