"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Truck, Clock, DollarSign, Check, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const DELIVERY_ZONES = [
  {
    name: "Zone 1 - Downtown",
    distance: "0-5 miles",
    fee: 4.99,
    time: "30-45 min",
    areas: ["Downtown", "Midtown", "Financial District", "Arts District"]
  },
  {
    name: "Zone 2 - Inner City",
    distance: "5-10 miles",
    fee: 7.99,
    time: "45-60 min",
    areas: ["East Side", "West Side", "North Hills", "South Park"]
  },
  {
    name: "Zone 3 - Suburbs",
    distance: "10-15 miles",
    fee: 12.99,
    time: "60-90 min",
    areas: ["Westlake", "Cedar Park", "Round Rock", "Pflugerville"]
  }
]

export default function DeliveryAreasPage() {
  const [zipCode, setZipCode] = useState("")

  const checkDelivery = () => {
    if (!zipCode || zipCode.length < 5) {
      toast.error("Please enter a valid ZIP code")
      return
    }
    toast.success("Great news! We deliver to your area.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <Truck className="h-4 w-4" />
              Delivery Areas
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              We Deliver to <span className="text-golden">Your Door</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">Check if we deliver to your area and see delivery times and fees.</p>
            
            <div className="flex gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>
              <Button onClick={checkDelivery} className="rounded-full px-6">
                <Search className="h-4 w-4 mr-2" />
                Check
              </Button>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {DELIVERY_ZONES.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="rounded-2xl h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">{zone.name}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{zone.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span>${zone.fee} delivery fee</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{zone.time}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-2">Areas included:</p>
                      <div className="flex flex-wrap gap-2">
                        {zone.areas.map((area) => (
                          <span key={area} className="text-xs bg-muted px-2 py-1 rounded-full">{area}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="rounded-2xl max-w-2xl mx-auto bg-primary/5">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">Free Delivery on Orders Over $150</h3>
              <p className="text-sm text-muted-foreground">Applies to all delivery zones. Minimum order: $50</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
