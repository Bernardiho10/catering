
"use client"

import { use, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Navigation, MessageSquare, Phone, ChefHat, Clock, Truck, CheckCircle2, Package, Check, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Confetti } from "@/components/magicui/confetti"

const MockMap = () => (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-cyan-950/30 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#10b981_1px,transparent_1px),linear-gradient(to_bottom,#10b981_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="absolute w-[500px] h-[500px] border-2 border-emerald-300/30 rounded-full animate-ping opacity-20" />
        <div className="absolute w-[350px] h-[350px] border-2 border-teal-300/40 rounded-full animate-ping animation-delay-500 opacity-30" />
        <div className="absolute w-[200px] h-[200px] border-2 border-primary/30 rounded-full animate-pulse opacity-40" />

        <div className="absolute top-4 left-4 bg-card border border-border px-4 py-2.5 rounded-xl text-sm text-foreground shadow-lg flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">New York, NY</span>
        </div>

        <div className="flex flex-col items-center">
            <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-xl shadow-primary/30">
                    <Navigation className="h-10 w-10 text-white" />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card px-5 py-2.5 rounded-full text-sm text-foreground mt-4 border border-border font-medium shadow-lg flex items-center gap-2"
            >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Driver en route
            </motion.div>
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
                    <Card className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 px-4 sm:px-5 py-3 border-b border-border">
                            <h3 className="text-sm font-semibold text-foreground">Order Status</h3>
                        </div>
                        <CardContent className="p-4 sm:p-5 space-y-1">
                            {STATUS_STEPS.map((step, index) => {
                                const isCompleted = index < currentStepIndex
                                const isCurrent = index === currentStepIndex
                                const isPending = index > currentStepIndex
                                const Icon = step.icon

                                return (
                                    <div key={step.key} className="relative flex items-start gap-4 py-3">
                                        {index !== STATUS_STEPS.length - 1 && (
                                            <div className={`absolute left-[18px] top-12 w-[3px] h-8 rounded-full transition-colors ${
                                                isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-gradient-to-b from-emerald-500 to-border' : 'bg-border'
                                            }`} />
                                        )}
                                        <div className={`relative z-10 p-2.5 rounded-full transition-all shadow-sm ${
                                            isCompleted 
                                                ? 'bg-emerald-500 border-2 border-emerald-500' 
                                                : isCurrent 
                                                    ? 'bg-primary/10 border-2 border-primary animate-pulse' 
                                                    : 'bg-muted border-2 border-border'
                                        }`}>
                                            {isCompleted ? (
                                                <Check className="w-4 h-4 text-white" />
                                            ) : (
                                                <Icon className={`w-4 h-4 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                                            )}
                                        </div>
                                        <div className="flex flex-col pt-1">
                                            <span className={`font-medium text-sm ${
                                                isCompleted ? 'text-emerald-600 dark:text-emerald-400' : isCurrent ? 'text-primary' : 'text-muted-foreground'
                                            }`}>
                                                {step.label}
                                            </span>
                                            {isCompleted && (
                                                <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                                                    <Check className="h-3 w-3" /> Completed
                                                </span>
                                            )}
                                            {isCurrent && (
                                                <span className="text-xs text-primary mt-0.5 flex items-center gap-1">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                                    In progress...
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>

                    {/* ETA Widget */}
                    <Card className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-primary/10 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm overflow-hidden">
                        <CardContent className="p-4 sm:p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mb-1">Estimated Arrival</p>
                                <div className="text-3xl font-bold font-heading text-foreground">12:45 PM</div>
                                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    About 15 minutes away
                                </p>
                            </div>
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Clock className="h-7 w-7 text-white" />
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
                                <Button variant="outline" className="w-full rounded-full h-11 gap-2 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50">
                                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                                    Contact Courier
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 bg-card border border-border rounded-2xl p-0 shadow-xl" sideOffset={8}>
                                <div className="p-4 border-b border-border flex justify-between items-center bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-t-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                                            AM
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-foreground">Alex Martinez</span>
                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                Online
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-52 p-4 flex flex-col gap-3 overflow-y-auto bg-muted/30">
                                    <div className="self-start bg-card border border-border p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm">
                                        <p>Your order is on the way! I&apos;ll be there in about 15 minutes. 🚗</p>
                                        <span className="text-[10px] text-muted-foreground mt-1 block">12:30 PM</span>
                                    </div>
                                    <div className="self-end bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                                        <p>Great, thank you!</p>
                                        <span className="text-[10px] text-primary-foreground/70 mt-1 block">12:31 PM</span>
                                    </div>
                                </div>
                                <div className="p-3 border-t border-border flex gap-2 bg-card rounded-b-2xl">
                                    <Input 
                                        placeholder="Type a message..." 
                                        className="bg-muted border-transparent text-sm h-10 rounded-full focus-visible:ring-primary/30" 
                                    />
                                    <Button size="icon" className="h-10 w-10 rounded-full shrink-0 bg-emerald-500 hover:bg-emerald-600">
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
                        <Card className="bg-card border border-border shadow-xl rounded-2xl overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-primary/10 p-4">
                                <div className="flex gap-4 items-center">
                                    <div className="relative">
                                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            AM
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-foreground text-lg">Alex Martinez</h4>
                                        <p className="text-sm text-muted-foreground">Delivery Driver</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-medium text-foreground">4.9</span>
                                            <span className="text-xs text-muted-foreground">(234 deliveries)</span>
                                        </div>
                                    </div>
                                    <Button size="icon" className="h-11 w-11 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shrink-0">
                                        <Phone className="h-5 w-5 text-white" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
