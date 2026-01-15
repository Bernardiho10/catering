"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, Users, CreditCard, Clock, Check, ArrowRight, Briefcase, Receipt, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const BENEFITS = [
  { icon: Receipt, title: "Monthly Invoicing", description: "Consolidated billing with detailed reports for easy expense tracking." },
  { icon: Users, title: "Multiple Users", description: "Add team members to order on behalf of your company." },
  { icon: CreditCard, title: "Volume Discounts", description: "Save up to 15% on recurring orders and large events." },
  { icon: HeadphonesIcon, title: "Dedicated Support", description: "Priority access to our corporate concierge team." },
  { icon: Clock, title: "Scheduled Orders", description: "Set up recurring orders for regular meetings and events." },
  { icon: Briefcase, title: "Custom Menus", description: "Work with our chefs to create menus tailored to your team." },
]

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    employeeCount: "",
    orderFrequency: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.companyName || !formData.email || !formData.contactName) {
      toast.error("Please fill in all required fields")
      return
    }
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success("Application submitted! Our corporate team will contact you within 1-2 business days.")
    setFormData({ companyName: "", contactName: "", email: "", phone: "", employeeCount: "", orderFrequency: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Building className="h-4 w-4" />
              Corporate Accounts
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Streamlined Ordering for <span className="text-golden">Your Business</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From daily team lunches to client events, our corporate program makes ordering effortless with dedicated support and exclusive benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-2xl h-full">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-primary flex items-center justify-center mb-4">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold mb-4">Apply for a Corporate Account</h2>
              <p className="text-muted-foreground">Fill out the form below and our team will set up your account.</p>
            </motion.div>

            <Card className="rounded-3xl">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input id="companyName" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input id="contactName" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="rounded-xl" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeCount">Employee Count</Label>
                      <Input id="employeeCount" value={formData.employeeCount} onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })} className="rounded-xl" placeholder="e.g., 50-100" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orderFrequency">Estimated Order Frequency</Label>
                      <Input id="orderFrequency" value={formData.orderFrequency} onChange={(e) => setFormData({ ...formData, orderFrequency: e.target.value })} className="rounded-xl" placeholder="e.g., Weekly" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="rounded-xl resize-none" rows={4} placeholder="Tell us about your catering needs..." />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full gap-2">
                    {isSubmitting ? "Submitting..." : <><ArrowRight className="h-4 w-4" /> Submit Application</>}
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
