"use client"

import { motion } from "framer-motion"
import { Truck, Clock, MapPin, AlertCircle, CheckCircle, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function DeliveryPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Truck className="h-4 w-4" />
              Delivery Policy
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Delivery Policy</h1>
            <p className="text-muted-foreground">Everything you need to know about our delivery service.</p>
          </motion.div>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-primary" /> Delivery Areas</h2>
                <p className="text-muted-foreground mb-4">We currently deliver within a 15-mile radius of our kitchen locations. Delivery fees vary based on distance:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 0-5 miles: $4.99</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 5-10 miles: $7.99</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 10-15 miles: $12.99</li>
                  <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Orders over $150: FREE delivery</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><Clock className="h-5 w-5 text-primary" /> Delivery Times</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Operating Hours:</strong> Daily 10:00 AM - 10:00 PM</li>
                  <li><strong>Standard Delivery:</strong> 45-60 minutes from order confirmation</li>
                  <li><strong>Peak Hours (12-2 PM, 6-8 PM):</strong> May take up to 90 minutes</li>
                  <li><strong>Scheduled Orders:</strong> Available up to 7 days in advance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-4"><AlertCircle className="h-5 w-5 text-primary" /> Order Requirements</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Minimum Order:</strong> $50 for delivery orders (no minimum for pickup)</li>
                  <li><strong>Advance Notice:</strong> Regular orders require 2 hours; catering requires 24-48 hours</li>
                  <li><strong>Large Orders (10+ guests):</strong> Please order at least 24 hours in advance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cancellations & Refunds</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Orders may be cancelled or modified up to <strong>2 hours before</strong> scheduled delivery</li>
                  <li>Cancellations within 2 hours may incur a 25% fee</li>
                  <li>If you're unsatisfied with your order, contact us within 24 hours for a full refund or credit</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl bg-primary/5">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Questions About Delivery?</h3>
                <p className="text-sm text-muted-foreground mb-4">Our support team is here to help.</p>
                <Link href="/contact" className="text-primary hover:underline font-medium">Contact Us →</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
