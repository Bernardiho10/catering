"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Clock, MapPin, Truck, Package, ChefHat, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const STEPS = [
    { id: 1, label: "Order Received", icon: Clock },
    { id: 2, label: "Baking", icon: ChefHat },
    { id: 3, label: "Boxing", icon: Package },
    { id: 4, label: "Out for Delivery", icon: Truck },
    { id: 5, label: "Delivered", icon: Home },
]

export default function OrderTracker() {
    // Simulate progress
    const [currentStep, setCurrentStep] = useState(2)
    const [progress, setProgress] = useState(35)

    useEffect(() => {
        // Read mock order from local storage
        if (typeof window !== 'undefined') {
            const savedOrder = localStorage.getItem("lastOrder")
            if (savedOrder) {
                // Could set ID here if needed
            }
        }

        // Simple mock animation to simulate moving to the next step
        const timer = setTimeout(() => {
            setCurrentStep(3)
            setProgress(60)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        if (currentStep === 3) {
            const timer = setTimeout(() => {
                setCurrentStep(4)
                setProgress(85)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [currentStep])

    return (
        <div className="max-w-3xl mx-auto space-y-8 p-4 md:p-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold font-heading">Track Your Order</h1>
                <p className="text-muted-foreground">Order #ORD-ACTIVE-01 • Est. Delivery: 12:45 PM</p>
                {/* Note: In a real app we'd use the dynamic ID */}
            </div>

            {/* Visual Stepper */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0" />
                <div
                    className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress}%` }}
                />

                <div className="relative z-10 flex justify-between">
                    {STEPS.map((step) => {
                        const isCompleted = step.id < currentStep
                        const isCurrent = step.id === currentStep

                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isCurrent ? 1.2 : 1,
                                        backgroundColor: isCompleted || isCurrent ? "var(--primary)" : "var(--background)",
                                        borderColor: isCompleted || isCurrent ? "var(--primary)" : "var(--muted)"
                                    }}
                                    className={`
                                        w-10 h-10 rounded-full border-2 flex items-center justify-center
                                        ${isCompleted || isCurrent ? "text-primary-foreground" : "text-muted-foreground bg-muted"}
                                    `}
                                >
                                    {isCompleted ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                                </motion.div>
                                <span className={`text-xs md:text-sm font-medium ${isCurrent ? "text-primary font-bold" : "text-muted-foreground"}`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Status Card */}
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-xl">
                            {currentStep === 2 && "Mixing your dough with love..."}
                            {currentStep === 3 && "Boxing up your warm treats..."}
                            {currentStep === 4 && "Katherine is on the way!"}
                            {currentStep === 5 && "Enjoy your cookies!"}
                        </CardTitle>
                        <CardDescription>
                            {currentStep === 4 ? "Your driver is nearby." : "We're working hard on your order."}
                        </CardDescription>
                    </CardHeader>
                    {currentStep === 4 && (
                        <CardContent className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-4 bg-background p-4 rounded-xl shadow-sm border w-full max-w-sm">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                                    👱‍♀️
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold">Katherine</div>
                                    <div className="text-sm text-muted-foreground">Driving a Blue Scooter</div>
                                </div>
                                <Button size="icon" variant="outline" className="rounded-full">
                                    <Truck className="h-4 w-4" />
                                </Button>
                            </div>
                            <div className="w-full h-48 bg-muted rounded-xl relative overflow-hidden flex items-center justify-center">
                                <MapPin className="h-8 w-8 text-primary animate-bounce" />
                                <span className="sr-only">Map Placeholder</span>
                                <div className="absolute inset-0 bg-black/5" />
                            </div>
                        </CardContent>
                    )}
                </Card>
            </motion.div>

            {/* Order Details Preview */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <div className="font-medium">1x Tiff's Mix Dozen</div>
                            <div className="text-sm text-muted-foreground">Warm • Box</div>
                        </div>
                        <div className="font-medium">$18.00</div>
                    </div>
                    <div className="flex justify-between items-start border-b pb-4">
                        <div>
                            <div className="font-medium">1x Tiffs Reserve: Double Choc</div>
                            <div className="text-sm text-muted-foreground">Warm • Single</div>
                        </div>
                        <div className="font-medium">$4.50</div>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">$26.50</span>
                    </div>
                    <div className="pt-4 flex justify-center">
                        <Link href="/faq">
                            <Button variant="link" className="text-muted-foreground">Need help?</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
