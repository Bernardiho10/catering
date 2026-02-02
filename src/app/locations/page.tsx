"use client"

import { MapPin, Clock, Phone } from "lucide-react"
import { Globe } from "@/components/magicui/globe"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function LocationsPage() {
    const locations = [
        {
            name: "Downtown Flagship",
            address: "123 Cookie Lane, Sweet City, SC 90210",
            phone: "(555) 123-4567",
            hours: "Mon-Sun: 9am - 10pm"
        },
        {
            name: "Westside Kitchen",
            address: "456 Baker Street, Westville, CA 90025",
            phone: "(555) 987-6543",
            hours: "Mon-Fri: 10am - 9pm, Sat-Sun: 11am - 8pm"
        }
    ]

    return (
        <div className="min-h-screen bg-background py-16 px-4 overflow-hidden">
            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="text-center md:text-left">
                        <BlurFade delay={0.1} inView>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Locations</h1>
                            <p className="text-muted-foreground text-lg max-w-md">
                                Visit us in person for the freshest cookies and a warm welcome.
                                We're expanding to new cities soon!
                            </p>
                        </BlurFade>
                    </div>
                    <BlurFade delay={0.2} inView>
                        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <Globe className="relative z-10" />
                        </div>
                    </BlurFade>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {locations.map((loc, i) => (
                        <div key={i} className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                            <h3 className="text-2xl font-bold font-heading mb-4">{loc.name}</h3>
                            <div className="space-y-4 text-muted-foreground">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                                    <span>{loc.address}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-primary shrink-0" />
                                    <span>{loc.hours}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-primary shrink-0" />
                                    <span>{loc.phone}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
