
"use client"

import { use, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation, MessageSquare, Phone, ChefHat, Clock, Truck, CheckCircle2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Confetti } from "@/components/magicui/confetti"

const MockMap = () => (
    <div className="w-full h-full bg-gradient-to-br from-accent/30 to-secondary/20 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <div className="absolute w-[400px] h-[400px] border border-primary/10 rounded-full animate-ping opacity-20" />
        <div className="absolute w-[250px] h-[250px] border border-primary/20 rounded-full animate-ping animation-delay-500 opacity-30" />

        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border px-3 py-2 rounded-lg text-xs text-foreground shadow-sm">
            New York, NY
        </div>

        <div className="flex flex-col items-center">
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary shadow-lg">
                    <Navigation className="h-8 w-8 text-primary" />
                </div>
            </motion.div>
            <span className="bg-card px-4 py-2 rounded-full text-xs text-foreground mt-3 border border-border font-medium shadow-sm">
                Driver en route
            </span>
        </div>
    </div>
)

const STATUS_STEPS = [
    { key: 'received', label: 'Order Confirmed', icon: Package },
    { key: 'preparing', label: 'Being Prepared', icon: ChefHat },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
]

export default function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const [status, setStatus] = useState('out_for_delivery')
    const [hasCelebrated, setHasCelebrated] = useState(false)
    const searchParams = useSearchParams()
    const currentStepIndex = STATUS_STEPS.findIndex(s => s.key === status)
    const celebrate = searchParams.get("celebrate") === "1"
    const showConfetti = (celebrate && !hasCelebrated) || status === 'delivered'

    useEffect(() => {
        if (celebrate && !hasCelebrated) {
            const timeout = window.setTimeout(() => setHasCelebrated(true), 1200)
            return () => window.clearTimeout(timeout)
        }
    }, [celebrate, hasCelebrated])

    return (
        <div className="min-h-screen bg-background">
            <Confetti trigger={showConfetti} />
            <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)]">
                {/* Sidebar */}
                <div className="w-full lg:w-[380px] border-b lg:border-b-0 lg:border-r border-border bg-muted/30 p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 lg:overflow-y-auto">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-foreground mb-1">Track Order</h1>
                        <p className="text-sm text-muted-foreground">Order #{resolvedParams.id}</p>
                    </div>

                    {/* Status Timeline */}
                    <Card className="bg-card rounded-2xl border border-border shadow-sm">
                        <CardContent className="p-4 sm:p-5 space-y-5">
                            <h3 className="text-sm font-semibold text-foreground mb-4">Order Status</h3>
                            {STATUS_STEPS.map((step, index) => {
                                const isCompleted = index <= currentStepIndex
                                const isCurrent = index === currentStepIndex
                                const Icon = step.icon

                                return (
                                    <div key={step.key} className={`relative flex items-start gap-3 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                                        {index !== STATUS_STEPS.length - 1 && (
                                            <div className={`absolute left-4 top-9 w-[2px] h-10 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                                        )}
                                        <div className={`relative z-10 p-2 rounded-full border-2 transition-all ${
                                            isCurrent 
                                                ? 'border-primary bg-primary/10' 
                                                : isCompleted 
                                                    ? 'border-primary bg-primary' 
                                                    : 'border-border bg-muted'
                                        }`}>
                                            <Icon className={`w-4 h-4 ${isCompleted ? 'text-primary' : 'text-muted-foreground'} ${isCompleted && !isCurrent ? 'text-white' : ''}`} />
                                        </div>
                                        <div className="flex flex-col pt-0.5">
                                            <span className={`font-medium text-sm ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
                                                {step.label}
                                            </span>
                                            {isCurrent && (
                                                <span className="text-xs text-muted-foreground mt-0.5">In progress...</span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>

                    {/* ETA Widget */}
                    <Card className="bg-primary/5 rounded-2xl border border-primary/20 shadow-sm">
                        <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground mb-1">Estimated Arrival</p>
                                <div className="text-2xl font-semibold font-heading text-foreground">12:45 PM</div>
                                <p className="text-xs text-muted-foreground mt-1">About 15 minutes</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Clock className="h-6 w-6 text-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Demo Button */}
                    {status !== 'delivered' && (
                        <Button
                            onClick={() => setStatus('delivered')}
                            variant="outline"
                            className="w-full rounded-full"
                        >
                            Mark as Delivered
                        </Button>
                    )}

                    {/* Contact Courier */}
                    <div className="lg:mt-auto">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full rounded-full h-11 gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Contact Courier
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-card border border-border rounded-2xl p-0 shadow-lg">
                                <div className="p-3 border-b border-border flex justify-between items-center">
                                    <span className="text-sm font-medium">Courier Chat</span>
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                </div>
                                <div className="h-48 p-3 flex flex-col gap-2 overflow-y-auto">
                                    <div className="self-start bg-muted p-3 rounded-2xl rounded-tl-sm max-w-[80%] text-sm">
                                        Your order is on the way! I'll be there in about 15 minutes.
                                    </div>
                                </div>
                                <div className="p-3 border-t border-border flex gap-2">
                                    <Input 
                                        placeholder="Type a message..." 
                                        className="bg-muted border-transparent text-sm h-10 rounded-full focus-visible:ring-primary/30" 
                                    />
                                    <Button size="icon" className="h-10 w-10 rounded-full shrink-0">
                                        <Navigation className="h-4 w-4 rotate-90" />
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* Main Map View */}
                <div className="flex-1 relative min-h-[400px] lg:min-h-0">
                    <MockMap />

                    {/* Overlay Details */}
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:left-auto lg:right-6 lg:max-w-sm">
                        <Card className="bg-card/95 backdrop-blur-sm border border-border shadow-lg rounded-2xl">
                            <CardContent className="p-4 flex gap-3 items-center">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                                    <Truck className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-foreground">Alex Martinez</h4>
                                    <p className="text-xs text-muted-foreground">Delivery Driver</p>
                                </div>
                                <Button size="icon" variant="ghost" className="hover:bg-muted rounded-full shrink-0">
                                    <Phone className="h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
