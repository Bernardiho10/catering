"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, MapPinned, Truck, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import {
  DELIVERY_ZONES,
  determineDeliveryEligibility,
  NATIONWIDE_SHIPPING_FEE_CENTS,
} from "@/lib/delivery-zones"

const LOCATIONS = [
  {
    id: "jackson-kitchen",
    name: "Abraham's Kitchen — Jackson",
    address: "Jackson, MS",
    hours: "Daily 10:00 AM – 10:00 PM",
    phone: "(555) 010-0101",
    servesZoneId: "jackson" as const,
  },
  {
    id: "texas-kitchen",
    name: "Abraham's Kitchen — Texas Metro",
    address: "Houston / Dallas / Austin / San Antonio, TX",
    hours: "Daily 10:00 AM – 10:00 PM",
    phone: "(555) 020-0202",
    servesZoneId: "texas" as const,
  },
  {
    id: "chicago-kitchen",
    name: "Abraham's Kitchen — Chicago",
    address: "Chicago, IL",
    hours: "Daily 10:00 AM – 10:00 PM",
    phone: "(555) 030-0303",
    servesZoneId: "chicago" as const,
  },
]

export default function LocationsDeliveriesPage() {
  const [addressLine1, setAddressLine1] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("US")

  const eligibility = useMemo(() => {
    if (!city && !postalCode && !addressLine1) return null
    return determineDeliveryEligibility({ addressLine1, city, state, postalCode, country })
  }, [addressLine1, city, state, postalCode, country])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background dark:from-background dark:via-blue-950/10 dark:to-background">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
              <MapPinned className="h-4 w-4" />
              Locations & Deliveries
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Find your closest location & check delivery in <span className="text-golden">seconds</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We currently serve three core zones — Jackson, Texas, and Chicago — with nationwide delivery available across the U.S.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Address checker */}
      <section className="pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-6">
            <Card className="rounded-3xl lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg">Check delivery availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="addressLine1">Address</Label>
                  <Input
                    id="addressLine1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="rounded-xl"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="rounded-xl"
                      placeholder="Chicago"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="rounded-xl"
                      placeholder="IL"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">ZIP Code</Label>
                    <Input
                      id="postalCode"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="rounded-xl"
                      placeholder="60601"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="rounded-xl"
                      placeholder="US"
                    />
                  </div>
                </div>

                {eligibility && (
                  <div
                    className={`rounded-2xl border p-4 flex gap-3 items-start ${eligibility.eligible ? "border-emerald-500/30 bg-emerald-500/10" : "border-destructive/30 bg-destructive/10"
                      }`}
                    role="status"
                    aria-live="polite"
                  >
                    {eligibility.eligible ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">{eligibility.message}</p>
                      {eligibility.eligible && eligibility.deliveryFeeCents !== null && (
                        <p className="text-sm text-muted-foreground">
                          Estimated delivery fee: <span className="font-semibold text-foreground">{formatCurrency(eligibility.deliveryFeeCents)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/checkout" className="w-full sm:w-auto">
                    <Button className="rounded-full w-full sm:w-auto gap-2">
                      Continue to checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/delivery-areas" className="w-full sm:w-auto">
                    <Button variant="outline" className="rounded-full w-full sm:w-auto">
                      View delivery areas
                    </Button>
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">
                  Note: This checker uses city matching for now. We can upgrade it to full address geocoding once you provide an API key.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Nationwide delivery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Available across the U.S.</p>
                    <p className="text-sm text-muted-foreground">If you’re outside our local zones, we’ll still deliver via nationwide shipping.</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-sm text-muted-foreground">Nationwide shipping fee</p>
                  <p className="text-2xl font-semibold text-foreground">{formatCurrency(NATIONWIDE_SHIPPING_FEE_CENTS)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Locations list */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase text-primary font-medium">Locations</p>
                <h2 className="text-2xl md:text-3xl font-heading font-semibold">Our kitchens</h2>
                <p className="text-sm text-muted-foreground">Choose the closest location for the freshest experience.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {LOCATIONS.map((loc, index) => (
                <motion.div
                  key={loc.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="rounded-3xl h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{loc.name}</h3>
                        <p className="text-sm text-muted-foreground">{loc.address}</p>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">Hours: <span className="text-foreground">{loc.hours}</span></p>
                        <p className="text-muted-foreground">Phone: <span className="text-foreground">{loc.phone}</span></p>
                      </div>
                      <div className="rounded-2xl border border-border p-4">
                        <p className="text-sm text-muted-foreground">Primary zone served</p>
                        <p className="font-medium text-foreground">{DELIVERY_ZONES.find((z) => z.id === loc.servesZoneId)?.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Zone table */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-2 mb-10">
              <p className="text-xs tracking-widest uppercase text-primary font-medium">Delivery zones</p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">Jackson, Texas, and Chicago</h2>
              <p className="text-sm text-muted-foreground">Local fees are applied at checkout based on your address.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {DELIVERY_ZONES.map((zone, index) => (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="rounded-3xl h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{zone.name}</h3>
                        <span className="text-sm font-semibold text-primary">{formatCurrency(zone.deliveryFeeCents)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>ETA: <span className="text-foreground">{zone.eta}</span></p>
                        <p>Example cities:</p>
                        <p className="text-foreground">{zone.cities.join(", ")}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{zone.notes}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
